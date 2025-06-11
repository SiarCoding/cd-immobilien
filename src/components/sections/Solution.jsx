import React, { useEffect, useRef } from 'react';
import '../../styles/Solution.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Solution = () => {
  const { t } = useLanguage();
  const solutionCardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Speichere aktuelle Referenzen in lokalen Variablen für die Cleanup-Funktion
    const currentCards = solutionCardsRef.current;
    const currentCta = ctaRef.current;

    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    if (currentCta) {
      observer.observe(currentCta);
    }

    return () => {
      // Verwende die gespeicherten Referenzen für die Cleanup
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
      if (currentCta) {
        observer.unobserve(currentCta);
      }
    };
  }, []);

  // Die Solution-Cards mit reduzierten und verbesserten Texten
  const solutionCards = [
    {
      id: 1,
      title: t('solution.realAssets.title'),
      description: t('solution.realAssets.description'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 6H3V18H21V6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 14H7.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 14H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 2,
      title: t('solution.taxBenefits.title'),
      description: t('solution.taxBenefits.description'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 3,
      title: t('solution.stableReturns.title'),
      description: t('solution.stableReturns.description'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 4,
      title: t('solution.inflationProtection.title'),
      description: t('solution.inflationProtection.description'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1V23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 5,
      title: t('solution.wealthTransfer.title'),
      description: t('solution.wealthTransfer.description'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8H17C16.4696 8 15.9609 8.21071 15.5858 8.58579C15.2107 8.96086 15 9.46957 15 10V21H3V10C3 9.46957 3.21071 8.96086 3.58579 8.58579C3.96086 8.21071 4.46957 8 5 8H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 15L21 12L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 6L12 3L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 6,
      title: t('solution.longTermWealth.title'),
      description: t('solution.longTermWealth.description'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 16H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="solution-section">
      <div className="solution-copper-effect">
        <svg className="copper-effect-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_12_56)">
            <circle cx="400" cy="400" r="200" fill="url(#paint0_linear_12_56)" fillOpacity="0.7" />
          </g>
          <defs>
            <filter id="filter0_f_12_56" x="0" y="0" width="800" height="800" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_12_56" />
            </filter>
            <linearGradient id="paint0_linear_12_56" x1="250" y1="300" x2="550" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B87333" />
              <stop offset="0.5" stopColor="#E2AC6B" />
              <stop offset="1" stopColor="#B87333" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="solution-container">
        {/* Überschrift im gleichen Stil wie Problem.jsx */}
        <h2 className="section-heading" id="solution-heading">
          <span className="solution-title-box">{t('solution.title')}</span>
          <span className="solution-subtitle">{t('solution.subtitle')}</span>
        </h2>

        <div className="solutions-grid">
          {solutionCards.map((card, index) => (
            <div
              key={card.id}
              className="solution-card"
              ref={el => (solutionCardsRef.current[index] = el)}
            >
              <div className="solution-card-header">
                <div className="solution-icon-container">
                  {card.icon}
                </div>
                <h3 className="solution-card-title">{card.title}</h3>
              </div>
              <div className="solution-card-body">
                <p className="solution-card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-container fade-in" ref={ctaRef}>
          <h2 className="cta-title">{t('solution.ctaTitle')}</h2>
          <p className="cta-text">
            {t('solution.ctaText')}
          </p>
          <Link to="/formular">
            <button className="cta-button">{t('solution.ctaButton')}</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Solution; 