import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userToken: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        restoreToken: (state, action) => {
            state.userToken = action.payload;
            state.isLoading = false; 
        },
        signIn: (state, action) => {
            state.userToken = action.payload;
            state.isLoading = false;
        },
        signOut: (state) => {
            state.userToken = null;
            state.isLoading = false;
        },
    },
});

export const { restoreToken, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
