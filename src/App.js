import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { SEOProvider } from './contexts/SEOContext';
import Footer from "./components/sections/Footer"; // Import Footer

// Lazy-load the page components
const HomePage = lazy(() => import("./pages/HomePage"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Formular = lazy(() => import("./components/sections/Formular"));

function App() {
  return (
    <SEOProvider>
      <LanguageProvider>
        <Router>
          <Suspense fallback={<div>Wird geladen...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/formular" element={<Formular />} />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </LanguageProvider>
    </SEOProvider>
  );
}

export default App;
