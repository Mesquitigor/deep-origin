import { test, expect } from '@playwright/test';

test('Get products category list', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/category-list');
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(Array.isArray(data)).toBe(true);
  console.log('Response body:', data);
});
