import { Request, RequestHandler, Response } from "express";
import { AuthService } from "../services/AuthService";
import { sendSuccess, sendError } from "../utils/response";

export const login: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        sendError(res, 'Email and password are required', 400);
        return;
    }

    try {
        const result = await AuthService.login(email, password);
        sendSuccess(res, result);
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};

export const register: RequestHandler = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        sendError(res, 'Username, email, and password are required', 400);
        return;
    }

    try {
        const result = await AuthService.register(username, email, password);
        sendSuccess(res, result, null, 201);
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};
