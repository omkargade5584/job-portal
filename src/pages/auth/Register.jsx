import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import * as authApi from '../../api/authApi';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) { setError('Please fill in all fields'); return; }
    setLoading(true); setError('');
    dispatch(loginStart());
    try {
      const response = await authApi.registerUser(form);
      dispatch(loginSuccess(response));
      const roleRoutes = { USER: '/seeker-dashboard', EMPLOYER: '/employer-dashboard', ADMIN: '/admin-dashboard' };
      navigate(roleRoutes[form.role]);
    } catch (err) {
      dispatch(loginFailure('Registration failed'));
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '4rem auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'grid', placeItems: 'center', margin: '0 auto 1rem' }}>
            <UserPlus size={24} color="#fff" />
          </div>
          <h2>Create Account</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.9rem' }}>Join thousands using JobWave Pro</p>
        </div>

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', color: 'var(--error)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Full Name</label>
            <input className="input-field" required placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Email Address</label>
            <input className="input-field" required type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Password</label>
            <input className="input-field" required type="password" placeholder="Create a password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>I am signing up as…</label>
            <select className="input-field" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="USER">Job Seeker</option>
              <option value="EMPLOYER">Employer / Company</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
