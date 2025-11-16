import * as listRepository from '../../repository/listRepository.js';

/**
 * リストを全件取得する
 */
export async function getAllLists() {
  return await listRepository.findAllLists();
}
