import React from "react";
import "../../styles/Blog.css";

const Testimonials = () => {
  return (
    <div className="testimonials-section">
      <div className="centered-content">
        <div className="section-heading">
          <span className="highlight-blue highlight-text-white">Kundenstimmen</span> zu unserer Expertise
        </div>
        <div className="section-text">
          Erfahren Sie, was unsere zufriedenen Kunden über unsere Immobilieninvestments 
          und unseren persönlichen Service sagen.
        </div>
      </div>
      <div className="testimonials-content">
        <div className="testimonial-card">
          <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8H4v6h6v-1.839c0-2.235-1.316-4.161-2.8-4.161zm-6 8V6h8c2.21 0 4 1.79 4 4v6h-6v6H4v-6zm16-8h-6v6h6v-1.839c0-2.235-1.316-4.161-2.8-4.161zm-6 8V6h8c2.21 0 4 1.79 4 4v6h-6v6h-6v-6z"/>
          </svg>
          <div className="testimonial-content">
            <div className="testimonial-rating">
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <div className="testimonial-text">
              "Die Beratung war erstklassig. Das Team hat uns durch den gesamten Prozess geführt und alle Fragen zur Finanzierung und Steuern kompetent beantwortet. Unsere Immobilie erwirtschaftet jetzt genau die Rendite, die uns versprochen wurde."
            </div>
            <div className="testimonial-author">
              <img src={require("../../assets/michael.png")} className="author-image" alt="Kunde" />
              <div className="author-info">
                <div className="author-name">Michael Schneider</div>
                <div className="author-title">Unternehmer, München</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="testimonial-card">
          <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8H4v6h6v-1.839c0-2.235-1.316-4.161-2.8-4.161zm-6 8V6h8c2.21 0 4 1.79 4 4v6h-6v6H4v-6zm16-8h-6v6h6v-1.839c0-2.235-1.316-4.161-2.8-4.161zm-6 8V6h8c2.21 0 4 1.79 4 4v6h-6v6h-6v-6z"/>
          </svg>
          <div className="testimonial-content">
            <div className="testimonial-rating">
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <div className="testimonial-text">
              "Als Ärztin habe ich wenig Zeit, mich um Immobilieninvestitionen zu kümmern. Das Team hat mir eine maßgeschneiderte Strategie entwickelt, die perfekt zu meiner steuerlichen Situation passt. Die Kommunikation war immer transparent, und ich wurde in jeden Schritt einbezogen."
            </div>
            <div className="testimonial-author">
              <img src={require("../../assets/sarahh.png")} className="author-image" alt="Kundin" />
              <div className="author-info">
                <div className="author-name">Dr. Sarah Müller</div>
                <div className="author-title">Ärztin, Hamburg</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="testimonial-card">
          <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8H4v6h6v-1.839c0-2.235-1.316-4.161-2.8-4.161zm-6 8V6h8c2.21 0 4 1.79 4 4v6h-6v6H4v-6zm16-8h-6v6h6v-1.839c0-2.235-1.316-4.161-2.8-4.161zm-6 8V6h8c2.21 0 4 1.79 4 4v6h-6v6h-6v-6z"/>
          </svg>
          <div className="testimonial-content">
            <div className="testimonial-rating">
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <div className="testimonial-text">
              "Wir haben lange nach einem vertrauenswürdigen Partner für unsere Altersvorsorge gesucht. Das Team hat uns bei der Auswahl der richtigen Immobilien geholfen und uns alle steuerlichen Vorteile aufgezeigt. Der ROI ist besser als erwartet."
            </div>
            <div className="testimonial-author">
              <img src={require("../../assets/thomas.png")} className="author-image" alt="Kunde" />
              <div className="author-info">
                <div className="author-name">Thomas Wagner</div>
                <div className="author-title">IT-Manager, Berlin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
