import { Post } from "./Post";


export type CreatePostDto = Omit<Post, 'id' | 'created_at' | 'edited_at'>;