export const saveToken = (token) => localStorage.setItem('jobPortalToken', token);
export const getToken = () => localStorage.getItem('jobPortalToken');
export const removeToken = () => localStorage.removeItem('jobPortalToken');
