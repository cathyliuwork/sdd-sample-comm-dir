import { NextResponse } from 'next/server';

/**
 * GET /api/health
 * 健康检查端点 - 检查环境变量和数据库连接
 */
export async function GET() {
  try {
    // 详细检查每个环境变量
    const checkEnvVar = (name: string) => {
      const value = process.env[name];
      if (!value) return { status: 'Missing', length: 0 };
      return {
        status: 'Set',
        length: value.length,
        preview: value.substring(0, 20) + '...',
      };
    };

    const envVars = {
      DATABASE_URL: checkEnvVar('DATABASE_URL'),
      DIRECT_URL: checkEnvVar('DIRECT_URL'),
      NEXT_PUBLIC_APP_URL: checkEnvVar('NEXT_PUBLIC_APP_URL'),
      JWT_SECRET: checkEnvVar('JWT_SECRET'),
      JWT_EXPIRES_IN: checkEnvVar('JWT_EXPIRES_IN'),
      ADMIN_USERNAME: checkEnvVar('ADMIN_USERNAME'),
      ADMIN_PASSWORD_HASH: checkEnvVar('ADMIN_PASSWORD_HASH'),
      NODE_ENV: checkEnvVar('NODE_ENV'),
    };

    // 统计
    const total = Object.keys(envVars).length;
    const set = Object.values(envVars).filter(v => v.status === 'Set').length;
    const missing = total - set;

    // 尝试连接数据库
    let dbStatus = 'Unknown';
    let dbError = null;

    try {
      const prisma = (await import('@/lib/prisma')).default;
      await prisma.$queryRaw`SELECT 1 as test`;
      dbStatus = 'Connected';
    } catch (error) {
      dbStatus = 'Failed';
      dbError = error instanceof Error ? error.message.substring(0, 200) : String(error).substring(0, 200);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        total,
        set,
        missing,
        percentage: Math.round((set / total) * 100),
      },
      environment: envVars,
      database: {
        status: dbStatus,
        error: dbError,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
