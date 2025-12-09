import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { communitySchema } from '@/lib/validation/community';
import { generateUniqueSlug } from '@/lib/utils/slugify';

/**
 * GET /api/admin/communities
 * 获取所有社区列表（包含成员数统计）
 */
export async function GET() {
  try {
    await requireAdmin();

    const communities = await prisma.community.findMany({
      include: {
        _count: {
          select: { members: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: communities.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        accessCode: c.accessCode,
        memberCount: c._count.members,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Failed to fetch communities:', error);
    return NextResponse.json(
      { success: false, error: '获取社区列表失败' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/communities
 * 创建新社区
 */
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { name, description, accessCode } = body;

    // 自动生成唯一 slug
    const slug = await generateUniqueSlug(name);

    const community = await prisma.community.create({
      data: {
        name: name.trim(),
        slug,
        description: description?.trim() || null,
        accessCode: accessCode?.trim() || null,
      },
    });

    // 从请求头获取当前域名
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          ...community,
          formUrl: `${baseUrl}/c/${community.slug}/form`,
          listUrl: `${baseUrl}/c/${community.slug}/list`,
        },
        message: '社区创建成功',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create community:', error);
    return NextResponse.json(
      { success: false, error: '创建社区失败' },
      { status: 500 }
    );
  }
}
