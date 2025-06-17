const request = require('supertest');
const express = require('express');
const itemsRouter = require('../items');

const app = express();
app.use(express.json());
app.use('/api/items', itemsRouter);

// Mock test data
const mockData = [
  { id: 1, name: 'Laptop', price: 2000 },
  { id: 2, name: 'Monitor', price: 1000 },
];

jest.mock('fs/promises', () => ({
  readFile: jest.fn(() => Promise.resolve(JSON.stringify(mockData))),
  writeFile: jest.fn(() => Promise.resolve()),
}));

describe('GET /api/items', () => {
  it('should return all items with status 200', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('name');
  });

  it('should filter items based on "q" query param', async () => {
    const response = await request(app).get('/api/items?q=laptop');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name.toLowerCase()).toContain('laptop');
  });

  it('should limit the number of items based on "limit" query param', async () => {
    const response = await request(app).get('/api/items?limit=1');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});

describe('GET /api/items/:id', () => {
  it('should return a single item by ID', async () => {
    const response = await request(app).get('/api/items/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should return 404 if the item is not found', async () => {
    const response = await request(app).get('/api/items/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});
