import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import type { RootState } from '../../app/store';

/**
 * Phase 5.1 - Auth Slice
 * 
 * Features:
 * - Login/Logout async thunks
 * - User state management
 * - Token persistence to localStorage
 * - Loading and error states
 */

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initialize state from localStorage
const token = authService.getToken();
const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        image: response.image,
      }));
      return {
        user: {
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          image: response.image,
        },
        token: response.accessToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  authService.logout();
  localStorage.removeItem('user');
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

// Actions
export const { clearError } = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
