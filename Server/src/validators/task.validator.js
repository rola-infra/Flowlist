import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  status: z.enum(['todo', 'progress', 'done']).default('todo'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),

  description: z.string().max(2000).optional(),

  status: z.enum(['todo', 'progress', 'done']).optional(),

  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export const signupSchema = z.object({
  name: z.string().min(2).max(50),

  email: z.email(),

  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(8),
});
