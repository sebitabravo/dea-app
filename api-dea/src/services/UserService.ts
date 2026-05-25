import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../db';
import { AppError } from '../utils/AppError';

const table = 'users';
const SELECT_COLUMNS = 'id, username, email, rol, created_at';

interface UserRow {
  id: number;
  username: string;
  email: string;
  rol: string;
  created_at: string;
}

export class UserService {
  static async getAll(limit = 50, offset = 0): Promise<{ data: UserRow[]; pagination: { total: number; limit: number; offset: number } }> {
    const [countRows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) as total FROM ${table}`);
    const total = countRows[0].total as number;

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT ${SELECT_COLUMNS} FROM ${table} LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return {
      data: rows as UserRow[],
      pagination: { total, limit, offset }
    };
  }

  static async getById(id: number): Promise<UserRow> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT ${SELECT_COLUMNS} FROM ${table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      throw new AppError('User not found', 404);
    }

    return rows[0] as UserRow;
  }

  static async update(id: number, data: { username?: string; email?: string }): Promise<UserRow> {
    if (!data.username && !data.email) {
      throw new AppError('Send username or email to update', 400);
    }

    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.username) {
      fields.push('username = ?');
      values.push(data.username);
    }
    if (data.email) {
      fields.push('email = ?');
      values.push(data.email);
    }

    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE ${table} SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      throw new AppError('User not found', 404);
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT ${SELECT_COLUMNS} FROM ${table} WHERE id = ?`,
      [id]
    );

    return rows[0] as UserRow;
  }
}
