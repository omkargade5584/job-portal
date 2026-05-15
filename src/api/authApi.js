import api from '../utils/axiosInstance';

// Call Java backend: POST http://localhost:8080/api/auth/login
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; // Java sends back { token, user }
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logoutUser = async () => {
  localStorage.removeItem('jobPortalToken');
};