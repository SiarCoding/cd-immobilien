import React from "react";
import "../../styles/Footer.css";
import logo from '../../assets/logo-csd.webp';
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
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
            <div className="social-icon-container">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </div>
            <div className="social-icon-container">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </div>
            <div className="social-icon-container">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h2.5l.5-3H15V8.5a.5.5 0 0 1 .5-.5H18V5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="footer-link-block">
          <div className="footer-heading">{t('footer.services')}</div>
          <div className="footer-links">
            <div className="footer-link">{t('footer.wealthConsulting')}</div>
            <div className="footer-link">{t('footer.financialStrategy')}</div>
            <div className="footer-link">{t('footer.fullPackage')}</div>
          </div>
        </div>

        <div className="footer-link-block">
          <div className="footer-heading">{t('footer.quickAccess')}</div>
          <div className="footer-links">
            <div className="footer-link">{t('footer.home')}</div>
            <div className="footer-link">{t('footer.services2')}</div>
            <div className="footer-link">{t('footer.appointment')}</div>
            <div className="footer-link">{t('footer.contact')}</div>
            <div className="footer-link">{t('footer.imprint')}</div>
            <div className="footer-link">{t('footer.privacy')}</div>
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
