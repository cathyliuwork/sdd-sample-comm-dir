# S-01: UI/UX 设计系统

**Version**: 1.0
**Last Updated**: 2025-12-04
**Status**: ✅ Spec Complete

---

## Quick Reference

**Purpose**: 定义微信群成员介绍项目的视觉语言、设计规范和用户体验标准。

**Dependencies**:
- S-00: 系统架构概览

**Used By**:
- 所有功能模块（F-01 到 F-07）
- 前端组件实现

---

## Dependencies

### Required System Modules
- [S-00: 系统架构概览](./S-00-architecture.md) - 了解系统整体架构和技术栈

### External References
- **设计参考**: [solopreneur.global](https://solopreneur.global) - 现代简约风格
- **设计工具**: Tailwind CSS 3.x - 原子化 CSS 框架
- **字体系统**: 系统原生字体栈

### Infrastructure Requirements
- Next.js 14 + React 18 + Tailwind CSS 3.x
- 支持移动端优先的响应式设计

---

## 设计概览

### 设计风格定位

本项目设计风格参考 **solopreneur.global**，追求现代简约、专业友好的视觉体验：

**核心特征**:
- **现代简约**: 干净的布局、充足的留白、清晰的信息层次
- **温和圆角**: 使用 `rounded-md`（8px）圆角，柔和而不失专业
- **蓝色调**: 主色使用蓝色系，传达可靠和专业
- **移动优先**: 针对微信浏览器优化，触摸友好
- **干净网格**: 响应式网格布局，统一的间距系统

### 设计原则

1. **移动优先（Mobile First）**
   - 所有设计从移动端开始
   - 触摸目标最小 44x44px
   - 优化移动端阅读体验

2. **清晰层次（Visual Hierarchy）**
   - 使用字体大小和粗细区分层次
   - 重要信息使用对比色突出
   - 合理使用留白引导视觉流

3. **一致性（Consistency）**
   - 统一的间距系统（4px 基准）
   - 统一的颜色使用规则
   - 统一的组件样式

4. **可访问性（Accessibility）**
   - 遵循 WCAG 2.1 AA 标准
   - 颜色对比度满足 4.5:1 要求
   - 支持键盘导航和屏幕阅读器

---

## 配色方案

### 主色调（Primary Colors）

基于蓝色系，传达专业和可靠：

```css
/* 主蓝色 - 用于主要操作按钮、链接、重要信息 */
--color-primary-50:  #eff6ff;  /* 浅蓝背景 */
--color-primary-100: #dbeafe;  /* 超浅蓝 */
--color-primary-200: #bfdbfe;  /* 浅蓝 */
--color-primary-300: #93c5fd;  /* 中浅蓝 */
--color-primary-400: #60a5fa;  /* 中蓝 */
--color-primary-500: #3b82f6;  /* 标准蓝（主色） */
--color-primary-600: #2563eb;  /* 深蓝 */
--color-primary-700: #1d4ed8;  /* 更深蓝 */
--color-primary-800: #1e40af;  /* 暗蓝 */
--color-primary-900: #1e3a8a;  /* 最深蓝 */
```

**Tailwind 类名**: `bg-blue-500`, `text-blue-600`, `border-blue-400`

**使用场景**:
- 主要操作按钮（提交、保存、确认）
- 链接和导航
- 重要提示和状态

### 辅助色（Secondary Colors）

#### 成功色（绿色）
```css
--color-success-50:  #f0fdf4;
--color-success-500: #22c55e;  /* 标准成功绿 */
--color-success-600: #16a34a;
```
**使用场景**: 成功提示、完成状态、正向反馈

#### 警告色（黄色）
```css
--color-warning-50:  #fffbeb;
--color-warning-500: #eab308;  /* 标准警告黄 */
--color-warning-600: #ca8a04;
```
**使用场景**: 警告提示、需要注意的信息

#### 错误色（红色）
```css
--color-error-50:  #fef2f2;
--color-error-500: #ef4444;  /* 标准错误红 */
--color-error-600: #dc2626;
```
**使用场景**: 错误提示、删除操作、失败状态

### 中性色（Neutral Colors）

用于文本、背景、边框：

```css
/* 灰色系 */
--color-gray-50:  #f9fafb;  /* 浅灰背景 */
--color-gray-100: #f3f4f6;  /* 超浅灰 */
--color-gray-200: #e5e7eb;  /* 浅灰 */
--color-gray-300: #d1d5db;  /* 中浅灰 */
--color-gray-400: #9ca3af;  /* 中灰 */
--color-gray-500: #6b7280;  /* 标准灰 */
--color-gray-600: #4b5563;  /* 深灰 */
--color-gray-700: #374151;  /* 更深灰 */
--color-gray-800: #1f2937;  /* 暗灰 */
--color-gray-900: #111827;  /* 最深灰 */

/* 特殊颜色 */
--color-white:    #ffffff;  /* 纯白 */
--color-black:    #000000;  /* 纯黑 */
```

**文本颜色使用规则**:
- **标题**: `text-gray-900` （最深灰，确保对比度）
- **正文**: `text-gray-700` （深灰，舒适阅读）
- **辅助文字**: `text-gray-500` （中灰，次要信息）
- **禁用状态**: `text-gray-400` （浅灰，低优先级）

**背景颜色使用规则**:
- **主背景**: `bg-white` 或 `bg-gray-50`
- **卡片背景**: `bg-white`
- **输入框背景**: `bg-white` 或 `bg-gray-50`
- **悬停背景**: `bg-gray-100`

**边框颜色使用规则**:
- **默认边框**: `border-gray-200`
- **输入框边框**: `border-gray-300`
- **焦点边框**: `border-blue-500`

---

## 字体系统

### 字体栈（Font Stack）

使用系统原生字体栈，确保在所有设备上获得最佳性能和可读性：

```css
/* Sans-serif 字体栈 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
             'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
             'Noto Color Emoji';
```

**Tailwind 配置**:
```js
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
      ],
    },
  },
};
```

### 字体大小（Font Sizes）

基于 Tailwind 默认字体大小，遵循类型比例（Type Scale）：

| 用途 | 大小 | Tailwind 类 | 行高 | 使用场景 |
|------|------|-------------|------|----------|
| **超大标题** | 36px | `text-4xl` | 40px | 页面主标题 |
| **大标题** | 30px | `text-3xl` | 36px | 区块标题 |
| **标题** | 24px | `text-2xl` | 32px | 卡片标题 |
| **副标题** | 20px | `text-xl` | 28px | 次级标题 |
| **大正文** | 18px | `text-lg` | 28px | 强调内容 |
| **正文** | 16px | `text-base` | 24px | 主要内容 |
| **小正文** | 14px | `text-sm` | 20px | 辅助说明 |
| **超小字** | 12px | `text-xs` | 16px | 提示文字 |

### 字重（Font Weight）

| 用途 | 字重 | Tailwind 类 | 使用场景 |
|------|------|-------------|----------|
| **Bold** | 700 | `font-bold` | 主标题、强调内容 |
| **Semibold** | 600 | `font-semibold` | 副标题、按钮文字 |
| **Medium** | 500 | `font-medium` | 导航、标签 |
| **Regular** | 400 | `font-normal` | 正文、描述 |

### 排版规则

**标题排版**:
```jsx
<h1 className="text-3xl font-bold text-gray-900 mb-6">
  页面主标题
</h1>

<h2 className="text-2xl font-semibold text-gray-900 mb-4">
  区块标题
</h2>

<h3 className="text-xl font-medium text-gray-800 mb-3">
  卡片标题
</h3>
```

**正文排版**:
```jsx
<p className="text-base text-gray-700 leading-relaxed">
  这是正文内容，行高使用 leading-relaxed (1.625) 确保舒适阅读。
</p>

<p className="text-sm text-gray-500 mt-2">
  这是辅助说明文字，使用较小字号和浅灰色。
</p>
```

---

## 间距系统（Spacing System）

### 间距比例

基于 4px 基准，使用 Tailwind 默认间距系统：

| 间距 | 值 | Tailwind 类 | 使用场景 |
|------|-----|-------------|----------|
| **0** | 0px | `m-0`, `p-0` | 重置间距 |
| **1** | 4px | `m-1`, `p-1` | 超小间距 |
| **2** | 8px | `m-2`, `p-2` | 小间距（图标和文字） |
| **3** | 12px | `m-3`, `p-3` | 中小间距 |
| **4** | 16px | `m-4`, `p-4` | 标准间距（最常用） |
| **6** | 24px | `m-6`, `p-6` | 中等间距 |
| **8** | 32px | `m-8`, `p-8` | 大间距（区块间） |
| **12** | 48px | `m-12`, `p-12` | 超大间距（页面区域） |
| **16** | 64px | `m-16`, `p-16` | 巨大间距 |

### 间距使用规则

**垂直间距（Vertical Spacing）**:
- **页面顶部**: `pt-8` 或 `pt-12`（移动端）
- **区块间距**: `mb-8` 或 `mb-12`
- **段落间距**: `mb-4`
- **标题和内容**: `mb-3` 或 `mb-4`

**水平间距（Horizontal Spacing）**:
- **页面左右边距**: `px-4`（移动端），`px-6`（平板），`px-8`（桌面）
- **卡片内边距**: `p-6`（移动端），`p-8`（桌面）
- **按钮内边距**: `px-4 py-2`（小按钮），`px-6 py-3`（标准按钮）

**示例**:
```jsx
{/* 页面容器 */}
<div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12">

  {/* 区块间距 */}
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">区块标题</h2>

    {/* 卡片 */}
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <p className="text-gray-700 mb-3">卡片内容</p>
    </div>
  </section>

</div>
```

---

## 组件库

### 按钮（Buttons）

#### 主要按钮（Primary Button）

用于主要操作（提交、保存、确认）：

```jsx
<button className="
  w-full sm:w-auto
  px-6 py-3
  bg-blue-500 hover:bg-blue-600
  text-white font-semibold
  rounded-md
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:bg-gray-300 disabled:cursor-not-allowed
">
  提交表单
</button>
```

#### 次要按钮（Secondary Button）

用于次要操作（取消、返回）：

```jsx
<button className="
  w-full sm:w-auto
  px-6 py-3
  bg-white hover:bg-gray-50
  text-gray-700 font-medium
  border border-gray-300
  rounded-md
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  取消
</button>
```

#### 危险按钮（Danger Button）

用于删除等危险操作：

```jsx
<button className="
  px-4 py-2
  bg-red-500 hover:bg-red-600
  text-white font-medium
  rounded-md
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
">
  删除
</button>
```

### 表单元素（Form Elements）

#### 输入框（Text Input）

```jsx
<div className="mb-4">
  <label
    htmlFor="name"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    姓名 <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    id="name"
    name="name"
    placeholder="请输入您的姓名"
    className="
      w-full
      px-4 py-3
      bg-white
      border border-gray-300
      rounded-md
      text-gray-900 placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      disabled:bg-gray-100 disabled:cursor-not-allowed
    "
  />
</div>
```

#### 文本域（Textarea）

```jsx
<div className="mb-4">
  <label
    htmlFor="description"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    正在做的事情
  </label>
  <textarea
    id="description"
    name="description"
    rows={4}
    placeholder="分享您正在做的事情..."
    className="
      w-full
      px-4 py-3
      bg-white
      border border-gray-300
      rounded-md
      text-gray-900 placeholder-gray-400
      resize-none
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    "
  />
</div>
```

#### 选择框（Select）

```jsx
<div className="mb-4">
  <label
    htmlFor="profession"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    职业/行业
  </label>
  <select
    id="profession"
    name="profession"
    className="
      w-full
      px-4 py-3
      bg-white
      border border-gray-300
      rounded-md
      text-gray-900
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    "
  >
    <option value="">请选择职业/行业</option>
    <option value="tech">互联网/科技</option>
    <option value="finance">金融</option>
    <option value="education">教育</option>
  </select>
</div>
```

### 卡片（Cards）

#### 标准卡片

```jsx
<div className="
  bg-white
  rounded-lg
  shadow-sm
  border border-gray-200
  p-6
  hover:shadow-md
  transition-shadow duration-200
">
  <h3 className="text-xl font-semibold text-gray-900 mb-2">
    张三
  </h3>
  <p className="text-sm text-gray-500 mb-3">
    北京 · 产品经理
  </p>
  <p className="text-gray-700 leading-relaxed">
    正在做的事情描述...
  </p>
</div>
```

#### 成员卡片

```jsx
<div className="
  bg-white
  rounded-lg
  border border-gray-200
  p-6
  hover:border-blue-300
  transition-colors duration-200
">
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-lg font-semibold text-gray-900">张三</h3>
      <p className="text-sm text-gray-500 mt-1">
        北京 · 产品经理
      </p>
    </div>
    <span className="text-xs text-gray-400">
      2025-12-04
    </span>
  </div>

  <div className="space-y-3">
    <div>
      <p className="text-sm font-medium text-gray-700">正在做的事情</p>
      <p className="text-sm text-gray-600 mt-1">描述内容...</p>
    </div>

    <div>
      <p className="text-sm font-medium text-gray-700">希望分享</p>
      <p className="text-sm text-gray-600 mt-1">分享内容...</p>
    </div>
  </div>
</div>
```

### 提示信息（Alerts）

#### 成功提示

```jsx
<div className="
  p-4
  bg-green-50
  border border-green-200
  rounded-md
  flex items-start
">
  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" /* ... */>
    {/* 成功图标 */}
  </svg>
  <div>
    <p className="text-sm font-medium text-green-800">提交成功</p>
    <p className="text-sm text-green-700 mt-1">您的信息已成功保存</p>
  </div>
</div>
```

#### 错误提示

```jsx
<div className="
  p-4
  bg-red-50
  border border-red-200
  rounded-md
  flex items-start
">
  <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" /* ... */>
    {/* 错误图标 */}
  </svg>
  <div>
    <p className="text-sm font-medium text-red-800">提交失败</p>
    <p className="text-sm text-red-700 mt-1">请检查表单内容并重试</p>
  </div>
</div>
```

### 加载状态（Loading States）

#### 按钮加载

```jsx
<button
  disabled
  className="
    px-6 py-3
    bg-blue-500
    text-white font-semibold
    rounded-md
    opacity-75 cursor-not-allowed
    flex items-center justify-center
  "
>
  <svg className="animate-spin h-5 w-5 mr-2" /* ... */>
    {/* 加载图标 */}
  </svg>
  提交中...
</button>
```

#### 页面加载

```jsx
<div className="flex items-center justify-center py-12">
  <div className="text-center">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <p className="text-gray-500 mt-4">加载中...</p>
  </div>
</div>
```

### 社区相关组件

#### CommunityPageHeader（页面标题组件）

用于成员表单页面顶部，显示社区名称和页面标题。

```jsx
<header className="border-b border-gray-200 bg-white px-4 py-6">
  <h1 className="text-2xl font-bold text-gray-900">
    {communityName} - 成员分享表
  </h1>
</header>
```

**使用场景**:
- 成员信息收集表单页面顶部
- 需要传入 `communityName` 属性

**Props**:
```typescript
interface CommunityPageHeaderProps {
  communityName: string;
}
```

#### CommunityFormFooter（表单底部组件）

用于成员表单页面底部，提供查看成员列表的引导链接。

```jsx
<footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-600">
  <p>
    填写完成后，可查看所有成员信息：
    <a
      href={membersListUrl}
      className="text-primary-600 hover:text-primary-700 ml-1 underline"
    >
      点击查看社区成员列表
    </a>
  </p>
</footer>
```

**使用场景**:
- 成员信息收集表单页面底部
- 需要传入成员列表页面的 URL

**Props**:
```typescript
interface CommunityFormFooterProps {
  membersListUrl: string;
}
```

#### AccessCodePrompt（访问码验证组件）

用于成员列表页面，当社区设置了访问码时显示验证界面。

```jsx
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
```

**使用场景**:
- 成员列表页面访问控制
- 社区设置了 `accessCode` 且用户未通过验证时显示

**Props**:
```typescript
interface AccessCodePromptProps {
  communityId: string;
  communityName: string;
  onSuccess: () => void;
}
```

**完整组件示例**:
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
  onSuccess
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

---

## 响应式设计

### 断点系统（Breakpoints）

使用 Tailwind 默认断点：

| 断点 | 最小宽度 | 设备类型 | Tailwind 前缀 |
|------|----------|----------|---------------|
| **xs** | 0px | 手机竖屏 | （无前缀，默认） |
| **sm** | 640px | 手机横屏 | `sm:` |
| **md** | 768px | 平板竖屏 | `md:` |
| **lg** | 1024px | 平板横屏/小桌面 | `lg:` |
| **xl** | 1280px | 桌面 | `xl:` |
| **2xl** | 1536px | 大桌面 | `2xl:` |

### 移动优先策略

所有设计从移动端开始，逐步增强到更大屏幕：

**示例**:
```jsx
<div className="
  px-4 sm:px-6 lg:px-8
  py-8 sm:py-12
  max-w-4xl mx-auto
">
  {/* 内容 */}
</div>
```

### 布局模式

#### 单列布局（移动端）

```jsx
<div className="space-y-4">
  <div className="bg-white rounded-lg p-6">卡片 1</div>
  <div className="bg-white rounded-lg p-6">卡片 2</div>
  <div className="bg-white rounded-lg p-6">卡片 3</div>
</div>
```

#### 网格布局（响应式）

```jsx
<div className="
  grid
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-4 sm:gap-6
">
  <div className="bg-white rounded-lg p-6">卡片 1</div>
  <div className="bg-white rounded-lg p-6">卡片 2</div>
  <div className="bg-white rounded-lg p-6">卡片 3</div>
</div>
```

### 触摸友好设计

#### 触摸目标大小

所有可交互元素最小 44x44px（遵循 Apple HIG 和 Material Design 标准）：

```jsx
{/* 按钮 */}
<button className="min-h-[44px] px-6 py-3">
  点击按钮
</button>

{/* 链接 */}
<a href="#" className="inline-block py-3 px-4 min-h-[44px]">
  导航链接
</a>
```

#### 触摸反馈

使用 `active:` 伪类提供触摸反馈：

```jsx
<button className="
  bg-blue-500
  active:bg-blue-600
  transform active:scale-95
  transition-all duration-100
">
  触摸按钮
</button>
```

---

## 可访问性（Accessibility）

### WCAG 2.1 AA 标准

#### 颜色对比度

确保所有文本和背景颜色对比度满足 WCAG 2.1 AA 要求：

| 文本大小 | 最小对比度 | 示例 |
|---------|-----------|------|
| **正常文本** | 4.5:1 | `text-gray-900` on `bg-white` ✅ |
| **大文本（18px+）** | 3:1 | `text-gray-700` on `bg-gray-100` ✅ |

**工具**: 使用 [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) 验证对比度

#### 焦点可见性

所有交互元素必须有清晰的焦点状态：

```jsx
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
">
  可访问按钮
</button>
```

#### 语义化 HTML

使用正确的 HTML 标签和 ARIA 属性：

```jsx
{/* 表单标签 */}
<label htmlFor="email" className="block mb-2">
  邮箱地址
</label>
<input
  type="email"
  id="email"
  name="email"
  aria-required="true"
  aria-describedby="email-hint"
/>
<p id="email-hint" className="text-sm text-gray-500">
  请输入有效的邮箱地址
</p>

{/* 按钮 */}
<button type="submit" aria-label="提交表单">
  提交
</button>
```

#### 键盘导航

确保所有功能可以通过键盘操作：

- `Tab`: 在可交互元素间切换
- `Enter/Space`: 激活按钮
- `Esc`: 关闭模态框
- 箭头键: 在列表中导航

---

## 动画和过渡

### 过渡动画

使用 Tailwind 过渡类，保持动画简洁流畅：

```jsx
{/* 颜色过渡 */}
<button className="
  bg-blue-500 hover:bg-blue-600
  transition-colors duration-200
">
  按钮
</button>

{/* 阴影过渡 */}
<div className="
  shadow-sm hover:shadow-md
  transition-shadow duration-200
">
  卡片
</div>

{/* 变换过渡 */}
<button className="
  transform hover:scale-105
  transition-transform duration-200
">
  悬停放大
</button>
```

### 加载动画

```jsx
{/* 旋转加载 */}
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />

{/* 脉冲加载 */}
<div className="animate-pulse bg-gray-200 h-4 w-full rounded" />
```

### 动画性能优化

- 使用 `transform` 和 `opacity` 实现动画（GPU 加速）
- 避免动画 `width`、`height`、`margin`（触发重排）
- 使用 `will-change` 提示浏览器优化

---

## 图标系统

### 推荐图标库

使用 **Heroicons**（由 Tailwind 团队维护）：

```bash
npm install @heroicons/react
```

**使用示例**:
```jsx
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

<CheckCircleIcon className="w-5 h-5 text-green-500" />
<ArrowRightIcon className="w-6 h-6 text-gray-400" />
```

### 图标大小规范

| 用途 | 大小 | Tailwind 类 |
|------|------|-------------|
| **小图标** | 16px | `w-4 h-4` |
| **标准图标** | 20px | `w-5 h-5` |
| **中图标** | 24px | `w-6 h-6` |
| **大图标** | 32px | `w-8 h-8` |

---

## Related Documents

### 系统设计模块
- [S-00: 系统架构概览](./S-00-architecture.md)
- [S-02: 测试策略](./S-02-testing-strategy.md)
- [S-03: 数据库设计](./S-03-database-schema.md)

### 功能模块
- [F-04: 成员信息收集表单](../features/F-04-member-form.md) - 使用本设计系统实现表单
- [F-06: 成员列表查看](../features/F-06-member-list.md) - 使用本设计系统实现成员卡片

---

## Notes

### 设计参考资源

- **Tailwind CSS**: https://tailwindcss.com
- **Tailwind UI**: https://tailwindui.com (付费组件库)
- **Heroicons**: https://heroicons.com
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/

### 自定义 Tailwind 配置

如需扩展 Tailwind 默认配置，可在 `tailwind.config.js` 中添加：

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // 自定义颜色
        primary: {
          50: '#eff6ff',
          // ...
          900: '#1e3a8a',
        },
      },
      spacing: {
        // 自定义间距
        '18': '4.5rem',
      },
    },
  },
};
```

### 微信浏览器兼容性

注意微信浏览器的特殊性：

1. **iOS 微信浏览器**: 基于 Safari WebKit
2. **Android 微信浏览器**: 基于系统 WebView
3. **兼容性问题**: 某些 CSS 特性可能不支持，需要测试

**测试工具**: 使用微信开发者工具或真机测试
