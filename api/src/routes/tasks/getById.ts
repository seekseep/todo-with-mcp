import { createRoute, z } from '@hono/zod-openapi';
import { taskEntitySchema } from '../../domain/entity/task.js';

/**
 * タスク取得ルート
 */
export const getTaskRoute = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: taskEntitySchema,
        },
      },
      description: 'タスクを取得',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
      description: 'タスクが見つかりません',
    },
  },
});
