import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// Import API service
import { api } from '../services/api';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  loginWithDemo: () => Promise<any>; // New demo login function
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          // Verify token expiration (simplified for MVP)
          try {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
            setIsAuthenticated(true);
          } catch (parseError) {
            // Invalid stored user data, clear it
            console.error('Error parsing stored user data:', parseError);
            logout();
          }
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        // Clean up potentially corrupted auth state
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await api.loginUser(email, password);
      
      if (!response || !response.token || !response.user) {
        throw new Error('Invalid response from server');
      }
      
      // Save auth data to localStorage
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login function for quick testing
  const loginWithDemo = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Use predefined demo credentials
      const demoEmail = 'demo@example.com';
      const demoPassword = 'password123';
      
      return await login(demoEmail, demoPassword);
    } catch (err: any) {
      setError('Demo login failed. Please try again.');
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Value object to be provided to consumers
  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    loginWithDemo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
