import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { placesApi } from '../../services/placesService';
import type { Place } from '../../types';

/**
 * Phase 5.1 - Places Slice
 * 
 * Features:
 * - Full CRUD async thunks
 * - Normalized entities (by id)
 * - Loading and error states
 * - Separate selectors for active/all places
 */

interface PlacesState {
  entities: Record<number, Place>;
  ids: number[];
  selectedPlaceId: number | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

const initialState: PlacesState = {
  entities: {},
  ids: [],
  selectedPlaceId: null,
  loading: false,
  error: null,
  lastFetch: null,
};

// Async thunks
export const fetchAllPlaces = createAsyncThunk(
  'places/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const places = await placesApi.getAll();
      return places;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch places');
    }
  }
);

export const fetchActivePlaces = createAsyncThunk(
  'places/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const places = await placesApi.getActive();
      return places;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch active places');
    }
  }
);

export const fetchPlaceById = createAsyncThunk(
  'places/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const place = await placesApi.getById(id);
      return place;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch place');
    }
  }
);

export const createPlace = createAsyncThunk(
  'places/create',
  async (placeData: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const newPlace = await placesApi.create(placeData);
      return newPlace;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create place');
    }
  }
);

export const updatePlace = createAsyncThunk(
  'places/update',
  async ({ id, data }: { id: number; data: Partial<Place> }, { rejectWithValue }) => {
    try {
      const updatedPlace = await placesApi.update(id, data);
      return updatedPlace;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update place');
    }
  }
);

export const deletePlace = createAsyncThunk(
  'places/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await placesApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete place');
    }
  }
);

export const togglePlaceStatus = createAsyncThunk(
  'places/toggleStatus',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const place = state.places.entities[id];
      const updatedPlace = await placesApi.toggleStatus(id, !place.isActive);
      return updatedPlace;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle place status');
    }
  }
);

// Slice
const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedPlace: (state, action) => {
      state.selectedPlaceId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all places
      .addCase(fetchAllPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPlaces.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize places
        state.entities = {};
        state.ids = [];
        action.payload.forEach((place) => {
          state.entities[place.id] = place;
          state.ids.push(place.id);
        });
        state.lastFetch = Date.now();
      })
      .addCase(fetchAllPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch active places
      .addCase(fetchActivePlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivePlaces.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize places (only active ones)
        state.entities = {};
        state.ids = [];
        action.payload.forEach((place) => {
          state.entities[place.id] = place;
          state.ids.push(place.id);
        });
        state.lastFetch = Date.now();
      })
      .addCase(fetchActivePlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch place by id
      .addCase(fetchPlaceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaceById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities[action.payload.id] = action.payload;
        if (!state.ids.includes(action.payload.id)) {
          state.ids.push(action.payload.id);
        }
        state.selectedPlaceId = action.payload.id;
      })
      .addCase(fetchPlaceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create place
      .addCase(createPlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.entities[action.payload.id] = action.payload;
        state.ids.push(action.payload.id);
      })
      .addCase(createPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update place
      .addCase(updatePlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.loading = false;
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(updatePlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete place
      .addCase(deletePlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.loading = false;
        delete state.entities[action.payload];
        state.ids = state.ids.filter((id) => id !== action.payload);
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Toggle place status
      .addCase(togglePlaceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePlaceStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(togglePlaceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const { clearError, setSelectedPlace } = placesSlice.actions;

// Selectors
export const selectAllPlaces = (state: any) =>
  state.places.ids.map((id: number) => state.places.entities[id]);

export const selectActivePlaces = (state: any) =>
  state.places.ids
    .map((id: number) => state.places.entities[id])
    .filter((place: Place) => place.isActive);

export const selectPlaceById = (state: any, placeId: number) =>
  state.places.entities[placeId];

export const selectSelectedPlace = (state: any) =>
  state.places.selectedPlaceId ? state.places.entities[state.places.selectedPlaceId] : null;

export const selectPlacesLoading = (state: any) => state.places.loading;
export const selectPlacesError = (state: any) => state.places.error;

export default placesSlice.reducer;
