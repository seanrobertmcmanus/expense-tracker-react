import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit';
interface AuthState {
    isAuthenticated: boolean; // True if the user is authenticated
    isLoading: boolean; // True if the auth state is being loaded
    requireReAuth: boolean; // True if the user needs to re-authenticate (e.g. refresh token expired)
    user: {
        email: string;
        first_name: string;
        last_name: string;
    }; // The user's information
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    requireReAuth: false,
    user: {
        email: "",
        first_name: "",
        last_name: "",
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action: PayloadAction<{ email: string; first_name: string; last_name: string }>) => {
            state.user = action.payload;
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setRequireReAuth: (state, action: PayloadAction<boolean>) => {
            state.requireReAuth = action.payload;
        }
    },
});

// Export AuthState and the action creators
export type { AuthState };
export const { setAuthLoading, setUser, setIsAuthenticated, setRequireReAuth} = authSlice.actions;
export default authSlice.reducer;