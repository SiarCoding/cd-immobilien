import React from "react";
import "../../styles/Newsletter.css";
import { Check } from "lucide-react";
import iphoneMockup from "../../assets/iphone-mockup.png"; // Pfad anpassen, falls nötig

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <div className="iphone-mockup">
          <img src={iphoneMockup} alt="Immobilien Leitfaden auf iPhone" />
        </div>
        
        <div className="newsletter-text">
          <h2 className="newsletter-heading">
            Erhalte deinen <span className="highlight-gold">kostenlosen</span> Immobilien-Leitfaden
          </h2>
          <p className="newsletter-description">
            Trag dich ein und erhalte sofort unsere umfassende PDF-Anleitung für erfolgreiche Immobilieninvestitionen - für <span className="highlight-price">0€</span> statt regulär 29,90€.
          </p>
          
          <div className="newsletter-features">
            <div className="feature-item">
              <div className="feature-icon">
                <Check size={16} color="#fff" />
              </div>
              <p className="feature-text">Steuervorteile bei Immobilieninvestitionen</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Check size={16} color="#fff" />
              </div>
              <p className="feature-text">Finanzierungsstrategien für maximale Rendite</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Check size={16} color="#fff" />
              </div>
              <p className="feature-text">Standortanalyse und Markttrends 2024</p>
            </div>
          </div>
          
          <div className="newsletter-form">
            <input 
              type="email" 
              className="email-input" 
              placeholder="Deine E-Mail-Adresse" 
            />
            <button className="subscribe-btn">PDF-Leitfaden erhalten</button>
          </div>
          
          <p className="newsletter-disclaimer">
            Du kannst dich jederzeit abmelden. Wir respektieren deine Privatsphäre.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
