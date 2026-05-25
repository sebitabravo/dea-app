import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../auth';
import { verifyToken } from '../../helpers/generateToken';

// Mock verifyToken
jest.mock('../../helpers/generateToken', () => ({
  verifyToken: jest.fn(),
}));

describe('authMiddleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Partial<Response>;
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('returns 401 when no authorization header is present', () => {
    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('returns 401 when authorization header does not start with Bearer', () => {
    mockReq.headers = { authorization: 'Basic abc123' };

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('returns 401 when token is invalid', () => {
    mockReq.headers = { authorization: 'Bearer invalid-token' };
    (verifyToken as jest.Mock).mockReturnValue(null);

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('returns 401 when token is an empty string after Bearer', () => {
    mockReq.headers = { authorization: 'Bearer ' };

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('calls next() and sets req.user when token is valid', () => {
    const decodedToken = { id: 1, email: 'test@example.com', rol: 'user' };
    mockReq.headers = { authorization: 'Bearer valid-token' };
    (verifyToken as jest.Mock).mockReturnValue(decodedToken);

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(verifyToken).toHaveBeenCalledWith('valid-token');
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect((mockReq as Request).user).toEqual(decodedToken);
  });

  it('returns 401 when verifyToken returns a string (error case)', () => {
    mockReq.headers = { authorization: 'Bearer malformed-token' };
    (verifyToken as jest.Mock).mockReturnValue('invalid signature');

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });
});
