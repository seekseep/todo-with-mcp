import type { FC, FormEvent } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

interface CreateListFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

/**
 * リスト作成フォームコンポーネント
 */
export const CreateListForm: FC<CreateListFormProps> = ({
  value,
  onChange,
  onSubmit,
  isSubmitting,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="新しいリスト名"
        className="flex-1"
      />
      <Button type="submit" disabled={isSubmitting}>
        追加
      </Button>
    </form>
  );
};
