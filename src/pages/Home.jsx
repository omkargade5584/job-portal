import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Briefcase, Users, Star } from 'lucide-react';

const stats = [
  { icon: <Briefcase size={22} />, label: 'Active Jobs', value: '1,200+' },
  { icon: <Users size={22} />, label: 'Companies Hiring', value: '300+' },
  { icon: <Star size={22} />, label: 'Placements Made', value: '8,500+' },
];

const Home = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div style={{
        textAlign: 'center', padding: '5rem 1.5rem 4rem',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12), transparent)',
        borderRadius: 'var(--radius-lg)', marginBottom: '3rem',
      }}>
        <span className="role-badge" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
          🚀 The Future of Hiring is Here
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.15, marginBottom: '1.25rem', fontWeight: 800 }}>
          Find Your Dream Job<br />
          <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Better. Faster. Smarter.
          </span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          JobWave Pro connects elite talent with world-class companies. Post jobs, apply instantly, and get hired — all in one platform.
        </p>

        {!isLoggedIn
          ? <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', fontSize: '1rem' }}>
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                Post a Job
              </Link>
            </div>
          : <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={user?.role === 'USER' ? '/seeker-dashboard' : user?.role === 'EMPLOYER' ? '/employer-dashboard' : '/admin-dashboard'}
                className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem' }}>
                Go to Dashboard <ArrowRight size={18} />
              </Link>
            </div>
        }
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.15)', display: 'grid', placeItems: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Role Cards */}
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.6rem' }}>Who is this for?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {[
          { title: 'Job Seekers', desc: 'Browse thousands of curated job listings and apply in seconds with your profile.', emoji: '🎯', role: 'USER' },
          { title: 'Employers', desc: 'Post jobs, review applications, and schedule interviews — all in one dashboard.', emoji: '🏢', role: 'EMPLOYER' },
          { title: 'Admins', desc: 'Monitor the platform, manage users and jobs, and view analytics in real-time.', emoji: '🛡️', role: 'ADMIN' },
        ].map((card, i) => (
          <div key={i} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{card.emoji}</div>
            <h3 style={{ marginBottom: '0.75rem' }}>{card.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>{card.desc}</p>
            <Link to="/login" className="btn btn-outline" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              Sign in as {card.title.split(' ')[0]} <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
