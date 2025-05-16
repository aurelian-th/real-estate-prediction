import axios from 'axios';
import { mockProperties, mockDistricts, mockPriceTrends, mockPredictions } from './mockData';

// Configure Axios instance
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
});

// Interceptor to add authentication token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors for debugging
    console.error('API Error:', error?.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized, clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
    
    return Promise.reject(error);
  }
);

// Fallback to mock data if API calls fail
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock demo user for fast development
const DEMO_USER = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
};

export const api = {
  // Authentication services
  loginUser: async (email: string, password: string) => {
    try {
      // Special case for demo credentials
      if (email === 'demo@example.com' && password === 'password123') {
        await delay(300); // Simulate network delay
        return {
          token: 'demo-jwt-token-123456789',
          user: DEMO_USER
        };
      }
      
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      
      // For demo/MVP purposes: allow any credentials to work
      await delay(500);
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: { 
          id: '1', 
          name: email.split('@')[0] || 'User', 
          email 
        }
      };
    }
  },

  // Property services
  getProperties: async () => {
    try {
      const response = await apiClient.get('/properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to mock data
      await delay(500);
      return mockProperties;
    }
  },

  getPropertyById: async (id: string) => {
    try {
      const response = await apiClient.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      // Fallback to mock data
      await delay(300);
      return mockProperties.find(p => p.id === id) || null;
    }
  },

  // District services
  getDistricts: async () => {
    try {
      const response = await apiClient.get('/districts');
      return response.data;
    } catch (error) {
      console.error('Error fetching districts:', error);
      // Fallback to mock data
      await delay(300);
      return mockDistricts;
    }
  },

  getPriceTrends: async (districtId: string) => {
    try {
      const response = await apiClient.get(`/districts/${districtId}/trends`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching price trends for district ${districtId}:`, error);
      // Fallback to mock data
      await delay(400);
      return mockPriceTrends;
    }
  },

  // Prediction services
  getPredictions: async (districtId: string) => {
    try {
      const response = await apiClient.get(`/predictions`, {
        params: { districtId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching predictions for district ${districtId}:`, error);
      // Fallback to mock data
      await delay(600);
      return mockPredictions;
    }
  },

  // User dashboard services
  getUserSavedProperties: async () => {
    try {
      const response = await apiClient.get('/user/saved-properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved properties:', error);
      // Return subset of mock properties for demo
      await delay(400);
      return mockProperties.slice(0, 3);
    }
  },

  saveProperty: async (propertyId: string) => {
    try {
      const response = await apiClient.post('/user/saved-properties', { propertyId });
      return response.data;
    } catch (error) {
      console.error(`Error saving property ${propertyId}:`, error);
      // Return mock success
      await delay(300);
      return { success: true, message: 'Property saved successfully' };
    }
  },

  toggleFavorite: async (propertyId: string) => {
    try {
      const response = await apiClient.post('/user/favorites/toggle', { propertyId });
      return response.data;
    } catch (error) {
      console.error(`Error toggling favorite for property ${propertyId}:`, error);
      // Return mock success
      await delay(300);
      return { success: true };
    }
  }
};