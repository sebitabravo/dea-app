import { BaseModel } from "./BaseModel";

export interface DeaPoints extends BaseModel {
    user_id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
}