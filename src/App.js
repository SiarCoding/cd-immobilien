import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { SEOProvider } from './contexts/SEOContext';

// Import all section components
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import Kontakt from './components/sections/Kontakt';
import Formular from './components/sections/Formular';
import Footer from './components/sections/Footer';
import Testimonials from "./components/sections/Blog";
import Datenschutz from './pages/Datenschutz';

function App() {
  return (
    <SEOProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/formular" element={<Formular />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              {/* Weitere Routen hier hinzufügen netlify deploy --prod                     */}
            </Routes>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </LanguageProvider>
    </SEOProvider>
  );
}

export default App;
