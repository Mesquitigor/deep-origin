import { test, expect } from '@playwright/test';

test('Limit and skip products', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=10&skip=10&select=title,price');
  expect(response.ok()).toBeTruthy();
  const data: any = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products.length).toBe(10);
  expect(data.products[0]).toHaveProperty('title');
  expect(data.products[0]).toHaveProperty('price');
  console.log('Response body:', data);
});
