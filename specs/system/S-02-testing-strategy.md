# S-02: 测试策略

**Version**: 1.0
**Last Updated**: 2025-12-04
**Status**: ✅ Spec Complete

---

## Quick Reference

**Purpose**: 定义微信群成员介绍项目的测试金字塔、测试框架和质量保证流程。

**Dependencies**:
- S-00: 系统架构概览

**Used By**:
- 所有功能模块（F-01 到 F-07）
- CI/CD 流程
- 质量保证流程

---

## Dependencies

### Required System Modules
- [S-00: 系统架构概览](./S-00-architecture.md) - 了解系统整体架构和技术栈

### External Services
- **Playwright** - E2E 测试框架
- **Jest** - 单元测试和集成测试框架
- **React Testing Library** - React 组件测试
- **GitHub Actions** - CI/CD 自动化测试

### Infrastructure Requirements
- Next.js 14 + React 18 + TypeScript
- Supabase PostgreSQL 测试数据库
- Node.js 18+

---

## 测试概览

### 测试目标

1. **保证核心功能稳定性**: Tier 1 关键路径测试必须 100% 通过
2. **快速反馈**: 单元测试和集成测试在本地快速运行
3. **真实场景覆盖**: E2E 测试覆盖真实用户流程
4. **持续集成**: 所有测试在 CI 环境自动运行
5. **可维护性**: 测试代码清晰、易维护、易扩展

### 测试原则

1. **测试金字塔**: 单元测试 > 集成测试 > E2E 测试
2. **关键路径优先**: Tier 1 测试覆盖核心业务流程
3. **快速失败**: 测试失败时快速定位问题
4. **隔离测试**: 测试之间互不影响
5. **可重复性**: 测试结果稳定可重复

---

## 测试金字塔

```mermaid
graph TB
    subgraph "测试金字塔"
        E2E["E2E 测试<br/>（关键用户流程）<br/>~10 个测试"]
        Integration["集成测试<br/>（API + 数据库）<br/>~30 个测试"]
        Unit["单元测试<br/>（组件 + 工具函数）<br/>~100 个测试"]
    end

    E2E -->|速度慢，覆盖广| Integration
    Integration -->|速度中，覆盖中| Unit
    Unit -->|速度快，覆盖深| Bottom["金字塔底部：最多数量"]

    classDef e2e fill:#fef2f2,stroke:#dc2626
    classDef integration fill:#fff7ed,stroke:#ea580c
    classDef unit fill:#f0fdf4,stroke:#16a34a

    class E2E e2e
    class Integration integration
    class Unit unit
```

### 测试类型分布

| 测试类型 | 数量占比 | 运行速度 | 覆盖范围 | 维护成本 |
|---------|---------|---------|---------|---------|
| **E2E 测试** | 10% | 慢（秒级） | 广（整个流程） | 高 |
| **集成测试** | 30% | 中（毫秒级） | 中（模块间交互） | 中 |
| **单元测试** | 60% | 快（毫秒级） | 深（单个函数） | 低 |

---

## Tier 1 关键路径测试

### 定义

**Tier 1 测试**是覆盖核心业务流程的关键路径测试，这些测试失败将**阻止部署**。

### Tier 1 测试清单

| ID | 测试名称 | 测试类型 | 覆盖功能 | 优先级 |
|----|---------|---------|---------|--------|
| **T1-01** | 普通用户填写表单并提交 | E2E | F-04 成员信息收集表单 | CRITICAL |
| **T1-02** | 用户查看社区成员列表 | E2E | F-06 成员列表查看 | CRITICAL |
| **T1-03** | 用户复制分享内容 | E2E | F-05 分享内容生成 | CRITICAL |
| **T1-04** | 管理员登录 | E2E | F-02 管理员登录 | CRITICAL |
| **T1-05** | 管理员创建社区 | E2E | F-03 社区管理 | CRITICAL |
| **T1-06** | 管理员查看和管理成员数据 | E2E | F-07 管理员后台 | HIGH |

**通过标准**: Tier 1 测试必须 100% 通过才能部署到生产环境。

---

## 测试框架

### E2E 测试（Playwright）

#### 安装和配置

```bash
npm install -D @playwright/test
npx playwright install
```

**配置文件** (`playwright.config.ts`):
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### E2E 测试示例

**T1-01: 普通用户填写表单并提交**

```typescript
// e2e/member-form-submission.spec.ts
import { test, expect } from '@playwright/test';

test.describe('T1-01: 普通用户填写表单并提交', () => {
  test('用户可以成功填写表单并生成分享内容', async ({ page }) => {
    // 1. 访问社区表单页面
    const slug = 'test-community-123';
    await page.goto(`/c/${slug}/form`);

    // 2. 验证表单页面已加载
    await expect(page.locator('h1')).toContainText('成员信息收集');

    // 3. 填写必填字段
    await page.fill('input[name="name"]', '张三');
    await page.fill('input[name="location"]', '北京');
    await page.fill('input[name="profession"]', '产品经理');

    // 4. 填写选填字段
    await page.fill('textarea[name="currentWork"]', '正在开发一个微信群管理工具');
    await page.fill('textarea[name="shareTopics"]', '分享产品设计经验');
    await page.fill('textarea[name="seekTopics"]', '学习技术实现');

    // 5. 提交表单
    await page.click('button[type="submit"]');

    // 6. 验证成功提示
    await expect(page.locator('[role="alert"]')).toContainText('提交成功');

    // 7. 验证跳转到分享内容页面
    await expect(page).toHaveURL(/\/share/);

    // 8. 验证分享内容已生成
    const shareContent = page.locator('[data-testid="share-content"]');
    await expect(shareContent).toContainText('张三');
    await expect(shareContent).toContainText('北京');
    await expect(shareContent).toContainText('产品经理');

    // 9. 验证复制按钮可用
    await expect(page.locator('button:has-text("复制")')).toBeVisible();
  });

  test('用户未填写必填字段时显示错误提示', async ({ page }) => {
    const slug = 'test-community-123';
    await page.goto(`/c/${slug}/form`);

    // 不填写任何字段，直接提交
    await page.click('button[type="submit"]');

    // 验证错误提示
    await expect(page.locator('text=请输入姓名')).toBeVisible();
    await expect(page.locator('text=请输入所在地')).toBeVisible();
    await expect(page.locator('text=请输入职业/行业')).toBeVisible();
  });
});
```

### 集成测试（Jest + API）

#### 安装和配置

```bash
npm install -D jest @types/jest ts-jest
npm install -D @testing-library/react @testing-library/jest-dom
```

**配置文件** (`jest.config.js`):
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

#### 集成测试示例

**API 集成测试**:

```typescript
// __tests__/api/members.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/members';
import { prisma } from '@/lib/prisma';

describe('POST /api/members', () => {
  beforeEach(async () => {
    // 清理测试数据
    await prisma.member.deleteMany();
    await prisma.community.deleteMany();

    // 创建测试社区
    await prisma.community.create({
      data: {
        id: 'test-community',
        name: '测试社区',
        slug: 'test-community',
      },
    });
  });

  it('成功创建成员记录', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        communityId: 'test-community',
        name: '张三',
        location: '北京',
        profession: '产品经理',
        currentWork: '正在做的事情',
        shareTopics: '希望分享的内容',
        seekTopics: '希望收获的内容',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const responseData = JSON.parse(res._getData());
    expect(responseData.member.name).toBe('张三');
    expect(responseData.member.location).toBe('北京');

    // 验证数据库中已创建记录
    const member = await prisma.member.findUnique({
      where: { id: responseData.member.id },
    });
    expect(member).not.toBeNull();
    expect(member?.name).toBe('张三');
  });

  it('缺少必填字段时返回 400 错误', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        communityId: 'test-community',
        // 缺少 name, location, profession
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const responseData = JSON.parse(res._getData());
    expect(responseData.error).toBeDefined();
  });

  it('社区不存在时返回 404 错误', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        communityId: 'non-existent-community',
        name: '张三',
        location: '北京',
        profession: '产品经理',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
  });
});
```

### 单元测试（Jest + React Testing Library）

#### 单元测试示例

**组件测试**:

```typescript
// __tests__/components/MemberCard.test.tsx
import { render, screen } from '@testing-library/react';
import MemberCard from '@/components/MemberCard';

describe('MemberCard 组件', () => {
  const mockMember = {
    id: '1',
    name: '张三',
    location: '北京',
    profession: '产品经理',
    currentWork: '正在做的事情',
    shareTopics: '希望分享的内容',
    seekTopics: '希望收获的内容',
    createdAt: new Date('2025-12-04'),
  };

  it('正确渲染成员信息', () => {
    render(<MemberCard member={mockMember} />);

    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText(/北京/)).toBeInTheDocument();
    expect(screen.getByText(/产品经理/)).toBeInTheDocument();
    expect(screen.getByText('正在做的事情')).toBeInTheDocument();
  });

  it('选填字段为空时不显示', () => {
    const memberWithoutOptional = {
      ...mockMember,
      currentWork: null,
      shareTopics: null,
      seekTopics: null,
    };

    render(<MemberCard member={memberWithoutOptional} />);

    expect(screen.queryByText('正在做的事情')).not.toBeInTheDocument();
  });
});
```

**工具函数测试**:

```typescript
// __tests__/utils/generateShareText.test.ts
import { generateShareText } from '@/utils/generateShareText';

describe('generateShareText 工具函数', () => {
  it('生成正确的分享文本格式', () => {
    const member = {
      name: '张三',
      location: '北京',
      profession: '产品经理',
      currentWork: '正在做的事情',
      shareTopics: '希望分享的内容',
      seekTopics: '希望收获的内容',
    };

    const shareText = generateShareText(member);

    expect(shareText).toContain('姓名: 张三');
    expect(shareText).toContain('所在地: 北京');
    expect(shareText).toContain('职业/行业: 产品经理');
    expect(shareText).toContain('正在做的事情: 正在做的事情');
  });

  it('选填字段为空时不包含在分享文本中', () => {
    const member = {
      name: '张三',
      location: '北京',
      profession: '产品经理',
      currentWork: null,
      shareTopics: null,
      seekTopics: null,
    };

    const shareText = generateShareText(member);

    expect(shareText).not.toContain('正在做的事情');
    expect(shareText).not.toContain('希望分享');
    expect(shareText).not.toContain('希望收获');
  });
});
```

---

## 测试覆盖率目标

### 覆盖率要求

| 代码类型 | 覆盖率目标 | 说明 |
|---------|-----------|------|
| **API Routes** | ≥ 90% | 所有业务逻辑必须测试 |
| **组件** | ≥ 80% | 核心组件必须测试 |
| **工具函数** | ≥ 95% | 纯函数易测试，要求高覆盖 |
| **整体** | ≥ 80% | 项目整体代码覆盖率 |

### 生成覆盖率报告

```bash
# 运行测试并生成覆盖率报告
npm run test:coverage

# 查看 HTML 报告
open coverage/index.html
```

**Jest 覆盖率配置**:
```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

---

## 测试数据管理

### 测试数据库

使用独立的测试数据库，避免污染开发/生产数据：

**环境变量** (`.env.test`):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/wechat_intro_test"
```

### 数据工厂（Test Fixtures）

创建可重用的测试数据工厂：

```typescript
// __tests__/fixtures/factory.ts
export const createTestCommunity = async (overrides = {}) => {
  return await prisma.community.create({
    data: {
      name: '测试社区',
      slug: `test-community-${Date.now()}`,
      description: '这是一个测试社区',
      ...overrides,
    },
  });
};

export const createTestMember = async (communityId: string, overrides = {}) => {
  return await prisma.member.create({
    data: {
      communityId,
      name: '测试成员',
      location: '北京',
      profession: '测试工程师',
      ...overrides,
    },
  });
};
```

### 测试数据清理

每个测试前后自动清理数据：

```typescript
// __tests__/setup.ts
import { prisma } from '@/lib/prisma';

beforeEach(async () => {
  // 清理所有测试数据
  await prisma.member.deleteMany();
  await prisma.community.deleteMany();
});

afterAll(async () => {
  // 关闭数据库连接
  await prisma.$disconnect();
});
```

---

## CI/CD 集成

### GitHub Actions 工作流

**测试工作流** (`.github/workflows/test.yml`):
```yaml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: wechat_intro_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/wechat_intro_test

      - name: Run unit and integration tests
        run: npm run test:ci
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/wechat_intro_test

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          BASE_URL: http://localhost:3000

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload coverage report
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          fail_ci_if_error: true
```

### 测试命令脚本

**package.json**:
```json
{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 测试最佳实践

### 1. 测试命名规范

使用清晰的测试描述：

```typescript
// ✅ 好的测试命名
test('用户填写完整表单后可以成功提交', async () => { /* ... */ });
test('用户未填写必填字段时显示错误提示', async () => { /* ... */ });

// ❌ 不好的测试命名
test('测试 1', async () => { /* ... */ });
test('表单提交', async () => { /* ... */ });
```

### 2. AAA 模式（Arrange-Act-Assert）

```typescript
test('成员卡片正确显示成员信息', () => {
  // Arrange: 准备测试数据
  const member = {
    name: '张三',
    location: '北京',
    profession: '产品经理',
  };

  // Act: 执行操作
  render(<MemberCard member={member} />);

  // Assert: 验证结果
  expect(screen.getByText('张三')).toBeInTheDocument();
});
```

### 3. 测试隔离

每个测试应该独立运行，互不影响：

```typescript
// ✅ 好的测试隔离
beforeEach(() => {
  // 每个测试前重置状态
  cleanup();
});

// ❌ 不好的测试隔离（依赖其他测试）
test('测试 A 创建数据', () => { /* ... */ });
test('测试 B 使用测试 A 的数据', () => { /* ... */ }); // 依赖测试 A
```

### 4. 测试数据使用

使用有意义的测试数据，避免魔法数字：

```typescript
// ✅ 好的测试数据
const VALID_MEMBER_DATA = {
  name: '张三',
  location: '北京',
  profession: '产品经理',
};

// ❌ 不好的测试数据
const data = { a: 'x', b: 'y', c: 'z' };
```

### 5. 避免测试实现细节

测试应该关注行为，而非实现细节：

```typescript
// ✅ 好的测试（测试行为）
test('点击提交按钮后显示成功提示', async () => {
  await page.click('button[type="submit"]');
  await expect(page.locator('[role="alert"]')).toContainText('成功');
});

// ❌ 不好的测试（测试实现）
test('调用 handleSubmit 函数', () => {
  const spy = jest.spyOn(component, 'handleSubmit');
  // ...
});
```

---

## Related Documents

### 系统设计模块
- [S-00: 系统架构概览](./S-00-architecture.md)
- [S-01: UI/UX 设计系统](./S-01-uiux-design.md)
- [S-03: 数据库设计](./S-03-database-schema.md)

### 功能模块
- [F-04: 成员信息收集表单](../features/F-04-member-form.md) - 包含详细测试用例
- [F-06: 成员列表查看](../features/F-06-member-list.md) - 包含详细测试用例

---

## Notes

### 测试工具资源

- **Playwright**: https://playwright.dev
- **Jest**: https://jestjs.io
- **React Testing Library**: https://testing-library.com/react
- **Testing Best Practices**: https://testingjavascript.com

### 持续改进

测试策略应该随着项目演进不断优化：

1. **定期审查测试覆盖率**，确保核心功能有足够测试
2. **重构冗余测试**，保持测试代码简洁
3. **优化测试速度**，提高开发效率
4. **更新测试文档**，保持文档与代码同步

### 微信浏览器测试注意事项

由于项目主要面向微信浏览器，E2E 测试需要特别关注：

1. **iOS 微信浏览器**: 使用 Playwright 的 Mobile Safari 配置
2. **Android 微信浏览器**: 使用 Android Chrome 配置
3. **真机测试**: 定期在真实微信浏览器中手动测试关键流程
