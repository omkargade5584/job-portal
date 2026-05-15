import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useJobs } from '../hooks/useJobs';
import { useToast } from '../components/common/Toast';
import Loader from '../components/common/Loader';
import JobList from '../components/jobs/JobList';
import { getMyApplications } from '../api/applicationApi';
import ApplicationCard from '../components/application/ApplicationCard';
import { LayoutDashboard, Plus, ListChecks, X } from 'lucide-react';

const DashboardEmployer = () => {
  const { user } = useSelector(state => state.auth);
  const { jobs, loading, addJob } = useJobs(user?.id);
  const { showToast, ToastContainer } = useToast();

  const [tab, setTab] = useState('listings');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', company: user?.name || '', location: '', type: 'Full-Time', salary: '', description: '' });

  const [applicants, setApplicants] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);

  useEffect(() => {
    if (tab !== 'applicants') return;
    setLoadingApps(true);
    getMyApplications('all').then(r => { setApplicants(r.data); setLoadingApps(false); }).catch(() => setLoadingApps(false));
  }, [tab]);

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      // Parse salary string to min/max if possible
      let salaryMin = null;
      let salaryMax = null;
      if (form.salary) {
        const numbers = form.salary.match(/\d+/g);
        if (numbers && numbers.length > 0) {
           salaryMin = parseFloat(numbers[0]) * (form.salary.toLowerCase().includes('k') ? 1000 : 1);
           if (numbers.length > 1) {
             salaryMax = parseFloat(numbers[1]) * (form.salary.toLowerCase().includes('k') ? 1000 : 1);
           }
        }
      }
      const payload = {
        title: form.title,
        description: form.description,
        location: form.location,
        jobType: form.type.toUpperCase().replace('-', '_'), // Full-Time -> FULL_TIME
        salaryMin,
        salaryMax,
        skills: ''
      };
      await addJob(payload);
      showToast('Job posted successfully!', 'success');
      setShowForm(false);
      setForm({ title: '', company: user?.name || '', location: '', type: 'Full-Time', salary: '', description: '' });
    } catch (err) {
      showToast('Failed to post job', 'error');
    }
  };

  const tabs = [
    { id: 'listings', label: 'My Listings', icon: <LayoutDashboard size={16} /> },
    { id: 'applicants', label: 'Applicants', icon: <ListChecks size={16} /> },
  ];

  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Employer Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem' }}>Managing as <strong style={{ color: 'var(--text-primary)' }}>{user?.name}</strong></p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Post New Job</>}
        </button>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.2rem', background: 'none', border: 'none',
            borderBottom: tab === t.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
            color: tab === t.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', transition: 'var(--transition)',
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Post Job Form */}
      {showForm && (
        <form onSubmit={handlePostJob} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>New Job Listing</h3>
          <input className="input-field" placeholder="Job Title *" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input className="input-field" style={{ flex: 1 }} placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            <input className="input-field" style={{ flex: 1 }} placeholder="Salary (e.g. $90k)" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
            <select className="input-field" style={{ flex: 1 }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <textarea className="input-field" placeholder="Job Description *" rows={3} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="btn btn-primary">Publish Job</button>
            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {/* Tab Content */}
      {tab === 'listings' && (
        loading ? <Loader text="Loading your listings…" /> : <JobList jobs={jobs} loading={false} isEmployer={true} />
      )}
      {tab === 'applicants' && (
        loadingApps ? <Loader text="Loading applicants…" /> : (
          applicants.length === 0
            ? <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>No applicants yet.</p>
            : applicants.map(app => <ApplicationCard key={app.id} application={app} />)
        )
      )}
    </div>
  );
};

export default DashboardEmployer;
