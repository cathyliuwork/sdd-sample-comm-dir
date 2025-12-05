# F-01: 数据库基础设施

**Version**: 1.0
**Last Updated**: 2025-12-04
**Priority**: CRITICAL
**Status**: ✅ Spec Complete

---

## Quick Reference

**What**: 搭建 Supabase PostgreSQL 数据库和 Prisma ORM 配置,建立数据库连接和迁移策略。

**Why**: 为整个应用提供数据持久化能力,是所有功能的基础设施。

**Dependencies**:
- 无(基础设施)

**Used By**:
- F-02: 管理员登录
- F-03: 社区管理
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
- 无(这是第一个基础功能)

### Required System Modules
- [S-00: 系统架构概览](../system/S-00-architecture.md) - 了解整体架构
- [S-03: 数据库设计](../system/S-03-database-schema.md) - 数据库模型定义

### Frontend Dependencies
- 无(纯后端基础设施)

### Backend Dependencies
- **Prisma Client** - 5.x
- **@prisma/client** - 用于类型安全的数据库访问
- **prisma** - Dev dependency,用于迁移和生成

### External Services
- **Supabase** - PostgreSQL 托管服务
- **PostgreSQL** - 15+

---

## PRD: Product Requirements

### Overview

数据库基础设施是整个应用的数据层基础,负责:

1. **数据库连接管理**: 配置 Supabase PostgreSQL 连接
2. **ORM 配置**: 设置 Prisma ORM 和 schema 定义
3. **数据迁移**: 建立数据库迁移策略和版本控制
4. **开发环境**: 提供本地开发数据库和测试数据库配置

该基础设施不直接面向用户,但为所有功能提供数据持久化能力。

### User Flow

**步骤 1**: 开发者配置数据库
- 开发者: 创建 Supabase 项目,获取数据库连接字符串
- 系统: 无响应(手动操作)

**步骤 2**: 开发者配置环境变量
- 开发者: 在 `.env.local` 文件中添加 `DATABASE_URL` 和 `DIRECT_URL`
- 系统: Prisma 读取环境变量

**步骤 3**: 开发者定义 Prisma Schema
- 开发者: 编写 `prisma/schema.prisma` 文件,定义数据模型
- 系统: Prisma 解析 schema 定义

**步骤 4**: 开发者执行数据库迁移
- 开发者: 运行 `npx prisma migrate dev` 创建迁移
- 系统: Prisma 生成 SQL 迁移文件并应用到数据库

**步骤 5**: 开发者生成 Prisma Client
- 开发者: 运行 `npx prisma generate`
- 系统: 生成类型安全的 TypeScript 客户端代码

**步骤 6**: 应用代码使用数据库
- 应用代码: 导入 `@prisma/client` 并执行 CRUD 操作
- 系统: Prisma Client 将操作转换为 SQL 查询并返回结果

### UI Components

无 UI 组件(纯后端基础设施)

### Business Rules

1. **数据库连接池管理**: Prisma Client 使用单例模式,避免连接泄漏
2. **迁移版本控制**: 所有迁移文件存储在 `prisma/migrations/` 目录
3. **开发环境隔离**: 本地开发使用独立数据库,不影响生产环境
4. **类型安全**: 所有数据库操作必须通过 Prisma Client,确保类型安全
5. **级联删除**: 社区删除时自动删除关联的成员数据

### Acceptance Criteria

- [ ] Supabase 项目创建成功,数据库可访问
- [ ] Prisma schema 定义完整,包含 Community 和 Member 模型
- [ ] 环境变量配置正确(`DATABASE_URL` 和 `DIRECT_URL`)
- [ ] 数据库迁移成功执行,表和索引创建正确
- [ ] Prisma Client 生成成功,类型定义正确
- [ ] 可以成功执行基本 CRUD 操作(创建、读取、更新、删除)
- [ ] 级联删除正常工作(删除社区时自动删除成员)
- [ ] 数据库连接池管理正确,无连接泄漏
- [ ] 迁移文件版本控制正常,可回滚

---

## Technical Implementation

### API Endpoints

无 API 端点(纯数据库基础设施)

### Database Schema

详见 [S-03: 数据库设计](../system/S-03-database-schema.md)

**核心表**:

1. **communities** - 社区表
2. **members** - 成员表

**完整 Prisma Schema**: `prisma/schema.prisma`

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ============================================
// 社区表（Communities）
// ============================================

model Community {
  id          String   @id @default(uuid())
  name        String   @db.VarChar(100)
  slug        String   @unique @db.VarChar(100)
  description String?  @db.Text
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // 关联关系
  members Member[]

  @@map("communities")
}

// ============================================
// 成员表（Members）
// ============================================

model Member {
  id             String   @id @default(uuid())
  communityId    String   @map("community_id")
  name           String   @db.VarChar(100)
  location       String   @db.VarChar(100)
  profession     String   @db.VarChar(200)
  currentWork    String?  @db.Text
  shareTopics    String?  @db.Text @map("share_topics")
  seekTopics     String?  @db.Text @map("seek_topics")
  createdAt      DateTime @default(now()) @map("created_at")

  // 关联关系
  community Community @relation(fields: [communityId], references: [id], onDelete: Cascade)

  @@index([communityId])
  @@index([createdAt(sort: Desc)])
  @@map("members")
}
```

### 环境变量配置

**文件路径**: `.env.local`

```bash
# Supabase PostgreSQL 连接
# 从 Supabase 项目设置 > Database > Connection String 获取

# Transaction mode (用于 Prisma Client 查询)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Session mode (用于 Prisma Migrate)
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

**配置说明**:

- `DATABASE_URL`: 使用 PgBouncer 连接池(端口 6543),用于应用查询
- `DIRECT_URL`: 直连数据库(端口 5432),用于 Prisma Migrate

### Prisma Client 单例模式

**文件路径**: `src/lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client';

// Prisma Client 单例模式,避免开发环境热重载时创建多个实例
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

**关键配置**:

- **单例模式**: 开发环境避免热重载时创建多个 Prisma Client 实例
- **日志级别**: 开发环境记录所有查询,生产环境仅记录错误
- **自动导入**: 其他模块通过 `import prisma from '@/lib/prisma'` 使用

### 数据库迁移策略

**迁移命令**:

```bash
# 创建新迁移(开发环境)
npx prisma migrate dev --name init

# 生成 Prisma Client
npx prisma generate

# 应用迁移到生产环境
npx prisma migrate deploy

# 重置数据库(仅开发环境,会删除所有数据)
npx prisma migrate reset

# 查看迁移状态
npx prisma migrate status
```

**迁移文件结构**:

```
prisma/
├── schema.prisma
└── migrations/
    ├── 20251204000001_init/
    │   └── migration.sql
    ├── 20251204000002_add_member_indexes/
    │   └── migration.sql
    └── migration_lock.toml
```

### 数据播种(Seed Data)

**文件路径**: `prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始播种数据...');

  // 创建测试社区
  const testCommunity = await prisma.community.create({
    data: {
      name: '测试社区',
      slug: 'test-community',
      description: '这是一个测试社区,用于开发和测试',
    },
  });

  console.log('创建测试社区:', testCommunity);

  // 创建测试成员
  const testMembers = await prisma.member.createMany({
    data: [
      {
        communityId: testCommunity.id,
        name: '张三',
        location: '北京',
        profession: '软件工程师',
        currentWork: '正在开发一个开源项目',
        shareTopics: '可以分享技术经验',
        seekTopics: '希望学习产品设计',
      },
      {
        communityId: testCommunity.id,
        name: '李四',
        location: '上海',
        profession: '产品经理',
        currentWork: '负责一款 SaaS 产品',
        shareTopics: '可以分享产品思维',
        seekTopics: '希望了解技术实现',
      },
    ],
  });

  console.log('创建测试成员:', testMembers.count);

  console.log('数据播种完成!');
}

main()
  .catch((e) => {
    console.error('数据播种失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**在 `package.json` 中配置**:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed"
  }
}
```

**运行播种**:

```bash
npm run db:seed
```

### State Management

无前端状态管理(纯后端基础设施)

---

## Tests

### Tier 1 Critical Path Test

**测试名称**: `数据库基础设施 - 连接和 CRUD 操作`

**描述**: 验证数据库连接正常,Prisma Client 可以执行基本 CRUD 操作

**前置条件**:
- Supabase 项目已创建
- 环境变量已配置(`DATABASE_URL` 和 `DIRECT_URL`)
- Prisma 迁移已执行

**测试步骤**:
1. 连接数据库
2. 创建测试社区
3. 读取刚创建的社区
4. 创建测试成员并关联到社区
5. 查询社区及其成员(包含关联查询)
6. 更新成员信息
7. 删除社区(验证级联删除)
8. 验证成员也被删除

**预期结果**:
- 数据库连接成功
- 所有 CRUD 操作正常执行
- 关联查询返回正确数据
- 级联删除正常工作(删除社区后成员也被删除)
- 无连接泄漏,无错误

**失败影响**: ❌ **阻止部署** (Tier 1 测试必须通过)

---

### E2E Tests

无 E2E 测试(纯后端基础设施,E2E 测试在功能层面进行)

---

### Integration Tests

**测试 1: 数据库连接**
```typescript
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import prisma from '@/lib/prisma';

describe('数据库连接集成测试', () => {
  beforeAll(async () => {
    // 确保数据库可用
    await prisma.$connect();
  });

  afterAll(async () => {
    // 清理连接
    await prisma.$disconnect();
  });

  it('应该成功连接到数据库', async () => {
    const result = await prisma.$queryRaw`SELECT 1 as value`;
    expect(result).toBeDefined();
  });

  it('应该可以查询数据库版本', async () => {
    const result = await prisma.$queryRaw`SELECT version()`;
    expect(result).toBeDefined();
  });
});
```

**测试 2: Community CRUD 操作**
```typescript
describe('Community CRUD 操作', () => {
  let testCommunityId: string;

  it('应该成功创建社区', async () => {
    const community = await prisma.community.create({
      data: {
        name: '测试社区',
        slug: 'test-community-' + Date.now(),
        description: '集成测试用社区',
      },
    });

    expect(community.id).toBeDefined();
    expect(community.name).toBe('测试社区');
    expect(community.slug).toContain('test-community-');

    testCommunityId = community.id;
  });

  it('应该成功读取社区', async () => {
    const community = await prisma.community.findUnique({
      where: { id: testCommunityId },
    });

    expect(community).toBeDefined();
    expect(community?.name).toBe('测试社区');
  });

  it('应该成功更新社区', async () => {
    const updated = await prisma.community.update({
      where: { id: testCommunityId },
      data: { description: '更新后的描述' },
    });

    expect(updated.description).toBe('更新后的描述');
  });

  it('应该成功删除社区', async () => {
    await prisma.community.delete({
      where: { id: testCommunityId },
    });

    const deleted = await prisma.community.findUnique({
      where: { id: testCommunityId },
    });

    expect(deleted).toBeNull();
  });
});
```

**测试 3: Member CRUD 操作和关联查询**
```typescript
describe('Member CRUD 操作和关联查询', () => {
  let testCommunityId: string;
  let testMemberId: string;

  beforeAll(async () => {
    // 创建测试社区
    const community = await prisma.community.create({
      data: {
        name: '测试社区',
        slug: 'test-member-community-' + Date.now(),
      },
    });
    testCommunityId = community.id;
  });

  afterAll(async () => {
    // 清理测试数据
    await prisma.community.delete({
      where: { id: testCommunityId },
    });
  });

  it('应该成功创建成员', async () => {
    const member = await prisma.member.create({
      data: {
        communityId: testCommunityId,
        name: '张三',
        location: '北京',
        profession: '软件工程师',
        currentWork: '开发项目',
      },
    });

    expect(member.id).toBeDefined();
    expect(member.name).toBe('张三');
    expect(member.communityId).toBe(testCommunityId);

    testMemberId = member.id;
  });

  it('应该成功查询社区及其成员(关联查询)', async () => {
    const community = await prisma.community.findUnique({
      where: { id: testCommunityId },
      include: { members: true },
    });

    expect(community).toBeDefined();
    expect(community?.members).toHaveLength(1);
    expect(community?.members[0].name).toBe('张三');
  });

  it('应该成功更新成员', async () => {
    const updated = await prisma.member.update({
      where: { id: testMemberId },
      data: { profession: '高级软件工程师' },
    });

    expect(updated.profession).toBe('高级软件工程师');
  });

  it('应该按 communityId 查询成员', async () => {
    const members = await prisma.member.findMany({
      where: { communityId: testCommunityId },
    });

    expect(members).toHaveLength(1);
    expect(members[0].name).toBe('张三');
  });
});
```

**测试 4: 级联删除**
```typescript
describe('级联删除测试', () => {
  it('删除社区时应该自动删除关联的成员', async () => {
    // 创建社区
    const community = await prisma.community.create({
      data: {
        name: '级联测试社区',
        slug: 'cascade-test-' + Date.now(),
      },
    });

    // 创建成员
    const member = await prisma.member.create({
      data: {
        communityId: community.id,
        name: '测试成员',
        location: '北京',
        profession: '测试',
      },
    });

    // 删除社区
    await prisma.community.delete({
      where: { id: community.id },
    });

    // 验证成员也被删除
    const deletedMember = await prisma.member.findUnique({
      where: { id: member.id },
    });

    expect(deletedMember).toBeNull();
  });
});
```

---

### Unit Tests

**测试 1: Prisma Client 单例模式**
```typescript
import { describe, it, expect } from '@jest/globals';
import prisma from '@/lib/prisma';

describe('Prisma Client 单例模式', () => {
  it('应该返回相同的 Prisma Client 实例', () => {
    const instance1 = prisma;
    const instance2 = prisma;

    expect(instance1).toBe(instance2);
  });

  it('Prisma Client 应该有所有模型定义', () => {
    expect(prisma.community).toBeDefined();
    expect(prisma.member).toBeDefined();
  });
});
```

**测试 2: Schema 验证**
```typescript
describe('Prisma Schema 验证', () => {
  it('Community 模型应该有必需字段', async () => {
    // 测试缺少必需字段会报错
    await expect(
      prisma.community.create({
        data: {
          // 缺少 name 和 slug
        } as any,
      })
    ).rejects.toThrow();
  });

  it('slug 应该是唯一的', async () => {
    const slug = 'unique-test-' + Date.now();

    // 创建第一个社区
    await prisma.community.create({
      data: { name: '社区1', slug },
    });

    // 尝试创建相同 slug 的社区应该失败
    await expect(
      prisma.community.create({
        data: { name: '社区2', slug },
      })
    ).rejects.toThrow();

    // 清理
    await prisma.community.delete({ where: { slug } });
  });
});
```

---

## Notes

### Future Enhancements

- **连接池监控**: 添加 Prisma Metrics 监控数据库连接池使用情况
- **查询优化**: 使用 Prisma 查询分析工具优化慢查询
- **数据库备份**: 配置 Supabase 自动备份策略
- **只读副本**: 为查询密集型操作配置只读数据库副本
- **全文搜索**: 添加 PostgreSQL 全文搜索索引(用于成员搜索)

### Known Limitations

- **迁移回滚**: Prisma Migrate 不支持自动回滚,需要手动创建回滚迁移
- **连接限制**: Supabase 免费版有连接数限制,需要合理使用连接池
- **PgBouncer 限制**: 使用 PgBouncer 时不支持某些 PostgreSQL 特性(如 LISTEN/NOTIFY)

### References

- [Prisma 官方文档](https://www.prisma.io/docs)
- [Supabase 数据库文档](https://supabase.com/docs/guides/database)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
- [Prisma 最佳实践](https://www.prisma.io/docs/guides/performance-and-optimization)

---

**Related Documents**:
- [S-00: 系统架构概览](../system/S-00-architecture.md)
- [S-03: 数据库设计](../system/S-03-database-schema.md)
- [F-02: 管理员登录](./F-02-admin-login.md)
- [F-03: 社区管理](./F-03-community-management.md)
