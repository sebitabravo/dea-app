import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    birthdate: null,
    city: null,
    university: null,
    bachelors_degree: null,
    gender: null,
    preferences: null,
    bio: null,
    profile_pictures: null,
    role: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearUserData: (state) => {
            return { ...initialState };
        },
    }
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
