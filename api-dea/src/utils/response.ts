import { Response } from 'express';

interface ApiMeta {
  [key: string]: unknown;
}

interface ApiSuccessResponse<T> {
  data: T;
  error: null;
  meta: ApiMeta | null;
}

interface ApiErrorResponse {
  data: null;
  error: { message: string; status: number };
  meta: null;
}

export function sendSuccess<T>(res: Response, data: T, meta?: ApiMeta | null, statusCode = 200): void {
  const body: ApiSuccessResponse<T> = {
    data,
    error: null,
    meta: meta ?? null,
  };
  res.status(statusCode).json(body);
}

export function sendError(res: Response, message: string, statusCode = 500): void {
  const body: ApiErrorResponse = {
    data: null,
    error: { message, status: statusCode },
    meta: null,
  };
  res.status(statusCode).json(body);
}
