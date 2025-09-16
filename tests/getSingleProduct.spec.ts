
import { test, expect } from '@playwright/test';
import { ProductsResponse, Product } from '../src/types/product';

test('Happy path: returns product with id 1', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/1');
  expect(response.ok()).toBeTruthy();
  const data: Product = await response.json();
  expect(data.id).toBe(1);
  expect(typeof data.title).toBe('string');
  expect(typeof data.price).toBe('number');
  expect(Array.isArray(data.tags)).toBe(true);
  expect(Array.isArray(data.images)).toBe(true);
  expect(typeof data.meta).toBe('object');
});

test('Non-existent product: returns 404', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/99999');
  const data: ProductsResponse = await response.json();
  expect(response.status()).toBe(404);
  expect(data).toHaveProperty('message');
  expect(data.message).toEqual("Product with id '99999' not found");
});

test('Invalid product id: returns error', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/invalid');
  const data: ProductsResponse = await response.json();
  expect(response.status()).toBe(404);
  expect(data).toHaveProperty('message');
  expect(data.message).toEqual("Product with id 'invalid' not found");
});
