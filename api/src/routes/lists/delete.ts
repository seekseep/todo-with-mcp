import { createRoute, z } from '@hono/zod-openapi';

/**
 * リスト削除ルート
 */
export const deleteListRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    204: {
      description: 'リストを削除',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
      description: 'リストが見つかりません',
    },
  },
});
