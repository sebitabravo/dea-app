import { Request, RequestHandler, Response } from "express";
import { PostService } from "../services/PostService";
import { sendSuccess, sendError } from "../utils/response";
import { parsePagination } from "../utils/pagination";


export const getPosts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { limit, offset } = parsePagination(req.query.limit, req.query.offset);
        const posts = await PostService.getAll(limit, offset);
        sendSuccess(res, posts);
    } catch (error) {
        console.error(error);
        sendError(res, 'Internal server error');
    }
};

export const createPost: RequestHandler = async (req: Request, res: Response) => {
    const { title, content, image } = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
        sendError(res, 'Authentication required', 401);
        return;
    }

    if (!title || !content) {
        sendError(res, 'Title and content are required', 400);
        return;
    }

    try {
        const post = await PostService.create(user_id, title, content, image);
        sendSuccess(res, post, null, 201);
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};

export const updatePost: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
        sendError(res, 'Authentication required', 401);
        return;
    }

    try {
        const post = await PostService.update(Number(id), user_id, req.body);
        sendSuccess(res, post);
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};

export const deletePost: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
        sendError(res, 'Authentication required', 401);
        return;
    }

    try {
        await PostService.delete(Number(id), user_id);
        sendSuccess(res, { message: 'Post deleted successfully' });
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};
