import * as taskRepository from '../../repository/taskRepository.js';

/**
 * タスクをIDで取得する
 */
export async function getTaskById(id: string) {
  const task = await taskRepository.findTaskById(id);
  if (!task) {
    throw new Error('タスクが見つかりません');
  }
  return task;
}
