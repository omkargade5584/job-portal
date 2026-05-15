import React, { useState } from 'react';
import { useJobs } from '../../hooks/useJobs';
import Loader from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import { Briefcase, Search, Trash2 } from 'lucide-react';

const ManageJobs = () => {
  const { jobs, loading } = useJobs();
  const [localJobs, setLocalJobs] = useState(null); // Use local copy after first load
  const [query, setQuery] = useState('');
  const { showToast, ToastContainer } = useToast();

  const displayJobs = (localJobs || jobs).filter(j =>
    j.title.toLowerCase().includes(query.toLowerCase()) ||
    j.company.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (id) => {
    const base = localJobs || jobs;
    setLocalJobs(base.filter(j => j.id !== id));
    showToast('Job removed from platform', 'success');
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Briefcase size={26} color="var(--accent-primary)" />
          <div>
            <h2>Manage Jobs</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Review and remove job listings</p>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input className="input-field" style={{ paddingLeft: '2.25rem', width: 240 }}
            placeholder="Search jobs…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {loading ? <Loader text="Loading jobs…" /> : (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
                {['Job Title', 'Company', 'Location', 'Type', 'Action'].map(h => (
                  <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayJobs.map((job, i) => (
                <tr key={job.id} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{job.title}</td>
                  <td style={{ padding: '0.9rem 1.25rem', fontWeight: 500 }}>{job.company}</td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-secondary)' }}>{job.location}</td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <span className="role-badge" style={{ fontSize: '0.7rem' }}>{job.type}</span>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <button className="btn btn-danger" style={{ padding: '0.3rem 0.8rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      onClick={() => handleDelete(job.id)}>
                      <Trash2 size={13} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
