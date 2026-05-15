import React from 'react';
import JobCard from './JobCard';

// JobList expects an array of 'jobs' to be passed into it as props.
const JobList = ({ jobs, loading, isEmployer }) => {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--accent-primary)' }}>Loading jobs from mock API...</div>;
  }

  if (jobs.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No jobs found.</div>;
  }

  return (
    <div>
      {/* We use `.map()` to loop through the array and render a JobCard for every item */}
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} isEmployer={isEmployer} />
      ))}
    </div>
  );
};

export default JobList;
