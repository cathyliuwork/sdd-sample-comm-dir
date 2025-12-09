import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { memberSchema } from '@/lib/validation/member';

/**
 * GET /api/community/[slug]/members
 * 获取社区成员列表（公开API，需验证访问码）
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const accessCode = searchParams.get('accessCode');

    // 查找社区
    const community = await prisma.community.findUnique({
      where: { slug },
      select: { id: true, accessCode: true, name: true },
    });

    if (!community) {
      return NextResponse.json(
        { success: false, error: '社区不存在' },
        { status: 404 }
      );
    }

    // 验证访问码
    if (community.accessCode) {
      if (!accessCode || accessCode !== community.accessCode) {
        return NextResponse.json(
          { success: false, error: '访问码错误或未提供', requiresAccessCode: true },
          { status: 403 }
        );
      }
    }

    // 获取成员列表
    const members = await prisma.member.findMany({
      where: { communityId: community.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        location: true,
        profession: true,
        currentWork: true,
        shareTopics: true,
        seekTopics: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        communityName: community.name,
        members: members.map(m => ({
          ...m,
          createdAt: m.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json(
      { success: false, error: '获取成员列表失败' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/community/[slug]/members
 * 提交成员信息（公开API，无需认证）
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // 查找社区
    const community = await prisma.community.findUnique({
      where: { slug },
    });

    if (!community) {
      return NextResponse.json(
        { success: false, error: '社区不存在' },
        { status: 404 }
      );
    }

    // 解析和验证数据
    const body = await request.json();
    const validationResult = memberSchema.safeParse({
      ...body,
      communityId: community.id,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: '数据验证失败',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 创建成员记录
    const member = await prisma.member.create({
      data: {
        communityId: community.id,
        name: data.name.trim(),
        location: data.location.trim(),
        profession: data.profession.trim(),
        currentWork: data.currentWork?.trim() || null,
        shareTopics: data.shareTopics?.trim() || null,
        seekTopics: data.seekTopics?.trim() || null,
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
          id: member.id,
          name: member.name,
          listUrl: `${baseUrl}/c/${slug}/list`,
          shareUrl: `${baseUrl}/c/${slug}/share/${member.id}`,
        },
        message: '提交成功！',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create member:', error);
    return NextResponse.json(
      { success: false, error: '提交失败，请重试' },
      { status: 500 }
    );
  }
}
