import * as taskRepository from '../../repository/taskRepository.js';
import { getTaskById } from './getById.js';

/**
 * タスクのステータスを切り替える
 */
export async function toggleTaskStatus(id: string) {
  const task = await getTaskById(id);
  const newStatus = task.status === 'completed' ? 'pending' : 'completed';
  return await taskRepository.updateTask(id, { status: newStatus });
}
