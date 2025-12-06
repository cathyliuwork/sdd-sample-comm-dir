import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/community/[slug]
 * 获取社区基本信息（无需访问码）
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const community = await prisma.community.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (!community) {
      return NextResponse.json(
        { success: false, error: '社区不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { community },
    });
  } catch (error) {
    console.error('Failed to fetch community:', error);
    return NextResponse.json(
      { success: false, error: '获取社区信息失败' },
      { status: 500 }
    );
  }
}
