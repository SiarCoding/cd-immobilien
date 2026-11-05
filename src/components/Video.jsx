import React from 'react';
import '../styles/Video.css';
import { useLanguage } from '../contexts/LanguageContext';
import { useConsent } from '../contexts/ConsentContext';
import ExternalMediaPlaceholder from './consent/ExternalMediaPlaceholder';

const Video = () => {
  const { language } = useLanguage();
  const { hasMediaConsent } = useConsent();

  // Video URLs für verschiedene Sprachen
  const videoUrls = {
    DE: "https://play.gumlet.io/embed/6917085bdf9720847e09182f?background=false&autoplay=true&loop=false&disableControls=false",
    EN: "https://play.gumlet.io/embed/691707b04f0f460333863ff4?background=false&autoplay=true&loop=false&disableControls=false"
  };

  const currentVideoUrl = videoUrls[language] || videoUrls.DE;

  return (
    <div className="video-container">
      <div className="video-effect-wrapper">
        <div className="video-player">
          <div className="video-wrapper">
            {hasMediaConsent ? (
              <iframe
                key={language} // Force re-render when language changes
                className="video-iframe"
                loading="lazy"
                title="Gumlet video player"
                src={currentVideoUrl}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
                frameBorder="0"
                referrerPolicy="origin"
              />
            ) : (
              <ExternalMediaPlaceholder type="video" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
