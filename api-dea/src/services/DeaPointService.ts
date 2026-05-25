import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../db';
import { AppError } from '../utils/AppError';

const table = 'dea_points';

interface DeaPointRow {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
  edited_at: string | null;
}

export class DeaPointService {
  static async getAll(limit = 50, offset = 0): Promise<DeaPointRow[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${table} LIMIT ? OFFSET ?`, [limit, offset]);
    return rows as DeaPointRow[];
  }

  static async create(data: {
    user_id: number;
    title: string;
    description?: string | null;
    latitude: number;
    longitude: number;
  }): Promise<DeaPointRow> {
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      throw new AppError('Title is required', 400);
    }
    if (data.latitude === undefined || data.latitude === null || typeof data.latitude !== 'number') {
      throw new AppError('Latitude is required and must be a number', 400);
    }
    if (data.latitude < -90 || data.latitude > 90) {
      throw new AppError('Latitude must be between -90 and 90', 400);
    }
    if (data.longitude === undefined || data.longitude === null || typeof data.longitude !== 'number') {
      throw new AppError('Longitude is required and must be a number', 400);
    }
    if (data.longitude < -180 || data.longitude > 180) {
      throw new AppError('Longitude must be between -180 and 180', 400);
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO ${table} (user_id, title, description, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
      [data.user_id, data.title.trim(), data.description || null, data.latitude, data.longitude]
    );

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM ${table} WHERE id = ?`,
      [result.insertId]
    );

  static async update(
    id: number,
    user_id: number,
    data: { title?: string; description?: string | null; latitude?: number; longitude?: number }
  ): Promise<DeaPointRow> {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.title !== undefined) {
      if (typeof data.title !== 'string' || data.title.trim().length === 0) {
        throw new AppError('Title cannot be empty', 400);
      }
      fields.push('title = ?');
      values.push(data.title.trim());
    }
    if (data.description !== undefined) {
      fields.push('description = ?');
      values.push(data.description);
    }
    if (data.latitude !== undefined) {
      if (typeof data.latitude !== 'number' || data.latitude < -90 || data.latitude > 90) {
        throw new AppError('Invalid latitude', 400);
      }
      fields.push('latitude = ?');
      values.push(data.latitude);
    }
    if (data.longitude !== undefined) {
      if (typeof data.longitude !== 'number' || data.longitude < -180 || data.longitude > 180) {
        throw new AppError('Invalid longitude', 400);
      }
      fields.push('longitude = ?');
      values.push(data.longitude);
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
      throw new AppError('DeaPoint not found or you do not have permission to update it', 404);
    }

    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    return rows[0] as DeaPointRow;
  }

  static async delete(id: number, user_id: number): Promise<void> {
    const [result] = await pool.query<ResultSetHeader>(
      `DELETE FROM ${table} WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      throw new AppError('DeaPoint not found or you do not have permission to delete it', 404);
    }
  }
}

