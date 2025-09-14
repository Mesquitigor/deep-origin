import { test, expect } from '@playwright/test';

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
};

type GetAllProductsResponse = {
  products?: Product[];
  total?: number;
  skip?: number;
  limit?: number;
};

test('Happy path: returns 30 products by default', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products');
  expect(response.ok()).toBeTruthy();
  const data: GetAllProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length === 30).toBe(true);
  expect(typeof data.total).toBe('number');
  expect(data.skip).toBe(0);
  expect(data.limit).toBe(30);
});

test('Pagination: returns correct products with limit and skip', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=10&skip=10');
  expect(response.ok()).toBeTruthy();
  const data: GetAllProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length === 10).toBe(true);
  expect(data.skip).toBe(10);
  expect(data.limit).toBe(10);
});

test('Zero limit: returns all products', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=0');
  expect(response.ok()).toBeTruthy();
  const data: GetAllProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.total && data.products.length === data.total).toBe(true);
});

test('Negative limit: returns error or default response', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?limit=-10');
  expect(response.ok()).toBeTruthy();
  const data: GetAllProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
});

test('Skip greater than total: returns empty list', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products?skip=1000');
  expect(response.ok()).toBeTruthy();
  const data: GetAllProductsResponse = await response.json();
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products && data.products.length === 0).toBe(true);
});