import { createRoute } from '@hono/zod-openapi';
import { createListSchema, listEntitySchema } from '../../domain/entity/list.js';

/**
 * リスト作成ルート
 */
export const createListRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createListSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: listEntitySchema,
        },
      },
      description: 'リストを作成',
    },
  },
});
