import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { IS_PRODUCTION } from '../config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Express ErrorRequestHandler requiere any
export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    const safeError = err instanceof Error ? err.message : 'Unknown error';

    if (IS_PRODUCTION) {
        console.error(`Error on ${req.method} ${req.originalUrl}: ${safeError}`);
    } else {
        console.error('Error:', err);
    }

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // MySQL errors
    if (err.code === 'ER_DUP_ENTRY') {
        statusCode = 409;
        message = 'Duplicate entry';
    }

    if (err.code === 'ER_NO_SUCH_TABLE') {
        statusCode = 500;
        message = 'Database table not found';
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    sendError(res, IS_PRODUCTION && statusCode >= 500 ? 'Internal Server Error' : message, statusCode);
};

export const notFound = (req: Request, res: Response) => {
    sendError(res, `Route ${req.originalUrl} not found`, 404);
};
