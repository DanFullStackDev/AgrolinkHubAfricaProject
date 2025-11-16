import axios from 'axios';

// Get the API URL from environment variables
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: VITE_API_URL,
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    // Get the user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;