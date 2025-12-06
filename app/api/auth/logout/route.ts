import { NextResponse } from 'next/server';
import { deleteSessionCookie } from '@/lib/auth/cookies';

export async function POST() {
  try {
    await deleteSessionCookie();

    return NextResponse.json({
      success: true,
      message: '登出成功'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: '登出失败' },
      { status: 500 }
    );
  }
}
