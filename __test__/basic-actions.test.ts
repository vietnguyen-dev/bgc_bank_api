import request from 'supertest';
import app from '../src';

describe('Get Club Members for user | GET /', () => {
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

describe('Get Single Club Member | GET /', () => {
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

describe('Get Reasons for Club Member | GET /', () => {
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

describe('Add Amount and Reason | POST /', () => {
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