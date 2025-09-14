import { test, expect } from '@playwright/test';

test('Sort products', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?sortBy=title&order=asc');
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  console.log('Response body:', data);
});
