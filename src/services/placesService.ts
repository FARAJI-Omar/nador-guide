import { api } from './apiClient';
import type { Place } from '../types';

export const placesApi = {

  getAll: async (): Promise<Place[]> => {
    const response = await api.get<Place[]>('/places');
    return response.data;
  },

  getActive: async (): Promise<Place[]> => {
    const response = await api.get<Place[]>('/places?isActive=true');
    return response.data;
  },

  getById: async (id: number | string): Promise<Place> => {
    const response = await api.get<Place>(`/places/${id}`);
    return response.data;
  },

  create: async (place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place> => {
    const now = new Date().toISOString();
    const placeData = {
      ...place,
      createdAt: now,
      updatedAt: now,
    };
    console.log('Creating place with data:', placeData);
    const response = await api.post<Place>('/places', placeData);
    console.log('Created place response:', response.data);
    return response.data;
  },

  update: async (id: number | string, place: Partial<Place>): Promise<Place> => {
    const placeData = {
      ...place,
      updatedAt: new Date().toISOString(),
    };
    const response = await api.put<Place>(`/places/${id}`, placeData);
    return response.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await api.delete(`/places/${id}`);
  },

  toggleStatus: async (id: number | string, isActive: boolean): Promise<Place> => {
    const response = await api.patch<Place>(`/places/${id}`, {
      isActive,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  likePlace: async (id: number | string, currentLikes: number): Promise<Place> => {
    const response = await api.patch<Place>(`/places/${id}`, {
      likes: currentLikes + 1,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  unlikePlace: async (id: number | string, currentLikes: number): Promise<Place> => {
    const response = await api.patch<Place>(`/places/${id}`, {
      likes: Math.max(0, currentLikes - 1),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },
};
