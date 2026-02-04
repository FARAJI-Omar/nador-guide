import { api } from './apiClient';
import type { Place } from '../types';

/**
 * Phase 2.3 - Places API Service
 * 
 * All API calls related to places
 */

export const placesApi = {
  /**
   * Get all places (admin view)
   */
  getAll: async (): Promise<Place[]> => {
    const response = await api.get<Place[]>('/places');
    return response.data;
  },

  /**
   * Get active places only (visitor view)
   */
  getActive: async (): Promise<Place[]> => {
    const response = await api.get<Place[]>('/places?isActive=true');
    return response.data;
  },

  /**
   * Get place by ID
   */
  getById: async (id: number): Promise<Place> => {
    const response = await api.get<Place>(`/places/${id}`);
    return response.data;
  },

  /**
   * Create new place (admin)
   */
  create: async (place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place> => {
    const now = new Date().toISOString();
    const placeData = {
      ...place,
      createdAt: now,
      updatedAt: now,
    };
    const response = await api.post<Place>('/places', placeData);
    return response.data;
  },

  /**
   * Update existing place (admin)
   */
  update: async (id: number, place: Partial<Place>): Promise<Place> => {
    const placeData = {
      ...place,
      updatedAt: new Date().toISOString(),
    };
    const response = await api.put<Place>(`/places/${id}`, placeData);
    return response.data;
  },

  /**
   * Delete place (admin)
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/places/${id}`);
  },

  /**
   * Toggle active status (admin)
   */
  toggleStatus: async (id: number, isActive: boolean): Promise<Place> => {
    const response = await api.patch<Place>(`/places/${id}`, {
      isActive,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },
};
