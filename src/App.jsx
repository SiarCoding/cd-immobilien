import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/sections/Footer";
import HomePage from "./pages/HomePage";
import Kontakt from "./components/sections/Kontakt";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kontakt" element={<Kontakt />} />
            {/* Weitere Routen hier hinzufügen */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 