import React from 'react';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </ErrorBoundary>
  );
}

export default App;
