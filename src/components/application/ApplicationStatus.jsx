import React from 'react';
import { CheckCircle, Clock, XCircle, Hourglass } from 'lucide-react';

const statusConfig = {
  APPLIED:   { label: 'Applied',    icon: <Clock size={14} />,       color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  REVIEWING: { label: 'In Review',  icon: <Hourglass size={14} />,   color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  ACCEPTED:  { label: 'Accepted',   icon: <CheckCircle size={14} />, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  REJECTED:  { label: 'Rejected',   icon: <XCircle size={14} />,     color: '#ef4444', bg: 'rgba(239,68,68,0.1)'  },
};

const ApplicationStatus = ({ status = 'APPLIED' }) => {
  const config = statusConfig[status] || statusConfig.APPLIED;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
      fontSize: '0.78rem', fontWeight: '600',
      color: config.color, background: config.bg,
      border: `1px solid ${config.color}40`,
    }}>
      {config.icon} {config.label}
    </span>
  );
};

export default ApplicationStatus;
