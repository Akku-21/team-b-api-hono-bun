import { Hono } from 'hono';
import Customer, { ICustomer } from '../models/customer';

const customerRoutes = new Hono();

/**
 * @openapi
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: Successful response
 */
customerRoutes.get('/', async (c) => {
  const customers = await Customer.find();
  return c.json(customers);
});

/**
 * @openapi
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Customer not found
 */
customerRoutes.get('/:id', async (c) => {
  const customer = await Customer.findOne({ customerId: c.req.param('id') });
  if (!customer) {
    return c.notFound();
  }
  return c.json(customer);
});

/**
 * @openapi
 * /api/customers:
 *   post:
 *     summary: Create a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Successful response
 */
customerRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const customer = new Customer(body);
  await customer.save();
  return c.json(customer);
});

/**
 * @openapi
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Customer not found
 */
customerRoutes.put('/:id', async (c) => {
  const body = await c.req.json();
  const customer = await Customer.findOneAndUpdate(
    { customerId: c.req.param('id') },
    body,
    { new: true }
  );
  if (!customer) {
    return c.notFound();
  }
  return c.json(customer);
});

/**
 * @openapi
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Customer not found
 */
customerRoutes.delete('/:id', async (c) => {
  const customer = await Customer.findOneAndDelete({ customerId: c.req.param('id') });
  if (!customer) {
    return c.notFound();
  }
  return c.json({ message: 'Customer deleted' });
});

export default customerRoutes;
