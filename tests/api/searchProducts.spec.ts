import { test, expect } from '@playwright/test';

test('Search products', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/search?q=phone');
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  console.log('Response body:', data);
});
