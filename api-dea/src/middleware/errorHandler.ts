import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);

    // Default error
    let error = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal Server Error'
    };

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = { statusCode: 404, message };
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { statusCode: 400, message };
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val: any) => val.message).join(', ');
        error = { statusCode: 400, message };
    }

    // MySQL errors
    if (err.code === 'ER_DUP_ENTRY') {
        error = { statusCode: 409, message: 'Duplicate entry' };
    }

    if (err.code === 'ER_NO_SUCH_TABLE') {
        error = { statusCode: 500, message: 'Database table not found' };
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = { statusCode: 401, message: 'Invalid token' };
    }

    if (err.name === 'TokenExpiredError') {
        error = { statusCode: 401, message: 'Token expired' };
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

export const notFound = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
};