import { useState, useEffect, useRef, type FC } from 'react';
import { Link } from 'react-router-dom';
import { ListEditDialog } from './ListEditDialog';
import { ConfirmDialog } from '../ConfirmDialog';

interface TasksHeaderProps {
  listName: string;
  onRename: (name: string) => void;
  onDelete: () => void;
}

/**
 * タスク画面ヘッダーコンポーネント
 */
export const TasksHeader: FC<TasksHeaderProps> = ({ listName, onRename, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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

  const handleRenameClick = () => {
    setIsMenuOpen(false);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const handleRename = (name: string) => {
    onRename(name);
    setIsEditDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← リスト一覧へ戻る
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{listName}</h1>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={handleRenameClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  名前の変更
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
      </div>

      <ListEditDialog
        isOpen={isEditDialogOpen}
        listName={listName}
        onSubmit={handleRename}
        onCancel={() => setIsEditDialogOpen(false)}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="リストの削除"
        message={`「${listName}」を削除してもよろしいですか？このリストに含まれるすべてのタスクも削除されます。`}
        submitButtonVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
};
