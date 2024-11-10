import { BaseModel } from "./BaseModel";

export enum ROLES {
    ADMIN = 'admin',
    USER = 'user',
}

export interface User extends BaseModel {
    username: string;
    email: string;
    password: string;
}