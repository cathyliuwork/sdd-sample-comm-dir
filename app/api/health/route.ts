import { NextResponse } from 'next/server';

/**
 * GET /api/health
 * 健康检查端点 - 检查环境变量和数据库连接
 */
export async function GET() {
  try {
    // 检查环境变量是否存在
    const envStatus = {
      DATABASE_URL: !!process.env.DATABASE_URL ? 'Set' : 'Missing',
      DIRECT_URL: !!process.env.DIRECT_URL ? 'Set' : 'Missing',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'Missing',
      JWT_SECRET: !!process.env.JWT_SECRET ? 'Set' : 'Missing',
      NODE_ENV: process.env.NODE_ENV || 'Missing',
    };

    // 尝试连接数据库
    let dbStatus = 'Unknown';
    let dbError = null;

    try {
      const prisma = (await import('@/lib/prisma')).default;
      await prisma.$queryRaw`SELECT 1 as test`;
      dbStatus = 'Connected';
    } catch (error) {
      dbStatus = 'Failed';
      dbError = error instanceof Error ? error.message : String(error);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: envStatus,
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
