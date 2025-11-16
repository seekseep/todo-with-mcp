import { createRoute, z } from '@hono/zod-openapi';
import { taskEntitySchema } from '../../domain/entity/task.js';

/**
 * タスクステータス切り替えルート
 */
export const toggleTaskStatusRoute = createRoute({
  method: 'post',
  path: '/{id}/toggle',
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
      description: 'タスクステータスを切り替え',
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
