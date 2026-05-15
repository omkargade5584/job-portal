import React, { useState } from 'react';
import { Bookmark, X } from 'lucide-react';
import JobCard from '../../components/jobs/JobCard';
import { useToast } from '../../components/common/Toast';

// Static saved jobs for demonstration
const DEMO_SAVED = [
  { id: '1', title: 'Senior React Developer', company: 'TechFlow Corp', location: 'Remote', type: 'Full-Time', salary: '$120,000 - $150,000', description: 'Leading frontend role at a fast-growing tech company.' },
  { id: '3', title: 'Junior Web Developer', company: 'StartUp Inc', location: 'San Francisco, CA', type: 'Full-Time', salary: '$80,000 - $95,000', description: 'Great first job opportunity for junior devs.' },
];

const SavedJobs = () => {
  const [saved, setSaved] = useState(DEMO_SAVED);
  const { showToast, ToastContainer } = useToast();

  const handleRemove = (id) => {
    setSaved(prev => prev.filter(j => j.id !== id));
    showToast('Job removed from saved list', 'info');
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Bookmark size={26} color="var(--accent-primary)" />
        <div>
          <h2>Saved Jobs</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>Jobs you bookmarked for later</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <Bookmark size={48} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
          <h3>No saved jobs</h3>
          <p style={{ marginTop: '0.5rem' }}>Bookmark jobs from your job feed to view them here!</p>
        </div>
      ) : (
        saved.map(job => (
          <div key={job.id} style={{ position: 'relative' }}>
            <JobCard job={job} isEmployer={false} onApply={() => {}} hasApplied={false} />
            <button
              onClick={() => handleRemove(job.id)}
              style={{ position: 'absolute', top: '1rem', right: '4.5rem', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem', cursor: 'pointer', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 600 }}>
              <X size={13} /> Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedJobs;
