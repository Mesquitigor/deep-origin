import { test, expect } from '@playwright/test';

test('Delete a product', async ({ request }) => {
  const response = await request.delete('https://dummyjson.com/products/1');
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(data).toHaveProperty('isDeleted');
  expect(data).toHaveProperty('deletedOn');
  expect(data.isDeleted).toBe(true);
  console.log('Response body:', data);
});
