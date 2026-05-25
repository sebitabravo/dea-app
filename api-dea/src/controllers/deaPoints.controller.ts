import { Request, Response } from "express";
import { DeaPointService } from "../services/DeaPointService";
import { sendSuccess, sendError } from "../utils/response";
import { parsePagination } from "../utils/pagination";


export const getDeaPoints = async (req: Request, res: Response) => {
    try {
        const { limit, offset } = parsePagination(req.query.limit, req.query.offset);
        const points = await DeaPointService.getAll(limit, offset);
        sendSuccess(res, points);
    } catch (error) {
        console.error(error);
        sendError(res, 'Internal server error');
    }
};

export const createDeaPoint = async (req: Request, res: Response) => {
    const { title, description, latitude, longitude } = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
        sendError(res, 'Authentication required', 401);
        return;
    }

    try {
        const point = await DeaPointService.create({
            user_id,
            title,
            description,
            latitude: Number(latitude),
            longitude: Number(longitude),
        });
        sendSuccess(res, point, null, 201);
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};

export const updateDeaPoint = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
        sendError(res, 'Authentication required', 401);
        return;
    }

    try {
        const point = await DeaPointService.update(Number(id), user_id, req.body);
        sendSuccess(res, point);
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};

export const deleteDeaPoint = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
        sendError(res, 'Authentication required', 401);
        return;
    }

    try {
        await DeaPointService.delete(Number(id), user_id);
        sendSuccess(res, { message: 'DeaPoint deleted successfully' });
    } catch (error) {
        const err = error as Error & { statusCode?: number };
        sendError(res, err.message, err.statusCode || 500);
    }
};
