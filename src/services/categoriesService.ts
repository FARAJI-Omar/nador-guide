import { api } from './apiClient';
import type { Category } from '../types';

/**
 * Phase 2.3 - Categories API Service
 * 
 * All API calls related to categories
 */

export const categoriesApi = {
  /**
   * Get all categories
   */
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  /**
   * Get category by ID
   */
  getById: async (id: number): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  },
};
