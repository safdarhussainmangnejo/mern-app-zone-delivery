const request = require('supertest');
const app = require('../index');

describe('Authentication Routes', () => {
  let token = '';

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({ email: 'test@gmail.com', password: 'password123' });

    expect(response.body).toHaveProperty('message', 'User registered');
  });

  it('should log in an existing user and return a token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

});
