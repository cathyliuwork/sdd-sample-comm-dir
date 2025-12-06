import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { memberSchema } from '@/lib/validation/member';

/**
 * PATCH /api/admin/members/[id]
 * 更新成员信息
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // 验证成员是否存在
    const existingMember = await prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return NextResponse.json(
        { success: false, error: '成员不存在' },
        { status: 404 }
      );
    }

    // 验证数据
    const validationResult = memberSchema.safeParse({
      ...body,
      communityId: existingMember.communityId, // 保持原社区ID
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

    // 更新成员
    const updatedMember = await prisma.member.update({
      where: { id },
      data: {
        name: body.name,
        location: body.location,
        profession: body.profession,
        currentWork: body.currentWork || null,
        shareTopics: body.shareTopics || null,
        seekTopics: body.seekTopics || null,
      },
      include: {
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: { member: updatedMember },
    });
  } catch (error) {
    console.error('Failed to update member:', error);
    return NextResponse.json(
      { success: false, error: '更新成员失败' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/members/[id]
 * 删除成员
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 验证成员是否存在
    const existingMember = await prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return NextResponse.json(
        { success: false, error: '成员不存在' },
        { status: 404 }
      );
    }

    // 删除成员
    await prisma.member.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '成员已删除',
    });
  } catch (error) {
    console.error('Failed to delete member:', error);
    return NextResponse.json(
      { success: false, error: '删除成员失败' },
      { status: 500 }
    );
  }
}
