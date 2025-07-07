import React from 'react';
import Header from './Header';
import Footer from './sections/Footer';
import CookieBanner from './consent/CookieBanner';

const PageLayout = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default PageLayout; 