import { Request, Response } from "express";
import { connect } from "../db";

export const getDeaPoints = async (_: Request, res: Response) => {
    try {
        const pool = await connect();
        const [result] = await pool.query(`SELECT * FROM dea_points`)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}