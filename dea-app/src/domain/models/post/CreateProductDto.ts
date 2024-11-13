import { Post } from "./Post";


export interface CreatePostDto extends Omit<Post, 'id' | 'created_at' | 'edited_at'> {

}