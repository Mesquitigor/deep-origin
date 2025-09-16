import { ProductsResponse } from '../src/types/product';
import { test, expect } from '@playwright/test';

test('Happy path: returns 30 products by default', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBeTruthy();
  expect(data.products && data.products.length === 30).toBeTruthy();
  expect(typeof data.total).toBe('number');
  expect(data.skip).toBe(0);
  expect(data.limit).toBe(30);
});

test('Pagination: returns correct products with limit and skip', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=10&skip=10');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length === 10).toBe(true);
  expect(data.skip).toBe(10);
  expect(data.limit).toBe(10);
});

test('Zero limit: returns all products', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=0');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.total && data.products.length === data.total).toBe(true);
});

test('Negative limit: returns error or default response', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=-10');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  console.log(response.status());
});

test('Skip greater than total: returns empty list', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?skip=1000');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length === 0).toBe(true);
});