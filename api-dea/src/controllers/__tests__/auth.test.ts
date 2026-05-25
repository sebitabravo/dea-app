import request from 'supertest';
import { App } from '../../app';

// Mock AuthService to avoid real database calls
jest.mock('../../services/AuthService', () => ({
  AuthService: {
    login: jest.fn(),
    register: jest.fn(),
  },
}));

const appInstance = new App();
const app = appInstance.getApp();

describe('Auth Controller', () => {
  describe('POST /api/v1/auth/login', () => {
    it('returns 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ password: '123456' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Email and password are required');
    });

    it('returns 400 when password is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Email and password are required');
    });

    it('returns 400 when both fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({})
        .expect('Content-Type', /json/);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Email and password are required');
    });
  });

  describe('POST /api/v1/auth/register', () => {
    it('returns 400 when username is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'test@example.com', password: '123456' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Username, email, and password are required');
    });

    it('returns 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ username: 'testuser', password: '123456' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Username, email, and password are required');
    });

    it('returns 400 when password is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ username: 'testuser', email: 'test@example.com' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Username, email, and password are required');
    });

    it('returns 400 when all fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({})
        .expect('Content-Type', /json/);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Username, email, and password are required');
    });
  });
});
