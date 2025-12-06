import slugifyLib from 'slugify';
import prisma from '@/lib/prisma';

/**
 * 从社区名称生成唯一的 slug
 * @param name 社区名称
 * @returns 唯一的 slug
 */
export async function generateUniqueSlug(name: string): Promise<string> {
  // 使用 slugify 库转换（支持中文转拼音）
  let baseSlug = slugifyLib(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  // 如果 slug 为空（比如纯中文但库不支持转换），使用时间戳
  if (!baseSlug || baseSlug.length === 0) {
    baseSlug = `community-${Date.now()}`;
  }

  // 检查唯一性，如果重复则添加数字后缀
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.community.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
