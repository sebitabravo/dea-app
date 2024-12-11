import { Post } from "./Post";

export interface PostListDto extends Omit<Post, 'id'> {
    post_id: number;       
    email: string;
    username: string;         
}