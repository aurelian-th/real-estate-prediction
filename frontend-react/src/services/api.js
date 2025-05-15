import axios from 'axios'; // In a real app, you'd use axios. For MVP, we mock.
  import {
      mockProperties, mockDistricts, mockUser,
      mockTrendsBotanica2Rooms, mockPredictionBotanica2Rooms,
      mockTrendsCentru3Rooms, mockPredictionCentru3Rooms,
      mockSavedSearches
  } from './mockData';

  const MOCK_API_DELAY = 300; // milliseconds

  // Simulates an API call
  const mockApiCall = (data, errorMessage = "Mock API Error") => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (data !== undefined && data !== null) { // Allow empty arrays/objects if intended
                  resolve(data);
              } else {
                  // Simulate an error for specific cases if needed, or just resolve with empty
                  // For now, let's assume if data is explicitly undefined/null, it's an error condition
                   console.error("Mock API call resulted in an error state for data:", data);
                   reject(new Error(errorMessage));
              }
          }, MOCK_API_DELAY);
      });
  };

  export const getProperties = (filters = {}) => {
      console.log("Mock API: getProperties called with filters:", filters);
      let filteredProperties = mockProperties;
      if (filters.district_id) {
          filteredProperties = filteredProperties.filter(p => p.district_id === parseInt(filters.district_id));
      }
      if (filters.num_rooms) {
          filteredProperties = filteredProperties.filter(p => p.num_rooms === parseInt(filters.num_rooms));
      }
      if (filters.min_price) {
          filteredProperties = filteredProperties.filter(p => p.price >= parseFloat(filters.min_price));
      }
      if (filters.max_price) {
          filteredProperties = filteredProperties.filter(p => p.price <= parseFloat(filters.max_price));
      }
      // Add more filters as needed (property_type, etc.)
      return mockApiCall(filteredProperties);
  };

  export const getPropertyById = (propertyId) => {
      console.log("Mock API: getPropertyById called with ID:", propertyId);
      const property = mockProperties.find(p => p.property_id === propertyId);
      return mockApiCall(property, "Property not found");
  };

  export const getDistricts = () => {
      console.log("Mock API: getDistricts called");
      return mockApiCall(mockDistricts);
  };

  export const getPriceTrends = (districtId, numRooms /*, timeRange */) => {
      console.log("Mock API: getPriceTrends for district:", districtId, "rooms:", numRooms);
      if (parseInt(districtId) === 2 && parseInt(numRooms) === 2) {
          return mockApiCall(mockTrendsBotanica2Rooms);
      }
      if (parseInt(districtId) === 1 && parseInt(numRooms) === 3) {
          return mockApiCall(mockTrendsCentru3Rooms);
      }
      // Return a generic empty or sample trend if no specific match for demo
      return mockApiCall({ districtName: 'Selected Area', numRooms: numRooms, propertyType: 'Apartment', trendData: [] }, "Trend data not available for this selection");
  };

  export const getPredictions = (districtId, numRooms) => {
      console.log("Mock API: getPredictions for district:", districtId, "rooms:", numRooms);
       if (parseInt(districtId) === 2 && parseInt(numRooms) === 2) {
          return mockApiCall(mockPredictionBotanica2Rooms);
      }
      if (parseInt(districtId) === 1 && parseInt(numRooms) === 3) {
          return mockApiCall(mockPredictionCentru3Rooms);
      }
      return mockApiCall({ districtName: 'Selected Area', analysis: "Prediction data currently unavailable for this specific selection." }, "Prediction data not available");
  };

  export const loginUser = (email, password) => {
      console.log("Mock API: loginUser attempt for email:", email);
      if (email === 'demo@example.com' && password === 'password123') {
          return mockApiCall({
              message: 'Login successful (mocked)',
              token: 'mock-jwt-token-for-demo-user-123',
              user: mockUser
          });
      } else {
          return mockApiCall(undefined, 'Invalid credentials (mocked)');
      }
  };

  export const registerUser = (userData) => {
      console.log("Mock API: registerUser attempt for data:", userData);
      // Simulate successful registration, in a real app, this would create a new user
      return mockApiCall({
          message: 'Registration successful (mocked). Please login.',
          user: { userId: 'new-mock-user-id-456', email: userData.email, fullName: userData.fullName }
      });
  };

  export const getSavedSearches = (userId) => {
      console.log("Mock API: getSavedSearches for userId:", userId);
      if (userId === mockUser.userId) {
          return mockApiCall(mockSavedSearches);
      }
      return mockApiCall([], "No saved searches or unauthorized");
  };

  export const addSavedSearch = (userId, searchData) => {
      console.log("Mock API: addSavedSearch for userId:", userId, "data:", searchData);
      if (userId === mockUser.userId) {
          const newSearch = {
              search_id: `search-uuid-${Date.now()}`,
              user_id: userId,
              ...searchData,
              created_at: new Date().toISOString()
          };
          mockSavedSearches.push(newSearch); // Add to in-memory mock data
          return mockApiCall(newSearch);
      }
      return mockApiCall(undefined, "Failed to save search");
  };
