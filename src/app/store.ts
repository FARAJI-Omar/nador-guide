import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import placesReducer from '../features/places/placesSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    places: placesReducer,
    categories: categoriesReducer,
  },
});

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
