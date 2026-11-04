import React from "react";
import "../../styles/Hero.css";
import { HoverButton } from "../ui/animated-hover-button";
import "../../styles/AnimatedButton.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { Link } from 'react-router-dom';
import BackgroundVideo from "../BackgroundVideo";
import Video from "../Video";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section" aria-label="Hero">
      <BackgroundVideo />
      
      <div className="hero-main-content">
        <div className="hero-content-wrapper">
          <div className="hero-left-side">
            <div className="hero-text-title">
              <h1 className="hero-title">
                <span className="title-container">
                  {t('hero.title')} <span className="highlight-blue">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')} <span className="underlined-blue-special">{t('hero.titleUnderlined')}</span>
                </span>
              </h1>
              <div className="hero-subtitle">
                {t('hero.subtitle')}
              </div>
            </div>
            
            <div className="hero-video-mobile">
              <Video />
            </div>
            
            <div className="hero-cta">
              <Link to="/formular">
                <HoverButton
                  startColor="#b87333"
                  endColor="#e0ac69"
                  animationIntensity="medium"
                  className="hero-animated-button"
                >
                  {t('hero.ctaButton')}
                </HoverButton>
              </Link>
            </div>
            
            <div className="avatar-stats-container">
              <div className="stats-text">
                <div className="stats-number">{t('hero.statsNumber')}</div>
                <div className="stats-label">{t('hero.statsLabel')}</div>
              </div>
            </div>
          </div>
          
          <div className="hero-video-desktop">
            <div className="video-container">
              <Video />
            </div>
            <div className="avatar-stats-container">
              <div className="stats-text">
                <div className="stats-number">{t('hero.statsNumber')}</div>
                <div className="stats-label">{t('hero.statsLabel')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
