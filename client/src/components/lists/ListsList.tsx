import type { FC } from 'react';
import { ListItem } from './ListItem';
import type { List } from '../../types/api';

interface ListsListProps {
  lists: List[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

/**
 * リスト一覧コンポーネント
 */
export const ListsList: FC<ListsListProps> = ({ lists, onDelete, isDeleting }) => {
  return (
    <div className="space-y-4">
      {lists.map((list) => (
        <ListItem
          key={list.id}
          list={list}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};
