import React, { useRef } from 'react';
import '../../styles/Stats.css';
import { useLanguage } from '../../contexts/LanguageContext';
import CountUp from '../CountUp';

const Stats = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  
  // Stats data
  const statsData = [
    { value: 500, label: t('stats.projectVolume'), suffix: '+', prefix: '' },
    { value: 1400, label: t('stats.customers'), suffix: '+', prefix: '' },
    { value: 20, label: t('stats.experience'), suffix: '+', prefix: '' }
  ];

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        <div className="section-heading">
          <span className="highlight-blue">{t('stats.title')}</span> {t('stats.titleHighlight')}
        </div>
        <div className="stats-items">
          {statsData.map((stat, index) => (
            <div className="stat-item" key={index}>
              <span className="stat-value-with-plus">
                <CountUp
                  from={0}
                  to={stat.value}
                  separator="."
                  direction="up"
                  duration={1.5}
                  className="stat-value"
                />
                {stat.suffix && <span className="stat-plus">{stat.suffix}</span>}
              </span>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
