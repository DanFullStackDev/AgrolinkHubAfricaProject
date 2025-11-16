import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const userData = response.data;
      
      // Store user (including token) in state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Login failed', error);
      throw error.response.data;
    }
  };

  const register = async ({ name, email, password, role }) => {
    try {
      const response = await api.post('/api/auth/register', { name, email, password, role });
      const userData = response.data;

      // Store user (including token) in state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Registration failed', error);
      throw error.response.data;
    }
  };

  const logout = () => {
    // Remove user from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};