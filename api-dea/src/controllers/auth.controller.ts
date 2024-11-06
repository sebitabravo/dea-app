import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { connect } from "../db";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const pool = await connect();
        const [result] = await pool.query(`SELECT * FROM auth WHERE email = ? AND password = ?`, [email, password])
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const pool = await connect();
        const encripted = await encriptedPassword(password);
        const [result] = await pool.query(`INSERT INTO auth (email, password) VALUES (?, ?)`, [email, encripted])
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const encriptedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, receivedPassword);
};