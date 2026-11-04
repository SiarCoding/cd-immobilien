import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import logo from '../assets/logo-csd.webp';
import { HoverButton } from "./ui/animated-hover-button";
import "../styles/AnimatedButton.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const FlagDE = () => (
  <svg className="lang-flag" viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <rect width="5" height="1" y="0" fill="#000" />
    <rect width="5" height="1" y="1" fill="#D00" />
    <rect width="5" height="1" y="2" fill="#FFCE00" />
  </svg>
);

const FlagGB = () => (
  <svg className="lang-flag" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
    <path d="M0 0L30 15H25.53L0 2.24ZM60 30L30 15H34.47L60 27.76ZM60 0L30 15V12.76L55.53 0ZM0 30L30 15V17.24L4.47 30Z" fill="#C8102E" />
    <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" />
    <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const LANGUAGES = [
  { code: 'DE', name: 'Deutsch', Flag: FlagDE },
  { code: 'EN', name: 'English', Flag: FlagGB },
];

const LanguageToggle = ({ language, onChange }) => (
  <div className="lang-toggle" role="group" aria-label="Sprache / Language" data-active={language}>
    <span className="lang-toggle-thumb" aria-hidden="true" />
    {LANGUAGES.map(({ code, name, Flag }) => (
      <button
        key={code}
        type="button"
        className="lang-toggle-option"
        aria-pressed={language === code}
        aria-label={name}
        title={name}
        onClick={() => onChange(code)}
      >
        <Flag />
        <span className="lang-toggle-code">{code}</span>
      </button>
    ))}
  </div>
);

const Header = () => {
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleNavigation = (sectionId) => {
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
    closeMobileMenu();
  };

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
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
  
  // Mobile Menu bei Klick außerhalb schließen (der Sprach-Toggle lässt es offen)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        !e.target.closest('.lang-toggle')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

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
                    <Link to="/" className="nav-item" onClick={handleHomeClick}>{t('header.home')}</Link>
                    <button 
                      className="nav-item nav-button" 
                      onClick={() => handleNavigation('about')}
                    >
                      {t('header.about')}
                    </button>
                    <button 
                      className="nav-item nav-button" 
                      onClick={() => handleNavigation('team')}
                    >
                      {t('header.team')}
                    </button>
                    <button 
                      className="nav-item nav-button" 
                      onClick={() => handleNavigation('features')}
                    >
                      {t('header.calculator')}
                    </button>
                    <button 
                      className="nav-item nav-button" 
                      onClick={() => handleNavigation('blog')}
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
                  
                  <LanguageToggle language={language} onChange={changeLanguage} />
                </div>
              </div>
            </div>

            {/* Mobile Actions - Language Selector und Menu Button */}
            <div className="mobile-actions">
              {/* Mobile Language Selector */}
              <LanguageToggle language={language} onChange={changeLanguage} />
              
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
          </div>

          {/* Mobile Menu Overlay */}
          <div 
            className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-overlay-open' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <nav className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} ref={menuRef}>
              <div className="mobile-menu-content">
                <Link to="/" className="mobile-nav-item" onClick={handleHomeClick}>{t('header.home')}</Link>
                <button 
                  className="mobile-nav-item nav-button" 
                  onClick={() => handleNavigation('about')}
                >
                  {t('header.about')}
                </button>
                <button 
                  className="mobile-nav-item nav-button" 
                  onClick={() => handleNavigation('team')}
                >
                  {t('header.team')}
                </button>
                <button 
                  className="mobile-nav-item nav-button" 
                  onClick={() => handleNavigation('features')}
                >
                  {t('header.calculator')}
                </button>
                <button 
                  className="mobile-nav-item nav-button" 
                  onClick={() => handleNavigation('blog')}
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
