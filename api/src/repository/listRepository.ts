import { prisma } from './prisma.js';
import type { CreateListRequest, UpdateListRequest } from '../domain/entity/list.js';
import type { TaskStatus } from '../domain/value/taskStatus.js';

/**
 * リストを全件取得する
 */
export async function findAllLists() {
  return await prisma.list.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * リストをIDで取得する
 */
export async function findListById(id: string) {
  const list = await prisma.list.findUnique({
    where: { id },
    include: {
      tasks: true,
    },
  });

  if (!list) {
    return null;
  }

  return {
    ...list,
    tasks: list.tasks.map(task => ({
      ...task,
      status: task.status as TaskStatus,
    })),
  };
}

/**
 * リストを作成する
 */
export async function createList(data: CreateListRequest) {
  return await prisma.list.create({
    data: {
      name: data.name,
    },
  });
}

/**
 * リストを更新する
 */
export async function updateList(id: string, data: UpdateListRequest) {
  return await prisma.list.update({
    where: { id },
    data,
  });
}

/**
 * リストを削除する
 */
export async function deleteList(id: string) {
  return await prisma.list.delete({
    where: { id },
  });
}
