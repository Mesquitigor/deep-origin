import { test, expect } from '@playwright/test';
import { ProductsResponse } from '../src/types/product';

test('Happy path: search returns products for "phone"', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/search?q=phone');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length).toBeGreaterThan(0);
  expect(typeof data.total).toBe('number');
  expect(data.total).toBeGreaterThan(0);
  expect(data.skip).toBe(0);
  expect(data.limit).toBe(data.products?.length);
});

test('Search returns empty array for unknown term', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/search?q=unknowntermxyz');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length).toBe(0);
  expect(data.total).toBe(0);
});

test('Search returns all products for empty query', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/search?q=');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length).toBeGreaterThan(0);
  expect(data.total).toBeGreaterThan(0);
});