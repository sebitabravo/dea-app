import { BaseModel } from "./BaseModel";

export interface Post extends BaseModel {
    user_id: number;
    title: string;
    content: string;
}