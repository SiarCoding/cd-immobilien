import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Process.css';
import { 
  PhoneCall, 
  FileSearch, 
  PiggyBank, 
  Key, 
  Users 
} from 'lucide-react';

// Kupfer-Effekt Komponente
const CopperBlurEffect = () => (
  <div className="copper-blur-effect">
    <svg className="copper-blur-svg" viewBox="0 0 444 536" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z" fill="url(#copper-gradient)" />
      <defs>
        <linearGradient id="copper-gradient" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B87333" />
          <stop offset="50%" stopColor="#E2AC6B" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Process = () => {
  const [activeStep, setActiveStep] = useState(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  // Prozessschritte der Immobilieninvestition
  const processSteps = [
    {
      id: 1,
      title: "Beratungsgespräch",
      date: "Phase 1",
      content: "In einem persönlichen Gespräch analysieren wir Ihre finanzielle Situation und Ihre Ziele für die Immobilieninvestition.",
      icon: PhoneCall,
      relatedIds: [2],
      status: "completed",
      energy: 100
    },
    {
      id: 2,
      title: "Objektsuche",
      date: "Phase 2",
      content: "Wir suchen gemeinsam nach passenden Immobilien und analysieren deren Rentabilität und Steuervorteile.",
      icon: FileSearch,
      relatedIds: [1, 3],
      status: "in-progress",
      energy: 80
    },
    {
      id: 3,
      title: "Finanzierung",
      date: "Phase 3",
      content: "Wir optimieren Ihre Finanzierungsstruktur und nutzen alle verfügbaren Fördermittel für maximale Rendite.",
      icon: PiggyBank,
      relatedIds: [2, 4],
      status: "pending",
      energy: 60
    },
    {
      id: 4,
      title: "Kaufabwicklung",
      date: "Phase 4",
      content: "Wir begleiten Sie durch den gesamten Kaufprozess - vom Notartermin bis zur Schlüsselübergabe.",
      icon: Key,
      relatedIds: [3, 5],
      status: "pending",
      energy: 40
    },
    {
      id: 5,
      title: "Vermietungsbetreuung",
      date: "Phase 5",
      content: "Nach dem Kauf unterstützen wir Sie bei der Vermietung und der laufenden Verwaltung Ihrer Immobilie.",
      icon: Users,
      relatedIds: [4],
      status: "pending",
      energy: 20
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4, // Niedrigerer Threshold für frühere Animation
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.getAttribute('data-id'));
          setActiveStep(id);
          
          // Verzögerte Animation hinzufügen
          setTimeout(() => {
            entry.target.classList.add('card-visible');
          }, 100 * (id - 1)); // Gestaffelte Animation nach ID
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
      {/* Kupfer-Blur-Effekt */}
      <CopperBlurEffect />
      
      <div className="process-container">
        <h2 className="section-title">
          Unser <span className="highlight-blue">Prozess</span>
        </h2>
        <p className="section-subtitle">
          Wir begleiten Sie durch jeden Schritt Ihrer Immobilieninvestition
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
                      <h4 className="related-title">Verbundene Phasen</h4>
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