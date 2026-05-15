import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Building2, Globe, MapPin, Phone, Mail, Save } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const CompanyProfile = () => {
  const { user } = useSelector(state => state.auth);
  const { showToast, ToastContainer } = useToast();

  const [company, setCompany] = useState({
    name: user?.name || '',
    email: 'hr@company.com',
    phone: '',
    website: '',
    location: '',
    industry: '',
    size: '1-50',
    description: '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Company profile saved!', 'success');
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Building2 size={26} color="var(--accent-primary)" />
        <div>
          <h2>Company Profile</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            A strong company profile attracts better candidates
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Preview Card */}
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 'var(--radius-md)', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'grid', placeItems: 'center', fontSize: '1.8rem', fontWeight: 800,
          }}>
            {company.name.charAt(0) || '🏢'}
          </div>
          <h3>{company.name || 'Company Name'}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.3rem' }}>{company.industry || 'Industry'}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
            {company.location || 'Location'} · {company.size} employees
          </p>
          <span className="role-badge" style={{ marginTop: '1rem', display: 'inline-block' }}>EMPLOYER</span>
        </div>

        {/* Form */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Company Name</label>
              <input className="input-field" value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Industry</label>
              <input className="input-field" placeholder="e.g. Software / Finance" value={company.industry} onChange={e => setCompany({ ...company, industry: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                <Mail size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Email
              </label>
              <input className="input-field" type="email" value={company.email} onChange={e => setCompany({ ...company, email: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                <Phone size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Phone
              </label>
              <input className="input-field" placeholder="+1 (000) 000-0000" value={company.phone} onChange={e => setCompany({ ...company, phone: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                <Globe size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Website
              </label>
              <input className="input-field" placeholder="https://yourcompany.com" value={company.website} onChange={e => setCompany({ ...company, website: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                <MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Location
              </label>
              <input className="input-field" placeholder="City, Country" value={company.location} onChange={e => setCompany({ ...company, location: e.target.value })} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Company Size</label>
            <select className="input-field" value={company.size} onChange={e => setCompany({ ...company, size: e.target.value })}>
              {['1-50', '51-200', '201-500', '500-1000', '1000+'].map(s => <option key={s} value={s}>{s} employees</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>About the Company</label>
            <textarea className="input-field" rows={4} placeholder="Tell candidates what makes your company great…" value={company.description} onChange={e => setCompany({ ...company, description: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={16} /> Save Company Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfile;
