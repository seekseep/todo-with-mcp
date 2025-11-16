import type { CreateListRequest } from '../../domain/entity/list.js';
import * as listRepository from '../../repository/listRepository.js';

/**
 * リストを作成する
 */
export async function createList(data: CreateListRequest) {
  return await listRepository.createList(data);
}
