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
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" className="social-icon" alt={t('footer.socialInstagram')} />
            </div>
            <div className="social-icon-container">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" className="social-icon" alt={t('footer.socialLinkedIn')} />
            </div>
            <div className="social-icon-container">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" className="social-icon" alt={t('footer.socialFacebook')} />
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
