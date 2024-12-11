import { Request, Response } from "express";
import { connect } from "../db";

const table = 'users';

export const getUsers = async (_: Request, res: Response) => {
    try {
        const pool = await connect();
        const [result] = await pool.query(`SELECT * FROM ${table} GROUP BY id`);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pool = await connect();
        const [result] = await pool.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
