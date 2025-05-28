import React from "react";
import "../../styles/Kontakt.css";
import Header from "../Header";

const Kontakt = () => {
  return (
    <>
      <Header />
      <section className="kontakt-section">
        <div className="kontakt-container">
          <div className="section-heading">
            <span className="highlight-blue highlight-text-white">Kontakt</span> aufnehmen
          </div>
          
          <div className="kontakt-content">
            <div className="kontakt-info">
              <div className="kontakt-text">
                <p className="section-text">
                  Haben Sie Fragen oder möchten Sie einen Beratungstermin vereinbaren? 
                  Kontaktieren Sie uns - unser Expertenteam steht Ihnen gerne zur Verfügung.
                </p>
                
                <div className="kontakt-details">
                  <div className="kontakt-detail-item">
                    <div className="detail-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="detail-text">
                      <h3>Telefon</h3>
                      <p>+49 911 13039057</p>
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
                      <h3>E-Mail</h3>
                      <p>p.chowdhury@cd-immo.de</p>
                    </div>
                  </div>
                  
                  <div className="kontakt-detail-item">
                    <div className="detail-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="detail-text">
                      <h3>Adresse</h3>
                      <p>Bauvereinstr. 47<br />90489 Nürnberg</p>
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
                      <h3>Öffnungszeiten</h3>
                      <p>Mo-Fr: 9:00 - 18:00 Uhr<br />Sa: Nach Vereinbarung</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="kontakt-form-container">
                <form className="kontakt-form">
                  <h3>Nachricht senden</h3>
                  
                  <div className="form-group">
                    <input type="text" id="name" name="name" placeholder="Name" required />
                  </div>
                  
                  <div className="form-group">
                    <input type="email" id="email" name="email" placeholder="E-Mail" required />
                  </div>
                  
                  <div className="form-group">
                    <input type="tel" id="telefon" name="telefon" placeholder="Telefon" />
                  </div>
                  
                  <div className="form-group">
                    <textarea id="nachricht" name="nachricht" placeholder="Ihre Nachricht" rows="5" required></textarea>
                  </div>
                  
                  <button type="submit" className="submit-button">
                    Nachricht senden
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
    </>
  );
};

export default Kontakt; 