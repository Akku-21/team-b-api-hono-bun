import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { apiReference } from '@scalar/hono-api-reference';
import { connectDB } from './db';
import customerRoutes from './routes/customer';
import { describeRoute, openAPISpecs } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';
import { z } from 'zod';

const app = new Hono();

app.get(
  '/openapi',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: 'Hono API',
        version: '1.0.0',
        description: 'Greeting API',
      },
      servers: [
        { url: 'http://localhost:3000', description: 'Local Server' },
      ],
    },
  })
)

app.get(
  '/docs',
  apiReference({
    theme: 'saturn',
    spec: { url: '/openapi' },
  })
)

app.route('/api/customers', customerRoutes);

const querySchema = z.object({
  name: z.optional(z.string()),
})

const responseSchema = z.string()

app.get('/',  describeRoute({
    description: 'Say hello to the user',
    responses: {
      200: {
        description: 'Successful response',
        content: {
          'text/plain': { schema: resolver(responseSchema) },
        },
      },
    },
  }), (c) => c.text('Hello World!'));

connectDB();

export default app;
