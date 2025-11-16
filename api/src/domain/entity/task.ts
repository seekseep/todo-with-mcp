import { z } from 'zod';
import { taskStatusSchema } from '../value/taskStatus.js';

/**
 * タスクエンティティのスキーマ
 */
export const taskEntitySchema = z.object({
  id: z.string(),
  content: z.string(),
  status: taskStatusSchema,
  dueDate: z.date().nullable(),
  listId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * タスク作成リクエストのスキーマ
 */
export const createTaskSchema = z.object({
  content: z.string().min(1, 'タスク内容は必須です'),
  listId: z.string(),
  dueDate: z.string().datetime().optional(),
});

/**
 * タスク更新リクエストのスキーマ
 */
export const updateTaskSchema = z.object({
  content: z.string().min(1, 'タスク内容は必須です').optional(),
  status: taskStatusSchema.optional(),
  dueDate: z.string().datetime().nullable().optional(),
});

/**
 * タスクエンティティ型
 */
export type TaskEntity = z.infer<typeof taskEntitySchema>;

/**
 * タスク作成リクエスト型
 */
export type CreateTaskRequest = z.infer<typeof createTaskSchema>;

/**
 * タスク更新リクエスト型
 */
export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>;
