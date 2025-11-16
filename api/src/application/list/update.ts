import type { UpdateListRequest } from '../../domain/entity/list.js';
import * as listRepository from '../../repository/listRepository.js';
import { getListById } from './getById.js';

/**
 * リストを更新する
 */
export async function updateList(id: string, data: UpdateListRequest) {
  await getListById(id);
  return await listRepository.updateList(id, data);
}
