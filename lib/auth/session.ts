import { getSessionCookie } from './cookies';
import { verifyToken, SessionPayload } from './jwt';

/**
 * 获取当前会话信息
 */
export async function getSession(): Promise<SessionPayload | null> {
  const token = await getSessionCookie();
  if (!token) return null;

  const payload = await verifyToken(token);
  return payload;
}

/**
 * 要求管理员权限（用于保护的路由）
 */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();

  if (!session || session.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }

  return session;
}
