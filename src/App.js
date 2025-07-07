import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { SEOProvider } from './contexts/SEOContext';
import { ConsentProvider } from './contexts/ConsentContext';
import PageLayout from './components/PageLayout'; // Import the new layout
import HomePage from "./pages/HomePage"; // Import directly

// Lazy-load the other page components
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Formular = lazy(() => import("./components/sections/Formular"));

function App() {
  return (
    <SEOProvider>
      <LanguageProvider>
        <ConsentProvider>
          <Router>
            <Suspense fallback={<div className="page-loader">Wird geladen...</div>}>
              <PageLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/impressum" element={<Impressum />} />
                  <Route path="/datenschutz" element={<Datenschutz />} />
                  <Route path="/formular" element={<Formular />} />
                </Routes>
              </PageLayout>
            </Suspense>
          </Router>
        </ConsentProvider>
      </LanguageProvider>
    </SEOProvider>
  );
}

export default App;
