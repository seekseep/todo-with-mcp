import { useState, useEffect, useRef, type FC } from 'react';
import { TaskEditDialog } from './TaskEditDialog';
import { ConfirmDialog } from '../ConfirmDialog';
import type { Task as TaskType, UpdateTaskRequest } from '../../types/api';

interface TaskProps {
  task: TaskType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: UpdateTaskRequest) => void;
  isDeleting: boolean;
}

/**
 * タスクコンポーネント
 */
export const Task: FC<TaskProps> = ({ task, onToggle, onDelete, onUpdate, isDeleting }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEdit = (data: { content: string; dueDate: string | null }) => {
    onUpdate(task.id, data);
    setIsEditDialogOpen(false);
  };

  const handleEditClick = () => {
    setIsMenuOpen(false);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-start gap-4 p-4">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
        />
        <div className="flex-1">
          <div
            className={`${
              task.status === 'completed' ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.content}
          </div>
          {task.dueDate && (
            <div className="text-sm text-gray-500 mt-1">
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded"
            disabled={isDeleting}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button
                onClick={handleEditClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                編集
              </button>
              <button
                onClick={handleDeleteClick}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                削除
              </button>
            </div>
          )}
        </div>
      </div>

      <TaskEditDialog
        isOpen={isEditDialogOpen}
        task={task}
        onSubmit={handleEdit}
        onCancel={() => setIsEditDialogOpen(false)}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="タスクの削除"
        message={`「${task.content}」を削除してもよろしいですか？`}
        submitButtonVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
};
