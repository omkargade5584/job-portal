import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main className="container animate-fade-in" style={{ flex: 1, paddingTop: '2rem', paddingBottom: '3rem' }}>
      {children}
    </main>
    <Footer />
  </div>
);

export default MainLayout;
