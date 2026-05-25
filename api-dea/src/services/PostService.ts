import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../db';
import { AppError } from '../utils/AppError';

const table = 'posts';

interface PostRow {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  edited_at: string | null;
  username?: string;
}

export class PostService {
  static async getAll(limit = 50, offset = 0): Promise<PostRow[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT p.*, u.username
       FROM ${table} p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows as PostRow[];
  }

  static async create(
    userId: number,
    title: string,
    content: string,
    image?: string | null
  ): Promise<PostRow> {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new AppError('Title is required', 400);
    }
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      throw new AppError('Content is required', 400);
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO ${table} (user_id, title, content, image) VALUES (?, ?, ?, ?)`,
      [userId, title, content, image || null]
    );

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT p.*, u.username
       FROM ${table} p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [result.insertId]
    );

  static async update(
    id: number,
    user_id: number,
    data: { title?: string; content?: string; image?: string | null }
  ): Promise<PostRow> {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.title !== undefined) {
      if (typeof data.title !== 'string' || data.title.trim().length === 0) {
        throw new AppError('Title cannot be empty', 400);
      }
      fields.push('title = ?');
      values.push(data.title.trim());
    }
    if (data.content !== undefined) {
      if (typeof data.content !== 'string' || data.content.trim().length === 0) {
        throw new AppError('Content cannot be empty', 400);
      }
      fields.push('content = ?');
      values.push(data.content.trim());
    }
    if (data.image !== undefined) {
      fields.push('image = ?');
      values.push(data.image);
    }

    if (fields.length === 0) {
      throw new AppError('No data provided to update', 400);
    }

    values.push(id, user_id);

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE ${table} SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      throw new AppError('Post not found or you do not have permission to update it', 404);
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT p.*, u.username FROM ${table} p JOIN users u ON p.user_id = u.id WHERE p.id = ?`,
      [id]
    );
    return rows[0] as PostRow;
  }

  static async delete(id: number, user_id: number): Promise<void> {
    const [result] = await pool.query<ResultSetHeader>(
      `DELETE FROM ${table} WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      throw new AppError('Post not found or you do not have permission to delete it', 404);
    }
  }
}

