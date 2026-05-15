import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import * as authApi from '../api/authApi';
import { LogIn } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [selectedRole, setSelectedRole] = useState('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    dispatch(loginStart());
    try {
      const response = await authApi.loginUser(email, password);
      dispatch(loginSuccess(response));
      // Navigate based on actual role returned by backend
      const roleRoutes = { USER: '/seeker-dashboard', EMPLOYER: '/employer-dashboard', ADMIN: '/admin-dashboard' };
      navigate(roleRoutes[response.role] || roleRoutes[selectedRole]);
    } catch (err) {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'grid', placeItems: 'center', margin: '0 auto 1rem',
          }}>
            <LogIn size={24} color="#fff" />
          </div>
          <h2>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.9rem' }}>Sign in to your JobWave Pro account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', color: 'var(--error)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Email Address</label>
            <input className="input-field" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Password</label>
            <input className="input-field" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Account Type</label>
            <select className="input-field" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
              <option value="USER">Job Seeker (Candidate)</option>
              <option value="EMPLOYER">Employer (Hiring)</option>
              <option value="ADMIN">System Admin</option>
            </select>
          </div>

          <div style={{ textAlign: 'right' }}>
            <Link to="/forgot-password" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 500 }}>Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.25rem' }}>
            {loading ? 'Authenticating…' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
