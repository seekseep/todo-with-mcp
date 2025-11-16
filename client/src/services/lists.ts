import type { List, ListWithTasks, CreateListRequest, UpdateListRequest } from '../types/api';
import apiClient from './api';

/**
 * リスト一覧を取得
 */
export async function getLists(): Promise<List[]> {
  const response = await apiClient.get<List[]>('/api/lists');
  return response.data;
}

/**
 * リストを取得
 */
export async function getList(id: string): Promise<ListWithTasks> {
  const response = await apiClient.get<ListWithTasks>(`/api/lists/${id}`);
  return response.data;
}

/**
 * リストを作成
 */
export async function createList(data: CreateListRequest): Promise<List> {
  const response = await apiClient.post<List>('/api/lists', data);
  return response.data;
}

/**
 * リストを更新
 */
export async function updateList(id: string, data: UpdateListRequest): Promise<List> {
  const response = await apiClient.put<List>(`/api/lists/${id}`, data);
  return response.data;
}

/**
 * リストを削除
 */
export async function deleteList(id: string): Promise<void> {
  await apiClient.delete(`/api/lists/${id}`);
}
