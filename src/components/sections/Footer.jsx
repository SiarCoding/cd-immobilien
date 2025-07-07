import React from "react";
import "../../styles/Footer.css";
import logo from '../../assets/logo-csd.webp';
import { useLanguage } from "../../contexts/LanguageContext";
import { useConsent } from "../../contexts/ConsentContext";

const Footer = () => {
  const { t } = useLanguage();
  const { openConsentManager } = useConsent();
  
  return (
    <div className="footer-section">
      <div className="footer-content">
        <div className="footer-company-block">
          <div className="footer-logo">
            <img src={logo} className="logo-icon" alt={t('footer.logoAlt')} />
          </div>
          <div className="company-description">
            {t('footer.description')}
          </div>
          <div className="social-icons">
            <a href="https://www.instagram.com/cd.immo.gmbh?igsh=MTdhaWl0M3JkMzdobw==" target="_blank" rel="noopener noreferrer" aria-label={t('footer.socialInstagram')} className="social-icon-container">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/16jkVYsLdy/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label={t('footer.socialFacebook')} className="social-icon-container">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h2.5l.5-3H15V8.5a.5.5 0 0 1 .5-.5H18V5z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-link-block">
          <div className="footer-heading">{t('footer.services')}</div>
          <div className="footer-links">
            <a href="/formular" className="footer-link">{t('footer.wealthConsulting')}</a>
            <a href="/formular" className="footer-link">{t('footer.financialStrategy')}</a>
            <a href="/formular" className="footer-link">{t('footer.fullPackage')}</a>
          </div>
        </div>

        <div className="footer-link-block">
          <div className="footer-heading">{t('footer.quickAccess')}</div>
          <div className="footer-links">
            <a href="/" className="footer-link">{t('footer.home')}</a>
            <a href="#about" className="footer-link">{t('footer.about')}</a>
            <a href="#features" className="footer-link">{t('footer.calculator')}</a>
            <a href="#team" className="footer-link">{t('footer.team')}</a>
            <a href="#blog" className="footer-link">{t('footer.testimonials')}</a>
            <a href="/kontakt" className="footer-link">{t('footer.contact')}</a>
            <a href="/formular" className="footer-link">{t('footer.appointment')}</a>
            <a href="/impressum" className="footer-link">{t('footer.imprint')}</a>
            <a href="/datenschutz" className="footer-link">{t('footer.privacy')}</a>
            <button onClick={openConsentManager} className="footer-link cookie-settings-btn">
              Cookie-Einstellungen
            </button>
          </div>
        </div>

        <div className="footer-link-block">
          <div className="footer-heading">{t('footer.contactTitle')}</div>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                {t('footer.address').split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < t('footer.address').split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>{t('footer.phone')}</div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>{t('footer.email')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="copyright-text">
          {t('footer.copyright').replace('{year}', new Date().getFullYear())}
        </div>
      </div>
    </div>
  );
};

export default Footer;
