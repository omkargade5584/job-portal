import api from '../utils/axiosInstance';

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  // Axios will automatically unwrap into `response.data` for the UI, or wait, usually we return `response` or `response.data`.
  // Wait! In `DashboardAdmin.jsx`, does it expect `{ data }`? Let's return response directly, because `api.get` resolves to the axios response object which has `.data`.
  return response;
};
