import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

/**
 * PATCH /api/admin/communities/[id]
 * 更新社区信息
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { id } = params;
    const body = await request.json();
    const { name, description, accessCode } = body;

    const community = await prisma.community.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(accessCode !== undefined && { accessCode: accessCode?.trim() || null }),
      },
    });

    return NextResponse.json({
      success: true,
      data: community,
      message: '社区更新成功',
    });
  } catch (error) {
    console.error('Failed to update community:', error);
    return NextResponse.json(
      { success: false, error: '更新社区失败' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/communities/[id]
 * 删除社区（级联删除成员）
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { id } = params;

    await prisma.community.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '社区删除成功',
    });
  } catch (error) {
    console.error('Failed to delete community:', error);
    return NextResponse.json(
      { success: false, error: '删除社区失败' },
      { status: 500 }
    );
  }
}
