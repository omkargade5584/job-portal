import React, { createContext, useState, useContext, useEffect } from 'react';

// Options for roles
export const ROLES = {
  GUEST: 'GUEST',
  USER: 'USER', // Job Seeker
  EMPLOYER: 'EMPLOYER', // Hiring Manager/Employee
  ADMIN: 'ADMIN', // Administrator
};

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for a logged-in user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('jobPortalUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (role, name) => {
    const newUser = { role, name, id: Math.random().toString(36).substr(2, 9) };
    setUser(newUser);
    localStorage.setItem('jobPortalUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobPortalUser');
  };

  const value = {
    user,
    role: user ? user.role : ROLES.GUEST,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
