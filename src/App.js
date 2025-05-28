import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';

// Import all section components
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import Kontakt from './components/sections/Kontakt';
import Footer from './components/sections/Footer';
import Testimonials from "./components/sections/Blog";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/testimonials" element={<Testimonials />} />
            {/* Weitere Routen hier hinzufügen */}
          </Routes>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
