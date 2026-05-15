import { useState, useEffect, useCallback } from 'react';
import * as jobApi from '../api/jobApi';

/**
 * Custom React Hook
 * Encapsulates the logic of fetching jobs so components stay clean.
 */
export const useJobs = (employerId = null) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (employerId) {
        response = await jobApi.getMyJobs();
      } else {
        response = await jobApi.getAllJobs();
      }
      // Assuming response is an array, we wrap it in a mock response shape or just set it directly
      setJobs(Array.isArray(response) ? response : response.data || response);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [employerId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const addJob = async (newJobData) => {
    try {
      const response = await jobApi.createJob(newJobData);
      setJobs(prevJobs => [response, ...prevJobs]);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to add job');
      throw err;
    }
  };

  return { jobs, loading, error, refreshJobs: fetchJobs, addJob };
};
