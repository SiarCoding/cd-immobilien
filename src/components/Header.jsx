import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import logo from "../assets/logo-csd.png";
import { HoverButton } from "./ui/animated-hover-button";
import "../styles/AnimatedButton.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('DE');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  
  // Scrolling-Effekt hinzufügen
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Klick außerhalb des Menüs erkennen und Menü schließen
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isMobileMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(e.target) &&
        btnRef.current && 
        !btnRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);
  
  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };
  
  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} className="logo-icon" alt="Immobilien logo" />
          </Link>
        </div>
        
        <div className="mobile-menu-btn" onClick={toggleMobileMenu} ref={btnRef}>
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <nav className={`nav-links-container ${isMobileMenuOpen ? 'mobile-open' : ''}`} ref={menuRef}>
          <div className="nav-links">
            <div className="nav-links-wrapper">
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>Startseite</Link>
              <Link to="/uber-uns" className="nav-link" onClick={closeMobileMenu}>Über uns</Link>
              <Link to="/team" className="nav-link" onClick={closeMobileMenu}>Team</Link>
              <Link to="/rechner" className="nav-link" onClick={closeMobileMenu}>Rechner</Link>
              <Link to="/testimonials" className="nav-link" onClick={closeMobileMenu}>Kundenstimmen</Link>
              <Link to="/kontakt" className="nav-link" onClick={closeMobileMenu}>Kontakt</Link>
            </div>
          </div>
          <div className="header-right-elements">
            <HoverButton
              startColor="#b87333"
              endColor="#e0ac69"
              animationIntensity="medium"
              className="header-animated-button"
              onClick={closeMobileMenu}
            >
              Beratung anfragen
            </HoverButton>
            
            <div className="language-selector-glass">
              <div className="selected-language" onClick={toggleLangDropdown}>
                <div className="language-icon-wrapper">
                  <span className="world-icon">🌐</span>
                  <span className="language-code">{selectedLanguage}</span>
                </div>
              </div>
              {isLangDropdownOpen && (
                <div className="language-dropdown">
                  <div 
                    className={`language-option ${selectedLanguage === 'DE' ? 'active' : ''}`}
                    onClick={() => selectLanguage('DE')}
                  >
                    Deutsch
                  </div>
                  <div 
                    className={`language-option ${selectedLanguage === 'EN' ? 'active' : ''}`}
                    onClick={() => selectLanguage('EN')}
                  >
                    English
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 