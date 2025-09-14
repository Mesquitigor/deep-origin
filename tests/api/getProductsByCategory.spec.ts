import { test, expect } from '@playwright/test';

test('Get products by a category', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/category/smartphones');
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  console.log('Response body:', data);
});
