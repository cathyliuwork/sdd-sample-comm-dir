# F-02: 管理员登录

**Version**: 1.0
**Last Updated**: 2025-12-04
**Priority**: CRITICAL
**Status**: ✅ Spec Complete

---

## Quick Reference

**What**: 基于配置文件的静态管理员登录系统,使用 JWT 会话管理。

**Why**: 管理员需要登录才能访问社区管理和成员管理功能,采用静态配置简化认证流程。

**Dependencies**:
- F-01: 数据库基础设施

**Used By**:
- F-03: 社区管理
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
- [F-01: 数据库基础设施](./F-01-database-infra.md) - 无需数据库表,但需要基础设施

### Required System Modules
- [S-00: 系统架构概览](../system/S-00-architecture.md) - 了解整体架构
- [S-04: 认证系统](../system/S-04-authentication.md) - 认证系统设计

### Frontend Dependencies
- **React Hook Form** - 表单处理
- **Next.js App Router** - 路由和服务端组件

### Backend Dependencies
- **bcrypt** - 密码哈希验证
- **jsonwebtoken** - JWT 生成和验证
- **cookie** - Cookie 解析和设置

### External Services
- 无(静态配置,不依赖外部服务)

---

## PRD: Product Requirements

### Overview

管理员登录系统采用最简化的静态配置方案:

1. **管理员凭证**: 存储在 `.env.local` 环境变量中
2. **密码存储**: 使用 bcrypt 哈希,不存储明文密码
3. **会话管理**: 使用 HTTP-only Cookie + JWT
4. **权限验证**: 中间件验证 JWT 令牌有效性
5. **登录页面**: 简洁的用户名/密码表单

不使用数据库存储管理员信息,适合单管理员或少量管理员的场景。

### User Flow

**步骤 1**: 管理员访问登录页面
- 用户: 访问 `/admin/login`
- 系统: 显示登录表单(用户名、密码输入框)

**步骤 2**: 管理员输入凭证
- 用户: 输入用户名和密码,点击"登录"按钮
- 系统: 前端验证表单(非空验证)

**步骤 3**: 提交登录请求
- 用户: 表单提交到 `/api/auth/login`
- 系统: 后端验证凭证是否匹配环境变量

**步骤 4**: 验证成功,生成 JWT
- 用户: 无操作
- 系统: 生成 JWT 令牌,设置 HTTP-only Cookie,返回成功响应

**步骤 5**: 重定向到管理后台
- 用户: 自动跳转到 `/admin/dashboard`
- 系统: 显示管理后台首页

**步骤 6**: 访问受保护页面(后续访问)
- 用户: 访问 `/admin/*` 任何页面
- 系统: 中间件自动验证 JWT,通过则允许访问,失败则重定向到登录页

**步骤 7**: 管理员登出
- 用户: 点击"退出登录"按钮
- 系统: 清除 Cookie,重定向到登录页

### UI Components

**组件 1: LoginForm**
- **位置**: `/admin/login` 页面中央
- **用途**: 收集管理员用户名和密码
- **元素**:
  - 用户名输入框(text input)
  - 密码输入框(password input)
  - "记住我"复选框(可选,延长会话时间)
  - "登录"按钮(submit button)
  - 错误提示消息(红色文本)
  - 加载状态(按钮禁用 + spinner)

**组件 2: AdminLayout**
- **位置**: 所有 `/admin/*` 页面的布局
- **用途**: 提供统一的管理后台布局和导航
- **元素**:
  - 顶部导航栏(包含 Logo、管理员名称、退出按钮)
  - 侧边导航菜单(社区管理、成员管理等)
  - 主内容区域(children)

**组件 3: LogoutButton**
- **位置**: 顶部导航栏右上角
- **用途**: 允许管理员退出登录
- **元素**:
  - "退出登录"按钮
  - 确认对话框(可选)

### Business Rules

1. **凭证匹配规则**: 用户名和密码必须同时匹配环境变量中的配置
2. **密码哈希验证**: 使用 bcrypt.compare() 验证密码,不比较明文
3. **会话有效期**: JWT 默认有效期 7 天,可配置
4. **记住我功能**: 勾选"记住我"延长会话到 30 天
5. **登录失败限制**: 前端显示错误消息,不暴露具体失败原因(用户名或密码错误)
6. **Cookie 安全**: 使用 HTTP-only、Secure(生产环境)、SameSite=Strict
7. **中间件保护**: 所有 `/admin/*` 路径自动验证 JWT

### Acceptance Criteria

- [ ] 环境变量配置正确(`ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`)
- [ ] 登录页面 UI 美观,移动端友好
- [ ] 用户名/密码验证正常工作
- [ ] 登录成功后生成 JWT 并设置 Cookie
- [ ] 登录成功后重定向到管理后台
- [ ] 登录失败显示错误消息
- [ ] 中间件自动保护 `/admin/*` 路径
- [ ] 未登录访问 `/admin/*` 重定向到登录页
- [ ] 登出功能正常工作(清除 Cookie)
- [ ] JWT 过期后自动重定向到登录页
- [ ] Cookie 配置安全(HTTP-only, Secure, SameSite)

---

## Technical Implementation

### API Endpoints

**端点 1: POST /api/auth/login**

**Purpose**: 验证管理员凭证并生成 JWT 会话

**Request**:
```typescript
interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean; // 可选,延长会话时间
}
```

**Response** (Success - 200):
```typescript
interface LoginSuccessResponse {
  success: true;
  message: string;
  redirectUrl: string; // '/admin/dashboard'
}
```

**Response** (Error - 401):
```typescript
interface LoginErrorResponse {
  success: false;
  error: string; // '用户名或密码错误'
}
```

**实现代码**:
```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, rememberMe } = body;

    // 验证必填字段
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: '用户名和密码不能为空' },
        { status: 400 }
      );
    }

    // 验证用户名
    if (username !== ADMIN_USERNAME) {
      return NextResponse.json(
        { success: false, error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 生成 JWT
    const expiresIn = rememberMe ? '30d' : '7d';
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn }
    );

    // 设置 HTTP-only Cookie
    const cookie = serialize('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60, // 秒
      path: '/',
    });

    const response = NextResponse.json({
      success: true,
      message: '登录成功',
      redirectUrl: '/admin/dashboard',
    });

    response.headers.set('Set-Cookie', cookie);
    return response;
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误,请稍后重试' },
      { status: 500 }
    );
  }
}
```

**端点 2: POST /api/auth/logout**

**Purpose**: 清除管理员会话

**Request**: 无 body

**Response** (Success - 200):
```typescript
interface LogoutResponse {
  success: true;
  message: string;
}
```

**实现代码**:
```typescript
// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // 清除 Cookie
  const cookie = serialize('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // 立即过期
    path: '/',
  });

  const response = NextResponse.json({
    success: true,
    message: '已退出登录',
  });

  response.headers.set('Set-Cookie', cookie);
  return response;
}
```

**端点 3: GET /api/auth/verify**

**Purpose**: 验证当前会话是否有效(可选,用于前端检查)

**Request**: 自动从 Cookie 读取 JWT

**Response** (Success - 200):
```typescript
interface VerifySuccessResponse {
  valid: true;
  user: {
    username: string;
    role: string;
  };
}
```

**Response** (Error - 401):
```typescript
interface VerifyErrorResponse {
  valid: false;
  error: string;
}
```

### Database Schema

无需数据库表(管理员凭证存储在环境变量中)

### Frontend Components

**组件 1: LoginForm**

**文件路径**: `src/components/admin/LoginForm.tsx`

**Props**:
```typescript
interface LoginFormProps {
  // 无 props,完全自包含
}
```

**State**:
```typescript
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**关键函数**:
- `handleSubmit()`: 提交登录表单
- `validateForm()`: 前端表单验证

**实现示例**:
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, rememberMe }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(data.redirectUrl);
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
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          用户名
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          密码
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
          disabled={loading}
        />
      </div>

      <div className="flex items-center">
        <input
          id="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2"
          disabled={loading}
        />
        <label htmlFor="rememberMe" className="text-sm">
          记住我(30天)
        </label>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? '登录中...' : '登录'}
      </button>
    </form>
  );
}
```

**组件 2: LogoutButton**

**文件路径**: `src/components/admin/LogoutButton.tsx`

**实现示例**:
```typescript
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!confirm('确定要退出登录吗?')) return;

    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('退出登录失败:', err);
      alert('退出登录失败,请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
    >
      {loading ? '退出中...' : '退出登录'}
    </button>
  );
}
```

### 中间件(Middleware)

**文件路径**: `src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 只保护 /admin/* 路径(除了 /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // 未登录,重定向到登录页
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // 验证 JWT
      jwt.verify(token, JWT_SECRET);
      // 验证通过,允许访问
      return NextResponse.next();
    } catch (error) {
      // JWT 无效或过期,重定向到登录页
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

### 环境变量配置

**文件路径**: `.env.local`

```bash
# JWT Secret(用于签名 JWT,必须保密)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# 管理员凭证
ADMIN_USERNAME="admin"

# 管理员密码哈希(使用 bcrypt 生成)
# 生成方法: node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your-password', 10).then(console.log);"
ADMIN_PASSWORD_HASH="$2b$10$abcdefghijklmnopqrstuvwxyz1234567890"
```

**生成密码哈希的脚本**:

```bash
# 安装 bcrypt
npm install bcrypt

# 生成哈希
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('YourSecurePassword123', 10).then(hash => console.log('ADMIN_PASSWORD_HASH=\"' + hash + '\"'));"
```

### State Management

无需全局状态管理(登录状态由 Cookie + 中间件管理)

---

## Tests

### Tier 1 Critical Path Test

**测试名称**: `管理员登录 - 完整登录流程`

**描述**: 验证管理员可以成功登录并访问受保护页面

**前置条件**:
- 环境变量已配置(`ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `JWT_SECRET`)
- 登录页面可访问(`/admin/login`)

**测试步骤**:
1. 访问 `/admin/dashboard`(未登录)
2. 验证自动重定向到 `/admin/login`
3. 输入正确的用户名和密码
4. 点击"登录"按钮
5. 验证登录成功并重定向到 `/admin/dashboard`
6. 验证可以访问其他管理页面(`/admin/communities`)
7. 点击"退出登录"
8. 验证重定向到 `/admin/login`
9. 验证再次访问 `/admin/dashboard` 时被重定向到登录页

**预期结果**:
- 未登录时无法访问 `/admin/*` 页面
- 登录成功后可访问所有管理页面
- 退出登录后无法访问管理页面
- Cookie 设置正确(HTTP-only, Secure)

**失败影响**: ❌ **阻止部署** (Tier 1 测试必须通过)

---

### E2E Tests

**测试 1: 成功登录流程**
```typescript
import { test, expect } from '@playwright/test';

test('管理员可以成功登录', async ({ page }) => {
  // 访问登录页
  await page.goto('/admin/login');

  // 填写表单
  await page.fill('[data-testid="username-input"]', process.env.ADMIN_USERNAME!);
  await page.fill('[data-testid="password-input"]', 'correct-password');

  // 提交登录
  await page.click('[data-testid="login-button"]');

  // 验证重定向到管理后台
  await expect(page).toHaveURL('/admin/dashboard');

  // 验证可以访问其他管理页面
  await page.goto('/admin/communities');
  await expect(page).toHaveURL('/admin/communities');
});
```

**测试 2: 登录失败处理**
```typescript
test('错误凭证应该显示错误消息', async ({ page }) => {
  await page.goto('/admin/login');

  // 输入错误密码
  await page.fill('[data-testid="username-input"]', 'admin');
  await page.fill('[data-testid="password-input"]', 'wrong-password');
  await page.click('[data-testid="login-button"]');

  // 验证错误消息
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="error-message"]')).toContainText('用户名或密码错误');

  // 验证仍在登录页
  await expect(page).toHaveURL('/admin/login');
});
```

**测试 3: 未登录访问保护页面**
```typescript
test('未登录访问管理页面应该重定向到登录页', async ({ page }) => {
  // 尝试访问管理后台
  await page.goto('/admin/dashboard');

  // 验证重定向到登录页
  await expect(page).toHaveURL('/admin/login');
});
```

**测试 4: 退出登录**
```typescript
test('退出登录应该清除会话', async ({ page }) => {
  // 先登录
  await page.goto('/admin/login');
  await page.fill('[data-testid="username-input"]', process.env.ADMIN_USERNAME!);
  await page.fill('[data-testid="password-input"]', 'correct-password');
  await page.click('[data-testid="login-button"]');
  await expect(page).toHaveURL('/admin/dashboard');

  // 退出登录
  await page.click('[data-testid="logout-button"]');
  await expect(page).toHaveURL('/admin/login');

  // 尝试访问管理页面,应该被重定向
  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL('/admin/login');
});
```

---

### Integration Tests

**测试 1: 登录 API**
```typescript
import { describe, it, expect } from '@jest/globals';

describe('POST /api/auth/login', () => {
  it('应该接受正确的凭证并返回成功', async () => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.ADMIN_USERNAME,
        password: 'correct-password',
      }),
    });

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.redirectUrl).toBe('/admin/dashboard');

    // 验证 Cookie 设置
    const cookies = response.headers.get('set-cookie');
    expect(cookies).toContain('auth-token');
    expect(cookies).toContain('HttpOnly');
  });

  it('应该拒绝错误的密码', async () => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.ADMIN_USERNAME,
        password: 'wrong-password',
      }),
    });

    const data = await response.json();
    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.error).toContain('用户名或密码错误');
  });

  it('应该拒绝空字段', async () => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: '', password: '' }),
    });

    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toContain('不能为空');
  });
});
```

**测试 2: 中间件保护**
```typescript
describe('Admin Middleware Protection', () => {
  it('应该阻止未认证访问 /admin/*', async () => {
    const response = await fetch('http://localhost:3000/admin/dashboard', {
      redirect: 'manual',
    });

    expect(response.status).toBe(307); // Redirect
    const location = response.headers.get('location');
    expect(location).toContain('/admin/login');
  });

  it('应该允许已认证用户访问 /admin/*', async () => {
    // 先登录获取 token
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.ADMIN_USERNAME,
        password: 'correct-password',
      }),
    });

    const cookies = loginResponse.headers.get('set-cookie');

    // 使用 token 访问管理页面
    const response = await fetch('http://localhost:3000/admin/dashboard', {
      headers: { Cookie: cookies! },
    });

    expect(response.status).toBe(200);
  });
});
```

---

### Unit Tests

**测试 1: bcrypt 密码验证**
```typescript
import bcrypt from 'bcrypt';
import { describe, it, expect } from '@jest/globals';

describe('Password Hashing', () => {
  it('应该正确验证匹配的密码', async () => {
    const password = 'TestPassword123';
    const hash = await bcrypt.hash(password, 10);
    const isValid = await bcrypt.compare(password, hash);

    expect(isValid).toBe(true);
  });

  it('应该拒绝不匹配的密码', async () => {
    const password = 'TestPassword123';
    const hash = await bcrypt.hash(password, 10);
    const isValid = await bcrypt.compare('WrongPassword', hash);

    expect(isValid).toBe(false);
  });
});
```

**测试 2: JWT 生成和验证**
```typescript
import jwt from 'jsonwebtoken';

describe('JWT Token', () => {
  const secret = 'test-secret';

  it('应该正确生成和验证 JWT', () => {
    const payload = { username: 'admin', role: 'admin' };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    const decoded = jwt.verify(token, secret) as any;
    expect(decoded.username).toBe('admin');
    expect(decoded.role).toBe('admin');
  });

  it('应该拒绝过期的 JWT', () => {
    const token = jwt.sign({ username: 'admin' }, secret, { expiresIn: '1ms' });

    // 等待 token 过期
    setTimeout(() => {
      expect(() => jwt.verify(token, secret)).toThrow();
    }, 10);
  });

  it('应该拒绝错误的签名', () => {
    const token = jwt.sign({ username: 'admin' }, 'wrong-secret');

    expect(() => jwt.verify(token, secret)).toThrow();
  });
});
```

---

## Notes

### Future Enhancements

- **多管理员支持**: 支持多个管理员账号(存储为 JSON 数组)
- **角色权限**: 添加角色系统(超级管理员、普通管理员)
- **登录日志**: 记录管理员登录时间和 IP 地址
- **二步验证**: 添加 TOTP 二步验证(Google Authenticator)
- **密码重置**: 添加管理员密码重置功能(通过环境变量更新)
- **会话管理**: 查看和管理所有活跃会话

### Known Limitations

- **单管理员**: 当前仅支持一个管理员账号
- **密码修改**: 修改密码需要重新生成哈希并更新环境变量
- **会话撤销**: 无法主动撤销已签发的 JWT(需等待过期)
- **环境变量暴露**: 需确保 `.env.local` 不被提交到版本控制

### References

- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [jsonwebtoken Documentation](https://github.com/auth0/node-jsonwebtoken)
- [HTTP-only Cookies Best Practices](https://owasp.org/www-community/HttpOnly)

---

**Related Documents**:
- [S-00: 系统架构概览](../system/S-00-architecture.md)
- [S-04: 认证系统](../system/S-04-authentication.md)
- [F-01: 数据库基础设施](./F-01-database-infra.md)
- [F-03: 社区管理](./F-03-community-management.md)
- [F-07: 管理员后台](./F-07-admin-panel.md)
