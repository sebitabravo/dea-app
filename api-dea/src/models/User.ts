export enum ROLES {
    ADMIN = 'admin',
    USER = 'user',
}

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}