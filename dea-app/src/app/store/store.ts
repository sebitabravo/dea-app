import authReducer from "@/domain/features/auth/auth";
import postsReducer from "@/domain/features/posts/posts";
import userReducer from "@/domain/features/user/user";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        posts: postsReducer,
    }
})