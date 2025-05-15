// API Service for Moldova Insight Realty MVP
// This file contains mocked API calls that simulate backend interactions

import { 
  mockProperties,
  mockDistricts,
  mockTrendsBotanica1Room, 
  mockTrendsBotanica2Rooms, 
  mockTrendsCentru2Rooms,
  mockTrendsCiocana2Rooms,
  mockPredictionBotanica1Room,
  mockPredictionBotanica2Rooms,
  mockPredictionCentru2Rooms,
  mockPredictionCiocana2Rooms,
  mockUser
} from './mockData';

// Simulate network delay for more realistic API calls
const MOCK_API_DELAY = 500; // ms

/**
 * Get properties based on filter criteria
 */
export const getProperties = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: getProperties called with filters:", filters);
      
      // Simple filtering logic if time permits
      let filteredProperties = [...mockProperties];
      
      if (filters.district_id) {
        filteredProperties = filteredProperties.filter(p => p.district_id === filters.district_id);
      }
      
      if (filters.rooms) {
        filteredProperties = filteredProperties.filter(p => p.rooms === filters.rooms);
      }
      
      if (filters.min_price) {
        filteredProperties = filteredProperties.filter(p => p.price >= filters.min_price);
      }
      
      if (filters.max_price) {
        filteredProperties = filteredProperties.filter(p => p.price <= filters.max_price);
      }
      
      resolve(filteredProperties);
    }, MOCK_API_DELAY);
  });
};

/**
 * Get a single property by ID
 */
export const getPropertyById = (propertyId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Mock API: getPropertyById called with ID:", propertyId);
      const property = mockProperties.find(p => p.id === Number(propertyId));
      
      if (property) {
        resolve(property);
      } else {
        reject({ message: "Property not found" });
      }
    }, MOCK_API_DELAY);
  });
};

/**
 * Get all districts
 */
export const getDistricts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: getDistricts called");
      resolve(mockDistricts);
    }, MOCK_API_DELAY);
  });
};

/**
 * Get a single district by ID
 */
export const getDistrictById = (districtId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Mock API: getDistrictById called with ID:", districtId);
      const district = mockDistricts.find(d => d.id === Number(districtId));
      
      if (district) {
        resolve(district);
      } else {
        reject({ message: "District not found" });
      }
    }, MOCK_API_DELAY);
  });
};

/**
 * Get price trends for a specific district and room configuration
 */
export const getPriceTrends = (districtId, numRooms, timeRange = 12) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: getPriceTrends for district:", districtId, "rooms:", numRooms, "timeRange:", timeRange);
      
      let trendData;
      
      // Return specific mock trend based on district and room count
      if (districtId === 1 && numRooms === 1) {
        trendData = mockTrendsBotanica1Room;
      } else if (districtId === 1 && numRooms === 2) {
        trendData = mockTrendsBotanica2Rooms;
      } else if (districtId === 2 && numRooms === 2) {
        trendData = mockTrendsCentru2Rooms;
      } else if (districtId === 3 && numRooms === 2) {
        trendData = mockTrendsCiocana2Rooms;
      } else {
        // Default to Botanica 2-rooms if no specific data available
        trendData = mockTrendsBotanica2Rooms;
      }
      
      // Limit data points based on timeRange
      const limitedData = trendData.slice(-timeRange);
      
      resolve(limitedData);
    }, MOCK_API_DELAY);
  });
};

/**
 * Get price prediction for a specific district and room configuration
 */
export const getPricePrediction = (districtId, numRooms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: getPricePrediction for district:", districtId, "rooms:", numRooms);
      
      let predictionData;
      
      // Return specific mock prediction based on district and room count
      if (districtId === 1 && numRooms === 1) {
        predictionData = mockPredictionBotanica1Room;
      } else if (districtId === 1 && numRooms === 2) {
        predictionData = mockPredictionBotanica2Rooms;
      } else if (districtId === 2 && numRooms === 2) {
        predictionData = mockPredictionCentru2Rooms;
      } else if (districtId === 3 && numRooms === 2) {
        predictionData = mockPredictionCiocana2Rooms;
      } else {
        // Default to Botanica 2-rooms if no specific data available
        predictionData = mockPredictionBotanica2Rooms;
      }
      
      resolve(predictionData);
    }, MOCK_API_DELAY);
  });
};

/**
 * User authentication - login
 */
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Mock API: loginUser called with email:", email);
      
      // Simple mock authentication
      if (email === "demo@example.com" && password === "password123") {
        resolve({ 
          user: mockUser,
          token: "mock-jwt-token-123456789",
          message: "Login successful" 
        });
      } else {
        reject({ message: "Invalid credentials" });
      }
    }, MOCK_API_DELAY);
  });
};

/**
 * User authentication - register
 */
export const registerUser = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: registerUser called with data:", userData);
      
      resolve({ 
        user: { ...mockUser, ...userData },
        token: "mock-jwt-token-123456789",
        message: "Registration successful" 
      });
    }, MOCK_API_DELAY);
  });
};

/**
 * Get user saved searches
 */
export const getUserSavedSearches = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: getUserSavedSearches called");
      resolve(mockUser.saved_searches);
    }, MOCK_API_DELAY);
  });
};

/**
 * Save a new search for the user
 */
export const saveSearch = (searchData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: saveSearch called with data:", searchData);
      
      const newSearch = {
        id: `search${Date.now()}`,
        name: searchData.name,
        filters: searchData.filters,
        created_at: new Date().toISOString().split('T')[0]
      };
      
      resolve({
        search: newSearch,
        message: "Search saved successfully"
      });
    }, MOCK_API_DELAY);
  });
};

/**
 * Delete a saved search
 */
export const deleteSavedSearch = (searchId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: deleteSavedSearch called with ID:", searchId);
      
      resolve({
        message: "Search deleted successfully"
      });
    }, MOCK_API_DELAY);
  });
};

/**
 * Save a property to user's favorites
 */
export const saveProperty = (propertyId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: saveProperty called with ID:", propertyId);
      
      resolve({
        message: "Property saved successfully"
      });
    }, MOCK_API_DELAY);
  });
};

/**
 * Remove a property from user's favorites
 */
export const unsaveProperty = (propertyId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: unsaveProperty called with ID:", propertyId);
      
      resolve({
        message: "Property removed from saved list"
      });
    }, MOCK_API_DELAY);
  });
};

/**
 * Get user's saved properties
 */
export const getSavedProperties = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: getSavedProperties called");
      
      // Get the full property objects for the saved property IDs
      const savedProperties = mockProperties.filter(p => 
        mockUser.saved_properties.includes(p.id)
      );
      
      resolve(savedProperties);
    }, MOCK_API_DELAY);
  });
};
