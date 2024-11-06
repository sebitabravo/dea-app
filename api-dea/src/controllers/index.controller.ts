import { Request, Response } from "express";
import { connect } from "../db";

export const indexWelcome = async (_: Request, res: Response) => {
    return res.json({ message: 'Hello World' });
}

export const ping = async (_: Request, res: Response) => {
    const pool = await connect();
    const [result] = await pool.query('SHOW TABLES')
    return res.json(result)
}