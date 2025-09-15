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
      if (storedToken) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          
          if (response.data.user) {
            setUser(response.data.user);
            setToken(storedToken);
          } else {
            // Invalid response, clear auth
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } else {
        // No token, ensure user is null
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

      const { requiresVerification, user: userData } = response.data;
      
      if (requiresVerification) {
        toast.success('Registration successful! Please check your email for verification code.');
        return { 
          success: true, 
          requiresVerification: true, 
          user: userData,
          message: response.data.message 
        };
      } else {
        // This shouldn't happen with the new flow, but keeping for compatibility
        const { token: newToken } = response.data;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
        toast.success('Signup successful!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Signup failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const verifyEmail = async (email, verificationCode) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/verify-email`, {
        email,
        verificationCode
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      toast.success('Email verified successfully! Welcome to PICT Nakshatra!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Email verification failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const resendVerificationCode = async (email) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/users/resend-verification`, {
        email
      });

      toast.success('Verification code sent successfully! Please check your email.');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Failed to resend verification code';
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
    verifyEmail,
    resendVerificationCode,
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

