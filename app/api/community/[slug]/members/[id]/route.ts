import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/community/[slug]/members/[id]
 * 获取单个成员信息（用于分享页面）
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string; id: string } }
) {
  try {
    const { slug, id } = params;

    // 查找社区
    const community = await prisma.community.findUnique({
      where: { slug },
      select: { id: true, name: true },
    });

    if (!community) {
      return NextResponse.json(
        { success: false, error: '社区不存在' },
        { status: 404 }
      );
    }

    // 查找成员
    const member = await prisma.member.findFirst({
      where: {
        id,
        communityId: community.id,
      },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: '成员不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        member,
        communityName: community.name,
      },
    });
  } catch (error) {
    console.error('Failed to fetch member:', error);
    return NextResponse.json(
      { success: false, error: '获取成员信息失败' },
      { status: 500 }
    );
  }
}
