import request from 'supertest';
import app from '../src';

describe('Login | POST /', () => {
  it('responds with user object and session id"', async () => {
    const requestBody = {
      name: 'John Doe',
      age: 30,
    };
    const response = await request(app).get('/club-members');
    console.log(response)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});

describe('Logout | POST /', () => {
  it('responds with user object and session id"', async () => {
    const requestBody = {
      name: 'John Doe',
      age: 30,
    };
    const response = await request(app).get('/club-members');
    console.log(response)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});

describe('Reset Password | PUT /', () => {
  it('responds with user object and session id"', async () => {
    const requestBody = {
      name: 'John Doe',
      age: 30,
    };
    const response = await request(app).get('/club-members');
    console.log(response)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});