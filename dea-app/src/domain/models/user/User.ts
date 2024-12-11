export interface User {
    id: number | null;
    username: string | null;
    email: string | null;
    role: 'admin' | 'user' | 'moderator' | null;
}