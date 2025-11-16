import { createRoute, z } from '@hono/zod-openapi';
import { listEntitySchema } from '../../domain/entity/list.js';

/**
 * リスト一覧取得ルート
 */
export const getAllListsRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(listEntitySchema),
        },
      },
      description: 'リスト一覧を取得',
    },
  },
});
