import { useState, type FC, FormEvent } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

interface CreateTaskFormProps {
  onSubmit: (data: { content: string; dueDate?: string }) => void;
  isSubmitting: boolean;
}

/**
 * タスク作成フォームコンポーネント
 */
export const CreateTaskForm: FC<CreateTaskFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [content, setContent] = useState('');
  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content,
      dueDate: hasDueDate && dueDate ? new Date(dueDate).toISOString() : undefined,
    });

    setContent('');
    setHasDueDate(false);
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 p-4">
        <input
          type="checkbox"
          disabled
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 opacity-30"
        />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="新しいタスク"
          className="flex-1"
        />
        <Button type="submit" disabled={isSubmitting}>
          追加
        </Button>
      </div>

      {(hasDueDate || dueDate) && (
        <>
          <div className="border-t border-gray-200"></div>

          <div className="flex items-center gap-4 p-4">
            <label className="flex items-center gap-2">
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
                className="flex-1"
              />
            )}
          </div>
        </>
      )}
    </form>
  );
};
