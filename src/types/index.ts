/**
 * Phase 1.1 - Core TypeScript Interfaces
 * 
 * Data models for Nador Guide application
 */

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Transport {
  type: 'bus' | 'taxi' | 'tram' | 'walking' | 'car';
  details: string;
}

export interface Place {
  id: number;
  name: string;
  category: Category;
  description: string;
  images: string[];
  openingHours?: OpeningHours;
  price?: string;
  address?: string;
  transport?: Transport[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  subtitle?: string;
  latitude?: number;
  longitude?: number;
  fullAddress?: string;
  tariff?: string;
  bestVisitTime?: string;
  parking?: boolean;
  busInfo?: string;
  taxiInfo?: string;
  likes?: number;
  score?: number;
}

/**
 * API Response Types
 */
export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Form Types (for create/edit operations)
 */
export interface PlaceFormData {
  name: string;
  categoryId: number;
  description: string;
  images: string[];
  openingHours?: OpeningHours;
  price?: string;
  address?: string;
  transport?: Transport[];
  isActive: boolean;
}
