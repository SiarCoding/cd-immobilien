import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import logo from "../assets/logo-csd.png";
import { HoverButton } from "./ui/animated-hover-button";
import "../styles/AnimatedButton.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Header = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  
  // Scrolling-Effekt verbessert
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newScrolled = scrollPosition > 50;
      if (newScrolled !== isScrolled) {
        setIsScrolled(newScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);
  
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
    changeLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className={`header-fixed ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-wrapper">
          {/* Logo */}
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <img src={logo} className="logo-image" alt="Immobilien logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="nav-center">
              <nav className="nav-items">
                <div className="nav-links-flex">
                  <Link to="/" className="nav-item" onClick={closeMobileMenu}>{t('header.home')}</Link>
                  <Link to="/uber-uns" className="nav-item" onClick={closeMobileMenu}>{t('header.about')}</Link>
                  <Link to="/team" className="nav-item" onClick={closeMobileMenu}>{t('header.team')}</Link>
                  <Link to="/rechner" className="nav-item" onClick={closeMobileMenu}>{t('header.calculator')}</Link>
                  <Link to="/testimonials" className="nav-item" onClick={closeMobileMenu}>{t('header.testimonials')}</Link>
                  <Link to="/kontakt" className="nav-item" onClick={closeMobileMenu}>{t('header.contact')}</Link>
                </div>
              </nav>

              {/* Button and Language Container */}
              <div className="header-actions">
                <HoverButton
                  startColor="#b87333"
                  endColor="#e0ac69"
                  animationIntensity="medium"
                  className="header-action-button"
                  onClick={closeMobileMenu}
                >
                  {t('header.consultation')}
                </HoverButton>
                
                <div className="language-selector">
                  <div className="language-selected" onClick={toggleLangDropdown}>
                    <div className="language-wrapper">
                      <span className="language-icon">🌐</span>
                      <span className="language-text">{selectedLanguage}</span>
                    </div>
                  </div>
                  {isLangDropdownOpen && (
                    <div className="language-dropdown-menu">
                      <div 
                        className={`language-item ${selectedLanguage === 'DE' ? 'language-active' : ''}`}
                        onClick={() => selectLanguage('DE')}
                      >
                        Deutsch
                      </div>
                      <div 
                        className={`language-item ${selectedLanguage === 'EN' ? 'language-active' : ''}`}
                        onClick={() => selectLanguage('EN')}
                      >
                        English
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu} 
            ref={btnRef}
          >
            <div className={`hamburger-menu ${isMobileMenuOpen ? 'hamburger-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-overlay-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} ref={menuRef}>
            <div className="mobile-menu-content">
              <Link to="/" className="mobile-nav-item" onClick={closeMobileMenu}>{t('header.home')}</Link>
              <Link to="/uber-uns" className="mobile-nav-item" onClick={closeMobileMenu}>{t('header.about')}</Link>
              <Link to="/team" className="mobile-nav-item" onClick={closeMobileMenu}>{t('header.team')}</Link>
              <Link to="/rechner" className="mobile-nav-item" onClick={closeMobileMenu}>{t('header.calculator')}</Link>
              <Link to="/testimonials" className="mobile-nav-item" onClick={closeMobileMenu}>{t('header.testimonials')}</Link>
              <Link to="/kontakt" className="mobile-nav-item" onClick={closeMobileMenu}>{t('header.contact')}</Link>

              <HoverButton
                startColor="#b87333"
                endColor="#e0ac69"
                animationIntensity="medium"
                className="mobile-action-button"
                onClick={closeMobileMenu}
              >
                {t('header.consultation')}
              </HoverButton>

              <div className="mobile-language-section">
                <div className="language-selector">
                  <div className="language-selected" onClick={toggleLangDropdown}>
                    <div className="language-wrapper">
                      <span className="language-icon">🌐</span>
                      <span className="language-text">{selectedLanguage}</span>
                    </div>
                  </div>
                  {isLangDropdownOpen && (
                    <div className="language-dropdown-menu">
                      <div 
                        className={`language-item ${selectedLanguage === 'DE' ? 'language-active' : ''}`}
                        onClick={() => selectLanguage('DE')}
                      >
                        Deutsch
                      </div>
                      <div 
                        className={`language-item ${selectedLanguage === 'EN' ? 'language-active' : ''}`}
                        onClick={() => selectLanguage('EN')}
                      >
                        English
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 