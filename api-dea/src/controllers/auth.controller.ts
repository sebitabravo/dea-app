import bcrypt from 'bcrypt';
import { Request, RequestHandler, Response } from "express";
import { connect } from "../db";
import { generateToken } from '../helpers/generateToken';
import { User } from '../models/User';

const table = 'users';

export const login: RequestHandler = async (req: Request, res: Response) => {
    const { email, password }: User = req.body;

    // Validación de los campos requeridos
    if (!email || !password) {
        res.status(400).json({ message: 'Please. Send your email and password' });
        return;
    }

    try {
        const pool = await connect();
        const [result]: any = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);

        // Verificar si el usuario existe
        if (!result.length) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const user = result[0];

        // Comparar la contraseña
        const validPassword = await comparePassword(password, user.password);

        if (validPassword) {
            // Contraseña válida, generar token y responder con éxito
            const { token, expiration } = generateToken(email);
            res.json({
                message: 'Login success',
                user: {
                    ...user,
                    password: undefined // Oculta la contraseña en la respuesta
                },
                token,
                expiration
            });
        } else {
            // Contraseña incorrecta
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const register: RequestHandler = async (req: Request, res: Response) => {
    const { username, email, password }: User = req.body;

    // Validación de los campos requeridos
    if (!username || !email || !password) {
        res.status(400).json({ message: 'Please send your username, email, and password' });
        return;
    }

    try {
        const pool = await connect();

        // Verificar si el correo ya esta registrado
        const [existingUser]: any = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);
        if (existingUser.length > 0) {
            res.status(409).json({ message: 'Email is already registered' }); // 409 Conflict
            return;
        }

        // Encriptar la contraseña
        const encrypted = await encriptedPassword(password);

        // Insertar el nuevo usuario en la base de datos
        const [result]: any = await pool.query(`INSERT INTO ${table} (username, email, password) VALUES (?, ?, ?)`, [username, email, encrypted]);
        
        // Comprobar si la insercion fue exitosa
        if (result.affectedRows > 0) {
            // Obtener el usuario recien registrado
            const [rows]: any = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);

            const user = rows[0];

            // Generar token de autenticacion
            const { token, expiration } = generateToken(email);

            // Responder con exito
            res.status(201).json({
                message: 'Registration successful',
                user: {
                    ...user,
                    password: undefined
                },
                token,
                expiration
            });
        } else {
            res.status(500).json({ message: 'Failed to register user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const encriptedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, receivedPassword);
};