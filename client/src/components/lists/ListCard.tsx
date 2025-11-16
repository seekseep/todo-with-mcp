import { useState, useEffect, useRef, type FC } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from '../ConfirmDialog';
import type { List } from '../../types/api';

interface ListCardProps {
  list: List;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

/**
 * リストカードコンポーネント
 */
export const ListCard: FC<ListCardProps> = ({ list, onDelete, isDeleting }) => {
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

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(list.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="relative p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between">
          <Link
            to={`/lists/${list.id}`}
            className="text-lg font-medium text-blue-600 hover:text-blue-800"
          >
            {list.name}
          </Link>
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

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="リストの削除"
        message={`「${list.name}」を削除してもよろしいですか？`}
        submitButtonVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
};
