import React from 'react';
import '../../styles/AboutVideo.css';
import { useLanguage } from '../../contexts/LanguageContext';
import Video from '../Video';

const AboutVideo = () => {
  const { t } = useLanguage();

  return (
    <section className="about-video" aria-labelledby="about-video-title">
      <div className="about-video-inner">
        <h2 id="about-video-title" className="about-video-title">
          <span>{t('header.about')}</span>
        </h2>
        <Video />
      </div>
    </section>
  );
};

export default AboutVideo;
