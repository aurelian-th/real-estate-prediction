import React, { createContext, useState, useContext, useEffect } from 'react';
   import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from '../services/api'; // Using mock API

   const AuthContext = createContext(null);

   export const AuthProvider = ({ children }) => {
       const [user, setUser] = useState(null);
       const [isAuthenticated, setIsAuthenticated] = useState(false);
       const [loading, setLoading] = useState(true); // To check initial auth status
       const [error, setError] = useState(null);

       // Effect to check for existing token (e.g., in localStorage) on app load
       useEffect(() => {
           const token = localStorage.getItem('authToken');
           const userData = localStorage.getItem('userData');
           if (token && userData) {
               setUser(JSON.parse(userData));
               setIsAuthenticated(true);
           }
           setLoading(false);
       }, []);

       const login = async (email, password) => {
           setLoading(true);
           setError(null);
           try {
               const response = await apiLoginUser(email, password); // mock API call
               setUser(response.user);
               setIsAuthenticated(true);
               localStorage.setItem('authToken', response.token);
               localStorage.setItem('userData', JSON.stringify(response.user));
               setLoading(false);
               return true;
           } catch (err) {
               setError(err.message || 'Login failed');
               setIsAuthenticated(false);
               setUser(null);
               setLoading(false);
               return false;
           }
       };

       const register = async (userData) => {
           setLoading(true);
           setError(null);
           try {
               // eslint-disable-next-line no-unused-vars
               const response = await apiRegisterUser(userData); // mock API call
               // For MVP, registration doesn't auto-login. User needs to login after.
               setLoading(false);
               return true; // Indicate success
           } catch (err) {
               setError(err.message || 'Registration failed');
               setLoading(false);
               return false;
           }
       };

       const logout = () => {
           setUser(null);
           setIsAuthenticated(false);
           localStorage.removeItem('authToken');
           localStorage.removeItem('userData');
       };

       return (
           <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, loading, error, setError }}>
               {children}
           </AuthContext.Provider>
       );
   };

   export const useAuth = () => useContext(AuthContext);
