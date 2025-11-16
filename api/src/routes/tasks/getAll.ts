import { createRoute, z } from '@hono/zod-openapi';
import { taskEntitySchema } from '../../domain/entity/task.js';

/**
 * タスク一覧取得ルート
 */
export const getAllTasksRoute = createRoute({
  method: 'get',
  path: '/',
  request: {
    query: z.object({
      listId: z.string().optional(),
      sortBy: z.enum(['dueDate', 'createdAt']).optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(taskEntitySchema),
        },
      },
      description: 'タスク一覧を取得',
    },
  },
});
