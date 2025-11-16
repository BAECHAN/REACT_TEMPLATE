import { z } from 'zod';

export const postSchema = z.object({
  id: z.number().optional(), // JSONPlaceholder에서 자동 생성
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;

export type CreatePostDTO = Omit<Post, 'id'>;
export type UpdatePostDTO = Partial<Omit<Post, 'id'>>;

