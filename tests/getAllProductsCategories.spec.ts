
import { test, expect } from '@playwright/test';
import { ProductsResponse } from '../src/types/product';

test('Happy path: returns all categories with expected fields', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/categories');
  expect(response.status()).toBe(200);
  const data: any[] = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  for (const item of data) {
    expect(item).toHaveProperty('slug');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('url');
    expect(typeof item.slug).toBe('string');
    expect(typeof item.name).toBe('string');
    expect(typeof item.url).toBe('string');
    expect(item.url.startsWith('https://dummyjson.com/products/category/')).toBe(true);
  }
});

test('Alternative path: wrong endpoint returns 404', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/categoriess');
  const data: ProductsResponse = await response.json();
  expect(response.status()).toBe(404);
  expect(data.message).toEqual("Product with id 'categoriess' not found");
});

test.skip('Alternative path: POST method returns 405', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/categories');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.

test.skip('Alternative path: PUT method returns 405', async ({ request }) => {
  const response = await request.put('https://dummyjson.com/products/categories');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.

test.skip('Alternative path: DELETE method returns 405', async ({ request }) => {
  const response = await request.delete('https://dummyjson.com/products/categories');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.
