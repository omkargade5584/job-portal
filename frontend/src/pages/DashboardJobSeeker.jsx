import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useJobs } from '../hooks/useJobs';
import { applyToJob } from '../api/applicationApi';
import { useToast } from '../components/common/Toast';
import Loader from '../components/common/Loader';
import JobFilters from '../components/jobs/JobFilters';
import JobCard from '../components/jobs/JobCard';
import { Briefcase } from 'lucide-react';

const DashboardJobSeeker = () => {
  const { user } = useSelector(state => state.auth);
  const { jobs, loading } = useJobs();
  const { showToast, ToastContainer } = useToast();
  const [filters, setFilters] = useState({ search: '', location: '', type: '' });
  const [appliedIds, setAppliedIds] = useState([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = !filters.search || job.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchType = !filters.type || job.type === filters.type;
      return matchSearch && matchLocation && matchType;
    });
  }, [jobs, filters]);

  const handleApply = async (job) => {
    if (appliedIds.includes(job.id)) { showToast('You already applied!', 'warning'); return; }
    try {
      await applyToJob({ jobId: job.id, jobTitle: job.title, company: job.company, seekerId: user.id, seekerName: user.name });
      setAppliedIds(prev => [...prev, job.id]);
      showToast(`Applied to "${job.title}" successfully!`, 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* Hero */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Briefcase size={28} color="var(--accent-primary)" /> Job Feed
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
          Welcome back, <strong style={{ color: 'var(--text-primary)' }}>{user?.name}</strong>! {jobs.length} jobs waiting for you.
        </p>
      </div>

      <JobFilters onFilter={setFilters} />

      {loading ? <Loader text="Fetching latest jobs…" /> : (
        filteredJobs.length === 0
          ? <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>No jobs match your filters.</div>
          : filteredJobs.map(job => (
            <JobCard key={job.id} job={job} isEmployer={false} onApply={handleApply} hasApplied={appliedIds.includes(job.id)} />
          ))
      )}
    </div>
  );
};

export default DashboardJobSeeker;
