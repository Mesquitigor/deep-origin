import { test, expect } from '@playwright/test';

test('Get all products categories', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/categories');
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(Array.isArray(data)).toBe(true);
  console.log('Response body:', data);
});
