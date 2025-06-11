import React, { useState, useEffect, useRef, useMemo } from "react";
import "../../styles/Blog.css";
import { useLanguage } from "../../contexts/LanguageContext";

const Testimonials = () => {
  const { t, currentLanguage } = useLanguage();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTexts, setDisplayedTexts] = useState(["", "", ""]);
  const previousLanguageRef = useRef(currentLanguage);
  
  // Memoized testimonial texts to prevent recreation on every render
  const testimonialTexts = useMemo(() => [
    t('blog.testimonials.michael.text'),
    t('blog.testimonials.sarah.text'),
    t('blog.testimonials.thomas.text')
  ], [t]);
  
  // Reset animation when language changes
  useEffect(() => {
    if (previousLanguageRef.current !== currentLanguage) {
      previousLanguageRef.current = currentLanguage;
      setDisplayedTexts(["", "", ""]);
      
      if (isVisible) {
        setIsVisible(false);
        // Short delay before restarting animation
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }
    }
  }, [currentLanguage, isVisible]); // Now properly includes isVisible
  
  // Intersection Observer for triggering animation
  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);
  
  // Typewriter effect for all 3 testimonials simultaneously
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 1500; // 1.5 seconds for the complete effect
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const newDisplayedTexts = testimonialTexts.map(text => {
        const targetLength = Math.floor(text.length * progress);
        return text.substring(0, targetLength);
      });
      
      setDisplayedTexts(newDisplayedTexts);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, testimonialTexts]);
  
  return (
    <div className="testimonials-section" ref={sectionRef}>
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
              {displayedTexts[0]}
              {isVisible && displayedTexts[0].length < testimonialTexts[0].length && <span className="typewriter-cursor">|</span>}
            </div>
            <div className="testimonial-author">
              <img src={require("../../assets/michael.png")} className="author-image" alt={t('blog.testimonials.michael.alt')} loading="lazy" />
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
              {displayedTexts[1]}
              {isVisible && displayedTexts[1].length < testimonialTexts[1].length && <span className="typewriter-cursor">|</span>}
            </div>
            <div className="testimonial-author">
              <img src={require("../../assets/sarahh.png")} className="author-image" alt={t('blog.testimonials.sarah.alt')} loading="lazy" />
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
              {displayedTexts[2]}
              {isVisible && displayedTexts[2].length < testimonialTexts[2].length && <span className="typewriter-cursor">|</span>}
            </div>
            <div className="testimonial-author">
              <img src={require("../../assets/thomas.png")} className="author-image" alt={t('blog.testimonials.thomas.alt')} loading="lazy" />
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
