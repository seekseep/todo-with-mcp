import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getList, updateList, deleteList } from '../services/lists';
import { createTask, deleteTask, toggleTaskStatus, updateTask } from '../services/tasks';
import { TasksHeader } from '../components/tasks/TasksHeader';
import { CreateTaskForm } from '../components/tasks/CreateTaskForm';
import { TaskCollection } from '../components/tasks/TaskCollection';
import type { UpdateTaskRequest } from '../types/api';

/**
 * タスク一覧画面
 */
export default function Tasks() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: list, isLoading } = useQuery({
    queryKey: ['list', listId],
    queryFn: () => getList(listId!),
    enabled: !!listId,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskRequest }) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  const updateListMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateList(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      navigate('/');
    },
  });

  const handleCreate = (data: { content: string; dueDate?: string }) => {
    if (listId) {
      createMutation.mutate({ ...data, listId });
    }
  };

  const handleToggle = (id: string) => {
    toggleMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleUpdate = (id: string, data: UpdateTaskRequest) => {
    updateMutation.mutate({ id, data });
  };

  const handleRename = (name: string) => {
    if (listId) {
      updateListMutation.mutate({ id: listId, name });
    }
  };

  const handleDeleteList = () => {
    if (listId) {
      deleteListMutation.mutate(listId);
    }
  };

  if (isLoading) {
    return <div className="p-8">読み込み中...</div>;
  }

  if (!list) {
    return <div className="p-8">リストが見つかりません</div>;
  }

  const sortedTasks = list.tasks
    ? [...list.tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <TasksHeader
        listName={list.name}
        onRename={handleRename}
        onDelete={handleDeleteList}
      />

      <div className="bg-white rounded-lg shadow">
        <CreateTaskForm
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />

        {sortedTasks.length > 0 && (
          <>
            <div className="border-t border-gray-200"></div>
            <TaskCollection
              tasks={sortedTasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              isDeleting={deleteMutation.isPending}
            />
          </>
        )}
      </div>
    </div>
  );
}
