import { Request, Response } from "express";
import { connect } from "../db";

export const indexWelcome = (_req: Request, res: Response): Response => {
    return res.json({ message: 'Hello World' });
}

export const ping = async (_req: Request, res: Response): Promise<Response> => {
    const pool = await connect();
    const [result] = await pool.query('SELECT 10 + 5')
    return res.json(result)
}