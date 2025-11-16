import { createRoute, z } from '@hono/zod-openapi';

/**
 * タスク削除ルート
 */
export const deleteTaskRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    204: {
      description: 'タスクを削除',
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
