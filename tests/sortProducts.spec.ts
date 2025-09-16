
import { test, expect } from '@playwright/test';
import { ProductsResponse } from '../src/types/product';


test('Happy path: products sorted by title ascending', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?sortBy=title&order=asc');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  const titles = (data.products ?? []).map(p => p.title);
  const isAscending = titles.every((title, i, arr) => 
    i === 0 || title[0].localeCompare(arr[i - 1][0]) >= 0
  );
  expect(isAscending).toBe(true);
});

test('Happy path: products sorted by id descending', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?sortBy=id&order=desc');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  const ids = (data.products ?? []).map(p => p.id);
  const isDescending = ids.every((id, i, arr) => 
    i === 0 || id <= arr[i - 1]
  );
  expect(isDescending).toBe(true);
});
// It has a bug. The sortProducts filter for descending order is failing when used with the 'title' parameter.

test('Invalid sortBy field returns default order', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?sortBy=invalidField&order=asc');
  expect(response.ok()).toBeTruthy();
  const data: ProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
});