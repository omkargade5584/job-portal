import React, { useState } from 'react';
import { Users, Search, MoreVertical } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Alice Johnson',   email: 'alice@email.com',   role: 'USER',     status: 'Active',   joined: '2026-01-10' },
  { id: 2, name: 'Bob Smith',       email: 'bob@email.com',     role: 'USER',     status: 'Active',   joined: '2026-02-05' },
  { id: 3, name: 'TechFlow Corp',   email: 'hr@techflow.com',   role: 'EMPLOYER', status: 'Active',   joined: '2026-01-15' },
  { id: 4, name: 'Innovate Labs',   email: 'jobs@innovate.com', role: 'EMPLOYER', status: 'Active',   joined: '2026-03-01' },
  { id: 5, name: 'Carol White',     email: 'carol@email.com',   role: 'USER',     status: 'Inactive', joined: '2026-03-20' },
];

const roleColors = { USER: '#10b981', EMPLOYER: '#6366f1', ADMIN: '#f59e0b' };

const ManageUsers = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Users size={26} color="var(--accent-primary)" />
          <div>
            <h2>Manage Users</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{users.length} platform users</p>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input className="input-field" style={{ paddingLeft: '2.25rem', width: 240 }}
            placeholder="Search users…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
              {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                <td style={{ padding: '0.9rem 1.25rem', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${roleColors[u.role]}22`, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '0.85rem', color: roleColors[u.role] }}>
                      {u.name.charAt(0)}
                    </div>
                    {u.name}
                  </div>
                </td>
                <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{u.email}</td>
                <td style={{ padding: '0.9rem 1.25rem' }}>
                  <span style={{ color: roleColors[u.role], fontWeight: 600, fontSize: '0.8rem' }}>{u.role}</span>
                </td>
                <td style={{ padding: '0.9rem 1.25rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 600, background: u.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: u.status === 'Active' ? 'var(--success)' : 'var(--error)', border: `1px solid ${u.status === 'Active' ? '#10b98140' : '#ef444440'}` }}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{u.joined}</td>
                <td style={{ padding: '0.9rem 1.25rem' }}>
                  <button
                    onClick={() => toggleStatus(u.id)}
                    className={`btn ${u.status === 'Active' ? 'btn-danger' : 'btn-outline'}`}
                    style={{ padding: '0.3rem 0.8rem', fontSize: '0.78rem' }}>
                    {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
