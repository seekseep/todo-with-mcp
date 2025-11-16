/**
 * APIの型定義
 */

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface List {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListWithTasks extends List {
  tasks: Task[];
}

export interface Task {
  id: string;
  content: string;
  status: TaskStatus;
  dueDate: string | null;
  listId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateListRequest {
  name: string;
}

export interface UpdateListRequest {
  name?: string;
}

export interface CreateTaskRequest {
  content: string;
  listId: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  content?: string;
  status?: TaskStatus;
  dueDate?: string | null;
}
