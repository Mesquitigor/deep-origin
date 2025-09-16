import { test, expect } from '@playwright/test';
import { ProductsResponse } from '../src/types/product';

test('Happy path: add a new product returns expected fields', async ({ request }) => {
  const product = { title: 'BMW Pencil', price: 10 };
  const response = await request.post('https://dummyjson.com/products/add', { data: product });
  expect(response.status()).toBe(201);
  const data: ProductsResponse = await response.json();
  expect(data).toHaveProperty('id');
});

test.skip('Alternative path: creating the same product twice returns error', async ({ request }) => {
  const product = { title: 'BMW Pencil', price: 10 };
  const firstResponse = await request.post('https://dummyjson.com/products/add', { data: product });
  expect(firstResponse.status()).toBe(201);
  const secondResponse = await request.post('https://dummyjson.com/products/add', { data: product });
  expect([400, 409, 422]).toContain(secondResponse.status());
});
// It is a bug. The API should return 400 for double creation with same information.

test.skip('Alternative path: missing title returns error', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/add', { data: { price: 10 } });
  expect([400, 422]).toContain(response.status());
});
// It is a bug. The API should return 400 for lacking mandatory fields.


test.skip('Alternative path: GET method returns 405', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/add');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.

test.skip('Alternative path: empty body returns error', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/add', { data: {} });
  expect([400, 422]).toContain(response.status());
});
// It is a bug. The API should return 400 for lacking mandatory fields.
