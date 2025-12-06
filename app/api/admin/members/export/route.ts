import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/admin/members/export
 * 导出所有成员数据为 CSV
 */
export async function GET(request: NextRequest) {
  try {
    // 获取所有成员
    const members = await prisma.member.findMany({
      include: {
        community: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 构建 CSV 内容
    const headers = [
      'ID',
      '姓名',
      '所在地',
      '职业/行业',
      '正在做的事情',
      '希望分享的内容',
      '希望收获的内容',
      '所属社区',
      '加入时间',
    ];

    const rows = members.map((member) => [
      member.id,
      member.name,
      member.location,
      member.profession,
      member.currentWork || '',
      member.shareTopics || '',
      member.seekTopics || '',
      member.community.name,
      new Date(member.createdAt).toISOString(),
    ]);

    // 转换为 CSV 格式（处理特殊字符和换行）
    const escapeCsvValue = (value: string) => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const csv = [
      headers.map(escapeCsvValue).join(','),
      ...rows.map((row) => row.map(escapeCsvValue).join(',')),
    ].join('\n');

    // 添加 UTF-8 BOM 以支持 Excel 正确显示中文
    const bom = '\uFEFF';
    const csvWithBom = bom + csv;

    // 返回 CSV 文件
    return new Response(csvWithBom, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="members-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Failed to export members:', error);
    return NextResponse.json(
      { success: false, error: '导出失败' },
      { status: 500 }
    );
  }
}
