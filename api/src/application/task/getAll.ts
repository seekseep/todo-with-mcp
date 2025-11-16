import * as taskRepository from '../../repository/taskRepository.js';
import type { TaskSortOrder } from '../../repository/taskRepository.js';

/**
 * タスクを全件取得する
 */
export async function getAllTasks(listId?: string, sortBy?: TaskSortOrder) {
  return await taskRepository.findAllTasks(listId, sortBy);
}
