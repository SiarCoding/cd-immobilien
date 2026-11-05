import React from 'react';
import { Play, MapPin } from 'lucide-react';
import '../../styles/ExternalMedia.css';
import posterImage from '../../assets/azim2.webp';
import { useLanguage } from '../../contexts/LanguageContext';
import { useConsent } from '../../contexts/ConsentContext';

// Solange keine Einwilligung vorliegt, wird keine Verbindung zum Anbieter aufgebaut.
// Die Einwilligung selbst erfolgt ausschliesslich im Cookie-Banner.
const ExternalMediaPlaceholder = ({ type, href }) => {
  const { t } = useLanguage();
  const { openConsentManager } = useConsent();

  if (type === 'video') {
    return (
      <button
        type="button"
        className="external-media-poster"
        onClick={openConsentManager}
        aria-label={t('externalMedia.video.button')}
      >
        <img src={posterImage} alt="" loading="lazy" />
        <span className="external-media-play" aria-hidden="true">
          <Play size={34} fill="currentColor" />
        </span>
      </button>
    );
  }

  return (
    <div className="external-media-map">
      <MapPin className="external-media-pin" size={36} aria-hidden="true" />
      <button type="button" className="external-media-button" onClick={openConsentManager}>
        {t('externalMedia.map.button')}
      </button>
      {href && (
        <a className="external-media-link" href={href} target="_blank" rel="noopener noreferrer">
          {t('externalMedia.map.link')}
        </a>
      )}
    </div>
  );
};

export default ExternalMediaPlaceholder;
