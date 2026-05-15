import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1200);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '5rem auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        {!sent ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.15)', display: 'grid', placeItems: 'center', margin: '0 auto 1rem', border: '1px solid rgba(99,102,241,0.3)' }}>
                <Mail size={24} color="var(--accent-primary)" />
              </div>
              <h2>Forgot Password?</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Enter your email and we'll send you a reset link.
              </p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Email Address</label>
                <input className="input-field" type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle size={56} color="var(--success)" style={{ marginBottom: '1.25rem' }} />
            <h2>Check your email</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
              We sent a password reset link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>. It expires in 15 minutes.
            </p>
          </div>
        )}

        <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.75rem', color: 'var(--text-secondary)', fontSize: '0.88rem', transition: 'var(--transition)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <ArrowLeft size={15} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
