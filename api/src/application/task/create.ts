import type { CreateTaskRequest } from '../../domain/entity/task.js';
import * as taskRepository from '../../repository/taskRepository.js';

/**
 * タスクを作成する
 */
export async function createTask(data: CreateTaskRequest) {
  return await taskRepository.createTask(data);
}
