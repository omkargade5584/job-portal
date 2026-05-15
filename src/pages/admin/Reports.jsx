import React, { useState, useEffect } from 'react';
import { getAllApplications } from '../../api/applicationApi';
import { getAdminStats } from '../../api/adminApi';
import Loader from '../../components/common/Loader';
import ApplicationFunnel from '../../components/charts/ApplicationFunnel';
import SalaryChart from '../../components/charts/SalaryChart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats().then(res => { setStats(res.data); setLoading(false); });
  }, []);

  if (loading) return <Loader text="Loading analytics…" />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <TrendingUp size={26} color="var(--accent-primary)" />
        <div>
          <h2>Platform Reports</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>Analytics & insights across the entire platform</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <ApplicationFunnel data={stats.applicationsByStatus} />
        </div>
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <SalaryChart data={stats.salaryInsights} />
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>Jobs Posted by Month</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={stats.jobsByMonth} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#f8fafc' }} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
            <Bar dataKey="jobs" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
