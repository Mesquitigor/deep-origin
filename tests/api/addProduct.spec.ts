import { test, expect } from '@playwright/test';

test('Add a new product', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/add', {
    data: {
      title: 'BMW Pencil',
      price: 10
    }
  });
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(data.title).toBe('BMW Pencil');
  expect(data.price).toBe(10);
  console.log('Response body:', data);
});
