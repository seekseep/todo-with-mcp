import { createRoute } from '@hono/zod-openapi';
import { createTaskSchema, taskEntitySchema } from '../../domain/entity/task.js';

/**
 * タスク作成ルート
 */
export const createTaskRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTaskSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: taskEntitySchema,
        },
      },
      description: 'タスクを作成',
    },
  },
});
