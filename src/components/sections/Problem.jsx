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
      subtitle: "Traditionelle Geldanlagen verlieren an Wert",
      highlight: "Negativzinsen",
      description: "Die meisten deutschen Sparer verlieren jährlich Geld durch Inflation, während Tages- und Festgelder kaum Rendite abwerfen. Eine erfolgreiche Vermögensplanung braucht renditestarke Alternativen.",
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
      subtitle: "Die Altersarmut droht für viele Deutsche",
      highlight: "Unterfinanzierung",
      description: "Das deutsche Rentensystem steht vor enormen Herausforderungen. Viele Arbeitnehmer werden im Alter nicht genug zum Leben haben. Private Vorsorge ist unerlässlich, um den Lebensstandard zu halten.",
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
      subtitle: "Kaufkraftverlust durch steigende Preise",
      highlight: "Wertverlust",
      description: "Die Inflation frisst die Ersparnisse auf. Traditionelle Anlagen wie Sparbücher können mit den Preissteigerungen nicht Schritt halten. Sachwerte wie Immobilien bieten hingegen einen natürlichen Inflationsschutz.",
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
      subtitle: "Finanzielle Absicherung bis zum Lebensende",
      highlight: "Versorgungslücke",
      description: "Rentenzahlungen und Ersparnisse reichen oft nicht bis zum Lebensende. Die höhere Lebenserwartung bedeutet eine längere Bezugsdauer bei gleichzeitig sinkenden Leistungen. Immobilieninvestitionen bieten einen beständigen Einkommensstrom im Alter.",
      // Pfad für einen zunehmenden Kostenanstieg (beibehaltene Graphik)
      graphPath: "M10,200 C90,180 150,160 250,120 C300,90 350,60 400,40",
      dataPoints: [
        { cx: 10, cy: 200 },
        { cx: 100, cy: 180 },
        { cx: 250, cy: 120 },
        { cx: 350, cy: 60 },
        { cx: 400, cy: 40 }
      ]
    }
  ];

  useEffect(() => {
    // Animation beim Scrollen mit IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animiere das entsprechende Element
          entry.target.classList.add('animate-in');
          // Element nicht mehr beobachten, nachdem es einmal animiert wurde
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Beobachte alle Graph-Container
    graphContainerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // Beobachte alle Beschreibungs-Container
    descriptionContainerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // Beobachte den CTA-Bereich
    if (ctaRef.current) observer.observe(ctaRef.current);

    // Cleanup beim Unmount
    return () => {
      observer.disconnect();
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
                        stroke="url(#copperGradient)"
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
                          style={{ animationDelay: `${1.5 + i * 0.1}s` }}
                        />
                      ))}

                      {/* Farbverlauf für die Kupfer-Linie */}
                      <defs>
                        <linearGradient id="copperGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#b87333" />
                          <stop offset="100%" stopColor="#e2ac6b" />
                        </linearGradient>
                      </defs>
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
