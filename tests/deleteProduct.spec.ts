
import { test, expect } from '@playwright/test';
import { Product, ProductsResponse } from '../src/types/product';

test('Happy path: delete a product returns expected fields', async ({ request }) => {
  const productId = 1;
  const response = await request.delete(`https://dummyjson.com/products/${productId}`);
  expect(response.status()).toBe(200);
  const data: Product = await response.json();
  expect(data).toHaveProperty('id');
  expect(data.id).toBe(productId);
  expect(data).toHaveProperty('title');
  expect(data).toHaveProperty('isDeleted');
  expect(data.isDeleted).toBe(true);
  expect(data).toHaveProperty('deletedOn');
  expect(typeof data.isDeleted).toBe('boolean');
  expect(typeof data.deletedOn).toBe('string');
});

test('Alternative path: non-existent product returns 404', async ({ request }) => {
  const response = await request.delete('https://dummyjson.com/products/99999');
  expect(response.status()).toBe(404);
  const data: ProductsResponse = await response.json();
  expect(data).toHaveProperty('message');
  expect(data.message).toEqual("Product with id '99999' not found");
});

test.skip('Alternative path: GET method returns 405', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/1');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.

test.skip('Alternative path: POST method returns 405', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/1');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.