import { createRoute, z } from '@hono/zod-openapi';
import { updateListSchema, listEntitySchema } from '../../domain/entity/list.js';

/**
 * リスト更新ルート
 */
export const updateListRoute = createRoute({
  method: 'put',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateListSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: listEntitySchema,
        },
      },
      description: 'リストを更新',
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
