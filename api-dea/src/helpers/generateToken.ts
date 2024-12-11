import jwt from 'jsonwebtoken';

export const generateToken = (email: string) => {
    const token = jwt.sign({
        id: email,
        rol: 1
    }, process.env.SECRET_KEY  as string, {
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
        return jwt.verify(token, process.env.SECRET_KEY as string);
    } catch (error) {
        return null;
    }
}

export const decodeToken = (token: string) => {
    return jwt.decode(token);
}