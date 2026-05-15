import React, { useState, useEffect } from 'react';
import { getAllApplications, updateApplicationStatus } from '../../api/applicationApi';
import Loader from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import ApplicationStatus from '../../components/application/ApplicationStatus';
import { FileText, Search } from 'lucide-react';

const ManageApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    getAllApplications().then(res => { setApps(res.data); setLoading(false); });
  }, []);

  const handleStatus = async (id, newStatus) => {
    await updateApplicationStatus(id, newStatus);
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showToast(`Application updated to ${newStatus}`, 'success');
  };

  const filtered = apps.filter(a =>
    a.seekerName.toLowerCase().includes(query.toLowerCase()) ||
    a.jobTitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FileText size={26} color="var(--accent-primary)" />
          <div>
            <h2>Manage Applications</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{apps.length} total applications</p>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input className="input-field" style={{ paddingLeft: '2.25rem', width: 240 }}
            placeholder="Search applications…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {loading ? <Loader text="Loading applications…" /> : (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
                {['Applicant', 'Job Title', 'Company', 'Date Applied', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => (
                <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '0.9rem 1.25rem', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent-primary)', flexShrink: 0 }}>
                        {app.seekerName.charAt(0)}
                      </div>
                      {app.seekerName}
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{app.jobTitle}</td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-secondary)' }}>{app.company}</td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <ApplicationStatus status={app.status} />
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <select className="input-field" style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                      value={app.status} onChange={e => handleStatus(app.id, e.target.value)}>
                      {['APPLIED', 'REVIEWING', 'ACCEPTED', 'REJECTED'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
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

export default ManageApplications;
