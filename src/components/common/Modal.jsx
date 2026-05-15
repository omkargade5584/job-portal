import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'grid', placeItems: 'center',
      background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div className="glass-panel" style={{
        padding: '2rem', minWidth: '380px', maxWidth: '560px', width: '90%',
        background: 'var(--bg-secondary)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--error)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
