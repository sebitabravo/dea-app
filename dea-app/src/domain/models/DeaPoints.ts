// src/interfaces/DeaPoints.ts
export interface DeaPoints {
    id: number;
    user_id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    created_at: string;
    edited_at: string | null;
}
