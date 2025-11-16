import { useState, type FC, FormEvent } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import type { Task } from '../../types/api';

interface TaskEditDialogProps {
  isOpen: boolean;
  task: Task;
  onSubmit: (data: { content: string; dueDate: string | null }) => void;
  onCancel: () => void;
}

/**
 * タスク編集ダイアログコンポーネント
 */
export const TaskEditDialog: FC<TaskEditDialogProps> = ({
  isOpen,
  task,
  onSubmit,
  onCancel,
}) => {
  const [content, setContent] = useState(task.content);
  const [hasDueDate, setHasDueDate] = useState(!!task.dueDate);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      content,
      dueDate: hasDueDate && dueDate ? new Date(dueDate).toISOString() : null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">タスクの編集</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">タスク名</label>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="タスク名"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={hasDueDate}
                onChange={(e) => setHasDueDate(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium">期日を設定</span>
            </label>

            {hasDueDate && (
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full"
                required={hasDueDate}
              />
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onCancel}>
              キャンセル
            </Button>
            <Button type="submit" variant="primary">
              保存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
