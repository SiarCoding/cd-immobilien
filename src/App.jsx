import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/sections/Footer";
import HomePage from "./pages/HomePage";
import Kontakt from './pages/Kontakt';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import PageLayout from './components/PageLayout';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kontakt" element={<PageLayout><Kontakt /></PageLayout>} />
          <Route path="/impressum" element={<PageLayout><Impressum /></PageLayout>} />
          <Route path="/datenschutz" element={<PageLayout><Datenschutz /></PageLayout>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 