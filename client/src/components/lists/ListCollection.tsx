import type { FC } from 'react';
import { ListCard } from './ListCard';
import type { List } from '../../types/api';

interface ListCollectionProps {
  lists: List[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

/**
 * リストコレクションコンポーネント
 */
export const ListCollection: FC<ListCollectionProps> = ({ lists, onDelete, isDeleting }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lists.map((list) => (
        <ListCard
          key={list.id}
          list={list}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};
