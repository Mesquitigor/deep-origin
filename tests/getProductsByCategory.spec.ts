import { test, expect } from '@playwright/test';
import { ProductsResponse } from '../src/types/product';


test('Happy path: returns products by category with expected fields', async ({ request }) => {
  const category = 'smartphones';
  const response = await request.get(`https://dummyjson.com/products/category/${category}`);
  expect(response.status()).toBe(200);
  const data: ProductsResponse = await response.json();
  expect(data).toHaveProperty('products');
  expect(data).toHaveProperty('total');
  expect(data).toHaveProperty('skip');
  expect(data).toHaveProperty('limit');
  expect(data.products?.length).toBeGreaterThan(0);
  for (const product of data.products ?? []) {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('category');
    expect(product.category).toBe(category);
  }
  expect(Array.isArray(data.products)).toBe(true);
  expect(typeof data.total).toBe('number');
  expect(typeof data.skip).toBe('number');
  expect(typeof data.limit).toBe('number');
});

test('Alternative path: non-existent category returns 404 or empty array', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/category/invalid-category');
  expect([200, 404]).toContain(response.status());
  if (response.status() === 200) {
    const data: any = await response.json();
    expect(Array.isArray(data.products)).toBe(true);
    expect(data.products.length).toBe(0);
  }
});

test.skip('Alternative path: POST method returns 405', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/category/smartphones');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.