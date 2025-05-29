import React from "react";
import "../../styles/Newsletter.css";
import { Check } from "lucide-react";
import iphoneMockup from '../../assets/leitfaden-banner.webp'; // Pfad anpassen, falls nötig
import { useLanguage } from "../../contexts/LanguageContext";

const Newsletter = () => {
  const { t } = useLanguage();
  
  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <div className="iphone-mockup">
          <img src={iphoneMockup} alt={t('newsletter.altText')} />
        </div>
        
        <div className="newsletter-text">
          <h2 className="newsletter-heading">
            {t('newsletter.title')} <span className="highlight-gold">{t('newsletter.titleHighlight')}</span> {t('newsletter.titleEnd')}
          </h2>
          <p className="newsletter-description">
            {t('newsletter.description')} <span className="highlight-price">{t('newsletter.priceHighlight')}</span> {t('newsletter.priceEnd')}
          </p>
          
          <div className="newsletter-features">
            <div className="feature-item">
              <div className="feature-icon">
                <Check size={16} color="#fff" />
              </div>
              <p className="feature-text">{t('newsletter.feature1')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Check size={16} color="#fff" />
              </div>
              <p className="feature-text">{t('newsletter.feature2')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Check size={16} color="#fff" />
              </div>
              <p className="feature-text">{t('newsletter.feature3')}</p>
            </div>
          </div>
          
          <div className="newsletter-form">
            <input 
              type="text"
              className="name-input"
              placeholder={t('newsletter.firstName')}
              autoComplete="given-name"
              required
            />
            <input 
              type="text"
              className="name-input"
              placeholder={t('newsletter.lastName')}
              autoComplete="family-name"
              required
            />
            <input 
              type="email" 
              className="email-input" 
              placeholder={t('newsletter.email')} 
              autoComplete="email"
              required
            />
            <input 
              type="tel"
              className="phone-input"
              placeholder={t('newsletter.phone')}
              autoComplete="tel"
              required
            />
            <button className="subscribe-btn">{t('newsletter.button')}</button>
          </div>
          
          <p className="newsletter-disclaimer">
            {t('newsletter.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
