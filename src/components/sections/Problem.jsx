import React, { useEffect, useRef } from 'react';
import '../../styles/Problem.css';
import { useLanguage } from '../../contexts/LanguageContext';

// Kupfer-Effekt Komponente
const CopperBlurEffect = () => (
  <div className="problem-copper-effect">
    <svg className="copper-effect-svg" viewBox="0 0 444 536" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const Problem = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const graphContainerRefs = useRef([]);
  const descriptionContainerRefs = useRef([]);
  const ctaRef = useRef(null);
  const observerRef = useRef(null); // Ref to store the observer instance

  // Problem-Karten mit Daten für die Graphen
  const problemCards = [
    {
      id: 1,
      title: t('problem.lowReturns.title'),
      subtitle: t('problem.lowReturns.subtitle'),
      highlight: t('problem.lowReturns.highlight'),
      description: t('problem.lowReturns.description'),
      // Pfad für einen abfallenden Trend
      graphPath: "M10,50 C60,70 100,90 200,100 C300,110 350,150 400,180",
      dataPoints: [
        { cx: 10, cy: 50 },
        { cx: 110, cy: 90 },
        { cx: 200, cy: 100 },
        { cx: 300, cy: 110 },
        { cx: 400, cy: 180 }
      ]
    },
    {
      id: 2,
      title: t('problem.pensionGap.title'),
      subtitle: t('problem.pensionGap.subtitle'),
      highlight: t('problem.pensionGap.highlight'),
      description: t('problem.pensionGap.description'),
      // Pfad für einen anderen abfallenden Trend
      graphPath: "M10,60 C90,100 150,110 250,150 C300,180 350,190 400,220",
      dataPoints: [
        { cx: 10, cy: 60 },
        { cx: 100, cy: 100 },
        { cx: 250, cy: 150 },
        { cx: 350, cy: 190 },
        { cx: 400, cy: 220 }
      ]
    },
    {
      id: 3,
      title: t('problem.inflation.title'),
      subtitle: t('problem.inflation.subtitle'),
      highlight: t('problem.inflation.highlight'),
      description: t('problem.inflation.description'),
      // Pfad für einen steil abfallenden Trend
      graphPath: "M10,40 C60,90 120,130 200,160 C280,180 350,210 400,240",
      dataPoints: [
        { cx: 10, cy: 40 },
        { cx: 120, cy: 130 },
        { cx: 200, cy: 160 },
        { cx: 300, cy: 200 },
        { cx: 400, cy: 240 }
      ]
    },
    {
      id: 4,
      title: t('problem.longevity.title'),
      subtitle: t('problem.longevity.subtitle'),
      highlight: t('problem.longevity.highlight'),
      description: t('problem.longevity.description'),
      // Pfad für einen abfallenden Trend (umgekehrt)
      graphPath: "M10,40 C90,60 150,90 250,120 C300,150 350,180 400,200",
      dataPoints: [
        { cx: 10, cy: 40 },
        { cx: 100, cy: 60 },
        { cx: 250, cy: 120 },
        { cx: 350, cy: 180 },
        { cx: 400, cy: 200 }
      ]
    }
  ];

  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth <= 992);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 992);
    };

    window.addEventListener('resize', checkMobileView);
    // Initial check
    checkMobileView();

    // KRITISCHE MOBILE GRAPH-FIXES
    const forceMobileGraphDisplay = () => {
      const isMobile = window.innerWidth <= 992;
      
      if (isMobile) {
        // Alle mobilen Graphen finden und forcieren
        const mobileGraphs = document.querySelectorAll('.mobile-graph-simple');
        
        mobileGraphs.forEach((graph, index) => {
          if (graph) {
            // Alle möglichen versteckenden Eigenschaften überschreiben
            const forceStyles = {
              display: 'block',
              visibility: 'visible',
              opacity: '1',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: '200',
              overflow: 'visible',
              clip: 'none',
              clipPath: 'none',
              mask: 'none',
              transform: 'none',
              filter: 'none',
              pointerEvents: 'auto',
              // Elegante transparente Hintergründe
              background: 'transparent',
              border: 'none'
            };
            
            Object.assign(graph.style, forceStyles);
            
            // SVG-Element forcieren
            const svg = graph.querySelector('svg');
            if (svg) {
              Object.assign(svg.style, {
                display: 'block',
                visibility: 'visible',
                opacity: '1',
                width: '100%',
                height: '100%',
                overflow: 'visible',
                background: 'transparent',
                border: 'none'
              });
              
              // SVG-Pfad forcieren
              const path = svg.querySelector('path');
              if (path) {
                Object.assign(path.style, {
                  display: 'block',
                  visibility: 'visible',
                  opacity: '1',
                  stroke: '#b87333', // Elegante Kupferfarbe
                  strokeWidth: '2.5px', // Dünne elegante Linie
                  strokeOpacity: '1',
                  fill: 'none',
                  strokeLinecap: 'round', // Runde Linienenden
                  strokeLinejoin: 'round' // Runde Verbindungen
                });
              }
            }
          }
        });

        // Auch alle Graph-Visualisierung-Container überprüfen
        const graphVisualizations = document.querySelectorAll('.graph-visualization');
        graphVisualizations.forEach((viz, index) => {
          Object.assign(viz.style, {
            overflow: 'visible',
            position: 'relative',
            minHeight: '250px',
            display: 'block',
            visibility: 'visible',
            opacity: '1'
          });
        });
      }
    };

    // Sofort ausführen
    forceMobileGraphDisplay();
    
    // Nach kurzer Verzögerung nochmals ausführen
    setTimeout(forceMobileGraphDisplay, 100);
    setTimeout(forceMobileGraphDisplay, 500);
    setTimeout(forceMobileGraphDisplay, 1000);

    if (!isMobileView) {
      // Desktop: Normale Scroll-Animation
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };

      const handleIntersection = (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            obs.unobserve(entry.target);
          }
        });
      };

      observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);
      const currentObserver = observerRef.current;

      // Collect all elements to observe
      const elementsToObserve = [
        ...graphContainerRefs.current.filter(el => el),
        ...descriptionContainerRefs.current.filter(el => el)
      ];
      if (ctaRef.current) {
        elementsToObserve.push(ctaRef.current);
      }
      
      elementsToObserve.forEach(ref => {
        currentObserver.observe(ref);
      });

      return () => {
        if (currentObserver) {
          currentObserver.disconnect();
        }
      };
    } else {
      // Mobile view: Ensure any existing observer is disconnected
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      // Remove 'animate-in' class from elements if they were previously observed
      const elementsToReset = [
        ...graphContainerRefs.current.filter(el => el),
        ...descriptionContainerRefs.current.filter(el => el)
      ];
      if (ctaRef.current) {
        elementsToReset.push(ctaRef.current);
      }
      elementsToReset.forEach(el => {
        if (el) el.classList.remove('animate-in');
      });
    }
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobileView]); // Re-run effect when isMobileView changes

  return (
    <section ref={sectionRef} className="problem-section">
      {/* Kupfer-Blur-Effekt */}
      <CopperBlurEffect />
      
      <div className="problem-container">
        <h1 className="section-heading">
          <span className="problem-title-box">{t('problem.title')}</span>
          {t('problem.subtitle')}
        </h1>

        <div className="problem-cards-container">
          {problemCards.map((card, index) => (
            <div 
              key={card.id} 
              className={`problem-card ${index % 2 !== 0 ? 'reverse-layout' : ''}`}
            >
              {/* Graph Container */}
              <div 
                ref={el => graphContainerRefs.current[index] = el}
                className={`problem-graph-container ${index % 2 !== 0 ? 'slide-left' : 'slide-right'}`}
              >
                <div className="problem-graph-content">
                  <h3 className="graph-subtitle">{card.subtitle}</h3>
                  <h4 className="graph-highlight">{card.highlight}</h4>
                </div>

                <div className="graph-visualization">
                  {/* Graph Grid */}
                  <div className="graph-grid">
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                  </div>

                  {/* Desktop Graph Linien */}
                  <div className="graph-lines desktop-graph">
                    <svg className="graph-svg" viewBox="0 0 400 250" preserveAspectRatio="none">
                      {/* Kupferne Linie für den Trend */}
                      <path 
                        d={card.graphPath} 
                        fill="none"
                        stroke="#b87333"
                        strokeWidth="3"
                        className="graph-path copper-path"
                      />
                    </svg>
                  </div>

                  {/* Mobile Graph Linien - Vereinfachte Version */}
                  <div className="graph-lines mobile-graph">
                    <div className="mobile-graph-simple">
                      <svg width="100%" height="100%" viewBox="0 0 400 250" style={{display: 'block', visibility: 'visible', opacity: 1}}>
                        <path 
                          d={card.graphPath} 
                          fill="none"
                          stroke="#b87333"
                          strokeWidth="4"
                          style={{display: 'block', visibility: 'visible', opacity: 1}}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beschreibungs-Container */}
              <div 
                ref={el => descriptionContainerRefs.current[index] = el}
                className={`problem-description-container ${index % 2 !== 0 ? 'slide-right' : 'slide-left'}`}
              >
                <h3 className="problem-card-title">{card.title}</h3>
                <p className="problem-card-text">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA-Bereich */}
        <div ref={ctaRef} className="problem-cta">
          <button className="problem-button">
            {t('problem.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Problem;
