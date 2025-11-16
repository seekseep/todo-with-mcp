import { prisma } from './prisma.js';
import type { CreateTaskRequest, UpdateTaskRequest, TaskEntity } from '../domain/entity/task.js';
import type { TaskStatus } from '../domain/value/taskStatus.js';

/**
 * タスクソート順序
 */
export type TaskSortOrder = 'dueDate' | 'createdAt';

/**
 * タスクを全件取得する
 */
export async function findAllTasks(listId?: string, sortBy: TaskSortOrder = 'createdAt'): Promise<TaskEntity[]> {
  const orderBy = sortBy === 'dueDate'
    ? { dueDate: 'asc' as const }
    : { createdAt: 'desc' as const };

  const tasks = await prisma.task.findMany({
    where: listId ? { listId } : undefined,
    orderBy,
  });

  return tasks.map(task => ({
    ...task,
    status: task.status as TaskStatus,
  }));
}

/**
 * タスクをIDで取得する
 */
export async function findTaskById(id: string): Promise<TaskEntity | null> {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    return null;
  }

  return {
    ...task,
    status: task.status as TaskStatus,
  };
}

/**
 * タスクを作成する
 */
export async function createTask(data: CreateTaskRequest): Promise<TaskEntity> {
  const task = await prisma.task.create({
    data: {
      content: data.content,
      listId: data.listId,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });

  return {
    ...task,
    status: task.status as TaskStatus,
  };
}

/**
 * タスクを更新する
 */
export async function updateTask(id: string, data: UpdateTaskRequest): Promise<TaskEntity> {
  const updateData: Record<string, unknown> = {};

  if (data.content !== undefined) {
    updateData.content = data.content;
  }
  if (data.status !== undefined) {
    updateData.status = data.status;
  }
  if (data.dueDate !== undefined) {
    updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
  }

  const task = await prisma.task.update({
    where: { id },
    data: updateData,
  });

  return {
    ...task,
    status: task.status as TaskStatus,
  };
}

/**
 * タスクを削除する
 */
export async function deleteTask(id: string) {
  return await prisma.task.delete({
    where: { id },
  });
}
