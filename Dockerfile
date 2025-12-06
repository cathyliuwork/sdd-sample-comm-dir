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
# 使用 --maxsockets 限制并发连接，减少内存使用
RUN npm ci --maxsockets=1

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
