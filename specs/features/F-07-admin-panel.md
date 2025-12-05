# F-07: 管理员后台

**Version**: 1.0
**Last Updated**: 2025-12-04
**Priority**: HIGH
**Status**: ✅ Spec Complete

---

## Quick Reference

**What**: 管理员查看所有社区成员总表,支持按社区筛选、编辑、删除成员,导出数据。

**Why**: 为管理员提供集中的数据管理界面,方便维护和分析成员信息。

**Dependencies**:
- F-01: 数据库基础设施
- F-02: 管理员登录
- F-03: 社区管理
- F-04: 成员信息收集表单

**Used By**:
- 无(终端功能)

**Implementation Status**:
- [ ] PRD 已文档化
- [ ] 技术设计已完成
- [ ] 测试已定义
- [ ] 实施已开始
- [ ] 实施已完成
- [ ] 测试已通过
- [ ] 已部署到生产环境

---

## Dependencies

### Required Features
- [F-01: 数据库基础设施](./F-01-database-infra.md) - Member 数据模型
- [F-02: 管理员登录](./F-02-admin-login.md) - 权限验证
- [F-03: 社区管理](./F-03-community-management.md) - 社区数据
- [F-04: 成员信息收集表单](./F-04-member-form.md) - 成员数据来源

### Required System Modules
- [S-00: 系统架构概览](../system/S-00-architecture.md) - 整体架构
- [S-03: 数据库设计](../system/S-03-database-schema.md) - Member schema
- [S-04: 认证系统](../system/S-04-authentication.md) - 管理员认证

### Frontend Dependencies
- **React Table** - 表格组件
- **date-fns** - 日期格式化
- **Tailwind CSS** - UI 样式

### Backend Dependencies
- **Prisma Client** - 数据库操作
- **csv-stringify** - CSV 导出

### External Services
- 无

---

## PRD: Product Requirements

### Overview

管理员后台提供成员数据的集中管理:

1. **总表视图**: 显示所有社区的成员数据(表格形式)
2. **社区筛选**: 下拉菜单筛选特定社区的成员
3. **成员编辑**: 点击编辑按钮修改成员信息
4. **成员删除**: 删除单个成员(含确认)
5. **数据导出**: 导出 CSV 格式的成员数据
6. **分页**: 表格支持分页,每页 50 条

### User Flow

**步骤 1**: 管理员访问后台
- 用户: 登录后访问 `/admin/dashboard` 或 `/admin/members`
- 系统: 显示所有成员总表(表格视图)

**步骤 2**: 查看成员数据
- 用户: 浏览表格,查看所有成员信息
- 系统: 显示成员姓名、所在地、职业、所属社区、加入时间

**步骤 3**: 按社区筛选
- 用户: 在顶部下拉菜单选择特定社区
- 系统: 过滤表格,仅显示该社区的成员

**步骤 4**: 编辑成员信息
- 用户: 点击成员行的"编辑"按钮
- 系统: 显示编辑模态框,预填充成员数据

**步骤 5**: 保存编辑
- 用户: 修改信息后点击"保存"
- 系统: 验证数据,更新数据库,刷新表格

**步骤 6**: 删除成员
- 用户: 点击"删除"按钮,确认操作
- 系统: 删除成员,刷新表格

**步骤 7**: 导出数据
- 用户: 点击"导出 CSV"按钮
- 系统: 生成 CSV 文件,触发浏览器下载

### UI Components

**组件 1: AdminDashboard**
- **位置**: `/admin/dashboard` 页面
- **用途**: 管理员后台主页,显示统计数据
- **元素**:
  - 欢迎标题
  - 统计卡片(总社区数、总成员数、今日新增)
  - "管理社区"按钮(跳转到社区管理)
  - "管理成员"按钮(跳转到成员总表)

**组件 2: MemberManagementPage**
- **位置**: `/admin/members` 页面
- **用途**: 成员总表和管理操作
- **元素**:
  - 页面标题"成员管理"
  - 社区筛选下拉菜单
  - "导出 CSV"按钮
  - 成员数据表格(响应式)
  - 分页控件(上一页、下一页、页码)

**组件 3: MemberTable**
- **位置**: MemberManagementPage 中
- **用途**: 展示成员数据的表格
- **元素**:
  - 表头(姓名、所在地、职业、社区、加入时间、操作)
  - 数据行(每个成员一行)
  - "编辑"按钮(每行)
  - "删除"按钮(每行,红色)

**组件 4: EditMemberModal**
- **位置**: 模态框覆盖层
- **用途**: 编辑成员信息
- **元素**:
  - 所有表单字段(姓名、所在地、职业、选填字段)
  - 预填充现有数据
  - "取消"按钮
  - "保存"按钮

**组件 5: DeleteConfirmDialog**
- **位置**: 模态框覆盖层
- **用途**: 确认删除操作
- **元素**:
  - 警告图标
  - "确定要删除该成员吗?"提示
  - 成员姓名显示
  - "取消"按钮
  - "删除"按钮(红色)

### Business Rules

1. **权限验证**: 仅已登录的管理员可访问
2. **分页大小**: 每页显示 50 条成员
3. **筛选逻辑**: 选择"全部社区"显示所有成员
4. **编辑验证**: 编辑时验证字段格式和长度
5. **删除确认**: 删除前必须二次确认
6. **CSV 格式**: 导出所有字段,使用 UTF-8 编码
7. **排序**: 默认按加入时间倒序

### Acceptance Criteria

- [ ] 管理员可以查看所有成员总表
- [ ] 表格显示成员的所有关键信息
- [ ] 可以按社区筛选成员
- [ ] 可以编辑成员信息(所有字段)
- [ ] 编辑保存后数据正确更新
- [ ] 可以删除成员(含确认对话框)
- [ ] 删除后成员从列表中移除
- [ ] 可以导出 CSV 文件
- [ ] CSV 文件包含所有成员数据
- [ ] 分页功能正常工作
- [ ] 移动端显示友好(响应式表格)

---

## Technical Implementation

### API Endpoints

**端点 1: GET /api/admin/members**

**Purpose**: 获取所有成员(支持社区筛选和分页)

**Request** (Query Parameters):
```typescript
interface GetAdminMembersQuery {
  communityId?: string; // 可选,筛选特定社区
  page?: number; // 页码,默认 1
  limit?: number; // 每页数量,默认 50
}
```

**Response** (Success - 200):
```typescript
interface AdminMember {
  id: string;
  name: string;
  location: string;
  profession: string;
  currentWork: string | null;
  shareTopics: string | null;
  seekTopics: string | null;
  createdAt: string;
  communityId: string;
  communityName: string;
  communitySlug: string;
}

interface GetAdminMembersResponse {
  success: true;
  data: {
    members: AdminMember[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

**实现代码**:
```typescript
// app/api/admin/members/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const communityId = searchParams.get('communityId') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // 构建查询条件
    const where = communityId ? { communityId } : {};

    // 获取总数
    const total = await prisma.member.count({ where });

    // 分页查询
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
      skip: (page - 1) * limit,
      take: limit,
    });

    const formattedMembers = members.map((m) => ({
      id: m.id,
      name: m.name,
      location: m.location,
      profession: m.profession,
      currentWork: m.currentWork,
      shareTopics: m.shareTopics,
      seekTopics: m.seekTopics,
      createdAt: m.createdAt.toISOString(),
      communityId: m.community.id,
      communityName: m.community.name,
      communitySlug: m.community.slug,
    }));

    return NextResponse.json({
      success: true,
      data: {
        members: formattedMembers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('获取成员失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

**端点 2: PATCH /api/admin/members/[id]**

**Purpose**: 更新成员信息

**Request**:
```typescript
interface UpdateMemberRequest {
  name?: string;
  location?: string;
  profession?: string;
  currentWork?: string | null;
  shareTopics?: string | null;
  seekTopics?: string | null;
}
```

**Response** (Success - 200):
```typescript
interface UpdateMemberResponse {
  success: true;
  data: AdminMember;
}
```

**实现代码**:
```typescript
// app/api/admin/members/[id]/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const updated = await prisma.member.update({
      where: { id },
      data: {
        name: body.name?.trim(),
        location: body.location?.trim(),
        profession: body.profession?.trim(),
        currentWork: body.currentWork?.trim() || null,
        shareTopics: body.shareTopics?.trim() || null,
        seekTopics: body.seekTopics?.trim() || null,
      },
      include: {
        community: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        name: updated.name,
        location: updated.location,
        profession: updated.profession,
        currentWork: updated.currentWork,
        shareTopics: updated.shareTopics,
        seekTopics: updated.seekTopics,
        createdAt: updated.createdAt.toISOString(),
        communityId: updated.community.id,
        communityName: updated.community.name,
        communitySlug: updated.community.slug,
      },
    });
  } catch (error) {
    console.error('更新成员失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

**端点 3: DELETE /api/admin/members/[id]**

**Purpose**: 删除成员

**Request**: 无 body

**Response** (Success - 200):
```typescript
interface DeleteMemberResponse {
  success: true;
  message: string;
}
```

**端点 4: GET /api/admin/members/export**

**Purpose**: 导出 CSV 文件

**Request** (Query Parameters):
```typescript
interface ExportQuery {
  communityId?: string; // 可选,筛选特定社区
}
```

**Response**: CSV 文件(Content-Type: text/csv)

**实现代码**:
```typescript
// app/api/admin/members/export/route.ts
import { stringify } from 'csv-stringify/sync';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const communityId = searchParams.get('communityId') || undefined;

    const where = communityId ? { communityId } : {};

    const members = await prisma.member.findMany({
      where,
      include: {
        community: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 转换为 CSV
    const csvData = stringify(
      members.map((m) => ({
        姓名: m.name,
        所在地: m.location,
        '职业/行业': m.profession,
        正在做的事情: m.currentWork || '',
        希望分享的内容: m.shareTopics || '',
        希望收获的内容: m.seekTopics || '',
        所属社区: m.community.name,
        加入时间: m.createdAt.toISOString(),
      })),
      {
        header: true,
        columns: [
          '姓名',
          '所在地',
          '职业/行业',
          '正在做的事情',
          '希望分享的内容',
          '希望收获的内容',
          '所属社区',
          '加入时间',
        ],
      }
    );

    // 添加 UTF-8 BOM(确保 Excel 正确识别中文)
    const bom = '\uFEFF';
    const csvWithBom = bom + csvData;

    return new NextResponse(csvWithBom, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="members-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('导出失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

**端点 5: GET /api/admin/stats**

**Purpose**: 获取统计数据(用于 Dashboard)

**Response** (Success - 200):
```typescript
interface StatsResponse {
  success: true;
  data: {
    totalCommunities: number;
    totalMembers: number;
    todayNewMembers: number;
  };
}
```

### Database Schema

使用 F-01 定义的 Member 和 Community 模型。

### Frontend Components

**组件 1: MemberManagementPage**

**文件路径**: `src/app/admin/members/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function MemberManagementPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
    fetchMembers();
  }, [selectedCommunity, page]);

  const fetchCommunities = async () => {
    const response = await fetch('/api/admin/communities');
    const data = await response.json();
    if (data.success) {
      setCommunities(data.data);
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    const url = `/api/admin/members?page=${page}&limit=50${
      selectedCommunity ? `&communityId=${selectedCommunity}` : ''
    }`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      setMembers(data.data.members);
      setTotalPages(data.data.pagination.totalPages);
    }
    setLoading(false);
  };

  const handleExport = () => {
    const url = `/api/admin/members/export${
      selectedCommunity ? `?communityId=${selectedCommunity}` : ''
    }`;
    window.location.href = url;
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除该成员吗?')) return;

    await fetch(`/api/admin/members/${id}`, { method: 'DELETE' });
    fetchMembers();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">成员管理</h1>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          导出 CSV
        </button>
      </div>

      {/* 筛选 */}
      <div className="mb-4">
        <select
          value={selectedCommunity}
          onChange={(e) => {
            setSelectedCommunity(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">全部社区</option>
          {communities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.memberCount} 人)
            </option>
          ))}
        </select>
      </div>

      {/* 表格 */}
      {loading ? (
        <div>加载中...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">姓名</th>
                <th className="px-4 py-3 text-left">所在地</th>
                <th className="px-4 py-3 text-left">职业</th>
                <th className="px-4 py-3 text-left">社区</th>
                <th className="px-4 py-3 text-left">加入时间</th>
                <th className="px-4 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="px-4 py-3">{member.name}</td>
                  <td className="px-4 py-3">{member.location}</td>
                  <td className="px-4 py-3">{member.profession}</td>
                  <td className="px-4 py-3">{member.communityName}</td>
                  <td className="px-4 py-3">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-blue-600 hover:underline mr-3">
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:underline"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 分页 */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          上一页
        </button>
        <span className="px-4 py-2">
          第 {page} / {totalPages} 页
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          下一页
        </button>
      </div>
    </div>
  );
}
```

### State Management

无需全局状态管理(组件内部状态)

---

## Tests

### Tier 1 Critical Path Test

**测试名称**: `管理员后台 - 成员管理`

**描述**: 验证管理员可以查看、编辑、删除成员,并导出数据

**前置条件**:
- 管理员已登录
- 至少有 2 个社区和 10 个成员

**测试步骤**:
1. 访问 `/admin/members`
2. 验证成员总表显示
3. 验证表格包含所有成员
4. 选择特定社区筛选
5. 验证仅显示该社区的成员
6. 点击某个成员的"编辑"按钮
7. 修改成员姓名,保存
8. 验证表格中姓名已更新
9. 点击"删除"按钮,确认删除
10. 验证成员从表格中移除
11. 点击"导出 CSV"按钮
12. 验证 CSV 文件下载成功

**预期结果**:
- 成员总表正确显示
- 筛选功能正常
- 编辑保存成功
- 删除功能正常
- CSV 导出成功

**失败影响**: ❌ **阻止部署** (Tier 1 测试必须通过)

---

### E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test('管理员可以查看和管理成员', async ({ page }) => {
  // 登录
  await page.goto('/admin/login');
  await page.fill('[data-testid="username-input"]', 'admin');
  await page.fill('[data-testid="password-input"]', 'password');
  await page.click('[data-testid="login-button"]');

  // 访问成员管理
  await page.goto('/admin/members');

  // 验证表格显示
  await expect(page.locator('table')).toBeVisible();
  await expect(page.locator('tbody tr')).not.toHaveCount(0);

  // 筛选社区
  await page.selectOption('select', { index: 1 });
  await page.waitForTimeout(500);

  // 验证筛选结果
  await expect(page.locator('tbody tr')).not.toHaveCount(0);
});
```

### Integration Tests

```typescript
describe('Admin Members API', () => {
  it('应该返回所有成员', async () => {
    const response = await fetch('/api/admin/members');
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(Array.isArray(data.data.members)).toBe(true);
  });

  it('应该按社区筛选成员', async () => {
    const response = await fetch('/api/admin/members?communityId=test-id');
    const data = await response.json();

    expect(data.success).toBe(true);
    data.data.members.forEach((m: any) => {
      expect(m.communityId).toBe('test-id');
    });
  });
});
```

### Unit Tests

```typescript
describe('CSV Export', () => {
  it('应该生成正确的 CSV 格式', () => {
    const members = [
      { name: '张三', location: '北京', profession: '工程师' },
    ];

    const csv = stringify(members, { header: true });
    expect(csv).toContain('姓名');
    expect(csv).toContain('张三');
  });
});
```

---

## Notes

### Future Enhancements

- **批量操作**: 支持批量删除、批量编辑
- **高级筛选**: 按日期范围、关键词搜索
- **数据分析**: 成员增长趋势图表
- **Excel 导出**: 支持 .xlsx 格式导出

### Known Limitations

- **CSV 编码**: 需要 UTF-8 BOM 确保 Excel 正确显示中文
- **大数据量**: 超过 1000 条记录时表格性能可能下降

### References

- [csv-stringify Documentation](https://csv.js.org/stringify/)
- [Prisma Filtering](https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting)

---

**Related Documents**:
- [S-00: 系统架构概览](../system/S-00-architecture.md)
- [S-03: 数据库设计](../system/S-03-database-schema.md)
- [S-04: 认证系统](../system/S-04-authentication.md)
- [F-01: 数据库基础设施](./F-01-database-infra.md)
- [F-02: 管理员登录](./F-02-admin-login.md)
- [F-03: 社区管理](./F-03-community-management.md)
- [F-04: 成员信息收集表单](./F-04-member-form.md)
