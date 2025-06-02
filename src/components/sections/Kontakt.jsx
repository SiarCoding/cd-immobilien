import React, { useEffect, useState } from "react";
import "../../styles/Kontakt.css";
import Header from "../Header";
import SEOHead from "../SEOHead";
import { useSEO } from "../../contexts/SEOContext";
import { useLanguage } from "../../contexts/LanguageContext";

const Kontakt = () => {
  const { seoData } = useSEO();
  const { t } = useLanguage();
  const kontaktPageSEO = seoData.kontakt;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefon: '',
    nachricht: '',
    datenschutz: false
  });

  const [errors, setErrors] = useState({});

  // Automatisches Scrollen zum Seitenanfang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Fehler löschen wenn Benutzer tippt
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('formular.step3.validation.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('formular.step3.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('formular.step3.validation.emailInvalid');
    }
    
    if (!formData.nachricht.trim()) {
      newErrors.nachricht = t('formular.step3.validation.messageRequired');
    }
    
    if (!formData.datenschutz) {
      newErrors.datenschutz = t('formular.step3.validation.privacyRequired');
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Formular senden
      console.log('Formular gesendet:', formData);
      alert('Vielen Dank! Ihre Nachricht wurde gesendet.');
      
      // Formular zurücksetzen
      setFormData({
        name: '',
        email: '',
        telefon: '',
        nachricht: '',
        datenschutz: false
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <SEOHead 
        title={kontaktPageSEO.title}
        description={kontaktPageSEO.description}
        keywords={kontaktPageSEO.keywords}
        canonical={kontaktPageSEO.canonical}
        ogImage={kontaktPageSEO.ogImage}
        ogType="website"
      />
      <Header />
      <main>
        <section className="kontakt-section">
          <div className="kontakt-container">
            <header>
              <h1 className="section-heading">
                <span className="highlight-blue highlight-text-white">{t('contact.title')}</span> {t('contact.titleSuffix')}
              </h1>
            </header>
            
            <div className="kontakt-content"
                 itemScope 
                 itemType="https://schema.org/LocalBusiness">
              
              <meta itemProp="name" content="CD Immobilien Portfolio GmbH" />
              <meta itemProp="description" content="Spezialist für Immobilieninvestitionen und Steueroptimierung in Nürnberg" />
              
              <div className="kontakt-info">
                <div className="kontakt-text">
                  <p className="section-text">
                    {t('contact.description')}
                  </p>
                  
                  <div className="kontakt-details">
                    <div className="kontakt-detail-item" itemScope itemType="https://schema.org/PostalAddress">
                      <div className="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div className="detail-text">
                        <h3>{t('contact.phone')}</h3>
                        <p itemProp="telephone">{t('footer.phone')}</p>
                      </div>
                    </div>
                    
                    <div className="kontakt-detail-item">
                      <div className="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div className="detail-text">
                        <h3>{t('contact.email')}</h3>
                        <p itemProp="email">{t('footer.email')}</p>
                      </div>
                    </div>
                    
                    <div className="kontakt-detail-item" itemScope itemType="https://schema.org/PostalAddress">
                      <div className="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div className="detail-text">
                        <h3>{t('contact.address')}</h3>
                        <address itemProp="address">
                          <span itemProp="streetAddress">Bauvereinstr. 47</span><br />
                          <span itemProp="postalCode">90489</span> <span itemProp="addressLocality">Nürnberg</span>
                        </address>
                      </div>
                    </div>
                    
                    <div className="kontakt-detail-item">
                      <div className="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div className="detail-text">
                        <h3>{t('contact.openingHours')}</h3>
                        <div itemProp="openingHours" content="Mo-Fr 09:00-18:00">
                          <p>{t('contact.openingHoursText')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="kontakt-form-container">
                  <form className="kontakt-form" onSubmit={handleSubmit}>
                    <h3>{t('contact.sendMessage')}</h3>
                    
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder={t('formular.step3.name')}
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? 'error' : ''}
                        required 
                      />
                      {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder={t('formular.step3.email')}
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                        required 
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    
                    <div className="form-group">
                      <input 
                        type="tel" 
                        id="telefon" 
                        name="telefon" 
                        placeholder={t('formular.step3.phone')}
                        value={formData.telefon}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <textarea 
                        id="nachricht" 
                        name="nachricht" 
                        placeholder={t('contact.messagePlaceholder')}
                        rows="5" 
                        value={formData.nachricht}
                        onChange={handleInputChange}
                        className={errors.nachricht ? 'error' : ''}
                        required
                      ></textarea>
                      {errors.nachricht && <span className="error-message">{errors.nachricht}</span>}
                    </div>
                    
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          name="datenschutz" 
                          checked={formData.datenschutz}
                          onChange={handleInputChange}
                          className={errors.datenschutz ? 'error' : ''}
                          required
                        />
                        <span className="checkmark"></span>
                        <span className="checkbox-text">
                          {t('formular.step3.privacy')} <a href="/datenschutz" target="_blank" rel="noopener noreferrer">{t('formular.step3.privacyLink')}</a>
                        </span>
                      </label>
                      {errors.datenschutz && <span className="error-message">{errors.datenschutz}</span>}
                    </div>
                    
                    <button type="submit" className="submit-button">
                      {t('contact.sendButton')}
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.3!2d11.07783!3d49.44471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479f57ad2bb2c35d%3A0x65b2b5be5b9a3a4e!2sBauvereinstra%C3%9Fe%2C%20N%C3%BCrnberg!5e0!3m2!1sde!2sde!4v1656413989425!5m2!1sde!2sde" 
                  width="100%" 
                  height="500" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - Bauvereinstr. 47, Nürnberg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Kontakt; 