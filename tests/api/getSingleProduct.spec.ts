import { test, expect } from '@playwright/test';

test('Get a single product', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/1');
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(data.id).toBe(1);
  console.log('Response body:', data);
});
