import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import listsRouter from './routes/lists/index.js';
import tasksRouter from './routes/tasks/index.js';

const app = new OpenAPIHono();

/**
 * CORS設定
 */
app.use('/*', cors());

/**
 * ルート設定
 */
app.route('/api/lists', listsRouter);
app.route('/api/tasks', tasksRouter);

/**
 * OpenAPI仕様を取得
 */
app.doc('/api/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'TODO API',
    description: 'TODOアプリのRESTful API',
  },
});

/**
 * Swagger UI
 */
app.get('/api/ui', swaggerUI({ url: '/api/doc' }));

/**
 * ルートエンドポイント
 */
app.get('/', (c) => {
  return c.json({
    message: 'TODO API Server',
    swagger: '/api/ui',
    docs: '/api/doc',
  });
});

/**
 * サーバー起動
 */
const PORT = 4000;

serve({
  fetch: app.fetch,
  port: PORT,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
  console.log(`Swagger UI: http://localhost:${info.port}/api/ui`);
  console.log(`OpenAPI Docs: http://localhost:${info.port}/api/doc`);
});
