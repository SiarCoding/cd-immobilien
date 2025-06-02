import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import logo from '../assets/logo-csd.webp';
import { HoverButton } from "./ui/animated-hover-button";
import "../styles/AnimatedButton.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Header = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  
  // Smooth scroll function für Anchor-Links
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Header Höhe berücksichtigen
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    closeMobileMenu();
  };
  
  // Scrolling-Effekt mit Progress-Bar verbessert
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newScrolled = scrollPosition > 50;
      
      // Berechne Scroll-Progress
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = documentHeight > 0 ? (scrollPosition / documentHeight) * 100 : 0;
      
      if (newScrolled !== isScrolled) {
        setIsScrolled(newScrolled);
      }
      setScrollProgress(Math.min(currentProgress, 100));
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
    <>
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
                    <button 
                      className="nav-item nav-button" 
                      onClick={() => scrollToSection('about')}
                    >
                      {t('header.about')}
                    </button>
                    <button 
                      className="nav-item nav-button" 
                      onClick={() => scrollToSection('team')}
                    >
                      {t('header.team')}
                    </button>
                    <button 
                      className="nav-item nav-button" 
                      onClick={() => scrollToSection('features')}
                    >
                      {t('header.calculator')}
                    </button>
                    <button 
                      className="nav-item nav-button" 
                      onClick={() => scrollToSection('blog')}
                    >
                      {t('header.testimonials')}
                    </button>
                    <Link to="/kontakt" className="nav-item" onClick={closeMobileMenu}>{t('header.contact')}</Link>
                  </div>
                </nav>

                {/* Button and Language Container */}
                <div className="header-actions">
                  <Link to="/formular">
                    <HoverButton
                      startColor="#b87333"
                      endColor="#e0ac69"
                      animationIntensity="medium"
                      className="header-action-button"
                      onClick={closeMobileMenu}
                    >
                      {t('header.consultation')}
                    </HoverButton>
                  </Link>
                  
                  <div className="language-selector">
                    <div className="language-selected" onClick={toggleLangDropdown}>
                      <div className="language-wrapper">
                        <div className="language-icon">
                          <span className="current-flag">
                            {selectedLanguage === 'DE' ? '🇩🇪' : '🇬🇧'}
                          </span>
                        </div>
                        <span className="language-text">{selectedLanguage}</span>
                        <div className="dropdown-arrow">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    {isLangDropdownOpen && (
                      <div className="language-dropdown-menu">
                        <div 
                          className={`language-item ${selectedLanguage === 'DE' ? 'language-active' : ''}`}
                          onClick={() => selectLanguage('DE')}
                        >
                          <span className="flag-icon">🇩🇪</span>
                          <span>Deutsch</span>
                        </div>
                        <div 
                          className={`language-item ${selectedLanguage === 'EN' ? 'language-active' : ''}`}
                          onClick={() => selectLanguage('EN')}
                        >
                          <span className="flag-icon">🇬🇧</span>
                          <span>English</span>
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
                <button 
                  className="mobile-nav-item nav-button" 
                  onClick={() => scrollToSection('about')}
                >
                  {t('header.about')}
                </button>
                <button 
                  className="mobile-nav-item nav-button" 
                  onClick={() => scrollToSection('team')}
                >
                  {t('header.team')}
                </button>
                <button 
                  className="mobile-nav-item nav-button" 
                  onClick={() => scrollToSection('features')}
                >
                  {t('header.calculator')}
                </button>
                <button 
                  className="mobile-nav-item nav-button" 
                  onClick={() => scrollToSection('blog')}
                >
                  {t('header.testimonials')}
                </button>
                <Link to="/kontakt" className="mobile-nav-item" onClick={closeMobileMenu}>{t('header.contact')}</Link>

                <Link to="/formular">
                  <HoverButton
                    startColor="#b87333"
                    endColor="#e0ac69"
                    animationIntensity="medium"
                    className="mobile-action-button"
                    onClick={closeMobileMenu}
                  >
                    {t('header.consultation')}
                  </HoverButton>
                </Link>

                <div className="mobile-language-section">
                  <div className="language-selector">
                    <div className="language-selected" onClick={toggleLangDropdown}>
                      <div className="language-wrapper">
                        <div className="language-icon">
                          <span className="current-flag">
                            {selectedLanguage === 'DE' ? '🇩🇪' : '🇬🇧'}
                          </span>
                        </div>
                        <span className="language-text">{selectedLanguage}</span>
                        <div className="dropdown-arrow">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    {isLangDropdownOpen && (
                      <div className="language-dropdown-menu">
                        <div 
                          className={`language-item ${selectedLanguage === 'DE' ? 'language-active' : ''}`}
                          onClick={() => selectLanguage('DE')}
                        >
                          <span className="flag-icon">🇩🇪</span>
                          <span>Deutsch</span>
                        </div>
                        <div 
                          className={`language-item ${selectedLanguage === 'EN' ? 'language-active' : ''}`}
                          onClick={() => selectLanguage('EN')}
                        >
                          <span className="flag-icon">🇬🇧</span>
                          <span>English</span>
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

      {/* Scroll Progress Bar - Separates Element unter dem Header */}
      {isScrolled && (
        <div className="scroll-progress-container">
          <div 
            className="scroll-progress-bar" 
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Header; 