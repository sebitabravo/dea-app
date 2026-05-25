import { API_URL } from "@/data/constants/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "@/domain/models/user/User";
import { clearAuthToken, saveAuthToken } from '@/data/services/secureTokenStorage';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error?: unknown;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
};

interface ApiResponse {
    data: {
        user: { id: number; username: string; email: string; rol: string; created_at: string };
        token: string;
        expiration: string;
    } | null;
    error: { message: string; status: number } | null;
}

const VALID_ROLES: User['role'][] = ['admin', 'user', 'moderator', null];

const mapRole = (role: string): User['role'] => {
    return VALID_ROLES.includes(role as User['role']) ? (role as User['role']) : null;
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            const json: ApiResponse = await response.json();
            if (!response.ok || !json.data) {
                return rejectWithValue(json.error?.message || "Login failed");
            }
            const mappedUser: User = {
                id: json.data.user.id,
                username: json.data.user.username,
                email: json.data.user.email,
                role: mapRole(json.data.user.rol),
            };
            await saveAuthToken(json.data.token);
            await AsyncStorage.setItem("@user", JSON.stringify(mappedUser));
            return { ...json.data, user: mappedUser };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Network error");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            const json: ApiResponse = await response.json();
            if (!response.ok || !json.data) {
                return rejectWithValue(json.error?.message || "Registration failed");
            }
            const mappedUser: User = {
                id: json.data.user.id,
                username: json.data.user.username,
                email: json.data.user.email,
                role: mapRole(json.data.user.rol),
            };
            await saveAuthToken(json.data.token);
            await AsyncStorage.setItem("@user", JSON.stringify(mappedUser));
            return { ...json.data, user: mappedUser };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Network error");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        restoreToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            void clearAuthToken();
            AsyncStorage.removeItem("@user");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { restoreToken, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
