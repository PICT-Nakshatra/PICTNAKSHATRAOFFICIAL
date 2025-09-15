import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      console.log('Checking auth with token:', storedToken ? 'Token exists' : 'No token');
      
      if (storedToken) {
        try {
          console.log('Making auth request to:', `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/me`);
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          
          console.log('Auth response:', response.data);
          
          if (response.data.user) {
            setUser(response.data.user);
            setToken(storedToken);
            console.log('User authenticated successfully:', response.data.user);
          } else {
            // Invalid response, clear auth
            console.log('Invalid auth response, clearing auth');
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          console.error('Error details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
          });
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } else {
        // No token, ensure user is null
        console.log('No token found, setting user to null');
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/login`, {
        email,
        password
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.response?.data?.error || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/signup`, {
        name,
        email,
        password
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      toast.success('Signup successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Signup failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Complete signup after email verification
  const completeSignup = async (name, email, password) => {
    try {
      console.log('Completing signup for:', { name, email });
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/complete-signup`, {
        name,
        email,
        password
      });

      console.log('Complete signup response:', response.data);
      const { token: newToken, user: userData } = response.data;
      
      console.log('Setting token and user:', { token: newToken ? 'Token received' : 'No token', user: userData });
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      console.error('Complete signup error:', error);
      const message = error.response?.data?.message || error.response?.data?.error || 'Signup completion failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const googleLogin = async (googleData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/google-auth`, {
        token: googleData.credential
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      toast.success('Google login successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Google login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    completeSignup,
    googleLogin,
    logout,
    setUser,
    setToken,
    isAuthenticated: !!token && !!user
  };

  // Debug logging
  console.log('AuthContext state:', { 
    user: !!user, 
    token: !!token, 
    loading, 
    isAuthenticated: !!token && !!user 
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

