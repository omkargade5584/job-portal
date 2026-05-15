import api from '../utils/axiosInstance';

// GET http://localhost:8080/api/jobs
export const getAllJobs = async (params) => {
  const response = await api.get('/jobs', { params }); // params = filters
  return response.data;
};

// GET http://localhost:8080/api/jobs/1
export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

// POST http://localhost:8080/api/jobs (employer only — JWT required)
export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

// DELETE http://localhost:8080/api/jobs/1
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

// GET http://localhost:8080/api/jobs/my-jobs
export const getMyJobs = async () => {
  const response = await api.get('/jobs/my-jobs');
  return response.data;
};