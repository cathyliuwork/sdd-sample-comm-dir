# F-03: 社区管理

**Version**: 1.0
**Last Updated**: 2025-12-04
**Priority**: CRITICAL
**Status**: ✅ Spec Complete

---

## Quick Reference

**What**: 管理员创建、编辑、删除社区,生成社区独立的表单链接和成员展示链接。

**Why**: 支持多社区架构,每个社区拥有独立的成员数据和访问链接。

**Dependencies**:
- F-01: 数据库基础设施
- F-02: 管理员登录

**Used By**:
- F-04: 成员信息收集表单
- F-05: 分享内容生成
- F-06: 成员列表查看
- F-07: 管理员后台

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
- [F-01: 数据库基础设施](./F-01-database-infra.md) - Community 数据模型
- [F-02: 管理员登录](./F-02-admin-login.md) - 权限验证

### Required System Modules
- [S-00: 系统架构概览](../system/S-00-architecture.md) - 整体架构
- [S-03: 数据库设计](../system/S-03-database-schema.md) - Community schema
- [S-05: 多社区路由系统](../system/S-05-community-routing.md) - 路由设计

### Frontend Dependencies
- **React Hook Form** - 表单处理
- **Tailwind CSS** - UI 样式

### Backend Dependencies
- **Prisma Client** - 数据库操作
- **slugify** - 生成 URL 友好的 slug

### External Services
- 无

---

## PRD: Product Requirements

### Overview

社区管理功能允许管理员:

1. **创建社区**: 输入社区名称、描述,自动生成 slug
2. **编辑社区**: 修改社区名称和描述
3. **删除社区**: 删除社区及其所有成员数据(级联删除)
4. **生成链接**: 为每个社区生成独立的表单链接和成员列表链接
5. **查看统计**: 显示每个社区的成员数量

### User Flow

**步骤 1**: 管理员访问社区管理页面
- 用户: 登录后访问 `/admin/communities`
- 系统: 显示所有社区列表,包含社区名称、slug、成员数量、创建时间

**步骤 2**: 管理员点击"创建社区"
- 用户: 点击"创建社区"按钮
- 系统: 显示创建社区的模态框/表单

**步骤 3**: 管理员填写社区信息
- 用户: 输入社区名称(必填)、描述(可选)、访问码(可选)
- 系统: 实时预览生成的 slug(基于社区名称)
- 用户: 可选择手动输入访问码或点击"自动生成访问码"按钮

**步骤 4**: 提交创建社区
- 用户: 点击"确认创建"
- 系统: 验证数据,创建社区,生成链接,显示成功消息

**步骤 5**: 查看社区链接
- 用户: 点击社区卡片上的"查看链接"按钮
- 系统: 显示表单链接和成员列表链接,提供"复制链接"按钮

**步骤 6**: 编辑社区
- 用户: 点击社区卡片上的"编辑"按钮
- 系统: 显示编辑表单,预填充现有数据

**步骤 7**: 删除社区
- 用户: 点击"删除"按钮,确认删除操作
- 系统: 警告将删除所有成员数据,确认后执行级联删除

### UI Components

**组件 1: CommunityList**
- **位置**: `/admin/communities` 页面主体
- **用途**: 展示所有社区的网格视图
- **元素**:
  - 社区卡片(每个社区一张卡片)
  - "创建社区"按钮(页面顶部)
  - 搜索/筛选框(可选)

**组件 2: CommunityCard**
- **位置**: CommunityList 中
- **用途**: 展示单个社区的信息和操作按钮
- **元素**:
  - 社区名称(标题)
  - 社区描述(副标题)
  - 成员数量徽章
  - 创建时间
  - "查看链接"按钮
  - "编辑"按钮
  - "删除"按钮

**组件 3: CreateCommunityModal**
- **位置**: 模态框覆盖层
- **用途**: 收集新社区的信息
- **元素**:
  - 社区名称输入框(text input)
  - 社区描述文本域(textarea)
  - 访问码输入框(text input,可选)
  - "自动生成访问码"按钮
  - Slug 预览(只读,自动生成)
  - "取消"按钮
  - "创建"按钮

**组件 4: EditCommunityModal**
- **位置**: 模态框覆盖层
- **用途**: 编辑现有社区信息
- **元素**:
  - 社区名称输入框(预填充)
  - 社区描述文本域(预填充)
  - 访问码输入框(预填充,可清空表示公开访问)
  - "自动生成访问码"按钮
  - Slug 显示(只读,不可修改)
  - "取消"按钮
  - "保存"按钮

**组件 5: CommunityLinksModal**
- **位置**: 模态框覆盖层
- **用途**: 显示社区的表单链接和成员列表链接
- **元素**:
  - 表单链接(带复制按钮)
  - 成员列表链接(带复制按钮)
  - 二维码(可选)
  - "关闭"按钮

### Business Rules

1. **Slug 唯一性**: 每个社区的 slug 必须唯一,不能重复
2. **Slug 生成**: 基于社区名称自动生成,使用拼音或英文,小写加连字符
3. **级联删除**: 删除社区时自动删除所有关联的成员数据
4. **删除确认**: 删除社区前必须二次确认,并警告数据无法恢复
5. **名称长度**: 社区名称最多 100 个字符
6. **描述长度**: 社区描述最多 1000 个字符
7. **权限验证**: 仅已登录的管理员可以访问社区管理功能
8. **访问码规则**:
   - 可选字段,为空表示公开访问
   - 长度为 6-50 个字符
   - 仅包含大小写字母和数字
   - 自动生成时为 6 位随机字母数字混合

### Acceptance Criteria

- [ ] 管理员可以查看所有社区列表
- [ ] 管理员可以创建新社区(名称、描述、自动生成 slug)
- [ ] Slug 自动生成且唯一,重复时自动添加数字后缀
- [ ] 管理员可以编辑社区名称和描述
- [ ] 管理员可以删除社区(含二次确认)
- [ ] 删除社区时级联删除所有成员数据
- [ ] 社区卡片显示成员数量
- [ ] 可以查看和复制社区的表单链接和成员列表链接
- [ ] 表单验证正常工作(必填字段、长度限制)
- [ ] 移动端和桌面端 UI 均友好

---

## Technical Implementation

### API Endpoints

**端点 1: GET /api/admin/communities**

**Purpose**: 获取所有社区列表(含成员统计)

**Request**: 无 body

**Response** (Success - 200):
```typescript
interface Community {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

interface GetCommunitiesResponse {
  success: true;
  data: Community[];
}
```

**实现代码**:
```typescript
// app/api/admin/communities/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const communities = await prisma.community.findMany({
      include: {
        _count: {
          select: { members: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedCommunities = communities.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      memberCount: c._count.members,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: formattedCommunities,
    });
  } catch (error) {
    console.error('获取社区列表失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

**端点 2: POST /api/admin/communities**

**Purpose**: 创建新社区

**Request**:
```typescript
interface CreateCommunityRequest {
  name: string;
  description?: string;
  accessCode?: string; // 新增：访问码（可选）
}
```

**Response** (Success - 201):
```typescript
interface CreateCommunityResponse {
  success: true;
  data: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    formUrl: string;
    membersUrl: string;
  };
}
```

**工具函数: generateAccessCode**
```typescript
// lib/utils/accessCode.ts
export function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
```

**实现代码**:
```typescript
import slugify from 'slugify';
import { generateAccessCode } from '@/lib/utils/accessCode';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, accessCode } = body;

    // 验证必填字段
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '社区名称不能为空' },
        { status: 400 }
      );
    }

    // 验证 accessCode（如果提供）
    if (accessCode && (accessCode.length < 6 || accessCode.length > 50)) {
      return NextResponse.json(
        { success: false, error: '访问码长度必须在 6-50 个字符之间' },
        { status: 400 }
      );
    }

    if (accessCode && !/^[a-zA-Z0-9]+$/.test(accessCode)) {
      return NextResponse.json(
        { success: false, error: '访问码只能包含字母和数字' },
        { status: 400 }
      );
    }

    // 生成 slug
    let slug = slugify(name, { lower: true, strict: true });

    // 检查 slug 是否已存在,若存在则添加数字后缀
    let counter = 1;
    let uniqueSlug = slug;
    while (await prisma.community.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    // 创建社区
    const community = await prisma.community.create({
      data: {
        name: name.trim(),
        slug: uniqueSlug,
        description: description?.trim() || null,
        accessCode: accessCode?.trim() || null,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return NextResponse.json({
      success: true,
      data: {
        id: community.id,
        name: community.name,
        slug: community.slug,
        description: community.description,
        accessCode: community.accessCode,
        formUrl: `${baseUrl}/c/${community.slug}/form`,
        membersUrl: `${baseUrl}/c/${community.slug}/list`,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('创建社区失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

**端点 3: PATCH /api/admin/communities/[id]**

**Purpose**: 更新社区信息

**Request**:
```typescript
interface UpdateCommunityRequest {
  name?: string;
  description?: string;
  accessCode?: string; // 新增：访问码（可选，传 null 或空字符串表示移除访问码）
}
```

**Response** (Success - 200):
```typescript
interface UpdateCommunityResponse {
  success: true;
  data: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    accessCode: string | null;
  };
}
```

**端点 4: DELETE /api/admin/communities/[id]**

**Purpose**: 删除社区(级联删除所有成员)

**Request**: 无 body

**Response** (Success - 200):
```typescript
interface DeleteCommunityResponse {
  success: true;
  message: string;
  deletedMemberCount: number;
}
```

**实现代码**:
```typescript
// app/api/admin/communities/[id]/route.ts
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 获取成员数量(用于返回)
    const memberCount = await prisma.member.count({
      where: { communityId: id },
    });

    // 删除社区(Prisma 自动级联删除成员)
    await prisma.community.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '社区已删除',
      deletedMemberCount: memberCount,
    });
  } catch (error) {
    console.error('删除社区失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

### Database Schema

使用 F-01 定义的 Community 模型,无需额外表。

### Frontend Components

**组件 1: CommunityList**

**文件路径**: `src/app/admin/communities/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  memberCount: number;
  createdAt: string;
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await fetch('/api/admin/communities');
      const data = await response.json();
      if (data.success) {
        setCommunities(data.data);
      }
    } catch (error) {
      console.error('获取社区失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>加载中...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">社区管理</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          创建社区
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            onUpdate={fetchCommunities}
          />
        ))}
      </div>

      {showCreateModal && (
        <CreateCommunityModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchCommunities}
        />
      )}
    </div>
  );
}
```

**组件 2: CreateCommunityModal**

**文件路径**: `src/components/admin/CreateCommunityModal.tsx`

```typescript
'use client';

import { useState } from 'react';
import slugify from 'slugify';

interface CreateCommunityModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCommunityModal({
  onClose,
  onSuccess,
}: CreateCommunityModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewSlug = name ? slugify(name, { lower: true, strict: true }) : '';

  const handleGenerateAccessCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setAccessCode(code);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/admin/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, accessCode: accessCode || null }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('网络错误,请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">创建社区</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              社区名称 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              社区描述
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              maxLength={1000}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              访问码 (可选)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="留空表示公开访问"
                maxLength={50}
              />
              <button
                type="button"
                onClick={handleGenerateAccessCode}
                className="px-3 py-2 bg-gray-100 border rounded-md hover:bg-gray-200"
              >
                自动生成
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              为空表示公开访问，不为空则需要访问码才能查看成员列表
            </p>
          </div>

          {previewSlug && (
            <div>
              <label className="block text-sm font-medium mb-1">
                URL Slug (自动生成)
              </label>
              <input
                type="text"
                value={previewSlug}
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
                readOnly
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '创建中...' : '创建'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### State Management

无需全局状态管理(组件内部状态 + API 调用)

---

## Tests

### Tier 1 Critical Path Test

**测试名称**: `社区管理 - 创建和删除社区`

**描述**: 验证管理员可以创建社区并生成链接,以及删除社区时级联删除成员

**前置条件**:
- 管理员已登录
- 数据库已初始化

**测试步骤**:
1. 访问 `/admin/communities`
2. 点击"创建社区"按钮
3. 输入社区名称"测试社区"
4. 输入社区描述"这是测试社区"
5. 验证 slug 预览显示"ce-shi-she-qu"
6. 点击"创建"按钮
7. 验证社区创建成功,显示在列表中
8. 验证成员数量显示为 0
9. 点击"查看链接"按钮
10. 验证表单链接和成员列表链接正确生成
11. 点击"删除"按钮,确认删除
12. 验证社区从列表中移除

**预期结果**:
- 社区创建成功
- Slug 自动生成且唯一
- 链接正确生成
- 删除成功且级联删除成员

**失败影响**: ❌ **阻止部署** (Tier 1 测试必须通过)

---

### E2E Tests

**测试 1: 创建社区**
```typescript
import { test, expect } from '@playwright/test';

test('管理员可以创建社区', async ({ page }) => {
  // 登录
  await page.goto('/admin/login');
  await page.fill('[data-testid="username-input"]', 'admin');
  await page.fill('[data-testid="password-input"]', 'password');
  await page.click('[data-testid="login-button"]');

  // 访问社区管理页面
  await page.goto('/admin/communities');

  // 点击创建社区
  await page.click('[data-testid="create-community-button"]');

  // 填写表单
  await page.fill('[data-testid="community-name-input"]', '测试社区');
  await page.fill('[data-testid="community-description-input"]', '测试描述');
  await page.fill('[data-testid="access-code-input"]', 'test123');

  // 验证 slug 预览
  const slugPreview = await page.locator('[data-testid="slug-preview"]').inputValue();
  expect(slugPreview).toContain('ce-shi-she-qu');

  // 提交表单
  await page.click('[data-testid="submit-create-button"]');

  // 验证社区出现在列表中
  await expect(page.locator('text=测试社区')).toBeVisible();
});

test('管理员可以自动生成访问码', async ({ page }) => {
  await page.goto('/admin/communities');
  await page.click('[data-testid="create-community-button"]');

  // 点击自动生成按钮
  await page.click('[data-testid="generate-access-code-button"]');

  // 验证访问码已生成（6位字母数字）
  const accessCode = await page.locator('[data-testid="access-code-input"]').inputValue();
  expect(accessCode).toHaveLength(6);
  expect(accessCode).toMatch(/^[a-zA-Z0-9]{6}$/);
});
```

**测试 2: 删除社区**
```typescript
test('删除社区应该级联删除成员', async ({ page }) => {
  // 创建社区和成员的测试数据...

  await page.goto('/admin/communities');

  // 点击删除按钮
  await page.click('[data-testid="delete-community-button"]');

  // 确认删除
  await page.click('[data-testid="confirm-delete-button"]');

  // 验证社区被删除
  await expect(page.locator('text=测试社区')).not.toBeVisible();
});
```

### Integration Tests

```typescript
describe('Community API', () => {
  it('应该创建社区并生成唯一 slug', async () => {
    const response = await fetch('/api/admin/communities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '测试社区' }),
    });

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.slug).toBeDefined();
    expect(data.data.formUrl).toContain(data.data.slug);
  });
});
```

### Unit Tests

```typescript
describe('Slug Generation', () => {
  it('应该生成 URL 友好的 slug', () => {
    const slug = slugify('测试社区', { lower: true, strict: true });
    expect(slug).toBe('ce-shi-she-qu');
  });
});
```

---

## Notes

### Future Enhancements

- **社区分类**: 添加社区分类/标签功能
- **社区模板**: 提供社区创建模板(快速复制配置)
- **批量操作**: 批量删除或导出社区数据
- **二维码生成**: 为社区链接自动生成二维码

### Known Limitations

- **Slug 不可修改**: 创建后 slug 无法修改(避免链接失效)
- **删除不可恢复**: 删除社区后数据无法恢复

### References

- [slugify Documentation](https://github.com/simov/slugify)
- [Prisma Cascading Deletes](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions#cascade)

---

**Related Documents**:
- [S-00: 系统架构概览](../system/S-00-architecture.md)
- [S-03: 数据库设计](../system/S-03-database-schema.md)
- [S-05: 多社区路由系统](../system/S-05-community-routing.md)
- [F-01: 数据库基础设施](./F-01-database-infra.md)
- [F-02: 管理员登录](./F-02-admin-login.md)
- [F-04: 成员信息收集表单](./F-04-member-form.md)
