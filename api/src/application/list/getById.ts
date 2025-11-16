import * as listRepository from '../../repository/listRepository.js';

/**
 * リストをIDで取得する
 */
export async function getListById(id: string) {
  const list = await listRepository.findListById(id);
  if (!list) {
    throw new Error('リストが見つかりません');
  }
  return list;
}
