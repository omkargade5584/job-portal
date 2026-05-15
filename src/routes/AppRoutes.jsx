import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Auth
import Login from '../pages/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Public
import Home from '../pages/Home';

// Seeker
import DashboardJobSeeker from '../pages/DashboardJobSeeker';
import MyApplications from '../pages/seeker/MyApplications';
import SeekerProfile from '../pages/seeker/SeekerProfile';
import SavedJobs from '../pages/seeker/SavedJobs';

// Employer
import DashboardEmployer from '../pages/DashboardEmployer';
import CompanyProfile from '../pages/employer/CompanyProfile';
import InterviewScheduler from '../pages/employer/InterviewScheduler';

// Admin
import DashboardAdmin from '../pages/DashboardAdmin';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageJobs from '../pages/admin/ManageJobs';
import ManageApplications from '../pages/admin/ManageApplications';
import Reports from '../pages/admin/Reports';

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Seeker */}
    <Route path="/seeker-dashboard" element={<ProtectedRoute allowedRoles={['USER']}><DashboardJobSeeker /></ProtectedRoute>} />
    <Route path="/my-applications" element={<ProtectedRoute allowedRoles={['USER']}><MyApplications /></ProtectedRoute>} />
    <Route path="/saved-jobs" element={<ProtectedRoute allowedRoles={['USER']}><SavedJobs /></ProtectedRoute>} />
    <Route path="/seeker-profile" element={<ProtectedRoute allowedRoles={['USER']}><SeekerProfile /></ProtectedRoute>} />

    {/* Employer */}
    <Route path="/employer-dashboard" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><DashboardEmployer /></ProtectedRoute>} />
    <Route path="/company-profile" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><CompanyProfile /></ProtectedRoute>} />
    <Route path="/interviews" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><InterviewScheduler /></ProtectedRoute>} />

    {/* Admin */}
    <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><DashboardAdmin /></ProtectedRoute>} />
    <Route path="/manage-users" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageUsers /></ProtectedRoute>} />
    <Route path="/manage-jobs" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageJobs /></ProtectedRoute>} />
    <Route path="/manage-applications" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageApplications /></ProtectedRoute>} />
    <Route path="/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><Reports /></ProtectedRoute>} />

    {/* 404 */}
    <Route path="*" element={
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.1rem' }}>Page not found</p>
      </div>
    } />
  </Routes>
);

export default AppRoutes;
