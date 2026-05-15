import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * A higher-order component that restricts access to roles
 * @param {Object} props
 * @param {Array<string>} props.allowedRoles - e.g. ['USER', 'ADMIN']
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, user, loading } = useSelector((state) => state.auth);

  // If we are still checking auth status, we might return a loader
  if (loading) {
    return <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  // Not logged in? Go to login page.
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // If the route expects specific roles and the user doesn't have one of them
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Optionally redirect to a 403 Forbidden or their main dashboard
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
