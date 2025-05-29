import React from "react";
import "../../styles/Blog.css";
import { useLanguage } from "../../contexts/LanguageContext";

const Testimonials = () => {
  const { t } = useLanguage();
  
  return (
    <div className="testimonials-section">
      <div className="centered-content">
        <div className="section-heading">
          <span className="highlight-blue highlight-text-white">{t('blog.title')}</span> {t('blog.titleHighlight')}
        </div>
        <div className="section-text">
          {t('blog.subtitle')}
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
              {t('blog.testimonials.michael.text')}
            </div>
            <div className="testimonial-author">
              <img src={require('../../assets/michael.webp')} className="author-image" alt={t('blog.testimonials.michael.alt')} />
              <div className="author-info">
                <div className="author-name">{t('blog.testimonials.michael.name')}</div>
                <div className="author-title">{t('blog.testimonials.michael.title')}</div>
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
              {t('blog.testimonials.sarah.text')}
            </div>
            <div className="testimonial-author">
              <img src={require('../../assets/sarahh.webp')} className="author-image" alt={t('blog.testimonials.sarah.alt')} />
              <div className="author-info">
                <div className="author-name">{t('blog.testimonials.sarah.name')}</div>
                <div className="author-title">{t('blog.testimonials.sarah.title')}</div>
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
              {t('blog.testimonials.thomas.text')}
            </div>
            <div className="testimonial-author">
              <img src={require('../../assets/thomas.webp')} className="author-image" alt={t('blog.testimonials.thomas.alt')} />
              <div className="author-info">
                <div className="author-name">{t('blog.testimonials.thomas.name')}</div>
                <div className="author-title">{t('blog.testimonials.thomas.title')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
