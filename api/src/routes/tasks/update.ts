import { createRoute, z } from '@hono/zod-openapi';
import { updateTaskSchema, taskEntitySchema } from '../../domain/entity/task.js';

/**
 * タスク更新ルート
 */
export const updateTaskRoute = createRoute({
  method: 'put',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateTaskSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: taskEntitySchema,
        },
      },
      description: 'タスクを更新',
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
