import React from "react";
import "../../styles/Hero.css";
import BackgroundVideo from "../BackgroundVideo";
import Video from "../Video";
import trustpilotExpert from "../../assets/trustpilot-expert.png";
import provenExpert from "../../assets/ProvenExpert.svg";
import googleLogo from "../../assets/google.png";
import { HoverButton } from "../ui/animated-hover-button";
import "../../styles/AnimatedButton.css";
import { useLanguage } from "../../contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="hero-section">
      <BackgroundVideo />
      
      <div className="hero-main-content">
        <div className="hero-left-column">
          <div className="hero-text-container">
            <h1 className="hero-title">
              <div className="title-container">
                {t('hero.title')} <span className="highlight-blue">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')} <span className="underlined-blue-special">{t('hero.titleUnderlined')}</span>
              </div>
            </h1>
            <div className="hero-subtitle">
              {t('hero.subtitle')}
            </div>
            <div className="hero-cta">
              <HoverButton
                startColor="#b87333"
                endColor="#e0ac69"
                animationIntensity="medium"
                className="hero-animated-button"
              >
                {t('hero.ctaButton')}
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
              <div className="stats-number">{t('hero.statsNumber')}</div>
              <div className="stats-label">{t('hero.statsLabel')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
