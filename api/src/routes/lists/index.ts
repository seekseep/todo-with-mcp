import { OpenAPIHono } from '@hono/zod-openapi';
import * as listService from '../../application/list/index.js';
import { getAllListsRoute } from './getAll.js';
import { getListRoute } from './getById.js';
import { createListRoute } from './create.js';
import { updateListRoute } from './update.js';
import { deleteListRoute } from './delete.js';

const app = new OpenAPIHono();

/**
 * リスト一覧取得
 */
app.openapi(getAllListsRoute, async (c) => {
  const lists = await listService.getAllLists();
  return c.json(lists);
});

/**
 * リスト取得
 */
app.openapi(getListRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const list = await listService.getListById(id);
    return c.json(list, 200);
  } catch (error) {
    return c.json({ error: String(error) }, 404);
  }
});

/**
 * リスト作成
 */
app.openapi(createListRoute, async (c) => {
  const data = c.req.valid('json');
  const list = await listService.createList(data);
  return c.json(list, 201);
});

/**
 * リスト更新
 */
app.openapi(updateListRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');
    const list = await listService.updateList(id, data);
    return c.json(list, 200);
  } catch (error) {
    return c.json({ error: String(error) }, 404);
  }
});

/**
 * リスト削除
 */
app.openapi(deleteListRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    await listService.deleteList(id);
    return c.body(null, 204);
  } catch (error) {
    return c.json({ error: String(error) }, 404);
  }
});

export default app;
