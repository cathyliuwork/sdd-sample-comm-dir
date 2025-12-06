/**
 * 生成随机访问码
 * @param length 访问码长度，默认 6
 * @returns 随机访问码字符串
 */
export function generateAccessCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}
