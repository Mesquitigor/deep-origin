import { test, expect } from '@playwright/test';
import { ProductsResponse } from '../src/types/product';

test('Happy path: limit and skip returns correct products', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=10&skip=10&select=title,price');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length).toBe(10);
  expect(data.products && typeof data.products[0].title).toBe('string');
  expect(data.products && typeof data.products[0].price).toBe('number');
  expect(data.skip).toBe(10);
  expect(data.limit).toBe(10);
  dataTypeValidation(data);
});

test('Limit zero returns all products', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=0');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length).toBe(data.total);
});

test('Skip greater than total returns empty array', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?skip=200');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length).toBe(0);
  dataTypeValidation(data);
});

test('Select only title returns products with title field', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=5&select=title');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && typeof data.products[0].title).toBe('string');
  expect(data.products && data.products[0].price).toBeUndefined();
});

function dataTypeValidation(data:ProductsResponse) {
  for (let product of data.products || []) {
    expect(typeof product.id).toBe('number');
    expect(typeof product.title).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(Object.keys(product).length).toBe(3);
  }
}