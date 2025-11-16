import type { UpdateTaskRequest } from '../../domain/entity/task.js';
import * as taskRepository from '../../repository/taskRepository.js';
import { getTaskById } from './getById.js';

/**
 * タスクを更新する
 */
export async function updateTask(id: string, data: UpdateTaskRequest) {
  await getTaskById(id);
  return await taskRepository.updateTask(id, data);
}
