import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import type { List } from '../../types/api';

interface ListItemProps {
  list: List;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

/**
 * リストアイテムコンポーネント
 */
export const ListItem: FC<ListItemProps> = ({ list, onDelete, isDeleting }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <Link
        to={`/lists/${list.id}`}
        className="text-lg font-medium text-blue-600 hover:text-blue-800"
      >
        {list.name}
      </Link>
      <Button
        variant="danger"
        onClick={() => onDelete(list.id)}
        disabled={isDeleting}
      >
        削除
      </Button>
    </div>
  );
};
