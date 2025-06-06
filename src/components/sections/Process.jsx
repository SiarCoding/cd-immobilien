import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Process.css';
import { 
  PhoneCall, 
  FileSearch, 
  PiggyBank, 
  Key, 
  Users 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Process = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  // Prozessschritte der Immobilieninvestition mit Übersetzungen
  const processSteps = [
    {
      id: 1,
      title: t('process.consultation.title'),
      date: t('process.consultation.phase'),
      content: t('process.consultation.content'),
      icon: PhoneCall,
      relatedIds: [2],
      status: "completed",
      energy: 100
    },
    {
      id: 2,
      title: t('process.search.title'),
      date: t('process.search.phase'),
      content: t('process.search.content'),
      icon: FileSearch,
      relatedIds: [1, 3],
      status: "in-progress",
      energy: 80
    },
    {
      id: 3,
      title: t('process.financing.title'),
      date: t('process.financing.phase'),
      content: t('process.financing.content'),
      icon: PiggyBank,
      relatedIds: [2, 4],
      status: "pending",
      energy: 60
    },
    {
      id: 4,
      title: t('process.purchase.title'),
      date: t('process.purchase.phase'),
      content: t('process.purchase.content'),
      icon: Key,
      relatedIds: [3, 5],
      status: "pending",
      energy: 40
    },
    {
      id: 5,
      title: t('process.rental.title'),
      date: t('process.rental.phase'),
      content: t('process.rental.content'),
      icon: Users,
      relatedIds: [4],
      status: "pending",
      energy: 20
    }
  ];

  useEffect(() => {
    // Mobile Geräte erkennen
    const isMobile = window.innerWidth <= 767;
    
    const observerOptions = {
      root: null,
      rootMargin: isMobile ? '-10% 0px -10% 0px' : '0px',
      threshold: isMobile ? 0.3 : 0.4, // Niedrigerer Threshold für Mobile
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.getAttribute('data-id'));
          setActiveStep(id);
          
          // Für Mobile: sofortige Animation ohne Verzögerung
          if (isMobile) {
            entry.target.classList.add('card-visible');
          } else {
            // Desktop: verzögerte Animation
            setTimeout(() => {
              entry.target.classList.add('card-visible');
            }, 100 * (id - 1));
          }
        } else {
          // Wichtig: Animation zurücksetzen wenn Element nicht mehr sichtbar (nur für Mobile)
          if (isMobile) {
            entry.target.classList.remove('card-visible');
          }
        }
      });
    }, observerOptions);

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status) => {
    // Alle Icons weiß darstellen, unabhängig vom Status
    return "white";
  };

  return (
    <section className="process-section">
      {/* Kupfer-Blur-Effekt entfernt */}
      
      <div className="process-container">
        <h2 className="section-title">
          {t('process.title')} <span className="highlight-blue">{t('process.titleHighlight')}</span>
        </h2>
        <p className="section-subtitle">
          {t('process.subtitle')}
        </p>

        <div className="timeline-container" ref={timelineRef}>
          {/* Zentrale Linie */}
          <div className="timeline-progress-track"></div>

          {/* Zeitleisten-Punkte */}
          {processSteps.map((step, index) => (
            <div 
              key={step.id}
              className="timeline-point"
              style={{ top: `${(index / (processSteps.length - 1)) * 100}%` }}
            >
              <div 
                className={`point-marker ${step.status} ${activeStep === step.id ? 'active' : ''}`}
              ></div>
            </div>
          ))}

          {/* Prozess-Karten */}
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isRight = index % 2 !== 0;

            return (
              <div
                key={step.id}
                className={`timeline-card-container ${isRight ? 'right' : 'left'}`}
                style={{ top: `${(index / (processSteps.length - 1)) * 100}%` }}
                data-id={step.id}
                ref={el => cardRefs.current[index] = el}
              >
                <div className="timeline-connector"></div>
                <div className={`timeline-card ${step.status}`}>
                  <div className="card-icon">
                    <Icon size={24} color={getStatusColor(step.status)} />
                  </div>

                  <div className="card-header">
                    <div className={`card-badge ${step.status}`}>
                      {step.date}
                    </div>
                    <h3 className="card-title">{step.title}</h3>
                  </div>

                  <div className="card-content">
                    <p>{step.content}</p>
                  </div>

                  {step.relatedIds.length > 0 && (
                    <div className="related-steps">
                      <h4 className="related-title">{t('process.relatedPhases')}</h4>
                      <div className="related-buttons">
                        {step.relatedIds.map(relatedId => {
                          const relatedStep = processSteps.find(s => s.id === relatedId);
                          return (
                            <button
                              key={relatedId}
                              className="related-button"
                              onClick={() => {
                                const element = cardRefs.current[relatedId - 1];
                                if (element) {
                                  element.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'center'
                                  });
                                }
                              }}
                            >
                              {relatedStep?.title}
                              <span className="arrow-icon">→</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process; 