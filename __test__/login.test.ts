import request from 'supertest';
import app from '../src';
import dotenv from 'dotenv';

dotenv.config()

describe('Login | POST /', () => {
  it('responds with user object and session id"', async () => {
    const requestBody = {
        "username": "skuntz99",
        "password": "iamcool99"
      }
      const key = process.env.API_KEY
    const response = (await request(app).post('/login').send(requestBody).set({ 'x-api-key': key, Accept: '*' }))
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        "id": 22,
        "name": "Shaysie Kuntz",
        "username": "skuntz99",
        "club_email_id": 1,
        "club_id": 1
      });
  });
});

// describe('Logout | POST /', () => {
//   it('responds with user object and session id"', async () => {
//     const requestBody = {
//       name: 'John Doe',
//       age: 30,
//     };
//     const response = await request(app).get('/club-members');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: 'Hello, World!' });
//   });
// });

// describe('Reset Password | PUT /', () => {
//   it('responds with user object and session id"', async () => {
//     const requestBody = {
//       name: 'John Doe',
//       age: 30,
//     };
//     const response = await request(app).get('/club-members');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: 'Hello, World!' });
//   });
// });