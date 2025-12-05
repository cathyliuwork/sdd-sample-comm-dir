# F-05: 分享内容生成

**Version**: 1.0
**Last Updated**: 2025-12-04
**Priority**: CRITICAL
**Status**: ✅ Spec Complete

---

## Quick Reference

**What**: 将成员信息格式化为结构化文字内容,支持一键复制粘贴到微信群。

**Why**: 方便成员将自己的介绍以美观的格式分享到微信群,提升用户体验。

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

### Frontend Dependencies
- **Clipboard API** - 浏览器原生复制功能
- **Tailwind CSS** - UI 样式

### Backend Dependencies
- **Prisma Client** - 数据库查询

### External Services
- 无

---

## PRD: Product Requirements

### Overview

分享内容生成功能将成员信息转换为美观的文字格式:

1. **格式化模板**: 使用预定义的文字模板,包含表情符号和排版
2. **一键复制**: 使用 Clipboard API 实现一键复制
3. **预览展示**: 显示格式化后的内容,用户可预览再复制
4. **微信优化**: 格式适配微信群聊天,使用合适的换行和表情
5. **反馈提示**: 复制成功后显示提示消息

### User Flow

**步骤 1**: 用户访问分享页面
- 用户: 在表单提交成功后点击"生成分享内容",或访问 `/c/[slug]/share/[memberId]`
- 系统: 加载成员信息,生成格式化文字内容

**步骤 2**: 查看预览内容
- 用户: 查看生成的分享内容预览
- 系统: 显示格式化后的文字,第一行显示【社区名称 成员信息】,正文包含成员所有信息,最后一行（空一行后）显示查看所有成员信息的链接

**步骤 3**: 复制分享内容
- 用户: 点击"复制内容"按钮
- 系统: 使用 Clipboard API 复制内容到剪贴板,显示"复制成功"提示

**步骤 4**: 粘贴到微信群
- 用户: 打开微信群,长按输入框,点击"粘贴"
- 系统: 无响应(用户在微信中操作)

**步骤 5**: 后续操作(可选)
- 用户: 点击"查看成员列表"跳转到成员列表页
- 用户: 或点击"再次编辑"跳转回表单页(可编辑自己的信息)

### UI Components

**组件 1: SharePage**
- **位置**: `/c/[slug]/share/[memberId]` 页面
- **用途**: 展示格式化分享内容和复制按钮
- **元素**:
  - 页面标题"分享到微信群"
  - 成员名称显示
  - 预览区域(白色卡片,显示格式化文字)
  - "复制内容"按钮(蓝色,全宽)
  - 复制成功提示(绿色Toast)
  - "查看成员列表"按钮(次要操作)
  - "返回表单"链接

**组件 2: SharePreview**
- **位置**: SharePage 中的预览区域
- **用途**: 展示格式化后的分享内容
- **元素**:
  - 白色背景卡片
  - 预格式化文本(保留换行和空格)
  - 表情符号渲染
  - 复制按钮(卡片内)

**组件 3: CopyButton**
- **位置**: SharePreview 底部
- **用途**: 执行复制操作
- **元素**:
  - "复制内容"按钮
  - 复制成功状态(显示"已复制!"文本和绿色勾选图标)
  - 加载状态(处理中)

### Business Rules

1. **格式化模板**: 固定格式,包含所有非空字段
2. **第一行格式**: 【{社区名称} 成员信息】
3. **最后一行格式**: 查看所有成员信息：{成员列表链接}（与正文空一行）
4. **表情符号**: 不使用表情符号（简洁文本格式）
5. **换行规则**: 每个字段一行,字段间不空行
6. **选填字段**: 仅显示用户填写的选填字段
7. **Clipboard API**: 优先使用原生 API,降级使用 document.execCommand
8. **权限处理**: 处理 Clipboard API 权限被拒绝的情况

### Acceptance Criteria

- [ ] 可以通过成员 ID 访问分享页面
- [ ] 第一行显示【{社区名称} 成员信息】
- [ ] 格式化内容包含所有必填字段
- [ ] 选填字段仅在有值时显示
- [ ] 最后一行显示查看所有成员信息的链接（与正文空一行）
- [ ] 一键复制功能正常工作
- [ ] 复制成功显示提示消息
- [ ] 复制失败显示友好错误提示
- [ ] 预览内容与复制内容完全一致
- [ ] 移动端布局友好
- [ ] 微信浏览器中复制功能正常

---

## Technical Implementation

### API Endpoints

**端点 1: GET /api/community/[slug]/members/[id]**

**Purpose**: 获取单个成员的详细信息(用于生成分享内容)

**Request**: 无 body

**Response** (Success - 200):
```typescript
interface MemberDetailResponse {
  success: true;
  data: {
    id: string;
    name: string;
    location: string;
    profession: string;
    currentWork: string | null;
    shareTopics: string | null;
    seekTopics: string | null;
    communityName: string;
    communitySlug: string;
    membersListUrl: string; // 新增：成员列表链接
  };
}
```

**Response** (Error - 404):
```typescript
interface ErrorResponse {
  success: false;
  error: string; // '成员不存在'
}
```

**实现代码**:
```typescript
// app/api/community/[slug]/members/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string; id: string } }
) {
  try {
    const { slug, id } = params;

    const member = await prisma.member.findFirst({
      where: {
        id,
        community: { slug },
      },
      include: {
        community: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: '成员不存在' },
        { status: 404 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const membersListUrl = `${baseUrl}/com/${member.community.slug}/list`;

    return NextResponse.json({
      success: true,
      data: {
        id: member.id,
        name: member.name,
        location: member.location,
        profession: member.profession,
        currentWork: member.currentWork,
        shareTopics: member.shareTopics,
        seekTopics: member.seekTopics,
        communityName: member.community.name,
        communitySlug: member.community.slug,
        membersListUrl,
      },
    });
  } catch (error) {
    console.error('获取成员信息失败:', error);
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

**组件 1: SharePage**

**文件路径**: `src/app/c/[slug]/share/[memberId]/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SharePreview from '@/components/community/SharePreview';

export default function SharePage() {
  const params = useParams();
  const slug = params.slug as string;
  const memberId = params.memberId as string;

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMember();
  }, [slug, memberId]);

  const fetchMember = async () => {
    try {
      const response = await fetch(`/api/community/${slug}/members/${memberId}`);
      const data = await response.json();

      if (data.success) {
        setMember(data.data);
      }
    } catch (error) {
      console.error('获取成员信息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">加载中...</div>;
  }

  if (!member) {
    return <div className="p-6 text-center">成员不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-2">
          分享到微信群
        </h1>
        <p className="text-gray-600 text-center mb-6">
          点击"复制内容"按钮,然后粘贴到微信群
        </p>

        <SharePreview member={member} />

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`/c/${member.communitySlug}/list`}
            className="block text-center px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            查看成员列表
          </a>
          <a
            href={`/c/${member.communitySlug}/form`}
            className="block text-center text-gray-600 hover:text-gray-800"
          >
            返回表单
          </a>
        </div>
      </div>
    </div>
  );
}
```

**组件 2: SharePreview**

**文件路径**: `src/components/community/SharePreview.tsx`

```typescript
'use client';

import { useState } from 'react';
import { generateShareText } from '@/lib/shareFormatter';

interface SharePreviewProps {
  member: {
    name: string;
    location: string;
    profession: string;
    currentWork: string | null;
    shareTopics: string | null;
    seekTopics: string | null;
  };
}

export default function SharePreview({ member }: SharePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareText = generateShareText(member);

  const handleCopy = async () => {
    setError(null);

    try {
      // 优先使用 Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // 降级方案: 使用 document.execCommand
        const textarea = document.createElement('textarea');
        textarea.value = shareText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        const success = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          setError('复制失败,请手动复制');
        }
      }
    } catch (err) {
      console.error('复制失败:', err);
      setError('复制失败,请手动选择并复制');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 预览内容 */}
      <div className="mb-4 p-4 bg-gray-50 rounded-md">
        <pre className="whitespace-pre-wrap text-sm font-sans">
          {shareText}
        </pre>
      </div>

      {/* 复制按钮 */}
      <button
        onClick={handleCopy}
        className={`w-full py-3 rounded-md font-medium transition-colors ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {copied ? '✓ 已复制!' : '复制内容'}
      </button>

      {/* 错误提示 */}
      {error && (
        <div className="mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
```

**工具函数: generateShareText**

**文件路径**: `src/lib/shareFormatter.ts`

```typescript
interface MemberData {
  name: string;
  location: string;
  profession: string;
  currentWork?: string | null;
  shareTopics?: string | null;
  seekTopics?: string | null;
  communityName: string;
  membersListUrl: string;
}

export function generateShareText(member: MemberData): string {
  const lines: string[] = [];

  // 第一行：社区信息
  lines.push(`【${member.communityName} 成员信息】`);
  lines.push('');

  // 必填字段
  lines.push(`姓名：${member.name}`);
  lines.push(`所在地：${member.location}`);
  lines.push(`职业/行业：${member.profession}`);

  // 选填字段(仅显示有值的)
  if (member.currentWork) {
    lines.push(`正在做的事情：${member.currentWork}`);
  }

  if (member.shareTopics) {
    lines.push(`希望分享的内容：${member.shareTopics}`);
  }

  if (member.seekTopics) {
    lines.push(`希望收获的内容：${member.seekTopics}`);
  }

  // 最后一行：成员列表链接（空一行后）
  lines.push('');
  lines.push(`查看所有成员信息：${member.membersListUrl}`);

  return lines.join('\n');
}
```

**示例输出**:

```
【产品经理社区 成员信息】

姓名：张三
所在地：北京
职业/行业：软件工程师
正在做的事情：正在开发一个开源项目
希望分享的内容：可以分享技术经验和最佳实践
希望收获的内容：希望学习产品设计和用户体验

查看所有成员信息：https://example.com/c/pm-community/list
```

### State Management

无需全局状态管理(组件内部状态)

---

## Tests

### Tier 1 Critical Path Test

**测试名称**: `分享内容生成 - 复制功能`

**描述**: 验证用户可以查看格式化内容并复制到剪贴板

**前置条件**:
- 测试成员数据已创建(memberId: test-member-id)
- 浏览器支持 Clipboard API

**测试步骤**:
1. 访问 `/c/test-community/share/test-member-id`
2. 验证页面加载,显示成员姓名
3. 验证预览区域显示格式化内容
4. 验证必填字段(姓名、所在地、职业)出现在内容中
5. 验证选填字段(如果填写)出现在内容中
6. 点击"复制内容"按钮
7. 验证按钮状态变为"已复制!"
8. 验证剪贴板包含正确的文字内容
9. 2秒后验证按钮恢复为"复制内容"

**预期结果**:
- 格式化内容正确显示
- 复制功能正常工作
- 剪贴板内容与预览一致
- 提示反馈及时

**失败影响**: ❌ **阻止部署** (Tier 1 测试必须通过)

---

### E2E Tests

**测试 1: 查看和复制分享内容**
```typescript
import { test, expect } from '@playwright/test';

test('用户可以查看和复制分享内容', async ({ page, context }) => {
  // 授权剪贴板权限
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  await page.goto('/c/test-community/share/test-member-id');

  // 验证预览内容
  await expect(page.locator('text=【测试社区 成员信息】')).toBeVisible();
  await expect(page.locator('text=姓名：张三')).toBeVisible();
  await expect(page.locator('text=所在地：北京')).toBeVisible();
  await expect(page.locator('text=查看所有成员信息：')).toBeVisible();

  // 点击复制按钮
  await page.click('button:has-text("复制内容")');

  // 验证按钮状态变化
  await expect(page.locator('button:has-text("已复制!")')).toBeVisible();

  // 验证剪贴板内容
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardText).toContain('【测试社区 成员信息】');
  expect(clipboardText).toContain('姓名：张三');
  expect(clipboardText).toContain('所在地：北京');
  expect(clipboardText).toContain('查看所有成员信息：');
});
```

**测试 2: 选填字段显示逻辑**
```typescript
test('选填字段仅在有值时显示', async ({ page }) => {
  // 创建只有必填字段的测试成员
  await page.goto('/c/test-community/share/minimal-member-id');

  const previewText = await page.locator('pre').textContent();

  // 验证必填字段存在
  expect(previewText).toContain('姓名：');
  expect(previewText).toContain('所在地：');
  expect(previewText).toContain('职业/行业：');

  // 验证选填字段标题不存在
  expect(previewText).not.toContain('正在做的事情：');
  expect(previewText).not.toContain('希望分享的内容：');
  expect(previewText).not.toContain('希望收获的内容：');

  // 验证最后一行链接存在
  expect(previewText).toContain('查看所有成员信息：');
});
```

### Integration Tests

```typescript
describe('GET /api/community/[slug]/members/[id]', () => {
  it('应该返回成员详细信息', async () => {
    const response = await fetch('/api/community/test-community/members/test-member-id');
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.name).toBeDefined();
    expect(data.data.location).toBeDefined();
    expect(data.data.profession).toBeDefined();
  });

  it('应该返回 404 当成员不存在时', async () => {
    const response = await fetch('/api/community/test-community/members/nonexistent');

    expect(response.status).toBe(404);
  });
});
```

### Unit Tests

**测试 1: 格式化函数**
```typescript
import { generateShareText } from '@/lib/shareFormatter';

describe('generateShareText', () => {
  it('应该格式化完整成员信息', () => {
    const member = {
      name: '张三',
      location: '北京',
      profession: '软件工程师',
      currentWork: '开发项目',
      shareTopics: '分享经验',
      seekTopics: '学习设计',
      communityName: '产品经理社区',
      membersListUrl: 'https://example.com/c/pm-community/list',
    };

    const result = generateShareText(member);

    expect(result).toContain('【产品经理社区 成员信息】');
    expect(result).toContain('姓名：张三');
    expect(result).toContain('所在地：北京');
    expect(result).toContain('职业/行业：软件工程师');
    expect(result).toContain('正在做的事情：开发项目');
    expect(result).toContain('查看所有成员信息：https://example.com/c/pm-community/list');
  });

  it('应该省略空的选填字段', () => {
    const member = {
      name: '李四',
      location: '上海',
      profession: '产品经理',
      currentWork: null,
      shareTopics: null,
      seekTopics: null,
      communityName: '设计师社区',
      membersListUrl: 'https://example.com/c/designer/list',
    };

    const result = generateShareText(member);

    expect(result).toContain('【设计师社区 成员信息】');
    expect(result).toContain('姓名：李四');
    expect(result).not.toContain('正在做的事情：');
    expect(result).not.toContain('希望分享的内容：');
    expect(result).not.toContain('希望收获的内容：');
    expect(result).toContain('查看所有成员信息：https://example.com/c/designer/list');
  });
});
```

**测试 2: Clipboard API 降级**
```typescript
describe('Clipboard Fallback', () => {
  it('应该在 Clipboard API 不可用时使用 execCommand', async () => {
    // Mock Clipboard API 不可用
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });

    // 测试降级逻辑...

    // 恢复
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
    });
  });
});
```

---

## Notes

### Future Enhancements

- **多种格式模板**: 提供多种分享格式供用户选择(简洁版、详细版等)
- **自定义表情**: 允许管理员自定义表情符号
- **图片分享**: 生成图片版本的分享内容(Canvas 渲染)
- **二维码**: 生成个人资料二维码
- **社交分享**: 支持直接分享到微信朋友圈、微博等平台

### Known Limitations

- **Clipboard API 兼容性**: 部分旧版浏览器不支持,已提供降级方案
- **权限提示**: 首次复制可能触发浏览器权限提示
- **格式固定**: 当前格式固定,不支持用户自定义

### References

- [Clipboard API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [document.execCommand (deprecated)](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
- [微信浏览器 Clipboard 支持](https://developers.weixin.qq.com/community/develop/doc/000c4a87ed081006bf3a81a3b56400)

---

**Related Documents**:
- [S-00: 系统架构概览](../system/S-00-architecture.md)
- [S-01: UI/UX 设计系统](../system/S-01-uiux-design.md)
- [F-01: 数据库基础设施](./F-01-database-infra.md)
- [F-03: 社区管理](./F-03-community-management.md)
- [F-04: 成员信息收集表单](./F-04-member-form.md)
- [F-06: 成员列表查看](./F-06-member-list.md)
