import { createRoute, z } from '@hono/zod-openapi';
import { listWithTasksEntitySchema } from '../../domain/entity/list.js';

/**
 * リスト取得ルート
 */
export const getListRoute = createRoute({
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
          schema: listWithTasksEntitySchema,
        },
      },
      description: 'リストを取得',
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
