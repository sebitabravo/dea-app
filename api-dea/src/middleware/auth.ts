import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/generateToken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      data: null,
      error: { message: 'Authentication required. No token provided.', status: 401 },
      meta: null,
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      data: null,
      error: { message: 'Authentication required. Token is empty.', status: 401 },
      meta: null,
    });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === 'string') {
    res.status(401).json({
      data: null,
      error: { message: 'Invalid or expired token.', status: 401 },
      meta: null,
    });
    return;
  }

  req.user = {
    id: decoded.id as number,
    email: decoded.email as string,
    rol: decoded.rol as string,
  };

  next();
};
