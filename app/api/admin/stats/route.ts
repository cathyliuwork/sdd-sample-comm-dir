import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/admin/stats
 * 获取统计数据（仪表盘使用）
 */
export async function GET(request: NextRequest) {
  try {
    // 获取总社区数
    const totalCommunities = await prisma.community.count();

    // 获取总成员数
    const totalMembers = await prisma.member.count();

    // 获取今日新增成员数
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMembers = await prisma.member.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // 获取最近 10 条成员记录
    const recentMembers = await prisma.member.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        community: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalCommunities,
        totalMembers,
        todayMembers,
        recentMembers,
      },
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { success: false, error: '获取统计数据失败' },
      { status: 500 }
    );
  }
}
