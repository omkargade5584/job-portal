import api from '../utils/axiosInstance';

export const getMyApplications = async (filter) => {
  // If filter is 'all' and user is employer, call the employer endpoint
  if (filter === 'all') {
    const response = await api.get('/applications/employer');
    return response;
  }
  // Otherwise, seeker's own applications
  const response = await api.get('/applications/my-applications');
  return response;
};

export const getAllApplications = async () => {
  const response = await api.get('/applications/employer');
  return response;
};

export const applyToJob = async ({ jobId, resumeUrl, coverLetter }) => {
  const response = await api.post('/applications', {
    jobId,
    resumeUrl,
    coverLetter
  });
  return response;
};

export const updateApplicationStatus = async (appId, newStatus) => {
  const response = await api.put(`/applications/${appId}/status`, {
    status: newStatus
  });
  return response;
};

