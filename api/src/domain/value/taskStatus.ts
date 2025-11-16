import { z } from 'zod';

/**
 * タスクのステータス定義
 */
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

/**
 * タスクステータスのスキーマ
 */
export const taskStatusSchema = z.enum([
  TASK_STATUS.PENDING,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.COMPLETED,
]);

/**
 * タスクステータス型
 */
export type TaskStatus = z.infer<typeof taskStatusSchema>;
