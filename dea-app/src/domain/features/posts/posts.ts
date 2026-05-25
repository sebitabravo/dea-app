import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PostListDto } from "@/domain/models/post/PostListDto";

type PostState = PostListDto[];

const initialState: PostState = [];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (_state, action: PayloadAction<PostState>) => {
            return action.payload;
        },
        addPost: (state, action: PayloadAction<PostListDto>) => {
            state.unshift(action.payload);
        },
        removePost: (state, action: PayloadAction<number>) => {
            return state.filter(post => post.post_id !== action.payload);
        },
        updatePost: (state, action: PayloadAction<Partial<PostListDto> & { post_id: number }>) => {
            const index = state.findIndex(post => post.post_id === action.payload.post_id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
    }
});

export const { setPosts, addPost, removePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
