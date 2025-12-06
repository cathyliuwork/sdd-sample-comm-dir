# S-06: 部署策略

**Version**: 1.0
**Last Updated**: 2025-12-05
**Status**: ✅ Spec Complete

---

## Quick Reference

**Purpose**: 定义社区成员名录项目的部署策略，基于 AI Builder/Koyeb 平台的容器化部署方案。

**Dependencies**:
- S-00: 系统架构概览
- S-03: 数据库设计（Supabase）
- S-04: 认证系统（环境变量配置）

**Used By**:
- 生产环境部署
- CI/CD 流程
- 运维监控

---

## Dependencies

### Required System Modules
- [S-00: 系统架构概览](./S-00-architecture.md) - 技术栈定义和整体架构
- [S-03: 数据库设计](./S-03-database-schema.md) - Supabase PostgreSQL 配置
- [S-04: 认证系统](./S-04-authentication.md) - 环境变量和认证配置

### External Services
- **GitHub** - 代码仓库（必须公开）
- **AI Builder/Koyeb** - 容器托管平台
- **Supabase** - PostgreSQL 数据库（已配置）

### Infrastructure Requirements
- Docker（用于本地测试，可选）
- Git（代码版本控制）
- Node.js 18+（开发环境）

---

## 部署概述

### 部署平台介绍

**AI Builder/Koyeb** 是一个实验性的免费容器托管平台，为学生项目提供简单的部署方式。

**平台特点**:

1. **免费额度**: 12 个月免费（从首次成功部署开始计算）
2. **资源限制**: 256 MB RAM，nano 级容器
3. **服务限制**: 每用户最多 2 个服务（默认，可向讲师申请增加）
4. **自动部署**: 监听 GitHub 仓库，自动构建和部署
5. **公开域名**: 自动提供 `{service-name}.ai-builders.space` 子域名

**适用场景**:
- MVP 和演示项目
- 学习和实验
- 轻量级应用

**限制说明**:
- 不适合生产级应用（资源有限）
- 实验性平台，稳定性不如商业平台
- 服务删除或延期需联系讲师

### 部署模型

```mermaid
graph LR
    subgraph "开发环境"
        Dev[本地开发]
    end

    subgraph "代码仓库"
        Git[GitHub 公开仓库]
    end

    subgraph "部署平台"
        API[AI Builder API]
        Koyeb[Koyeb 运行时]
    end

    subgraph "数据库"
        DB[(Supabase PostgreSQL)]
    end

    subgraph "用户访问"
        User[最终用户]
    end

    Dev -->|git push| Git
    Git -->|POST /v1/deployments| API
    API -->|构建 Docker 镜像| Koyeb
    Koyeb -->|读写数据| DB
    User -->|HTTPS| Koyeb

    classDef dev fill:#e3f2fd,stroke:#1976d2
    classDef infra fill:#fff3e0,stroke:#f57c00
    classDef data fill:#f3e5f5,stroke:#7b1fa2

    class Dev dev
    class Git,API,Koyeb infra
    class DB data
```

**部署流程**:
1. 开发者在本地编写代码并测试
2. 将代码推送到 GitHub 公开仓库
3. 调用 AI Builder API 触发部署（或自动触发）
4. Koyeb 拉取代码、构建 Docker 镜像、启动容器
5. 应用通过 HTTPS 对外提供服务
6. 应用连接 Supabase 数据库进行数据读写

---

## 技术要求详解

### 1. Dockerfile 必需 ✅

**要求**: 项目根目录必须包含 `Dockerfile`

**说明**:
- AI Builder 使用 Docker 构建应用镜像
- Dockerfile 定义了基础镜像、依赖安装、构建步骤、运行时配置
- 必须优化镜像大小以满足 256 MB RAM 限制

**本项目配置**:
- 使用多阶段构建减小镜像大小
- 基础镜像: `node:18-alpine`（轻量级）
- 构建阶段: 安装依赖、生成 Prisma Client、构建 Next.js
- 运行阶段: 仅复制必需文件，使用 standalone 模式

**文件位置**: `/Dockerfile`（项目根目录）

### 2. 单进程/单端口 ✅

**要求**: 所有内容（API + 静态文件）从一个 HTTP 服务器提供

**说明**:
- 不能同时运行多个 web 服务器
- 不能运行后台进程（如独立的 worker）
- 所有请求必须通过同一个端口处理

**Next.js 满足条件**:
- `next start` 命令启动单一 HTTP 服务器
- 自动服务 API Routes（`/api/*`）
- 自动服务静态资源（`.next/static/*`）
- 自动服务 SSR 页面和客户端路由
- Standalone 模式进一步优化了单进程部署

**验证方式**:
```bash
# 本地测试时，应该只看到一个 Node.js 进程
ps aux | grep node
```

### 3. PORT 环境变量 ✅

**要求**: 应用必须读取 `PORT` 环境变量并监听该端口

**说明**:
- Koyeb 在运行时动态设置 `PORT` 环境变量
- 应用不能硬编码端口号（如 3000）
- 必须在应用启动时读取 `process.env.PORT`

**Next.js 默认支持**:
- `next start` 自动读取 `PORT` 环境变量
- 如未设置 PORT，默认使用 3000
- Standalone 的 `server.js` 自动处理 PORT

**Dockerfile 配置**:
```dockerfile
# Standalone 模式的 server.js 会自动读取 PORT
CMD ["node", "server.js"]
```

**无需手动传递 PORT**:
```dockerfile
# ❌ 不需要这样做
CMD sh -c "node server.js --port ${PORT:-3000}"

# ✅ Standalone 已自动处理
CMD ["node", "server.js"]
```

### 4. 公开仓库 ✅

**要求**: 代码必须在 GitHub 公开仓库

**原因**:
- AI Builder 是实验性功能，运行在共享基础设施
- 公开仓库便于平台拉取代码
- 确保不包含敏感信息

**安全措施**:
- 敏感信息（数据库密码、API keys）存储在环境变量
- `.gitignore` 包含 `.env`, `.env.local`, `.env.production`
- `.env.example` 提供配置模板（不含真实值）
- 代码审查：确保没有硬编码的 secrets

**检查清单**:
- [ ] 仓库设置为 Public
- [ ] .env 文件在 .gitignore 中
- [ ] Git 历史中无敏感信息
- [ ] .env.example 不包含真实凭证

### 5. AI_BUILDER_TOKEN（可选） ℹ️

**说明**: 平台自动注入 `AI_BUILDER_TOKEN` 环境变量

**用途**:
- 可选使用，用于调用 AI Builder 后端服务
- 提供统一的 API 认证方式

**本项目**:
- **不需要使用**：项目仅使用 Supabase 数据库
- 环境变量会被注入，但应用不读取

**如需使用**:
```javascript
const token = process.env.AI_BUILDER_TOKEN
// 用于调用 AI Builder API
```

### 6. 资源限制 ⚠️

**限制**: 256 MB RAM

**影响**:
- 镜像大小必须小于 256 MB
- 应用运行时内存占用必须 < 200 MB
- 需要优化依赖和构建产物

**优化策略**:

1. **使用精简基础镜像**:
   ```dockerfile
   FROM node:18-alpine  # ~50MB vs node:18 ~300MB
   ```

2. **多阶段构建**:
   - Builder 阶段: 包含构建工具（不进入最终镜像）
   - Runner 阶段: 仅包含运行时文件

3. **Standalone 模式**:
   - 仅复制必需依赖（vs 整个 node_modules）
   - 生成自包含的 server.js

4. **优化 .dockerignore**:
   - 排除 specs、tests、文档等不必要文件
   - 减少 Docker 构建上下文

5. **生产依赖**:
   ```dockerfile
   RUN npm ci  # 在 builder 阶段安装所有依赖
   # Standalone 会自动选择生产依赖
   ```

**预期镜像大小**: 约 120-150 MB

### 7. 提前构建 ✅

**要求**: React/Next.js 资产必须在构建阶段生成

**说明**:
- 运行时不能执行 `npm run build`
- 静态资源必须在 Dockerfile 中构建
- 容器启动时直接执行 `next start`

**Dockerfile 配置**:
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
RUN npm run build  # 生成 .next 目录

# 运行阶段
FROM node:18-alpine AS runner
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
CMD ["node", "server.js"]  # 仅启动，不构建
```

---

## 部署配置

### Dockerfile 完整配置

**文件路径**: `/Dockerfile` (项目根目录)

```dockerfile
# ==================================================
# 阶段 1: 构建阶段（Builder）
# ==================================================
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 1. 复制依赖定义文件
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# 2. 安装所有依赖（包括 devDependencies，构建需要）
RUN npm ci

# 3. 复制应用源代码
COPY . .

# 4. 生成 Prisma Client（必需，数据库访问）
RUN npx prisma generate

# 5. 构建 Next.js 应用（生成 .next 目录）
RUN npm run build

# ==================================================
# 阶段 2: 运行阶段（Runner）
# ==================================================
FROM node:18-alpine AS runner

# 设置工作目录
WORKDIR /app

# 设置环境为生产环境
ENV NODE_ENV=production

# 禁用 Next.js 遥测（减小体积）
ENV NEXT_TELEMETRY_DISABLED=1

# 6. 创建非 root 用户（安全最佳实践）
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# 7. 复制构建产物（仅复制必需文件）
# standalone 模式会生成自包含的服务器
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 8. 复制 Prisma Client（数据库访问必需）
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# 9. 切换到非 root 用户
USER nextjs

# 10. 暴露端口（文档用途，实际端口由 PORT 环境变量决定）
EXPOSE 3000

# 11. 启动命令
# standalone 模式生成的 server.js 会自动读取 PORT 环境变量
CMD ["node", "server.js"]
```

**配置说明**:

1. **多阶段构建**:
   - Builder 阶段包含构建工具（~300MB）
   - Runner 阶段仅包含运行时（~120MB）
   - 最终镜像减小 60%+

2. **node:18-alpine**:
   - 基于 Alpine Linux（极简发行版）
   - 基础镜像仅 ~50MB vs ~300MB
   - 满足 256 MB RAM 限制

3. **npm ci**:
   - 比 `npm install` 更快、更可靠
   - 严格按照 `package-lock.json` 安装
   - 适合 CI/CD 环境

4. **Prisma Client**:
   - 必须在 builder 阶段执行 `prisma generate`
   - 将生成的 `.prisma` 和 `@prisma` 复制到运行镜像
   - 否则运行时无法访问数据库

5. **Standalone 模式**:
   - Next.js 14 推荐方式
   - 生成 `server.js` 自包含服务器
   - 自动复制必需依赖
   - 显著减小镜像大小

6. **非 root 用户**:
   - 安全最佳实践
   - 限制容器内权限
   - 防止权限提升攻击

7. **PORT 环境变量**:
   - Standalone 的 `server.js` 自动读取 PORT
   - 无需手动传递 `-p ${PORT}`
   - 简化配置，减少错误

### next.config.js 配置

**文件路径**: `/next.config.js`

**必需配置**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 standalone 输出模式（Docker 部署必需）
  output: 'standalone',

  // 可选：禁用遥测（减小体积）
  telemetry: false,

  // 可选：启用 GZIP 压缩
  compress: true,
}

module.exports = nextConfig
```

**说明**:
- `output: 'standalone'` 是关键配置
- 会生成自包含的 `server.js` 和最小依赖
- 显著减小 Docker 镜像大小

### .dockerignore 配置

**文件路径**: `/.dockerignore`

```
# ==================================================
# Node.js 依赖和构建产物
# ==================================================
node_modules
npm-debug.log
yarn-error.log
pnpm-debug.log
.pnpm-store

# 构建产物（会在容器内重新构建）
.next
out
dist
build

# ==================================================
# 开发工具和配置
# ==================================================
.git
.gitignore
.github
.vscode
.idea
.DS_Store
*.swp
*.swo
*~

# ==================================================
# 环境变量（敏感信息）
# ==================================================
.env
.env.local
.env.development
.env.production
.env.test
!.env.example

# ==================================================
# 测试文件
# ==================================================
*.test.ts
*.test.tsx
*.test.js
*.test.jsx
*.spec.ts
*.spec.tsx
*.spec.js
*.spec.jsx
__tests__
__mocks__
coverage
.nyc_output
playwright-report
test-results

# ==================================================
# 文档和规格说明（不需要部署）
# ==================================================
specs
cookbook
README.md
CLAUDE.md
*.md
!package.json

# ==================================================
# 开发脚本
# ==================================================
scripts/generate-password-hash.ts
scripts/test-password.ts

# ==================================================
# 其他不需要的文件
# ==================================================
.prettierrc
.eslintrc.json
.editorconfig
tsconfig.json
jest.config.js
playwright.config.ts
```

**优化效果**:
- 排除 ~300 MB `node_modules`（容器内重新安装）
- 排除 ~100 MB 规格文档
- 排除测试和开发文件
- 减少 Docker 构建上下文传输时间

---

## 环境变量配置

### 必需环境变量

在 AI Builder 部署时，需要设置以下环境变量：

```env
# Supabase Database Connection
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Application Settings
NEXT_PUBLIC_APP_URL="https://{service-name}.ai-builders.space"

# JWT Configuration
JWT_SECRET="production-secret-key-min-32-chars-use-crypto-randomBytes"
JWT_EXPIRES_IN="7d"

# Admin Credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="$2b$10$..."

# Node Environment
NODE_ENV="production"
```

### 环境变量说明

| 变量名 | 必需 | 说明 | 示例 |
|--------|------|------|------|
| `DATABASE_URL` | ✅ | Supabase 事务模式连接（pgbouncer） | `postgresql://...` |
| `DIRECT_URL` | ✅ | Supabase 会话模式连接（迁移用） | `postgresql://...` |
| `NEXT_PUBLIC_APP_URL` | ✅ | 应用公开访问 URL | `https://comm-dir.ai-builders.space` |
| `JWT_SECRET` | ✅ | JWT 签名密钥（≥32 字符） | `hex-string-32-bytes` |
| `JWT_EXPIRES_IN` | ✅ | Token 过期时间 | `7d` |
| `ADMIN_USERNAME` | ✅ | 管理员用户名 | `admin` |
| `ADMIN_PASSWORD_HASH` | ✅ | 管理员密码 bcrypt hash | `$2b$10$...` |
| `NODE_ENV` | ✅ | Node.js 运行环境 | `production` |
| `PORT` | ⚠️ 自动设置 | Koyeb 自动注入，无需手动设置 | - |
| `AI_BUILDER_TOKEN` | ℹ️ 自动注入 | 平台自动注入（本项目不使用） | - |

### 生成环境变量

#### 生成 JWT Secret

```bash
# 使用 Node.js crypto 生成 32 字节随机字符串
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 输出示例:
# 5a8f3d2b7c1e9f4a6d8b3c7e2a9f1b5d4c8e6a3f7b2d9c1e5a8f4b7d3c6e9a2
```

#### 生成管理员密码 Hash

```bash
# 使用项目提供的脚本
npx tsx scripts/generate-password-hash.ts YourStrongPassword123

# 输出示例:
# Password hash (for .env file):
# ADMIN_PASSWORD_HASH="$2b$10$abc123..."
```

---

## 部署流程

### 前置准备

#### 1. 创建 GitHub 公开仓库

```bash
# 如果还未创建仓库
gh repo create sdd-sample-comm-dir --public --source=. --remote=origin

# 如果仓库是私有的，改为公开
gh repo edit --visibility public
```

#### 2. 验证部署文件

确保以下文件已创建：

- [ ] `Dockerfile` - 项目根目录
- [ ] `.dockerignore` - 项目根目录
- [ ] `next.config.js` - 包含 `output: 'standalone'`
- [ ] `.env.example` - 包含所有必需变量模板

#### 3. 准备环境变量

生成生产环境的环境变量：

- [ ] `JWT_SECRET` - 使用 crypto.randomBytes 生成
- [ ] `ADMIN_PASSWORD_HASH` - 使用脚本生成
- [ ] `DATABASE_URL` - 从 Supabase Dashboard 获取
- [ ] `DIRECT_URL` - 从 Supabase Dashboard 获取

### 部署步骤

#### Step 1: 提交代码到 GitHub

```bash
# 1. 添加所有部署配置文件
git add Dockerfile .dockerignore next.config.js .env.example

# 2. 提交更改
git commit -m "Add deployment configuration for AI Builder/Koyeb

- Add Dockerfile with multi-stage build
- Add .dockerignore to optimize build context
- Update next.config.js with standalone output
- Update .env.example with deployment notes"

# 3. 推送到 GitHub
git push origin main
```

#### Step 2: 验证仓库状态

- [ ] 所有文件已推送到 GitHub
- [ ] 仓库设置为公开（Public）
- [ ] .env 文件未被提交（检查 .gitignore）
- [ ] 确认部署分支名称（如 main）

#### Step 3: 准备部署信息

需要提供三个必需信息：

1. **GitHub 仓库 URL**: `https://github.com/username/sdd-sample-comm-dir`
2. **服务名称**: `comm-dir` (将成为 `comm-dir.ai-builders.space`)
3. **Git 分支**: `main`

#### Step 4: 调用部署 API

通过 AI 助手或手动调用 AI Builder API：

```bash
POST https://www.ai-builders.com/api/v1/deployments

{
  "repository": "https://github.com/username/sdd-sample-comm-dir",
  "service_name": "comm-dir",
  "branch": "main",
  "env_vars": {
    "DATABASE_URL": "postgresql://...",
    "DIRECT_URL": "postgresql://...",
    "NEXT_PUBLIC_APP_URL": "https://comm-dir.ai-builders.space",
    "JWT_SECRET": "...",
    "JWT_EXPIRES_IN": "7d",
    "ADMIN_USERNAME": "admin",
    "ADMIN_PASSWORD_HASH": "$2b$10$...",
    "NODE_ENV": "production"
  }
}
```

**注意**: 使用你的 AI Builder API key 进行认证。

#### Step 5: 监控部署状态

**部署时间**: 5-10 分钟

**监控方式**:
- **Deployment Portal** (只读): 查看部署状态和日志
- **API 查询**: `GET /v1/deployments/{service-name}`

**部署状态**:
- `pending` - 等待开始
- `building` - 构建 Docker 镜像
- `deploying` - 部署到 Koyeb
- `running` - 部署成功，服务运行中
- `failed` - 部署失败（查看日志排查）

**如果超时**: 如果状态卡在 `deploying` 超过 20 分钟，联系讲师。

---

## 验证和监控

### 部署成功验证

#### 1. 访问应用

```bash
# 访问公开 URL
https://comm-dir.ai-builders.space

# 应该看到应用首页
```

#### 2. 测试核心功能

**用户端功能**:
- [ ] 访问社区表单页面 (`/c/{slug}/form`)
- [ ] 填写并提交表单
- [ ] 查看成员列表 (`/c/{slug}/list`)
- [ ] 复制分享内容

**管理端功能**:
- [ ] 访问管理员登录页面 (`/admin/login`)
- [ ] 使用配置的凭证登录
- [ ] 创建新社区
- [ ] 查看管理后台

#### 3. 检查数据库连接

```bash
# 在管理后台创建测试社区
# 在 Supabase Dashboard 查看数据是否正确写入

# 查看 communities 表
SELECT * FROM communities ORDER BY created_at DESC LIMIT 1;

# 应该看到刚创建的社区
```

#### 4. 检查日志

**通过 Deployment Portal 或 API 查看**:
- 应用启动日志
- HTTP 请求日志
- 错误日志（如有）

**正常启动日志示例**:
```
✓ Ready in 1.2s
○ Local:    http://localhost:3000
✓ Starting...
✓ Ready in 450ms
```

### 监控指标

| 指标 | 目标 | 检查方式 |
|------|------|---------|
| **服务状态** | running | Deployment Portal |
| **响应时间** | < 2 秒（首屏加载） | 浏览器 DevTools |
| **内存使用** | < 200 MB | Koyeb Dashboard |
| **数据库连接** | 正常读写 | 测试表单提交 |
| **日志错误** | 无严重错误 | Deployment Portal |

---

## 故障排查

### 常见问题和解决方案

#### 问题 1: 部署卡在 "deploying" 状态超过 20 分钟

**可能原因**:
- Docker 构建失败
- 镜像过大超时
- 网络问题

**解决方案**:
1. 查看构建日志，定位错误
2. 检查 Dockerfile 是否正确
3. 减小镜像大小（优化依赖）
4. 联系讲师获取帮助

#### 问题 2: 应用启动后立即崩溃

**可能原因**:
- 环境变量配置错误
- DATABASE_URL 无效
- PORT 环境变量未正确读取

**解决方案**:
1. 检查环境变量是否完整
2. 验证 DATABASE_URL 格式和凭证
3. 确认 `next.config.js` 设置了 `output: 'standalone'`
4. 查看启动日志错误信息

**调试步骤**:
```bash
# 检查环境变量（在 Deployment Portal）
echo $DATABASE_URL
echo $JWT_SECRET
echo $PORT

# 查看应用日志
# 在 Deployment Portal 查看完整日志
```

#### 问题 3: 数据库连接失败

**错误信息**:
```
Error: Can't reach database server at `aws-0-us-east-1.pooler.supabase.com:6543`
```

**可能原因**:
- DATABASE_URL 错误
- Supabase 项目暂停或删除
- Prisma Client 未生成

**解决方案**:
1. 验证 DATABASE_URL 和 DIRECT_URL
   ```bash
   # 从 Supabase Dashboard 获取最新连接字符串
   # Settings > Database > Connection String
   ```

2. 检查 Supabase 项目状态
   - 访问 Supabase Dashboard
   - 确认项目处于活动状态

3. 确认 Dockerfile 中执行了 `prisma generate`
   ```dockerfile
   RUN npx prisma generate
   ```

4. 检查 Prisma Client 是否正确复制到运行镜像
   ```dockerfile
   COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
   COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
   ```

#### 问题 4: 静态资源 404

**错误信息**:
```
GET /_next/static/css/app.css 404
GET /_next/static/chunks/main.js 404
```

**可能原因**:
- Next.js 构建不完整
- `.next/static` 目录未复制
- Standalone 模式配置错误

**解决方案**:
1. 确认 `next.config.js` 设置了 `output: 'standalone'`
   ```javascript
   const nextConfig = {
     output: 'standalone',
   }
   ```

2. 检查 Dockerfile 是否复制了 `.next/static`
   ```dockerfile
   COPY --from=builder /app/.next/static ./.next/static
   ```

3. 检查 Dockerfile 是否复制了 `public` 目录
   ```dockerfile
   COPY --from=builder /app/public ./public
   ```

4. 本地测试 Docker 镜像
   ```bash
   docker build -t test .
   docker run -p 3000:3000 -e PORT=3000 test
   # 访问 http://localhost:3000 查看是否正常
   ```

#### 问题 5: 管理员无法登录

**错误信息**:
```
Invalid credentials
```

**可能原因**:
- ADMIN_PASSWORD_HASH 错误
- JWT_SECRET 未设置或过短
- Cookie 设置问题

**解决方案**:
1. 重新生成密码 Hash
   ```bash
   npx tsx scripts/generate-password-hash.ts YourPassword123
   # 复制输出的 hash 到环境变量
   ```

2. 确认 JWT_SECRET 长度 ≥ 32 字符
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. 检查 NEXT_PUBLIC_APP_URL 是否正确
   ```env
   NEXT_PUBLIC_APP_URL="https://comm-dir.ai-builders.space"
   ```

4. 确认使用 HTTPS（生产环境）
   - Koyeb 自动提供 HTTPS
   - Cookie 设置为 Secure（仅 HTTPS）

#### 问题 6: 内存不足（OOM）

**错误信息**:
```
Error: JavaScript heap out of memory
```

**可能原因**:
- 镜像过大
- 依赖过多
- 内存泄漏

**解决方案**:
1. 确认使用 `node:18-alpine` 基础镜像
   ```dockerfile
   FROM node:18-alpine AS builder
   FROM node:18-alpine AS runner
   ```

2. 确认启用了 standalone 模式
   ```javascript
   // next.config.js
   output: 'standalone'
   ```

3. 检查镜像大小
   ```bash
   docker images | grep comm-dir
   # 应该 < 200 MB
   ```

4. 优化 .dockerignore
   - 排除 specs、tests、文档
   - 减小构建上下文

5. 如果问题持续，联系讲师升级容器规格

---

## 安全考虑

### 1. 敏感信息管理

**禁止提交到 Git**:
- `.env` - 本地环境变量
- `.env.local` - 本地开发配置
- `.env.production` - 生产环境配置
- 任何包含密码、密钥的文件

**正确做法**:
- 使用 `.env.example` 提供模板（不含真实值）
- 敏感信息通过 AI Builder API 的 `env_vars` 传递
- 定期轮换密钥和密码（每 3-6 个月）

**检查 Git 历史**:
```bash
# 检查是否误提交了 .env
git log --all --full-history -- .env

# 如果发现误提交，使用 git filter-branch 清除
# （谨慎操作，建议咨询讲师）
```

### 2. 数据库安全

**Supabase 连接**:
- 使用连接池（`pgbouncer=true`）
- 限制连接数（避免耗尽资源）
- 定期备份数据（Supabase 提供自动备份）

**Row Level Security (RLS)** (可选):
- Supabase 支持 PostgreSQL RLS
- 可为 communities 和 members 表设置策略
- 本项目使用应用层权限控制，RLS 为可选加固

### 3. 应用安全

**已实现**:
- bcrypt 密码哈希（强度 10）
- HTTP-only Cookie（防 XSS）
- JWT 签名验证
- Prisma 参数化查询（防 SQL 注入）

**生产环境加固**:
- 使用强 JWT_SECRET（≥ 32 字节随机字符串）
- 使用强管理员密码（≥ 12 字符，包含大小写字母、数字、符号）
- 定期更新依赖（`npm audit fix`）
- 启用 HTTPS（Koyeb 自动提供）

**依赖安全**:
```bash
# 检查漏洞
npm audit

# 自动修复（如可能）
npm audit fix

# 查看详细报告
npm audit --json
```

### 4. 公开仓库安全

**检查清单**:
- [ ] `.gitignore` 包含 `.env*`
- [ ] 没有硬编码的密钥或密码
- [ ] `.env.example` 不包含真实凭证
- [ ] Git 历史中没有敏感信息
- [ ] 代码审查通过（无安全漏洞）

**定期审查**:
- 每次部署前检查 Git 提交
- 使用 GitHub Security Alerts
- 定期 code review

---

## 持续部署

### 自动部署触发

**AI Builder 监听 GitHub 仓库**:
- 每次推送到指定分支（如 `main`）
- 自动触发重新构建和部署
- 无需手动调用 API

**工作流**:
```bash
# 1. 本地开发和测试
npm run dev

# 2. 提交代码
git add .
git commit -m "Add new feature"

# 3. 推送到 GitHub
git push origin main

# 4. AI Builder 自动检测到推送
# 5. 自动构建 Docker 镜像
# 6. 自动部署到 Koyeb
# 7. 5-10 分钟后新版本上线
```

### 回滚策略

**如果部署失败**:
1. **查看日志**: 定位错误原因
2. **修复代码**: 在本地修复问题
3. **重新推送**: 触发新的部署
4. **紧急回滚**: 联系讲师手动回滚到上一个版本

**最佳实践**:
- 部署前在本地充分测试
- 使用 Git tags 标记稳定版本
- 重要更新前备份数据库

---

## 性能优化

### Docker 镜像优化

**当前配置已优化**:
- ✅ 多阶段构建（减小最终镜像 60%）
- ✅ Alpine 基础镜像（~50MB）
- ✅ Standalone 模式（自包含服务器）
- ✅ 非 root 用户（安全）

**进一步优化**:
```dockerfile
# 禁用 Next.js 遥测
ENV NEXT_TELEMETRY_DISABLED=1

# 禁用源码映射（生产环境）
ENV GENERATE_SOURCEMAP=false
```

### Next.js 构建优化

**next.config.js**:
```javascript
module.exports = {
  output: 'standalone',

  // 压缩优化
  compress: true,

  // 禁用遥测（减小体积）
  telemetry: false,

  // 优化图片加载（如适用）
  images: {
    unoptimized: true, // 如果不使用 Next.js Image Optimization
  },
}
```

### 数据库连接优化

**使用连接池**:
```env
# Transaction mode (pgbouncer=true)
DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=5"
```

**限制连接数**:
- 256 MB RAM 环境建议 `connection_limit=5`
- 避免连接耗尽

---

## Related Documents

### 系统设计模块
- [S-00: 系统架构概览](./S-00-architecture.md) - 技术栈和整体架构
- [S-03: 数据库设计](./S-03-database-schema.md) - Supabase PostgreSQL 配置
- [S-04: 认证系统](./S-04-authentication.md) - JWT 和管理员认证

### 部署相关资源
- [deployment-prompt.md](../research/deployment-prompt.md) - AI Builder 部署指南
- [AI Builder OpenAPI Spec](https://www.ai-builders.com/resources/students-backend/openapi.json) - API 详细文档

---

## Notes

### 为什么选择 AI Builder/Koyeb？

1. **免费额度**: 12 个月免费，适合学习和演示
2. **简单部署**: 一键部署，无需复杂配置
3. **自动域名**: 提供公开访问的子域名
4. **学习价值**: 了解容器化部署流程

**适用场景**:
- MVP 和原型项目
- 学习和实验
- 技术演示
- 个人项目

**不适用场景**:
- 生产级应用（资源限制）
- 高流量应用（并发限制）
- 需要高可用性的服务

### 生产环境替代方案

如果未来需要更强大的部署方案，可以考虑：

1. **Vercel** (推荐):
   - Next.js 官方推荐
   - 免费额度充足（Hobby plan）
   - 自动 HTTPS 和 CDN
   - 无缝集成 GitHub
   - 无需 Dockerfile（自动检测 Next.js）

2. **Railway**:
   - 简单易用
   - 内置数据库支持
   - 免费额度适中
   - 支持 Docker 部署

3. **Fly.io**:
   - 更灵活的配置
   - 全球边缘部署
   - 免费额度有限
   - 需要 Dockerfile

4. **AWS/Azure/GCP**:
   - 企业级可靠性
   - 完全控制
   - 成本较高
   - 配置复杂

### 从 AI Builder 迁移到 Vercel

如果未来需要迁移到 Vercel：

**步骤**:
1. 在 Vercel 导入 GitHub 仓库
2. Vercel 自动检测 Next.js 项目
3. 配置环境变量（与 AI Builder 相同）
4. 部署（自动构建，无需 Dockerfile）

**优势**:
- 无需 Dockerfile（Vercel 原生支持 Next.js）
- 更高的资源限制
- 全球 CDN
- 更好的监控和日志

**注意**:
- Standalone 模式在 Vercel 不需要（但不影响）
- Vercel 会忽略 Dockerfile
- 环境变量需要重新配置

### 注意事项

1. **资源限制**: 256 MB RAM 适合 MVP 和演示，生产环境可能需要更多资源
2. **服务限制**: 默认最多 2 个服务，如需更多联系讲师
3. **实验性功能**: AI Builder 是实验性平台，稳定性不如商业平台
4. **数据持久化**: 数据存储在 Supabase，即使删除服务数据也会保留
5. **服务管理**: 删除服务或延长免费期需联系讲师
6. **监控限制**: Deployment Portal 为只读，无法直接操作服务

---

**部署成功标准**:
- ✅ 应用可通过 `https://{service-name}.ai-builders.space` 访问
- ✅ 用户可填写表单并提交成功
- ✅ 成员列表正确显示
- ✅ 管理员可登录后台
- ✅ 数据正确写入 Supabase
- ✅ 无严重错误日志
- ✅ 内存使用 < 200 MB

**获取帮助**:
如遇到问题，联系讲师并提供：
- 服务名称
- 仓库 URL
- 失败部署的时间戳
- 错误日志截图
