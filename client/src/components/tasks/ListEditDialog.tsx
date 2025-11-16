import { useState, type FC, FormEvent } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

interface ListEditDialogProps {
  isOpen: boolean;
  listName: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

/**
 * リスト編集ダイアログコンポーネント
 */
export const ListEditDialog: FC<ListEditDialogProps> = ({
  isOpen,
  listName,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(listName);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">リスト名の変更</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">リスト名</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="リスト名"
              className="w-full"
              required
            />
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
