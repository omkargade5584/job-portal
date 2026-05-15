import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SalaryChart = ({ data = [] }) => (
  <div>
    <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>Avg Salary by Role ($)</h3>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="role" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#f8fafc' }}
          formatter={v => [`$${v.toLocaleString()}`, 'Avg Salary']}
          cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
        />
        <Area type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2} fill="url(#salaryGrad)" dot={{ fill: '#6366f1', r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default SalaryChart;
