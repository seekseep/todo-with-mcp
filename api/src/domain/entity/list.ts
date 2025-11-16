import { z } from 'zod';
import { taskEntitySchema } from './task.js';

/**
 * リストエンティティのスキーマ（基本）
 */
export const listEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * リストエンティティのスキーマ（タスク含む）
 */
export const listWithTasksEntitySchema = listEntitySchema.extend({
  tasks: z.array(taskEntitySchema),
});

/**
 * リスト作成リクエストのスキーマ
 */
export const createListSchema = z.object({
  name: z.string().min(1, 'リスト名は必須です'),
});

/**
 * リスト更新リクエストのスキーマ
 */
export const updateListSchema = z.object({
  name: z.string().min(1, 'リスト名は必須です').optional(),
});

/**
 * リストエンティティ型
 */
export type ListEntity = z.infer<typeof listEntitySchema>;

/**
 * リスト作成リクエスト型
 */
export type CreateListRequest = z.infer<typeof createListSchema>;

/**
 * リスト更新リクエスト型
 */
export type UpdateListRequest = z.infer<typeof updateListSchema>;
