import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/domain/models/user/User";

const initialState: User = {
    id: null,
    username: null,
    email: null,
    role: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            const payload = action.payload;
            state.id = payload.id ?? state.id;
            state.username = payload.username ?? state.username;
            state.email = payload.email ?? state.email;
            state.role = payload.role ?? state.role;
        },
        clearUserData: (state) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.role = null;
        },
    }
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
