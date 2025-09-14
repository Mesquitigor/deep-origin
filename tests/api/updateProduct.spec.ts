import { test, expect } from '@playwright/test';

test('Update a product', async ({ request }) => {
  const response = await request.put('https://dummyjson.com/products/1', {
    data: {
      price: 99
    }
  });
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(data.price).toBe(99);
  console.log('Response body:', data);
});
