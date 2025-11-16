import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/api';
import apiClient from './api';

/**
 * タスク一覧を取得
 */
export async function getTasks(listId?: string, sortBy?: 'dueDate' | 'createdAt'): Promise<Task[]> {
  const params = new URLSearchParams();
  if (listId) params.append('listId', listId);
  if (sortBy) params.append('sortBy', sortBy);

  const query = params.toString() ? `?${params.toString()}` : '';
  const response = await apiClient.get<Task[]>(`/api/tasks${query}`);
  return response.data;
}

/**
 * タスクを取得
 */
export async function getTask(id: string): Promise<Task> {
  const response = await apiClient.get<Task>(`/api/tasks/${id}`);
  return response.data;
}

/**
 * タスクを作成
 */
export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const response = await apiClient.post<Task>('/api/tasks', data);
  return response.data;
}

/**
 * タスクを更新
 */
export async function updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
  const response = await apiClient.put<Task>(`/api/tasks/${id}`, data);
  return response.data;
}

/**
 * タスクを削除
 */
export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/api/tasks/${id}`);
}

/**
 * タスクステータスを切り替え
 */
export async function toggleTaskStatus(id: string): Promise<Task> {
  const response = await apiClient.post<Task>(`/api/tasks/${id}/toggle`);
  return response.data;
}
