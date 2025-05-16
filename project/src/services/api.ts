import axios from 'axios';
import { mockProperties, mockDistricts, mockPriceTrends, mockPredictions } from './mockData';

// Configure Axios instance
const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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

// Fallback to mock data if API calls fail
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Authentication services
  loginUser: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      // For demo: fallback to mock successful login
      await delay(500);
      return {
        token: 'mock-jwt-token',
        user: { id: '1', name: 'Demo User', email }
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
      await delay(500);
      return mockProperties.find(p => p.id === id);
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
      await delay(700);
      return mockPriceTrends;
    }
  },

  // Prediction services
  getPredictions: async (districtId: string) => {
    try {
      const response = await apiClient.get(`/districts/${districtId}/predictions`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching predictions for district ${districtId}:`, error);
      // Fallback to mock data
      await delay(600);
      return mockPredictions;
    }
  },

  predictPrice: async (propertyData: any) => {
    try {
      const response = await apiClient.post('/prediction', propertyData);
      return response.data;
    } catch (error) {
      console.error('Error predicting price:', error);
      // Fallback to mock prediction
      await delay(800);
      return { 
        predictedPrice: Math.floor(Math.random() * 80000) + 40000,
        confidence: Math.random() * 0.3 + 0.7
      };
    }
  },

  // User dashboard services
  getUserFavorites: async () => {
    try {
      const response = await apiClient.get('/user/favorites');
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      // Fallback to mock data
      await delay(400);
      return mockProperties.slice(0, 3);
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