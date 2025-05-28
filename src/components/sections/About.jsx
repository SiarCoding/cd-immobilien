import React from "react";
import "../../styles/About.css";
import planingImage from "../../assets/planing.jpg";
import planing2Image from "../../assets/planing2.jpg";
import { useLanguage } from "../../contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="section-heading">
          <span className="highlight-blue highlight-text-white">{t('about.title')}</span> {t('about.titleHighlight')}
        </div>
        
        <div className="about-content">
          <div className="about-text-container">
            <div className="about-text">
              <p className="section-text">
                {t('about.description')}
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">{t('about.personalConsulting')}</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">{t('about.tailoredStrategies')}</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">{t('about.experience')}</div>
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
                  {t('about.secondDescription')}
                </p>
                <div className="about-features copper-features">
                  <div className="feature-item">
                    <div className="feature-icon copper-icon">✓</div>
                    <div className="feature-text">{t('about.transparentCommunication')}</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon copper-icon">✓</div>
                    <div className="feature-text">{t('about.progressReports')}</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon copper-icon">✓</div>
                    <div className="feature-text">{t('about.satisfaction')}</div>
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
