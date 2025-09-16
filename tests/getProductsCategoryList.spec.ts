
import { test, expect } from '@playwright/test';
import categoriesList from '../src/fixtures/categoriesList';

test('Happy path: returns category list as array of strings', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/category-list');
  expect(response.status()).toBe(200);
  const data: any[] = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  for (const item of data) {
    expect(typeof item).toBe('string');
    expect(categoriesList).toContain(item);
  }
});

test('Alternative path: wrong endpoint returns 404', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/category-lists');
  expect(response.status()).toBe(404);
});

test.skip('Alternative path: POST method returns 405', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/category-list');
  expect(response.status()).toBe(405);
});
// It is a bug. The API should return 405 for unsupported methods.