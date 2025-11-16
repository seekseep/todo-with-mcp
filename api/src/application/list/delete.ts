import * as listRepository from '../../repository/listRepository.js';
import { getListById } from './getById.js';

/**
 * リストを削除する
 */
export async function deleteList(id: string) {
  await getListById(id);
  return await listRepository.deleteList(id);
}
