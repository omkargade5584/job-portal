import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAdminStats } from '../api/adminApi';
import { getAllApplications, updateApplicationStatus } from '../api/applicationApi';
import { useToast } from '../components/common/Toast';
import Loader from '../components/common/Loader';
import ApplicationFunnel from '../components/charts/ApplicationFunnel';
import SalaryChart from '../components/charts/SalaryChart';
import { Users, Briefcase, FileText, TrendingUp, Shield } from 'lucide-react';

const StatCard = ({ icon, label, value, color }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
    <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', background: `${color}22`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
      {React.cloneElement(icon, { size: 24, color })}
    </div>
    <div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.2rem' }}>{label}</p>
      <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
    </div>
  </div>
);

const DashboardAdmin = () => {
  const { user } = useSelector(state => state.auth);
  const { showToast, ToastContainer } = useToast();
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [statsRes, appsRes] = await Promise.all([getAdminStats(), getAllApplications()]);
      setStats(statsRes.data);
      setApplications(appsRes.data);
      setLoading(false);
    };
    load();
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    await updateApplicationStatus(appId, newStatus);
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    showToast(`Status updated to ${newStatus}`, 'success');
  };

  const tabs = ['overview', 'applications'];

  const statusColors = { APPLIED: '#f59e0b', REVIEWING: '#6366f1', ACCEPTED: '#10b981', REJECTED: '#ef4444' };

  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Shield size={28} color="var(--accent-primary)" />
        <div>
          <h2>Admin Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>System admin: <strong style={{ color: 'var(--text-primary)' }}>{user?.name}</strong></p>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.6rem 1.25rem', background: 'none', border: 'none',
            borderBottom: tab === t ? '2px solid var(--accent-primary)' : '2px solid transparent',
            color: tab === t ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', fontSize: '0.9rem', transition: 'var(--transition)',
          }}>{t}</button>
        ))}
      </div>

      {loading ? <Loader text="Loading analytics…" /> : (
        <>
          {tab === 'overview' && stats && (
            <div className="animate-fade-in">
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatCard icon={<Briefcase />} label="Total Jobs" value={stats.totalJobs} color="#6366f1" />
                <StatCard icon={<FileText />} label="Applications" value={stats.totalApplications} color="#8b5cf6" />
                <StatCard icon={<Users />} label="Job Seekers" value={stats.totalUsers} color="#10b981" />
                <StatCard icon={<TrendingUp />} label="Employers" value={stats.totalEmployers} color="#f59e0b" />
              </div>

              {/* Charts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <ApplicationFunnel data={stats.applicationsByStatus} />
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <SalaryChart data={stats.salaryInsights} />
                </div>
              </div>
            </div>
          )}

          {tab === 'applications' && (
            <div className="animate-fade-in">
              <h3 style={{ marginBottom: '1.25rem' }}>All Applications ({applications.length})</h3>
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                      {['Applicant', 'Job Title', 'Company', 'Status', 'Change Status'].map(h => (
                        <th key={h} style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, i) => (
                      <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 500 }}>{app.seekerName}</td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-primary)' }}>{app.jobTitle}</td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>{app.company}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{ color: statusColors[app.status], fontWeight: 600, fontSize: '0.82rem' }}>{app.status}</span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <select
                            className="input-field"
                            style={{ padding: '0.35rem 0.5rem', fontSize: '0.82rem', width: 'auto' }}
                            value={app.status}
                            onChange={e => handleStatusChange(app.id, e.target.value)}
                          >
                            {['APPLIED', 'REVIEWING', 'ACCEPTED', 'REJECTED'].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardAdmin;
