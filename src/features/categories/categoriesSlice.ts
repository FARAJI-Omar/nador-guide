import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesApi } from '../../services/categoriesService';
import type { Category } from '../../types';

/**
 * Phase 5.1 - Categories Slice
 * 
 * Features:
 * - Fetch categories async thunk
 * - Normalized entities (by id)
 * - Loading and error states
 * - Caching to avoid unnecessary refetches
 */

interface CategoriesState {
  entities: Record<number, Category>;
  ids: number[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

const initialState: CategoriesState = {
  entities: {},
  ids: [],
  loading: false,
  error: null,
  lastFetch: null,
};

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await categoriesApi.getAll();
      return categories;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize categories
        state.entities = {};
        state.ids = [];
        action.payload.forEach((category) => {
          state.entities[category.id] = category;
          state.ids.push(category.id);
        });
        state.lastFetch = Date.now();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const { clearError } = categoriesSlice.actions;

// Selectors
export const selectAllCategories = (state: any) =>
  state.categories.ids.map((id: number) => state.categories.entities[id]);

export const selectCategoryById = (state: any, categoryId: number) =>
  state.categories.entities[categoryId];

export const selectCategoriesLoading = (state: any) => state.categories.loading;
export const selectCategoriesError = (state: any) => state.categories.error;

export default categoriesSlice.reducer;
