import { Request, Response } from "express";
import { connect } from "../db";
import { DeaPoints } from "../models/DeaPoints";

const table = 'dea_points'

export const getDeaPoints = async (_: Request, res: Response) => {
    try {
        const pool = await connect();
        const [result] = await pool.query(`SELECT * FROM ${table}`)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const createDeaPoint = async (req: Request, res: Response) => {
    const { user_id, title, description, latitude, longitude }: DeaPoints = req.body;
    try {
        const pool = await connect();
        await pool.query(
            `INSERT INTO ${table} (user_id, title, description, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
            [user_id, title, description, latitude, longitude]
        );
        res.json({ message: 'DEA Point created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
