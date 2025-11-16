import { OpenAPIHono } from '@hono/zod-openapi';
import * as taskService from '../../application/task/index.js';
import { getAllTasksRoute } from './getAll.js';
import { getTaskRoute } from './getById.js';
import { createTaskRoute } from './create.js';
import { updateTaskRoute } from './update.js';
import { deleteTaskRoute } from './delete.js';
import { toggleTaskStatusRoute } from './toggle.js';

const app = new OpenAPIHono();

/**
 * タスク一覧取得
 */
app.openapi(getAllTasksRoute, async (c) => {
  const { listId, sortBy } = c.req.valid('query');
  const tasks = await taskService.getAllTasks(listId, sortBy);
  return c.json(tasks);
});

/**
 * タスク取得
 */
app.openapi(getTaskRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const task = await taskService.getTaskById(id);
    return c.json(task, 200);
  } catch (error) {
    return c.json({ error: String(error) }, 404);
  }
});

/**
 * タスク作成
 */
app.openapi(createTaskRoute, async (c) => {
  const data = c.req.valid('json');
  const task = await taskService.createTask(data);
  return c.json(task, 201);
});

/**
 * タスク更新
 */
app.openapi(updateTaskRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');
    const task = await taskService.updateTask(id, data);
    return c.json(task, 200);
  } catch (error) {
    return c.json({ error: String(error) }, 404);
  }
});

/**
 * タスク削除
 */
app.openapi(deleteTaskRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    await taskService.deleteTask(id);
    return c.body(null, 204);
  } catch (error) {
    return c.json({ error: String(error) }, 404);
  }
});

/**
 * タスクステータス切り替え
 */
app.openapi(toggleTaskStatusRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const task = await taskService.toggleTaskStatus(id);
    return c.json(task, 200);
  } catch (error) {
    return c.json({ error: String(error) }, 404);
  }
});

export default app;
