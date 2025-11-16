import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export type CreateUserDTO = Omit<User, 'id'>;
export type UpdateUserDTO = Partial<Omit<User, 'id'>>;

