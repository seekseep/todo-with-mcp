import type { FC } from 'react';
import { Button } from '../Button';
import type { Task } from '../../types/api';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

/**
 * タスクアイテムコンポーネント
 */
export const TaskItem: FC<TaskItemProps> = ({ task, onToggle, onDelete, isDeleting }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      />
      <span
        className={`flex-1 ${
          task.status === 'completed' ? 'line-through text-gray-500' : ''
        }`}
      >
        {task.content}
      </span>
      {task.dueDate && (
        <span className="text-sm text-gray-500">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      )}
      <Button
        variant="danger"
        onClick={() => onDelete(task.id)}
        disabled={isDeleting}
        className="text-sm px-3 py-1"
      >
        削除
      </Button>
    </div>
  );
};
