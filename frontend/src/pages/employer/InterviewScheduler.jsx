import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Clock, Video, Plus, X } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

const mockScheduled = [
  { id: 1, candidate: 'Alice Johnson', role: 'Senior React Developer', date: '2026-04-10', time: '10:00 AM', type: 'Video', status: 'Scheduled' },
  { id: 2, candidate: 'Bob Smith',     role: 'Junior Web Developer',  date: '2026-04-12', time: '02:00 PM', type: 'Phone', status: 'Pending'  },
];

const InterviewScheduler = () => {
  const { user }  = useSelector(state => state.auth);
  const { showToast, ToastContainer } = useToast();
  const [interviews, setInterviews] = useState(mockScheduled);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ candidate: '', role: '', date: '', time: '09:00 AM', type: 'Video' });

  const handleSchedule = (e) => {
    e.preventDefault();
    const newItem = { ...form, id: Date.now(), status: 'Scheduled' };
    setInterviews(prev => [newItem, ...prev]);
    showToast(`Interview scheduled with ${form.candidate}!`, 'success');
    setShowForm(false);
    setForm({ candidate: '', role: '', date: '', time: '09:00 AM', type: 'Video' });
  };

  const handleCancel = (id) => {
    setInterviews(prev => prev.map(i => i.id === id ? { ...i, status: 'Cancelled' } : i));
    showToast('Interview cancelled', 'info');
  };

  const statusColor = { Scheduled: 'var(--success)', Pending: 'var(--warning)', Cancelled: 'var(--error)' };

  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calendar size={26} color="var(--accent-primary)" />
          <div>
            <h2>Interview Scheduler</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Manage candidate interview slots</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Schedule Interview</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSchedule} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ marginBottom: '0.25rem' }}>New Interview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input className="input-field" placeholder="Candidate Name *" required value={form.candidate} onChange={e => setForm({ ...form, candidate: e.target.value })} />
            <input className="input-field" placeholder="Job Role *" required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Date</label>
              <input className="input-field" type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Time Slot</label>
              <select className="input-field" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Interview Type</label>
              <select className="input-field" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="Video">Video Call</option>
                <option value="Phone">Phone</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Confirm Schedule</button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {interviews.map(iv => (
          <div key={iv.id} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'grid', placeItems: 'center', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {iv.candidate.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: 600 }}>{iv.candidate}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{iv.role}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.82rem', marginLeft: '3rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={13} /> {iv.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={13} /> {iv.time}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Video size={13} /> {iv.type}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: statusColor[iv.status], fontWeight: 600, fontSize: '0.82rem' }}>● {iv.status}</span>
              {iv.status !== 'Cancelled' && (
                <button className="btn btn-danger" style={{ padding: '0.3rem 0.8rem', fontSize: '0.78rem' }} onClick={() => handleCancel(iv.id)}>Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewScheduler;
