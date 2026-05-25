import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { sendSuccess, sendError } from "../utils/response";
import { parsePagination } from "../utils/pagination";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { limit, offset } = parsePagination(req.query.limit, req.query.offset);
        const result = await UserService.getAll(limit, offset);
        sendSuccess(res, result);
    } catch (error) {
        console.error(error);
        sendError(res, 'Internal server error');
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await UserService.getById(Number(id));
        sendSuccess(res, user);
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const requesterId = req.user?.id;

    if (!requesterId) {
        sendError(res, 'Authentication required', 401);
        return;
    }

    if (requesterId !== Number(id)) {
        sendError(res, 'Forbidden: you can only update your own profile', 403);
        return;
    }

    if (!username && !email) {
        sendError(res, 'Send username or email to update', 400);
        return;
    }

    try {
        const user = await UserService.update(Number(id), { username, email });
        sendSuccess(res, user);
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};
