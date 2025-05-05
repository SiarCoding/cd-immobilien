import React from "react";
import "../../styles/Footer.css";
import logo from "../../assets/logo-csd.png";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-content">
        <div className="footer-company-block">
          <div className="footer-logo">
            <img src={logo} className="logo-icon" alt="CD Immobilien Portfolio GmbH" />
          </div>
          <div className="company-description">
            Wir helfen Ihnen dabei, Ihre finanziellen Ziele zu erreichen und Ihr Vermögen langfristig aufzubauen.
          </div>
          <div className="social-icons">
            <div className="social-icon-container">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" className="social-icon" alt="Instagram" />
            </div>
            <div className="social-icon-container">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" className="social-icon" alt="LinkedIn" />
            </div>
            <div className="social-icon-container">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" className="social-icon" alt="Facebook" />
            </div>
          </div>
        </div>

        <div className="footer-link-block">
          <div className="footer-heading">Leistungen</div>
          <div className="footer-links">
            <div className="footer-link">Vermögensberatung</div>
            <div className="footer-link">Finanzstrategie</div>
            <div className="footer-link">Rund-um-Paket</div>
          </div>
        </div>

        <div className="footer-link-block">
          <div className="footer-heading">Schnellzugriff</div>
          <div className="footer-links">
            <div className="footer-link">Startseite</div>
            <div className="footer-link">Leistungen</div>
            <div className="footer-link">Termin vereinbaren</div>
            <div className="footer-link">Kontakt</div>
            <div className="footer-link">Impressum</div>
            <div className="footer-link">Datenschutz</div>
          </div>
        </div>

        <div className="footer-link-block">
          <div className="footer-heading">Kontakt</div>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                CD Immobilien Portfolio GmbH<br />
                Musterstraße 123<br />
                12345 Musterstadt<br />
                Deutschland
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>+49 (0) 123 456789</div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>info@cd-immobilien.de</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="copyright-text">
          © {new Date().getFullYear()} CD Immobilien Portfolio GmbH. Alle Rechte vorbehalten.
        </div>
      </div>
    </div>
  );
};

export default Footer;
