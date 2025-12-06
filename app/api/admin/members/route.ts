import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/admin/members
 * 获取成员列表（支持筛选和搜索）
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const communityId = searchParams.get('communityId');
    const search = searchParams.get('search');

    // 构建查询条件
    const where: any = {};

    if (communityId && communityId !== 'all') {
      where.communityId = communityId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { profession: { contains: search, mode: 'insensitive' } },
      ];
    }

    // 查询成员
    const members = await prisma.member.findMany({
      where,
      include: {
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: { members },
    });
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json(
      { success: false, error: '获取成员列表失败' },
      { status: 500 }
    );
  }
}
