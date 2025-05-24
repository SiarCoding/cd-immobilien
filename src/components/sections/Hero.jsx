import React from "react";
import "../../styles/Hero.css";
import BackgroundVideo from "../BackgroundVideo";
import Header from "../Header";
import Video from "../Video";
import trustpilotExpert from "../../assets/trustpilot-expert.png";
import provenExpert from "../../assets/ProvenExpert.svg";
import googleLogo from "../../assets/google.png";
import { HoverButton } from "../ui/animated-hover-button";
import "../../styles/AnimatedButton.css";



const Hero = () => {
  return (
    <div className="hero-section">
      <BackgroundVideo />
      <Header />
      
      <div className="hero-main-content">
        <div className="hero-left-column">
          <div className="hero-text-container">
            <h1 className="hero-title">
              <div className="title-container">Bauen Sie mit Immobilien nachhaltig <span className="highlight-blue">Vermögen</span> auf und senken Sie Ihre <span className="underlined-blue-special">Steuerlast</span></div>
            </h1>
            <div className="hero-subtitle">
              Mit unserer Expertise helfen wir Ihnen, durch strategische Immobilieninvestitionen ein nachhaltiges Vermögen aufzubauen und Ihre finanzielle Zukunft zu sichern.
            </div>
            <div className="hero-cta">
              <HoverButton
                startColor="#b87333"
                endColor="#e0ac69"
                animationIntensity="medium"
                className="hero-animated-button"
              >
                Kostenlose Beratung
              </HoverButton>
            </div>
            <div className="partner-logos">
              <img src={trustpilotExpert} className="partner-logo" alt="Trustpilot Expert" />
              <img src={provenExpert} className="partner-logo" alt="Proven Expert" />
              <img src={googleLogo} className="partner-logo" alt="Google" />
            </div>
          </div>
        </div>
        
        <div className="hero-right-column">
          <div className="hero-image-container">
            <Video />
          </div>
          <div className="avatar-stats-container">
            <div className="avatar-row">
              <img src="https://cdn.builder.io/api/v1/image/assets/01010c1908714387a93ae9c751f363fe/df1918dfac1ace0b9b963e11e494eaa6c57cff82?placeholderIfAbsent=true" className="stats-image" alt="Rating stars" />
            </div>
            <div className="stats-text">
              <div className="stats-number">200+</div>
              <div className="stats-label">Zufriedene Kunden</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
