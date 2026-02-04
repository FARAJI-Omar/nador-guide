import axios from 'axios';

/**
 * Phase 3.1 - Authentication Service
 * 
 * DummyJSON Auth API integration
 * Base URL: https://dummyjson.com/auth
 */

const DUMMYJSON_API = 'https://dummyjson.com/auth';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  /**
   * Login user with DummyJSON
   * Test credentials: username: 'emilys', password: 'emilyspass'
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${DUMMYJSON_API}/login`, {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 60,
    });
    
    // Store token in localStorage (DummyJSON uses 'accessToken')
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify(response.data));
    
    return response.data;
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser: (): AuthResponse | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  /**
   * Get stored token
   */
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
};
