# ==================================================
# 阶段 1: 构建阶段（Builder）
# ==================================================
# 使用 Node.js 22 LTS（活跃支持到 2027-04，固定版本确保构建可重现）
FROM node:22.20.0-slim AS builder

# 安装构建依赖（OpenSSL + CA证书 + Prisma需要的工具）
RUN apt-get update && \
    apt-get install -y \
      openssl \
      ca-certificates \
      python3 \
      make \
      g++ && \
    rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app

# 设置环境变量优化内存使用
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"
ENV NEXT_TELEMETRY_DISABLED=1

# 1. 复制依赖定义文件
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# 2. 安装生产依赖和构建依赖
RUN npm ci --omit=optional --prefer-offline --no-audit --progress=false

# 3. 显式复制 tsconfig.json（确保路径别名解析正常）
COPY tsconfig.json ./

# 4. 复制应用源代码
COPY . .

# 5. 生成 Prisma Client（必需，数据库访问）
RUN npx prisma generate

# 6. 构建 Next.js 应用（生成 .next 目录）
RUN npm run build

# ==================================================
# 阶段 2: 运行阶段（Runner）
# ==================================================
# 使用 Node.js 22 LTS（活跃支持到 2027-04，固定版本确保构建可重现）
FROM node:22.20.0-slim AS runner

# 安装运行时依赖（OpenSSL 和 CA 证书）
RUN apt-get update && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app

# 设置环境为生产环境
ENV NODE_ENV=production

# 禁用 Next.js 遥测（减小体积）
ENV NEXT_TELEMETRY_DISABLED=1

# 6. 创建非 root 用户（安全最佳实践）
# Debian 语法（与 Alpine 不同）
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nextjs

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
