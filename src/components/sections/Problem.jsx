import React, { useEffect, useRef } from 'react';
import '../../styles/Problem.css';

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
  const sectionRef = useRef(null);
  const graphContainerRefs = useRef([]);
  const descriptionContainerRefs = useRef([]);
  const ctaRef = useRef(null);

  // Problem-Karten mit Daten für die Graphen
  const problemCards = [
    {
      id: 1,
      title: "Niedrige Renditen",
      subtitle: "Gefahr durch negative Realzinsen",
      highlight: "Verfehlte finanzielle Ziele",
      description: "Allein durch regelmäßiges Sparen in Versicherungs- und Bankprodukte läuft man Gefahr, seine finanziellen Ziele erheblich zu verfehlen. Egal ob mit Aktiensparen oder Versicherungssparen. Hohe Verwaltungskosten und falsche Risikoeinschätzung führen nach Berücksichtigung der drohenden Inflation zu negativen Realzinsen oder zu massiven Verlusten.",
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
      title: "Rentenlücke",
      subtitle: "Altersarmut als drohende Realität",
      highlight: "Damoklesschwert der Altersarmut",
      description: "Die Altersarmut als Konsequenz des Nichthandelns während unserer Erwerbsjahre schwebt wie ein Damoklesschwert über uns. Immer mehr Rentner belasten die Rentenkassen. Gleichzeitig zahlen immer weniger Menschen in die Kassen ein. Die Folge: Altersarmut und Entwertung durch Inflation.",
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
      title: "Inflationsdruck",
      subtitle: "Herausforderungen der Rentenversicherung",
      highlight: "Private Vorsorge als Schlüssel",
      description: "Die deutsche Rentenversicherung steht vor enormen Herausforderungen. Viele Arbeitnehmer werden im Alter nicht genug zum Leben haben. Private Vorsorge durch Investitionen in diverse Immobilien ist daher ein unerlässlicher Finanzbaustein, um seinen Lebensstil auch im Rentenalter zu bewahren und abzusichern.",
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
      title: "Langlebigkeitsrisiko",
      subtitle: "Unzureichende Rentenzahlungen",
      highlight: "Gefahr der Altersarmut",
      description: "Rentenzahlungen und Ersparnisse reichen oft nicht bis zum Lebensende aus, da Einkünfte, Leistungen und Bezüge im Rentenalter häufig nicht mit der Inflation Schritt halten. Im Gegenteil, die Folge ist Altersarmut und homöopathische Rentenzahlungen.",
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

  useEffect(() => {
    // Direkter Mobile-Fix ohne komplizierte Logik
    const isMobile = window.innerWidth <= 992;
    
    if (isMobile) {
      // Sofortiger Fix für mobile Geräte
      setTimeout(() => {
        graphContainerRefs.current.forEach((ref, index) => {
          if (ref) {
            // Container sichtbar machen
            ref.style.cssText = `
              opacity: 1 !important;
              visibility: visible !important;
              display: flex !important;
              transform: none !important;
              animation: none !important;
              transition: none !important;
            `;
            
            // Alle SVG-Elemente direkt adressieren
            const svgElement = ref.querySelector('.graph-svg');
            if (svgElement) {
              svgElement.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 100% !important;
                height: 100% !important;
              `;
            }
            
            // Alle Pfade direkt adressieren
            const pathElements = ref.querySelectorAll('.graph-path');
            pathElements.forEach(path => {
              path.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                stroke: #b87333 !important;
                stroke-width: 3px !important;
                fill: none !important;
              `;
            });
            
            // Alle Datenpunkte direkt adressieren
            const dataPoints = ref.querySelectorAll('.data-point');
            dataPoints.forEach(point => {
              point.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                fill: #e2ac6b !important;
              `;
            });
            
            // Graph-Visualization Container
            const graphViz = ref.querySelector('.graph-visualization');
            if (graphViz) {
              graphViz.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                height: 250px !important;
                min-height: 250px !important;
                position: relative !important;
              `;
            }
          }
        });
        
        // Description Container auch sichtbar machen
        descriptionContainerRefs.current.forEach(ref => {
          if (ref) {
            ref.style.cssText = `
              opacity: 1 !important;
              visibility: visible !important;
              display: flex !important;
              transform: none !important;
            `;
          }
        });
        
        if (ctaRef.current) {
          ctaRef.current.style.cssText = `
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
          `;
        }
      }, 100);
      
    } else {
      // Desktop: Normale Scroll-Animation
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };

      const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, observerOptions);

      graphContainerRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
      descriptionContainerRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
      if (ctaRef.current) observer.observe(ctaRef.current);

      return () => {
        observer.disconnect();
      };
    }
    
    // Resize Handler für dynamische Änderungen
    const handleResize = () => {
      const isMobileNow = window.innerWidth <= 992;
      if (isMobileNow) {
        // Mobile Fixes erneut anwenden
        setTimeout(() => {
          graphContainerRefs.current.forEach(ref => {
            if (ref) {
              const svgElement = ref.querySelector('.graph-svg');
              const pathElements = ref.querySelectorAll('.graph-path');
              const dataPoints = ref.querySelectorAll('.data-point');
              
              if (svgElement) {
                svgElement.style.display = 'block';
                svgElement.style.visibility = 'visible';
                svgElement.style.opacity = '1';
              }
              
              pathElements.forEach(path => {
                path.style.display = 'block';
                path.style.visibility = 'visible';
                path.style.opacity = '1';
                path.style.stroke = '#b87333';
              });
              
              dataPoints.forEach(point => {
                point.style.display = 'block';
                point.style.visibility = 'visible';
                point.style.opacity = '1';
                point.style.fill = '#e2ac6b';
              });
            }
          });
        }, 50);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="problem-section">
      {/* Kupfer-Blur-Effekt */}
      <CopperBlurEffect />
      
      <div className="problem-container">
        <h1 className="section-heading">
          <span className="problem-title-box">Die Probleme</span>
          <span className="problem-subtitle">der traditionellen Altersvorsorge</span>
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

                  {/* Graph Linien */}
                  <div className="graph-lines">
                    <svg className="graph-svg" viewBox="0 0 400 250" preserveAspectRatio="none">
                      {/* Kupferne Linie für den Trend */}
                      <path 
                        d={card.graphPath} 
                        fill="none"
                        stroke="#b87333"
                        strokeWidth="3"
                        className="graph-path copper-path"
                      />

                      {/* Datenpunkte für die Linie */}
                      {card.dataPoints.map((point, i) => (
                        <circle 
                          key={i}
                          cx={point.cx} 
                          cy={point.cy} 
                          r="5" 
                          fill="#e2ac6b" 
                          className="data-point"
                        />
                      ))}
                    </svg>
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
            Mehr über Immobilieninvestments erfahren
          </button>
        </div>
      </div>
    </section>
  );
};

export default Problem;
