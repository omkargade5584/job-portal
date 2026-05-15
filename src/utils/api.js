import { initialJobs } from '../mockData/jobs';

// Simulate a database in the browser's memory
let jobsDB = [...initialJobs];

// We use Promises to simulate how real backend APIs work. 
// A real API takes time to respond, so a Promise says "I promise to give you data eventually".
export const api = {
  // 1. Fetch all jobs (for the User Dashboard)
  fetchJobs: () => {
    return new Promise((resolve) => {
      // Simulate network delay of 800ms
      setTimeout(() => {
        resolve(jobsDB);
      }, 800);
    });
  },

  // 2. Fetch jobs posted by a specific employer
  fetchEmployerJobs: (employerId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = jobsDB.filter(job => job.employerId === employerId);
        resolve(filtered);
      }, 600);
    });
  },

  // 3. Add a new job (for Employers)
  createJob: (newJob) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobWithId = {
          ...newJob,
          id: Math.random().toString(36).substr(2, 9),
          postedAt: new Date().toISOString()
        };
        jobsDB = [jobWithId, ...jobsDB]; // Add to top of list
        resolve(jobWithId);
      }, 500);
    });
  }
};
