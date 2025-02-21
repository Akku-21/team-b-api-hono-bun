import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { apiReference } from '@scalar/hono-api-reference';
import { connectDB } from './db';
import customerRoutes from './routes/customer';

const app = new Hono();

app.use('/api/*', apiReference({
  title: 'Customer API',
  version: '1.0.0',
  description: 'API for managing customer data',
}));

app.route('/api/customers', customerRoutes);

app.get('/', (c) => c.text('Hello World!'));

app.get('/static/*', serveStatic({ root: './' }));

connectDB();

export default app;
