import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Stats.css';
import { useLanguage } from '../../contexts/LanguageContext';

const Stats = () => {
  const { t } = useLanguage();
  // Standardmäßig nicht sichtbar, wird erst beim Scrollen aktiviert
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Stats data
  const statsData = [
    { value: 500, label: t('stats.projectVolume'), suffix: '+', prefix: '' },
    { value: 1400, label: t('stats.customers'), suffix: '+', prefix: '' },
    { value: 15, label: t('stats.experience'), suffix: '+', prefix: '' }
  ];

  // Animierte Counter-Komponente
  const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      // Nur animieren, wenn die Sektion sichtbar ist
      if (!isVisible) return;
      
      let startTime = null;
      let animationFrameId = null;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function für sanftere Animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easedProgress * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      
      animationFrameId = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [end, duration]); // isVisible wird absichtlich nicht als Abhängigkeit hinzugefügt
    
    return (
      <span className="stat-value">{prefix}{count}{suffix}</span>
    );
  };

  // Intersection Observer für die Erkennung, wann die Sektion sichtbar ist
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.15, // Trigger wenn 15% der Sektion sichtbar ist
        rootMargin: '0px 0px -100px 0px' // Etwas früher triggern
      }
    );
    
    const currentRef = sectionRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        <div className="section-heading">
          <span className="highlight-blue">{t('stats.title')}</span> {t('stats.titleHighlight')}
        </div>
        <div className="stats-items">
          {statsData.map((stat, index) => (
            <div className="stat-item" key={index}>
              <AnimatedCounter 
                end={stat.value} 
                prefix={stat.prefix} 
                suffix={stat.suffix} 
              />
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
