import { createSlice } from "@reduxjs/toolkit";

const initialState = [
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            return action.payload; // Reemplaza el estado con `postsData`
        },
        addPost: (state, action) => {
            state.unshift(action.payload);
        },
        removePost: (state, action) => {
            return state.filter(post => post.post_id !== action.payload);
        },
        updatePost: (state, action) => {
            return state.map(post => {
                if (post.post_id === action.payload.post_id) {
                    return {
                        ...post, // Mantiene los demás atributos del post
                        ...action.payload, // Actualiza solo los atributos necesarios (likes, comments, etc.)
                    };
                }
                return post; // Retorna el post sin cambios
            });
        },
    }
});

export const { setPosts, addPost, removePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;