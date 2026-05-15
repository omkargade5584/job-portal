import React from 'react';
import SavedJobButton from './SavedJobButton';
import { MapPin, Briefcase, DollarSign, CheckCircle } from 'lucide-react';

const JobCard = ({ job, isEmployer, onApply, hasApplied }) => {
  return (
    <div className="glass-panel" style={{
      padding: '1.5rem', marginBottom: '1rem',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>{job.title}</h3>
          <p style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{job.company}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
          {!isEmployer && <SavedJobButton jobId={job.id} />}
          {!isEmployer && (
            hasApplied
              ? <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle size={16} /> Applied
                </span>
              : <button className="btn btn-primary" style={{ padding: '0.4rem 1rem' }} onClick={() => onApply && onApply(job)}>
                  Apply
                </button>
          )}
          {isEmployer && <span className="role-badge" style={{ fontSize: '0.7rem' }}>Active</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', margin: '1rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14} /> {job.location}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Briefcase size={14} /> {job.type}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><DollarSign size={14} /> {job.salary}</span>
      </div>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9rem' }}>{job.description}</p>
    </div>
  );
};

export default JobCard;
