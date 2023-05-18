import request from 'supertest';
import app from '../src';

describe('Has Api Key | POST /', () => {
  it('responds with user object and session id"', async () => {
    const requestBody = {
      name: 'John Doe',
      age: 30,
    };
    const response = await request(app).get('/club-members');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});

describe('In Session | GET /', () => {
  it('responds with user object and session id"', async () => {
    const requestBody = {
      name: 'John Doe',
      age: 30,
    };
    const response = await request(app).get('/club-members');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});