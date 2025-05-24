import React from "react";
import "../../styles/FeaturedEpisodes.css";

const FeaturedEpisodes = () => {
  return (
    <div className="featured-episodes-section">
      <div className="centered-content">
        <div className="section-heading">
          <span className="highlight-blue highlight-text-white">Erfolgsstrategien</span> für Immobilieninvestitionen
        </div>
        <div className="section-text">
          Der deutsche Immobilienmarkt bietet auch in herausfordernden Zeiten attraktive Investitionsmöglichkeiten. 
          Entdecken Sie wichtige Faktoren für erfolgreiche Immobilieninvestitionen.
        </div>
      </div>
      <div className="episodes-container">
        <div className="episodes-grid">
          <div className="episode-card">
            <img src="" />
            <div className="episode-content">
              <div className="episode-text">
                <div className="episode-title">
                  Lage und Infrastruktur<br />
                  als Schlüsselfaktoren
                </div>
                <div className="episode-description">
                  Die Lage bleibt der wichtigste Faktor bei Immobilieninvestitionen. Achten Sie auf Verkehrsanbindung, Nahversorgung und wirtschaftliche Entwicklung der Region.
                </div>
              </div>
              <div className="read-more-link">
                <div className="read-more-text">Mehr erfahren</div>
                <div className="arrow-icon">→</div>
              </div>
            </div>
          </div>
          <div className="episode-card">
            <img src="https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" className="episode-image" alt="Arbeitskräfte" />
            <div className="episode-content">
              <div className="episode-text">
                <div className="episode-title">
                  Demografische Entwicklung und Arbeitskräftepotenzial
                </div>
                <div className="episode-description">
                  Regionen mit starkem Arbeitsmarkt und positiver demografischer Entwicklung bieten langfristig stabile Renditen und niedrigen Leerstand.
                </div>
              </div>
              <div className="read-more-link">
                <div className="read-more-text">Mehr erfahren</div>
                <div className="arrow-icon">→</div>
              </div>
            </div>
          </div>
          <div className="episode-card">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" className="episode-image" alt="Finanzierung" />
            <div className="episode-content">
              <div className="episode-text">
                <div className="episode-title">
                  Finanzierungsstruktur und Zinsentwicklung beachten
                </div>
                <div className="episode-description">
                  Die aktuelle Zinsentwicklung erfordert eine sorgfältige Finanzplanung. Optimieren Sie Ihre Finanzierungsstruktur mit langfristiger Perspektive.
                </div>
              </div>
              <div className="read-more-link">
                <div className="read-more-text">Mehr erfahren</div>
                <div className="arrow-icon">→</div>
              </div>
            </div>
          </div>
        </div>
        <div className="view-more-btn btn btn-secondary">Weitere Informationen</div>
      </div>
    </div>
  );
};

export default FeaturedEpisodes;
