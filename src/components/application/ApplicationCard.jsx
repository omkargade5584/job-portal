import React from 'react';
import ApplicationStatus from './ApplicationStatus';
import { Building2, Calendar } from 'lucide-react';

const ApplicationCard = ({ application }) => {
  const dateApplied = new Date(application.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <div>
        <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.3rem' }}>{application.jobTitle}</h4>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Building2 size={14} /> {application.company}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> {dateApplied}</span>
        </div>
      </div>
      <ApplicationStatus status={application.status} />
    </div>
  );
};

export default ApplicationCard;
