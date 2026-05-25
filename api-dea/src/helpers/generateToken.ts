import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

interface TokenUser {
    id: number;
    email: string;
    rol: string;
}

export const generateToken = (user: TokenUser) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        rol: user.rol,
    }, SECRET_KEY, {
        expiresIn: '24h'
    });

    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return {
        token,
        expiration: expiration.toISOString()
    };
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
};

/**
 * ATENCION: jwt.decode() NO verifica la firma del token.
 * Solo decodifica el payload sin validar autenticidad.
 * NO usar para autorizacion. Usar verifyToken() en su lugar.
 */
export const decodeWithoutVerification = (token: string) => {
    return jwt.decode(token);
};
