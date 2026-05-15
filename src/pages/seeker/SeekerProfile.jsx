import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserCircle, Upload, Save } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const SeekerProfile = () => {
  const { user } = useSelector(state => state.auth);
  const { showToast, ToastContainer } = useToast();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: 'seeker@jobwave.com',
    phone: '',
    headline: '',
    location: '',
    bio: '',
    skills: '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, dispatch to API here
    showToast('Profile saved successfully!', 'success');
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <UserCircle size={26} color="var(--accent-primary)" />
        <div>
          <h2>My Profile</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Keep your profile up-to-date to attract employers
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Avatar Card */}
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{
            width: 90, height: 90, borderRadius: '50%', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'grid', placeItems: 'center', fontSize: '2rem', fontWeight: 800,
          }}>
            {profile.name.charAt(0) || '?'}
          </div>
          <h3>{profile.name || 'Your Name'}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            {profile.headline || 'Add a headline'}
          </p>
          <span className="role-badge" style={{ marginTop: '1rem', display: 'inline-block' }}>JOB SEEKER</span>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.88rem' }}>
              <Upload size={16} /> Upload Resume
              <input type="file" accept=".pdf,.doc,.docx" hidden />
            </label>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '0.5rem' }}>PDF or DOC, max 5MB</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Full Name</label>
              <input className="input-field" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Email</label>
              <input className="input-field" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Phone</label>
              <input className="input-field" placeholder="+1 (000) 000-0000" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Location</label>
              <input className="input-field" placeholder="City, State" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Professional Headline</label>
            <input className="input-field" placeholder="e.g. Senior React Developer" value={profile.headline} onChange={e => setProfile({ ...profile, headline: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Skills (comma-separated)</label>
            <input className="input-field" placeholder="React, JavaScript, CSS…" value={profile.skills} onChange={e => setProfile({ ...profile, skills: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Bio</label>
            <textarea className="input-field" rows={4} placeholder="Tell employers about yourself…" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={16} /> Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeekerProfile;
