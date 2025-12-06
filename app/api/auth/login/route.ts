import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { signToken } from '@/lib/auth/jwt';
import { setSessionCookie } from '@/lib/auth/cookies';

const loginSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request',
          details: result.error.flatten()
        },
        { status: 400 }
      );
    }

    const { username, password } = result.data;

    // 验证用户名
    if (username !== process.env.ADMIN_USERNAME) {
      return NextResponse.json(
        { success: false, error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!adminPasswordHash) {
      console.error('ADMIN_PASSWORD_HASH not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 生成 JWT token
    const token = await signToken({
      username,
      role: 'admin',
    });

    // 设置 Cookie
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: '登录成功',
      user: { username, role: 'admin' },
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: '登录失败，请重试' },
      { status: 500 }
    );
  }
}
