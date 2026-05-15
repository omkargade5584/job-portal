import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MessageCircle } from 'lucide-react';

const Footer = () => (
  <footer style={{
    borderTop: '1px solid var(--border-color)', padding: '2rem 0',
    marginTop: 'auto', background: 'var(--bg-secondary)'
  }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <div>
        <span className="logo" style={{ fontSize: '1.1rem' }}>JobWave Pro</span>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.3rem' }}>© 2026 JobWave — All rights reserved.</p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {[MessageCircle, Globe, Mail].map((Icon, i) => (
          <a key={i} href="#" style={{ color: 'var(--text-secondary)', transition: 'var(--transition)', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
