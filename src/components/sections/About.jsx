import React from "react";
import "../../styles/About.css";
import planingImage from "../../assets/planing.jpg";
import planing2Image from "../../assets/planing2.jpg";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="section-heading">
          <span className="highlight-blue highlight-text-white">Unsere Expertise</span> für Ihren Erfolg
        </div>
        
        <div className="about-content">
          <div className="about-text-container">
            <div className="about-text">
              <p className="section-text">
                Mit unserer umfassenden Expertise im Immobilienbereich unterstützen wir Sie dabei, fundierte Investitionsentscheidungen zu treffen. Wir bieten maßgeschneiderte Lösungen, die auf Ihre individuellen finanziellen Ziele und Bedürfnisse zugeschnitten sind.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Persönliche Beratung</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Maßgeschneiderte Strategien</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Langjährige Erfahrung</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-image-container">
            <img 
              src={planingImage} 
              className="about-image" 
              alt="Strategische Immobilienplanung" 
            />
            <div className="image-overlay"></div>
          </div>
        </div>

        {/* Zweiter Abschnitt */}
        <div className="about-second-section">
          <div className="about-content second-content">
            <div className="about-image-container large-image">
              <img 
                src={planing2Image} 
                className="about-image" 
                alt="Vertrauensvolle Zusammenarbeit" 
              />
              <div className="image-overlay"></div>
            </div>
            
            <div className="about-text-container">
              <div className="about-text">
                <p className="section-text larger-text">
                  Unser Erfolg basiert auf dem Vertrauen unserer Kunden. Wir arbeiten transparent, ehrlich und stets in Ihrem besten Interesse. Was uns von anderen unterscheidet, ist unsere Verpflichtung zu langfristigen Kundenbeziehungen statt kurzfristigen Gewinnen.
                </p>
                <div className="about-features copper-features">
                  <div className="feature-item">
                    <div className="feature-icon copper-icon">✓</div>
                    <div className="feature-text">Transparente Kommunikation</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon copper-icon">✓</div>
                    <div className="feature-text">Regelmäßige Fortschrittsberichte</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon copper-icon">✓</div>
                    <div className="feature-text">Garantierte Zufriedenheit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
