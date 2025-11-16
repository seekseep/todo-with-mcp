import type { FC } from 'react';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  submitButtonVariant?: 'primary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 確認ダイアログコンポーネント
 */
export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  submitButtonVariant = 'primary',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            キャンセル
          </Button>
          <Button variant={submitButtonVariant} onClick={onConfirm}>
            実行
          </Button>
        </div>
      </div>
    </div>
  );
};
