import type { FC } from 'react';
import { TaskItem } from './TaskItem';
import type { Task } from '../../types/api';

interface TasksListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

/**
 * タスク一覧コンポーネント
 */
export const TasksList: FC<TasksListProps> = ({ tasks, onToggle, onDelete, isDeleting }) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};
