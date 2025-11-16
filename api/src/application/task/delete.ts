import * as taskRepository from '../../repository/taskRepository.js';
import { getTaskById } from './getById.js';

/**
 * タスクを削除する
 */
export async function deleteTask(id: string) {
  await getTaskById(id);
  return await taskRepository.deleteTask(id);
}
