import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { connect } from "../db";
import { User } from '../models/User';

const table = 'users';

export const login = async (req: Request, res: Response) => {
    const { email, password }: User = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please. Send your email and password' });
    }
    
    try {
        const pool = await connect();
        const [result] = await pool.query(`SELECT * FROM ${table} WHERE email = ? AND password = ?`, [email, password])
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const register = async (req: Request, res: Response) => {
    const { username, email, password }: User = req.body;

    try {
        const pool = await connect();
        const encripted = await encriptedPassword(password);
        const [result]: any = await pool.query(`INSERT INTO ${table} (username, email, password) VALUES (?, ?, ?)`, [username, email, encripted])
        if (result['affectedRows'] > 0) {
            res.json(true)
        }
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