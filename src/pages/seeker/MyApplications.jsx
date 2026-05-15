import React from 'react';
import { useSelector } from 'react-redux';
import { useApplications } from '../../hooks/useApplications';
import Loader from '../../components/common/Loader';
import ApplicationCard from '../../components/application/ApplicationCard';
import { FileText } from 'lucide-react';

const MyApplications = () => {
  const { user } = useSelector(state => state.auth);
  // Using a fake seekerId so it matches our mock data
  const { applications, loading } = useApplications('seeker_001');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <FileText size={26} color="var(--accent-primary)" />
        <div>
          <h2>My Applications</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Track every job you've applied to
          </p>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading your applications…" />
      ) : applications.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <FileText size={48} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
          <h3>No applications yet</h3>
          <p style={{ marginTop: '0.5rem' }}>Start applying to jobs from your dashboard!</p>
        </div>
      ) : (
        <div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            {applications.length} application{applications.length !== 1 ? 's' : ''} found
          </p>
          {applications.map(app => <ApplicationCard key={app.id} application={app} />)}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
