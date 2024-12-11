import { BaseModel } from "./BaseModel";

export interface Post extends BaseModel {
    user_id: number;
    title: string;
    image: string;
    content: string;
}