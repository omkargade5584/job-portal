import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { LogOut } from 'lucide-react';
import '../../App.css';

const navMap = {
  USER: [
    { label: 'Find Jobs',       to: '/seeker-dashboard' },
    { label: 'Applications',    to: '/my-applications' },
    { label: 'Saved',           to: '/saved-jobs' },
    { label: 'Profile',         to: '/seeker-profile' },
  ],
  EMPLOYER: [
    { label: 'Dashboard',       to: '/employer-dashboard' },
    { label: 'Interviews',      to: '/interviews' },
    { label: 'Company',         to: '/company-profile' },
  ],
  ADMIN: [
    { label: 'Dashboard',       to: '/admin-dashboard' },
    { label: 'Users',           to: '/manage-users' },
    { label: 'Jobs',            to: '/manage-jobs' },
    { label: 'Applications',    to: '/manage-applications' },
    { label: 'Reports',         to: '/reports' },
  ],
};

const Navbar = () => {
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const links = isLoggedIn && user ? navMap[user.role] || [] : [];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">JobWave Pro</Link>

        <ul className="nav-links" style={{ flexWrap: 'wrap' }}>
          {links.map(link => (
            <li key={link.to}>
              <Link to={link.to} className={`nav-item${location.pathname === link.to ? ' active' : ''}`}>
                {link.label}
              </Link>
            </li>
          ))}

          {isLoggedIn ? (
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  display: 'grid', placeItems: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#fff',
                }}>
                  {user?.name?.charAt(0)}
                </div>
                <span className="role-badge">{user?.role}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline"
                style={{ padding: '0.35rem 0.9rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LogOut size={14} /> Logout
              </button>
            </li>
          ) : (
            <li style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Sign In</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
