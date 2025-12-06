import { z } from 'zod';

export const memberSchema = z.object({
  communityId: z.string().uuid('Invalid community ID'),

  // 必填字段
  name: z.string()
    .min(1, '姓名不能为空')
    .max(100, '姓名最多100个字符'),

  location: z.string()
    .min(1, '所在地不能为空')
    .max(100, '所在地最多100个字符'),

  profession: z.string()
    .min(1, '职业/行业不能为空')
    .max(100, '职业/行业最多100个字符'),

  // 选填字段
  currentWork: z.string()
    .max(1000, '内容过长（最多1000字符）')
    .nullable()
    .optional(),

  shareTopics: z.string()
    .max(1000, '内容过长（最多1000字符）')
    .nullable()
    .optional(),

  seekTopics: z.string()
    .max(1000, '内容过长（最多1000字符）')
    .nullable()
    .optional(),
});

export type MemberInput = z.infer<typeof memberSchema>;
