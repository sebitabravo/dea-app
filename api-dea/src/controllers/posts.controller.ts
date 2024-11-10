import { Request, RequestHandler, Response } from "express";
import { connect } from "../db";
import { Post } from "../models/Posts";

const table = 'posts';

export const getPosts: RequestHandler = async (_: Request, res: Response) => {
    try {
        const pool = await connect();
        const [result] = await pool.query(`SELECT * FROM ${table} ORDER BY id DESC`);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createPost: RequestHandler = async (req: Request, res: Response) => {
    const { user_id, title, content }: Post = req.body;

    if (!user_id || !title || !content) {
        res.status(400).json({ message: 'Please. Send your user_id, title and content' });
        return;
    }

    try {
        const pool = await connect();
        await pool.query(
            `INSERT INTO ${table} (user_id, title, content) VALUES (?, ?, ?)`,
            [user_id, title, content]
        );
        res.status(201).json({ message: 'Post created successfully' });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};
