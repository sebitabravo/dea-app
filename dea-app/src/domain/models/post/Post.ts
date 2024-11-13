export interface Post {
    id: number;
    user_id: number;
    title: string;
    content: string;
    created_at: string;
    edited_at: string | null;
}