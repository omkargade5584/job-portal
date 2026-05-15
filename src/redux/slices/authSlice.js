import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  try {
    const user = localStorage.getItem('jobPortalUser');
    return user && user !== 'undefined' ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to parse user from local storage:', error);
    return null;
  }
};

const initialState = {
  user: getInitialUser(),
  token: localStorage.getItem('jobPortalToken') || null,
  isLoggedIn: !!localStorage.getItem('jobPortalToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role
      };
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('jobPortalUser', JSON.stringify(state.user));
      localStorage.setItem('jobPortalToken', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('jobPortalUser');
      localStorage.removeItem('jobPortalToken');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
