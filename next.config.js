/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 standalone 输出模式（Docker 部署必需）
  output: 'standalone',

  // 可选：启用 GZIP 压缩
  compress: true,
}

module.exports = nextConfig
