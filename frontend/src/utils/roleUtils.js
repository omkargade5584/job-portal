export const ROLES = { USER: 'USER', EMPLOYER: 'EMPLOYER', ADMIN: 'ADMIN' };

export const isAdmin    = (role) => role === ROLES.ADMIN;
export const isEmployer = (role) => role === ROLES.EMPLOYER;
export const isSeeker   = (role) => role === ROLES.USER;

export const getDashboardPath = (role) => {
  if (role === ROLES.ADMIN) return '/admin-dashboard';
  if (role === ROLES.EMPLOYER) return '/employer-dashboard';
  return '/seeker-dashboard';
};
