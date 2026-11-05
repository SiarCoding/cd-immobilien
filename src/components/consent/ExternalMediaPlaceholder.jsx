import React from 'react';
import { Play, MapPin } from 'lucide-react';
import '../../styles/ExternalMedia.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useConsent } from '../../contexts/ConsentContext';

// Platzhalter fuer externe Inhalte: Solange keine Einwilligung vorliegt,
// wird keine Verbindung zum Anbieter aufgebaut.
const ExternalMediaPlaceholder = ({ type, href }) => {
  const { t } = useLanguage();
  const { grantMedia } = useConsent();
  const Icon = type === 'map' ? MapPin : Play;

  return (
    <div className={`external-media external-media--${type}`}>
      <Icon className="external-media-icon" size={32} aria-hidden="true" />
      <p className="external-media-title">{t(`externalMedia.${type}.title`)}</p>
      <p className="external-media-text">
        {t(`externalMedia.${type}.text`)}{' '}
        <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
          {t('externalMedia.privacyLink')}
        </a>
      </p>
      <button type="button" className="external-media-button" onClick={grantMedia}>
        {t(`externalMedia.${type}.button`)}
      </button>
      {href && (
        <a className="external-media-link" href={href} target="_blank" rel="noopener noreferrer">
          {t(`externalMedia.${type}.link`)}
        </a>
      )}
    </div>
  );
};

export default ExternalMediaPlaceholder;
