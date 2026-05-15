import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // reads from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST interceptor — runs before every API call
// Automatically attaches the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jobPortalToken'); // get saved token
    if (token && token !== 'undefined' && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`; // attach it
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor — runs after every API response
// If token expired (401), log the user out automatically
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jobPortalToken');
      window.location.href = '/login'; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;