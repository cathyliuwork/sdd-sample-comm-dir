# F-04: 成员信息收集表单

**Version**: 1.0
**Last Updated**: 2025-12-04
**Priority**: CRITICAL
**Status**: ✅ Spec Complete

---

## Quick Reference

**What**: 普通用户填写成员信息的表单页面,无需登录即可访问,按社区独立收集。

**Why**: 收集社区成员的结构化信息,方便后续展示和分享。

**Dependencies**:
- F-01: 数据库基础设施
- F-03: 社区管理

**Used By**:
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
- [F-01: 数据库基础设施](./F-01-database-infra.md) - Member 数据模型
- [F-03: 社区管理](./F-03-community-management.md) - 社区 slug 路由

### Required System Modules
- [S-00: 系统架构概览](../system/S-00-architecture.md) - 整体架构
- [S-01: UI/UX 设计系统](../system/S-01-uiux-design.md) - 移动端设计
- [S-03: 数据库设计](../system/S-03-database-schema.md) - Member schema
- [S-05: 多社区路由系统](../system/S-05-community-routing.md) - 路由设计

### Frontend Dependencies
- **React Hook Form** - 表单处理和验证
- **Tailwind CSS** - UI 样式

### Backend Dependencies
- **Prisma Client** - 数据库操作
- **Zod** - 数据验证

### External Services
- 无(不依赖外部服务)

---

## PRD: Product Requirements

### Overview

成员信息收集表单是普通用户参与社区的入口:

1. **公开访问**: 无需登录,通过社区 slug 访问独立表单
2. **6 个字段**: 3 个必填(姓名、所在地、职业/行业) + 3 个选填(正在做的事情、希望分享的内容、希望收获的内容)
3. **表单验证**: 前端和后端双重验证,确保数据完整性
4. **提交反馈**: 提交成功后显示成功消息,并提供"查看成员列表"和"生成分享内容"链接
5. **移动优先**: 针对微信浏览器优化,单列布局,大触控区域

### User Flow

**步骤 1**: 用户打开表单链接
- 用户: 在微信群点击表单链接 `/c/[slug]/form`
- 系统: 在微信浏览器中打开表单页面,显示页面标题"{社区名称} - 成员分享表"和表单

**步骤 2**: 用户填写必填字段
- 用户: 输入姓名、所在地、职业/行业
- 系统: 实时验证字段格式(非空、长度限制)

**步骤 3**: 用户填写选填字段(可选)
- 用户: 填写正在做的事情、希望分享的内容、希望收获的内容
- 系统: 无强制要求,用户可跳过

**步骤 4**: 用户提交表单
- 用户: 点击"提交"按钮
- 系统: 前端验证通过,显示加载状态,发送 POST 请求到 API

**步骤 5**: 后端验证和保存
- 用户: 等待响应
- 系统: 后端验证数据,保存到数据库,返回成功响应

**步骤 6**: 显示成功反馈
- 用户: 看到成功消息和后续操作按钮
- 系统: 显示"提交成功!"消息,"查看成员列表"按钮,"生成分享内容"按钮
- 系统: 页面底部显示 Footer,提示"填写完成后,可查看所有成员信息"并提供链接

**步骤 7**: 用户查看成员列表或生成分享
- 用户: 点击"查看成员列表"跳转到 `/c/[slug]/list`
- 用户: 或点击"生成分享内容"跳转到 `/c/[slug]/share`
- 用户: 或点击 Footer 中的链接查看成员列表

### UI Components

**组件 1: CommunityPageHeader**
- **位置**: `/c/[slug]/form` 页面顶部
- **用途**: 显示社区名称和页面标题
- **元素**:
  - 页面标题: "{社区名称} - 成员分享表"
  - 带边框的头部容器

**组件 2: MemberForm**
- **位置**: `/c/[slug]/form` 页面主体
- **用途**: 收集成员信息的表单
- **元素**:
  - 表单说明文本
  - 姓名输入框(text input,必填,红色星号)
  - 所在地输入框(text input,必填,红色星号)
  - 职业/行业输入框(text input,必填,红色星号)
  - 正在做的事情文本域(textarea,选填,占位符提示)
  - 希望分享的内容文本域(textarea,选填)
  - 希望收获的内容文本域(textarea,选填)
  - "提交"按钮(全宽,蓝色,loading 状态)
  - 错误提示区域(红色背景,显示验证错误)

**组件 3: CommunityFormFooter**
- **位置**: `/c/[slug]/form` 页面底部
- **用途**: 提供查看成员列表的引导
- **元素**:
  - 提示文字: "填写完成后,可查看所有成员信息"
  - 链接: "点击查看社区成员列表"
  - 带边框的 Footer 容器

**组件 4: FormField**
- **位置**: MemberForm 中
- **用途**: 可复用的表单字段组件
- **元素**:
  - 字段标签(label,含必填星号)
  - 输入框或文本域
  - 错误消息(红色文本)
  - 字符计数器(显示剩余字符)

**组件 5: SuccessMessage**
- **位置**: 表单提交成功后替换表单
- **用途**: 显示成功反馈和后续操作
- **元素**:
  - 成功图标(绿色勾选)
  - "提交成功!"标题
  - 感谢消息
  - "查看成员列表"按钮(链接到成员列表页)
  - "生成分享内容"按钮(链接到分享页)
  - "再提交一个"按钮(重置表单)

### Business Rules

1. **必填字段验证**: 姓名、所在地、职业/行业必须填写
2. **字段长度限制**:
   - 姓名: 最多 100 字符
   - 所在地: 最多 100 字符
   - 职业/行业: 最多 200 字符
   - 选填文本域: 最多 1000 字符
3. **社区验证**: 表单提交前验证社区 slug 是否存在
4. **重复提交**: 允许同一用户多次提交(不阻止)
5. **数据清洗**: 去除首尾空格,空字符串转为 null
6. **移动端优化**: 文本输入框最小高度 44px,方便触控

### Acceptance Criteria

- [ ] 表单可以通过 `/c/[slug]/form` 访问
- [ ] 无效的 slug 显示 404 错误
- [ ] 表单显示社区名称
- [ ] 必填字段标记清晰(红色星号)
- [ ] 前端验证即时生效(失焦时验证)
- [ ] 后端验证拒绝无效数据
- [ ] 提交成功显示成功消息
- [ ] 成功后提供"查看成员列表"和"生成分享"链接
- [ ] 移动端布局友好,单列堆叠
- [ ] 加载状态显示正确(按钮禁用 + spinner)
- [ ] 网络错误友好提示

---

## Technical Implementation

### API Endpoints

**端点 1: GET /api/community/[slug]/info**

**Purpose**: 获取社区基本信息(用于表单页面显示社区名称)

**Request**: 无 body

**Response** (Success - 200):
```typescript
interface CommunityInfoResponse {
  success: true;
  data: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  };
}
```

**Response** (Error - 404):
```typescript
interface ErrorResponse {
  success: false;
  error: string; // '社区不存在'
}
```

**端点 2: POST /api/community/[slug]/members**

**Purpose**: 提交成员信息

**Request**:
```typescript
interface CreateMemberRequest {
  name: string; // 必填
  location: string; // 必填
  profession: string; // 必填
  currentWork?: string; // 选填
  shareTopics?: string; // 选填
  seekTopics?: string; // 选填
}
```

**Response** (Success - 201):
```typescript
interface CreateMemberResponse {
  success: true;
  data: {
    id: string;
    name: string;
    communitySlug: string;
    memberListUrl: string;
    shareUrl: string;
  };
  message: string;
}
```

**Response** (Error - 400):
```typescript
interface ValidationErrorResponse {
  success: false;
  error: string;
  details?: {
    field: string;
    message: string;
  }[];
}
```

**实现代码**:
```typescript
// app/api/community/[slug]/members/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

// Zod 验证 schema
const memberSchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(100, '姓名最多100个字符'),
  location: z.string().min(1, '所在地不能为空').max(100, '所在地最多100个字符'),
  profession: z.string().min(1, '职业/行业不能为空').max(200, '职业/行业最多200个字符'),
  currentWork: z.string().max(1000, '内容最多1000个字符').optional(),
  shareTopics: z.string().max(1000, '内容最多1000个字符').optional(),
  seekTopics: z.string().max(1000, '内容最多1000个字符').optional(),
});

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

    // 解析请求体
    const body = await request.json();

    // Zod 验证
    const validationResult = memberSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: '数据验证失败',
          details: validationResult.error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 创建成员
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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return NextResponse.json(
      {
        success: true,
        data: {
          id: member.id,
          name: member.name,
          communitySlug: slug,
          memberListUrl: `${baseUrl}/c/${slug}/list`,
          shareUrl: `${baseUrl}/c/${slug}/share/${member.id}`,
        },
        message: '提交成功!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建成员失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误,请稍后重试' },
      { status: 500 }
    );
  }
}
```

### Database Schema

使用 F-01 定义的 Member 模型,无需额外表。

### Frontend Components

**组件 1: MemberFormPage**

**文件路径**: `src/app/c/[slug]/form/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MemberForm from '@/components/community/MemberForm';
import SuccessMessage from '@/components/community/SuccessMessage';

export default function MemberFormPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [community, setCommunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [memberData, setMemberData] = useState<any>(null);

  useEffect(() => {
    fetchCommunity();
  }, [slug]);

  const fetchCommunity = async () => {
    try {
      const response = await fetch(`/api/community/${slug}/info`);
      const data = await response.json();

      if (data.success) {
        setCommunity(data.data);
      } else {
        // 社区不存在,显示 404
        setCommunity(null);
      }
    } catch (error) {
      console.error('获取社区信息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSuccess = (data: any) => {
    setMemberData(data);
    setSubmitted(true);
  };

  if (loading) {
    return <div className="p-6 text-center">加载中...</div>;
  }

  if (!community) {
    return <div className="p-6 text-center">社区不存在</div>;
  }

  if (submitted && memberData) {
    return (
      <SuccessMessage
        communityName={community.name}
        memberName={memberData.name}
        memberListUrl={memberData.memberListUrl}
        shareUrl={memberData.shareUrl}
        onReset={() => setSubmitted(false)}
      />
    );
  }

  return (
    <>
      <CommunityPageHeader communityName={community.name} />

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 text-center mb-6">
              {community.description || '欢迎加入我们的社区!'}
            </p>

            <MemberForm
              communitySlug={slug}
              onSuccess={handleSubmitSuccess}
            />
          </div>
        </div>
      </div>

      <CommunityFormFooter
        membersListUrl={`/c/${slug}/list`}
      />
    </>
  );
}
```

**组件 2: MemberForm**

**文件路径**: `src/components/community/MemberForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface MemberFormProps {
  communitySlug: string;
  onSuccess: (data: any) => void;
}

interface FormData {
  name: string;
  location: string;
  profession: string;
  currentWork?: string;
  shareTopics?: string;
  seekTopics?: string;
}

export default function MemberForm({
  communitySlug,
  onSuccess,
}: MemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/community/${communitySlug}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result.data);
      } else {
        setError(result.error || '提交失败,请稍后重试');
      }
    } catch (err) {
      setError('网络错误,请检查连接后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 姓名 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          姓名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name', {
            required: '姓名不能为空',
            maxLength: { value: 100, message: '姓名最多100个字符' },
          })}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="请输入您的姓名"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* 所在地 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          所在地 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('location', {
            required: '所在地不能为空',
            maxLength: { value: 100, message: '所在地最多100个字符' },
          })}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="例如: 北京"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* 职业/行业 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          职业/行业 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('profession', {
            required: '职业/行业不能为空',
            maxLength: { value: 200, message: '职业/行业最多200个字符' },
          })}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="例如: 软件工程师"
        />
        {errors.profession && (
          <p className="text-red-500 text-sm mt-1">{errors.profession.message}</p>
        )}
      </div>

      {/* 正在做的事情(选填) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          正在做的事情(选填)
        </label>
        <textarea
          {...register('currentWork', {
            maxLength: { value: 1000, message: '内容最多1000个字符' },
          })}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="例如: 正在开发一个开源项目"
        />
        {errors.currentWork && (
          <p className="text-red-500 text-sm mt-1">{errors.currentWork.message}</p>
        )}
      </div>

      {/* 希望分享的内容(选填) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          希望分享的内容(选填)
        </label>
        <textarea
          {...register('shareTopics', {
            maxLength: { value: 1000, message: '内容最多1000个字符' },
          })}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="例如: 可以分享技术经验"
        />
        {errors.shareTopics && (
          <p className="text-red-500 text-sm mt-1">{errors.shareTopics.message}</p>
        )}
      </div>

      {/* 希望收获的内容(选填) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          希望收获的内容(选填)
        </label>
        <textarea
          {...register('seekTopics', {
            maxLength: { value: 1000, message: '内容最多1000个字符' },
          })}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="例如: 希望学习产品设计"
        />
        {errors.seekTopics && (
          <p className="text-red-500 text-sm mt-1">{errors.seekTopics.message}</p>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '提交中...' : '提交'}
      </button>
    </form>
  );
}
```

### State Management

无需全局状态管理(组件内部状态 + React Hook Form)

---

## Tests

### Tier 1 Critical Path Test

**测试名称**: `成员信息收集表单 - 完整提交流程`

**描述**: 验证用户可以填写并提交成员信息

**前置条件**:
- 测试社区已创建(slug: test-community)
- 数据库可访问

**测试步骤**:
1. 访问 `/c/test-community/form`
2. 验证表单页面加载,显示社区名称
3. 填写姓名"张三"
4. 填写所在地"北京"
5. 填写职业"软件工程师"
6. 填写正在做的事情(选填)
7. 点击"提交"按钮
8. 验证提交成功,显示成功消息
9. 验证"查看成员列表"和"生成分享"按钮可见
10. 点击"查看成员列表"跳转到成员列表页

**预期结果**:
- 表单提交成功
- 数据保存到数据库
- 成功消息显示正确
- 后续操作按钮功能正常

**失败影响**: ❌ **阻止部署** (Tier 1 测试必须通过)

---

### E2E Tests

**测试 1: 提交成员信息**
```typescript
import { test, expect } from '@playwright/test';

test('用户可以提交成员信息', async ({ page }) => {
  await page.goto('/c/test-community/form');

  // 验证页面标题
  await expect(page.locator('h1')).toContainText('成员分享表');

  // 填写必填字段
  await page.fill('[name="name"]', '张三');
  await page.fill('[name="location"]', '北京');
  await page.fill('[name="profession"]', '软件工程师');

  // 提交表单
  await page.click('button[type="submit"]');

  // 验证成功消息
  await expect(page.locator('text=提交成功')).toBeVisible();
  await expect(page.locator('text=查看成员列表')).toBeVisible();

  // 验证 Footer 显示
  await expect(page.locator('footer')).toContainText('填写完成后，可查看所有成员信息');
  await expect(page.locator('footer a')).toHaveAttribute('href', '/c/test-community/list');
});
```

**测试 2: 必填字段验证**
```typescript
test('必填字段为空时应该显示错误', async ({ page }) => {
  await page.goto('/c/test-community/form');

  // 直接提交空表单
  await page.click('button[type="submit"]');

  // 验证错误消息
  await expect(page.locator('text=姓名不能为空')).toBeVisible();
  await expect(page.locator('text=所在地不能为空')).toBeVisible();
});
```

### Integration Tests

```typescript
describe('POST /api/community/[slug]/members', () => {
  it('应该接受有效的成员数据', async () => {
    const response = await fetch('/api/community/test-community/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '张三',
        location: '北京',
        profession: '软件工程师',
      }),
    });

    const data = await response.json();
    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.name).toBe('张三');
  });

  it('应该拒绝缺少必填字段的请求', async () => {
    const response = await fetch('/api/community/test-community/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '张三' }), // 缺少 location 和 profession
    });

    expect(response.status).toBe(400);
  });
});
```

### Unit Tests

```typescript
describe('Zod Schema Validation', () => {
  it('应该通过有效数据验证', () => {
    const data = {
      name: '张三',
      location: '北京',
      profession: '软件工程师',
    };

    const result = memberSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('应该拒绝过长的姓名', () => {
    const data = {
      name: 'a'.repeat(101),
      location: '北京',
      profession: '软件工程师',
    };

    const result = memberSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
```

---

## Notes

### Future Enhancements

- **图片上传**: 允许上传头像或照片
- **自定义字段**: 管理员可以自定义表单字段
- **进度保存**: 自动保存表单草稿(LocalStorage)
- **社交登录**: 允许用户通过微信登录自动填充部分信息

### Known Limitations

- **重复提交**: 当前允许重复提交,未来可添加去重逻辑
- **字段固定**: 表单字段当前固定,不支持动态配置

### References

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [微信浏览器适配指南](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html)

---

**Related Documents**:
- [S-00: 系统架构概览](../system/S-00-architecture.md)
- [S-01: UI/UX 设计系统](../system/S-01-uiux-design.md)
- [S-03: 数据库设计](../system/S-03-database-schema.md)
- [F-01: 数据库基础设施](./F-01-database-infra.md)
- [F-03: 社区管理](./F-03-community-management.md)
- [F-05: 分享内容生成](./F-05-share-generation.md)
- [F-06: 成员列表查看](./F-06-member-list.md)
