import bcrypt from 'bcrypt';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../db';
import { generateToken } from '../helpers/generateToken';
import { AppError } from '../utils/AppError';

const table = 'users';

interface AuthResult {
  user: {
    id: number;
    username: string;
    email: string;
    rol: string;
    created_at: string;
  };
  token: string;
  expiration: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

const assertValidEmail = (email: string): void => {
  if (!EMAIL_REGEX.test(email)) {
    throw new AppError('Invalid email format', 400);
  }
};

const assertValidPassword = (password: string): void => {
  if (!PASSWORD_REGEX.test(password)) {
    throw new AppError(
      'Password must contain at least 12 chars, one uppercase letter, one number and one special character',
      400
    );
  }
};

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResult> {
    const normalizedEmail = email.trim().toLowerCase();

    assertValidEmail(normalizedEmail);

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM ${table} WHERE email = ?`,
      [normalizedEmail]
    );

    if (rows.length === 0) {
      throw new AppError('Invalid credentials', 401);
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const { token, expiration } = generateToken({
      id: user.id,
      email: user.email,
      rol: user.rol,
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol,
        created_at: user.created_at,
      },
      token,
      expiration,
    };
  }

  static async register(username: string, email: string, password: string): Promise<AuthResult> {
    const normalizedEmail = email.trim().toLowerCase();

    assertValidEmail(normalizedEmail);
    assertValidPassword(password);

    const [existing] = await pool.query<RowDataPacket[]>(
      `SELECT id FROM ${table} WHERE email = ?`,
      [normalizedEmail]
    );

    if (existing.length > 0) {
      throw new AppError('Email is already registered', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password, salt);

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO ${table} (username, email, password) VALUES (?, ?, ?)`,
      [username, normalizedEmail, encrypted]
    );

    if (result.affectedRows === 0) {
      throw new AppError('Failed to register user', 500);
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, username, email, rol, created_at FROM ${table} WHERE id = ?`,
      [result.insertId]
    );

    const user = rows[0];
    const { token, expiration } = generateToken({
      id: user.id,
      email: user.email,
      rol: user.rol,
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol,
        created_at: user.created_at,
      },
      token,
      expiration,
    };
  }
}
