import type { FC } from 'react';
import { Task } from './Task';
import type { Task as TaskType, UpdateTaskRequest } from '../../types/api';

interface TaskCollectionProps {
  tasks: TaskType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: UpdateTaskRequest) => void;
  isDeleting: boolean;
}

/**
 * タスクコレクションコンポーネント
 */
export const TaskCollection: FC<TaskCollectionProps> = ({ tasks, onToggle, onDelete, onUpdate, isDeleting }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <div key={task.id}>
          {index > 0 && <div className="border-t border-gray-200"></div>}
          <Task
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            isDeleting={isDeleting}
          />
        </div>
      ))}
    </>
  );
};
