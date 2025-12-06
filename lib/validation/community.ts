import { z } from 'zod';

export const communitySchema = z.object({
  name: z.string()
    .min(2, '社区名称至少2个字符')
    .max(100, '社区名称最多100个字符'),

  slug: z.string()
    .min(2, 'Slug至少2个字符')
    .max(100, 'Slug最多100个字符')
    .regex(/^[a-z0-9-]+$/, 'Slug只能包含小写字母、数字和连字符'),

  description: z.string()
    .max(500, '描述最多500个字符')
    .nullable()
    .optional(),

  accessCode: z.string()
    .min(6, '访问码至少6个字符')
    .max(50, '访问码最多50个字符')
    .regex(/^[a-zA-Z0-9]+$/, '访问码只能包含字母和数字')
    .nullable()
    .optional(),
});

export type CommunityInput = z.infer<typeof communitySchema>;
