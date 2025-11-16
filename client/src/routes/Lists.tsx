import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLists, createList, deleteList } from '../services/lists';
import { CreateListForm } from '../components/lists/CreateListForm';
import { ListCollection } from '../components/lists/ListCollection';

/**
 * リスト一覧画面
 */
export default function Lists() {
  const [newListName, setNewListName] = useState('');
  const queryClient = useQueryClient();

  const { data: lists, isLoading } = useQuery({
    queryKey: ['lists'],
    queryFn: getLists,
  });

  const createMutation = useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      setNewListName('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  const handleCreate = () => {
    if (newListName.trim()) {
      createMutation.mutate({ name: newListName });
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div className="p-8">読み込み中...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">TODO リスト</h1>

      <CreateListForm
        value={newListName}
        onChange={setNewListName}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      {lists && (
        <ListCollection
          lists={lists}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
