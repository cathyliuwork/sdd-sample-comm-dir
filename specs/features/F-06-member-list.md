# F-06: 成员列表查看

**Version**: 1.0
**Last Updated**: 2025-12-04
**Priority**: HIGH
**Status**: ✅ Spec Complete

---

## Quick Reference

**What**: 公开访问的成员列表页面,按社区展示所有成员信息,支持无限滚动加载。

**Why**: 让社区成员查看所有加入的成员,促进相互了解和连接。

**Dependencies**:
- F-01: 数据库基础设施
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
- [F-03: 社区管理](./F-03-community-management.md) - Community 数据
- [F-04: 成员信息收集表单](./F-04-member-form.md) - 成员数据来源

### Required System Modules
- [S-00: 系统架构概览](../system/S-00-architecture.md) - 整体架构
- [S-01: UI/UX 设计系统](../system/S-01-uiux-design.md) - 移动端设计
- [S-03: 数据库设计](../system/S-03-database-schema.md) - Member schema
- [S-05: 多社区路由系统](../system/S-05-community-routing.md) - 路由设计

### Frontend Dependencies
- **React Intersection Observer** - 无限滚动检测
- **Tailwind CSS** - UI 样式

### Backend Dependencies
- **Prisma Client** - 数据库分页查询

### External Services
- 无

---

## PRD: Product Requirements

### Overview

成员列表查看功能提供可选访问控制的成员目录:

1. **访问控制**: 社区可选择设置访问码,保护成员隐私
2. **验证流程**: 需要访问码的社区,用户需先输入正确访问码
3. **卡片展示**: 每个成员显示为卡片,包含所有信息
4. **分页加载**: 使用无限滚动,每次加载 20 条
5. **移动优先**: 单列堆叠布局,适配微信浏览器
6. **加载状态**: 显示加载指示器和空状态

### User Flow

**步骤 1**: 用户打开成员列表链接
- 用户: 在微信群点击成员列表链接 `/c/[slug]/list`
- 系统: 检查社区是否设置了 accessCode

**步骤 2a**: 社区无访问码（公开访问）
- 系统: 直接加载社区信息和首批成员(20条)
- 用户: 查看成员列表
- 跳转到步骤 4

**步骤 2b**: 社区有访问码（需要验证）
- 系统: 检查用户是否已通过验证（检查 session/cookie）
- 如果已验证: 直接加载成员列表,跳转到步骤 4
- 如果未验证: 显示访问码验证页面

**步骤 3**: 验证访问码（仅当社区有访问码且用户未验证时）
- 用户: 看到访问码输入界面,显示社区名称和提示"此社区需要访问码才能查看成员列表"
- 用户: 输入访问码并点击"验证"按钮
- 系统: 验证访问码是否正确
  - 正确: 设置 session/cookie 标记已验证,加载成员列表
  - 错误: 显示错误提示"访问码错误,请重试"

**步骤 4**: 查看成员列表
- 用户: 滚动查看成员信息
- 系统: 显示每个成员的卡片(姓名、所在地、职业等)

**步骤 5**: 滚动加载更多
- 用户: 滚动到页面底部
- 系统: 自动加载下一批成员(20条),显示加载指示器

**步骤 6**: 查看所有成员
- 用户: 继续滚动直到查看完所有成员
- 系统: 显示"已加载全部成员"提示

**步骤 7**: 填写表单(可选)
- 用户: 点击"加入社区"按钮
- 系统: 跳转到表单页面 `/c/[slug]/form`

### UI Components

**组件 1: AccessCodePrompt**
- **位置**: `/c/[slug]/list` 页面（需要验证时）
- **用途**: 验证访问码
- **元素**:
  - 社区名称标题
  - 提示文字: "此社区需要访问码才能查看成员列表"
  - 访问码输入框
  - "验证"按钮
  - 错误提示（如果验证失败）

**组件 2: MemberListPage**
- **位置**: `/c/[slug]/list` 页面（验证通过后或无需验证）
- **用途**: 展示社区成员列表
- **元素**:
  - 社区名称标题
  - 成员总数徽章
  - "加入社区"按钮(跳转到表单页)
  - 成员卡片网格/列表
  - 加载指示器(底部)
  - 空状态提示(无成员时)

**组件 3: MemberCard**
- **位置**: MemberListPage 中
- **用途**: 展示单个成员的信息
- **元素**:
  - 成员姓名(标题)
  - 所在地图标 + 文本
  - 职业/行业图标 + 文本
  - 正在做的事情(如果填写,可折叠)
  - 希望分享的内容(如果填写,可折叠)
  - 希望收获的内容(如果填写,可折叠)
  - 加入时间(灰色小字)

**组件 4: EmptyState**
- **位置**: 无成员时显示
- **用途**: 引导用户填写表单
- **元素**:
  - 空状态图标
  - "还没有成员"标题
  - "成为第一个加入的成员!"按钮

**组件 5: InfiniteScrollTrigger**
- **位置**: 列表底部
- **用途**: 触发下一批数据加载
- **元素**:
  - 加载指示器(spinner)
  - "加载更多..."文本
  - "已加载全部"提示

### Business Rules

1. **访问控制**:
   - 社区的 `accessCode` 为空或 null: 公开访问,无需验证
   - 社区的 `accessCode` 不为空: 需要验证才能查看
2. **验证状态保存**: 使用 HTTP-only cookie 保存验证状态,有效期 7 天
3. **按时间排序**: 最新加入的成员显示在最前面
4. **分页大小**: 每次加载 20 条成员
5. **无限滚动**: 自动加载,无需手动点击"加载更多"
6. **选填字段**: 仅显示用户填写的选填字段
7. **加入时间**: 显示相对时间(如"3 天前")
8. **访问码错误**: 最多尝试次数无限制,但可添加速率限制防止暴力破解

### Acceptance Criteria

- [ ] 可以通过 `/c/[slug]/list` 访问列表
- [ ] 无效的 slug 显示 404 错误
- [ ] 社区无 accessCode 时,直接显示成员列表
- [ ] 社区有 accessCode 时,显示访问码验证页面
- [ ] 验证成功后显示成员列表
- [ ] 验证失败显示错误提示
- [ ] 验证成功后设置 cookie,7 天内无需重复验证
- [ ] 页面显示社区名称和成员总数
- [ ] 成员按时间倒序排列(最新在前)
- [ ] 首次加载显示 20 条成员
- [ ] 滚动到底部自动加载下一批
- [ ] 所有成员加载完毕显示"已加载全部"
- [ ] 无成员时显示空状态
- [ ] 成员卡片显示所有字段(必填 + 填写的选填)
- [ ] 移动端布局友好,单列堆叠
- [ ] "加入社区"按钮跳转到表单页

---

## Technical Implementation

### API Endpoints

**端点 1: POST /api/communities/[id]/verify-access**

**Purpose**: 验证访问码

**Request**:
```typescript
interface VerifyAccessRequest {
  accessCode: string;
}
```

**Response** (Success - 200):
```typescript
interface VerifyAccessResponse {
  success: true;
}
```

**Response** (Error - 401):
```typescript
interface ErrorResponse {
  success: false;
  error: 'Invalid access code';
}
```

**实现代码**:
```typescript
// app/api/communities/[id]/verify-access/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { accessCode } = body;

    // 查找社区
    const community = await prisma.community.findUnique({
      where: { id },
      select: { accessCode: true },
    });

    if (!community) {
      return NextResponse.json(
        { success: false, error: 'Community not found' },
        { status: 404 }
      );
    }

    // 如果社区没有设置 accessCode,允许访问
    if (!community.accessCode) {
      return NextResponse.json({ success: true });
    }

    // 验证 accessCode
    if (community.accessCode !== accessCode) {
      return NextResponse.json(
        { success: false, error: 'Invalid access code' },
        { status: 401 }
      );
    }

    // 验证成功,设置 cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set(`community_${id}_verified`, 'true', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('验证访问码失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

**端点 2: GET /api/communities/[id]/check-access**

**Purpose**: 检查用户是否已验证（通过 cookie）

**Request**: 无 body（从 cookie 读取）

**Response** (Success - 200):
```typescript
interface CheckAccessResponse {
  success: true;
  verified: boolean;
}
```

**实现代码**:
```typescript
// app/api/communities/[id]/check-access/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 查找社区
    const community = await prisma.community.findUnique({
      where: { id },
      select: { accessCode: true },
    });

    if (!community) {
      return NextResponse.json(
        { success: false, error: 'Community not found' },
        { status: 404 }
      );
    }

    // 如果社区没有设置 accessCode,直接允许
    if (!community.accessCode) {
      return NextResponse.json({ success: true, verified: true });
    }

    // 检查 cookie
    const cookieStore = cookies();
    const verifiedCookie = cookieStore.get(`community_${id}_verified`);

    if (verifiedCookie && verifiedCookie.value === 'true') {
      return NextResponse.json({ success: true, verified: true });
    }

    return NextResponse.json({ success: true, verified: false });
  } catch (error) {
    console.error('检查访问权限失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

**端点 3: GET /api/community/[slug]/members**

**Purpose**: 分页获取社区成员列表

**Request** (Query Parameters):
```typescript
interface GetMembersQuery {
  page?: number; // 页码,从 1 开始,默认 1
  limit?: number; // 每页数量,默认 20,最大 50
}
```

**Response** (Success - 200):
```typescript
interface Member {
  id: string;
  name: string;
  location: string;
  profession: string;
  currentWork: string | null;
  shareTopics: string | null;
  seekTopics: string | null;
  createdAt: string;
}

interface GetMembersResponse {
  success: true;
  data: {
    members: Member[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    };
    communityInfo: {
      name: string;
      slug: string;
      description: string | null;
    };
  };
}
```

**实现代码**:
```typescript
// app/api/community/[slug]/members/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

    // 查找社区
    const community = await prisma.community.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    });

    if (!community) {
      return NextResponse.json(
        { success: false, error: '社区不存在' },
        { status: 404 }
      );
    }

    // 获取总数
    const total = await prisma.member.count({
      where: { communityId: community.id },
    });

    // 分页查询成员
    const members = await prisma.member.findMany({
      where: { communityId: community.id },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
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

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      success: true,
      data: {
        members: members.map((m) => ({
          ...m,
          createdAt: m.createdAt.toISOString(),
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore,
        },
        communityInfo: {
          name: community.name,
          slug: community.slug,
          description: community.description,
        },
      },
    });
  } catch (error) {
    console.error('获取成员列表失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
```

### Database Schema

使用 F-01 定义的 Member 和 Community 模型。

### Frontend Components

**组件 1: MemberListPage**

**文件路径**: `src/app/c/[slug]/list/page.tsx`

```typescript
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import MemberCard from '@/components/community/MemberCard';
import EmptyState from '@/components/community/EmptyState';

export default function MemberListPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [community, setCommunity] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  // 加载成员
  const fetchMembers = async (pageNum: number) => {
    try {
      const response = await fetch(
        `/api/community/${slug}/members?page=${pageNum}&limit=20`
      );
      const data = await response.json();

      if (data.success) {
        if (pageNum === 1) {
          setCommunity(data.data.communityInfo);
          setMembers(data.data.members);
        } else {
          setMembers((prev) => [...prev, ...data.data.members]);
        }
        setHasMore(data.data.pagination.hasMore);
      }
    } catch (error) {
      console.error('获取成员失败:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // 首次加载 - 检查访问权限
  useEffect(() => {
    async function checkAccessAndLoad() {
      try {
        // 1. 获取社区信息
        const res = await fetch(`/api/community/${slug}/info`);
        const data = await res.json();

        if (!data.success) {
          setLoading(false);
          return;
        }

        const communityData = data.data;
        setCommunity(communityData);

        // 2. 检查是否需要访问码
        if (!communityData.accessCode) {
          // 无需验证,直接加载成员
          setIsVerified(true);
          await fetchMembers(1);
          return;
        }

        // 3. 检查是否已验证（通过 cookie）
        const checkRes = await fetch(`/api/communities/${communityData.id}/check-access`);
        const checkData = await checkRes.json();

        if (checkData.success && checkData.verified) {
          // 已验证,加载成员
          setIsVerified(true);
          await fetchMembers(1);
        } else {
          // 需要验证
          setNeedsVerification(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('检查访问权限失败:', error);
        setLoading(false);
      }
    }

    checkAccessAndLoad();
  }, [slug]);

  // 无限滚动
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loadingMore) {
        setLoadingMore(true);
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, loadingMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [handleObserver]);

  // 加载下一页
  useEffect(() => {
    if (page > 1) {
      fetchMembers(page);
    }
  }, [page]);

  if (loading) {
    return <div className="p-6 text-center">加载中...</div>;
  }

  if (!community) {
    return <div className="p-6 text-center">社区不存在</div>;
  }

  // 需要验证访问码
  if (needsVerification && !isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <AccessCodePrompt
          communityId={community.id}
          communityName={community.name}
          onSuccess={() => {
            setIsVerified(true);
            setNeedsVerification(false);
            fetchMembers(1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{community.name}</h1>
          {community.description && (
            <p className="text-gray-600 mb-4">{community.description}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              共 {members.length} 位成员
            </span>
            <a
              href={`/c/${slug}/form`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              加入社区
            </a>
          </div>
        </div>

        {/* 成员列表 */}
        {members.length === 0 ? (
          <EmptyState communitySlug={slug} />
        ) : (
          <>
            <div className="space-y-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>

            {/* 无限滚动触发器 */}
            <div ref={observerTarget} className="py-8 text-center">
              {loadingMore && (
                <div className="text-gray-600">加载更多...</div>
              )}
              {!hasMore && members.length > 0 && (
                <div className="text-gray-500">已加载全部成员</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

**组件 2: AccessCodePrompt**

**文件路径**: `src/components/community/AccessCodePrompt.tsx`

```typescript
'use client';

import { useState } from 'react';

interface AccessCodePromptProps {
  communityId: string;
  communityName: string;
  onSuccess: () => void;
}

export default function AccessCodePrompt({
  communityId,
  communityName,
  onSuccess,
}: AccessCodePromptProps) {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/communities/${communityId}/verify-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError('访问码错误，请重试');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        {communityName}
      </h2>
      <p className="mb-4 text-gray-600">
        此社区需要访问码才能查看成员列表
      </p>
      <input
        type="text"
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value)}
        placeholder="请输入访问码"
        className="
          mb-4 w-full
          rounded-md border border-gray-300
          px-4 py-3
          text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        "
      />
      {error && (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      )}
      <button
        onClick={handleSubmit}
        className="
          w-full rounded-md
          bg-blue-600 hover:bg-blue-700
          px-4 py-3
          text-white font-medium
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        disabled={loading}
      >
        {loading ? '验证中...' : '验证'}
      </button>
    </div>
  );
}
```

**组件 3: MemberCard**

**文件路径**: `src/components/community/MemberCard.tsx`

```typescript
interface MemberCardProps {
  member: {
    id: string;
    name: string;
    location: string;
    profession: string;
    currentWork: string | null;
    shareTopics: string | null;
    seekTopics: string | null;
    createdAt: string;
  };
}

export default function MemberCard({ member }: MemberCardProps) {
  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays} 天前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} 个月前`;
    return `${Math.floor(diffDays / 365)} 年前`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 基本信息 */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">👋 {member.name}</h3>
        <div className="flex flex-col gap-2 text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">📍</span>
            <span>{member.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">👔</span>
            <span>{member.profession}</span>
          </div>
        </div>
      </div>

      {/* 选填字段 */}
      {member.currentWork && (
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-600 mb-1">
            🔨 正在做的事情:
          </div>
          <div className="text-gray-700">{member.currentWork}</div>
        </div>
      )}

      {member.shareTopics && (
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-600 mb-1">
            📢 希望分享的内容:
          </div>
          <div className="text-gray-700">{member.shareTopics}</div>
        </div>
      )}

      {member.seekTopics && (
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-600 mb-1">
            🎯 希望收获的内容:
          </div>
          <div className="text-gray-700">{member.seekTopics}</div>
        </div>
      )}

      {/* 加入时间 */}
      <div className="text-xs text-gray-500 mt-4">
        {formatRelativeTime(member.createdAt)} 加入
      </div>
    </div>
  );
}
```

### State Management

无需全局状态管理(组件内部状态 + Intersection Observer API)

---

## Tests

### Tier 1 Critical Path Test

**测试名称**: `成员列表查看 - 访问控制和分页加载`

**描述**: 验证访问控制功能和分页加载正常工作

**前置条件**:
- 测试社区已创建(slug: test-community, accessCode: "test123")
- 至少有 25 个测试成员数据

**测试步骤**:
1. 访问 `/c/test-community/list`
2. 验证显示访问码验证页面
3. 输入错误的访问码"wrong",点击验证
4. 验证显示错误提示"访问码错误,请重试"
5. 输入正确的访问码"test123",点击验证
6. 验证页面加载成员列表,显示社区名称
7. 验证首批成员(20条)显示在列表中
8. 验证每个成员卡片包含姓名、所在地、职业
9. 滚动到页面底部
10. 验证自动加载下一批成员
11. 验证总成员数量正确(25条)
12. 滚动到最底部
13. 验证显示"已加载全部成员"提示
14. 刷新页面
15. 验证直接显示成员列表（cookie 仍有效,无需重新验证）

**预期结果**:
- 访问控制正常工作
- 验证成功后设置 cookie
- 分页加载正常工作
- 无限滚动自动触发
- 所有成员正确显示
- 加载状态清晰

**失败影响**: ❌ **阻止部署** (Tier 1 测试必须通过)

---

### E2E Tests

**测试 1: 访问控制 - 验证访问码**
```typescript
import { test, expect } from '@playwright/test';

test('需要访问码的社区应该显示验证页面', async ({ page }) => {
  await page.goto('/c/protected-community/list');

  // 验证显示访问码验证页面
  await expect(page.locator('h2')).toContainText('protected-community');
  await expect(page.locator('text=此社区需要访问码才能查看成员列表')).toBeVisible();

  // 输入错误的访问码
  await page.fill('input[placeholder="请输入访问码"]', 'wrong-code');
  await page.click('button:has-text("验证")');

  // 验证错误提示
  await expect(page.locator('text=访问码错误，请重试')).toBeVisible();

  // 输入正确的访问码
  await page.fill('input[placeholder="请输入访问码"]', 'correct123');
  await page.click('button:has-text("验证")');

  // 验证加载成员列表
  await expect(page.locator('h1')).toContainText('protected-community');
  await expect(page.locator('[data-testid="member-card"]')).toBeVisible();
});
```

**测试 2: 公开社区无需验证**
```typescript
test('无访问码的社区应该直接显示成员列表', async ({ page }) => {
  await page.goto('/c/public-community/list');

  // 验证直接显示成员列表,不显示验证页面
  await expect(page.locator('h1')).toContainText('public-community');
  await expect(page.locator('[data-testid="member-card"]').first()).toBeVisible();
  await expect(page.locator('text=此社区需要访问码')).not.toBeVisible();
});
```

**测试 3: Cookie 验证持久化**
```typescript
test('验证成功后刷新页面应该保持验证状态', async ({ page, context }) => {
  // 首次访问并验证
  await page.goto('/c/protected-community/list');
  await page.fill('input[placeholder="请输入访问码"]', 'correct123');
  await page.click('button:has-text("验证")');
  await expect(page.locator('[data-testid="member-card"]')).toBeVisible();

  // 刷新页面
  await page.reload();

  // 验证直接显示成员列表,无需重新验证
  await expect(page.locator('h1')).toContainText('protected-community');
  await expect(page.locator('[data-testid="member-card"]').first()).toBeVisible();
  await expect(page.locator('text=此社区需要访问码')).not.toBeVisible();
});
```

**测试 4: 无限滚动加载**
```typescript
test('滚动到底部应该加载更多成员', async ({ page }) => {
  await page.goto('/c/public-community/list');

  // 获取初始成员数量
  const initialCount = await page.locator('[data-testid="member-card"]').count();

  // 滚动到底部
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 等待加载
  await page.waitForTimeout(1000);

  // 验证成员数量增加
  const newCount = await page.locator('[data-testid="member-card"]').count();
  expect(newCount).toBeGreaterThan(initialCount);
});
```

### Integration Tests

```typescript
describe('POST /api/communities/[id]/verify-access', () => {
  it('应该验证正确的访问码', async () => {
    const response = await fetch('/api/communities/test-id/verify-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode: 'correct123' }),
    });

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);

    // 验证设置了 cookie
    const cookies = response.headers.get('set-cookie');
    expect(cookies).toContain('community_test-id_verified=true');
  });

  it('应该拒绝错误的访问码', async () => {
    const response = await fetch('/api/communities/test-id/verify-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode: 'wrong' }),
    });

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe('Invalid access code');
  });

  it('应该允许访问没有 accessCode 的社区', async () => {
    const response = await fetch('/api/communities/public-id/verify-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode: 'any' }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });
});

describe('GET /api/communities/[id]/check-access', () => {
  it('应该检查 cookie 验证状态', async () => {
    const response = await fetch('/api/communities/test-id/check-access', {
      headers: {
        Cookie: 'community_test-id_verified=true',
      },
    });

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.verified).toBe(true);
  });

  it('应该返回未验证状态当 cookie 不存在时', async () => {
    const response = await fetch('/api/communities/test-id/check-access');

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.verified).toBe(false);
  });
});

describe('GET /api/community/[slug]/members', () => {
  it('应该返回分页的成员列表', async () => {
    const response = await fetch('/api/community/test-community/members?page=1&limit=20');
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.members).toHaveLength(20);
    expect(data.data.pagination.page).toBe(1);
    expect(data.data.pagination.hasMore).toBe(true);
  });

  it('应该支持自定义分页大小', async () => {
    const response = await fetch('/api/community/test-community/members?page=1&limit=10');
    const data = await response.json();

    expect(data.data.members).toHaveLength(10);
    expect(data.data.pagination.limit).toBe(10);
  });

  it('应该限制最大分页大小为 50', async () => {
    const response = await fetch('/api/community/test-community/members?page=1&limit=100');
    const data = await response.json();

    expect(data.data.pagination.limit).toBe(50);
  });
});
```

### Unit Tests

```typescript
describe('Relative Time Formatting', () => {
  it('应该格式化今天的日期', () => {
    const today = new Date().toISOString();
    const result = formatRelativeTime(today);
    expect(result).toBe('今天');
  });

  it('应该格式化昨天的日期', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const result = formatRelativeTime(yesterday);
    expect(result).toBe('昨天');
  });

  it('应该格式化 7 天前', () => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const result = formatRelativeTime(sevenDaysAgo);
    expect(result).toBe('7 天前');
  });
});
```

---

## Notes

### Future Enhancements

- **搜索功能**: 按姓名、所在地、职业搜索成员
- **筛选功能**: 按所在地、职业筛选成员
- **排序选项**: 支持按时间、姓名等多种排序方式
- **成员详情页**: 点击成员卡片查看完整资料
- **联系方式**: 添加联系方式字段(可选)
- **虚拟滚动**: 对于超大列表使用虚拟滚动优化性能

### Known Limitations

- **无搜索**: 当前不支持搜索,成员较多时查找不便
- **固定排序**: 仅支持按时间倒序,不可自定义

### References

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React Infinite Scroll Best Practices](https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/)
- [Prisma Pagination](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

---

**Related Documents**:
- [S-00: 系统架构概览](../system/S-00-architecture.md)
- [S-01: UI/UX 设计系统](../system/S-01-uiux-design.md)
- [S-03: 数据库设计](../system/S-03-database-schema.md)
- [F-01: 数据库基础设施](./F-01-database-infra.md)
- [F-03: 社区管理](./F-03-community-management.md)
- [F-04: 成员信息收集表单](./F-04-member-form.md)
- [F-05: 分享内容生成](./F-05-share-generation.md)
