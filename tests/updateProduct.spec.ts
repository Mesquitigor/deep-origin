
import { test, expect } from '@playwright/test';
import { Product } from '../src/types/product';

test('Happy path: update a product returns expected fields', async ({ request }) => {
  const productId = 1;
  const updateData = { title: 'iPhone Galaxy +1', price: 99 };
  const response = await request.put(`https://dummyjson.com/products/${productId}`, { data: updateData });
  expect(response.status()).toBe(200);
  const data: Product = await response.json();
  expect(data).toHaveProperty('id');
  expect(data.title).toBe(updateData.title);
  expect(data.price).toBe(updateData.price);
});

test('Alternative path: non-existent product returns 404', async ({ request }) => {
  const response = await request.put('https://dummyjson.com/products/99999', { data: { title: 'Test' } });
  expect(response.status()).toBe(404);
  const data: Product = await response.json();
  expect(data).toHaveProperty('message');
  expect(data.message).toEqual("Product with id '99999' not found");
});

test.skip('Alternative path: GET method returns 405', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/1');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.

test.skip('Alternative path: POST method returns 405', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/1', { data: { title: 'Test' } });
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.

test.skip('Alternative path: empty body returns error', async ({ request }) => {
  const response = await request.put('https://dummyjson.com/products/1', { data: {} });
  expect([400, 422]).toContain(response.status());
});
// It is a bug. The API should return 400 for lacking mandatory fields.
