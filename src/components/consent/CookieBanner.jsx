import React, { useEffect, useState } from 'react';
import '../../styles/CookieBanner.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useConsent } from '../../contexts/ConsentContext';
import { ShieldCheck, Play, Check } from 'lucide-react';

const CookieBanner = () => {
  const { t } = useLanguage();
  const { consent, saveConsent, isPending } = useConsent();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mediaAllowed, setMediaAllowed] = useState(false);

  // Beim erneuten Oeffnen die bereits getroffene Auswahl anzeigen
  useEffect(() => {
    setMediaAllowed(Boolean(consent?.media));
  }, [consent]);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, media: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, media: false });
  };

  const handleSaveSettings = () => {
    saveConsent({ necessary: true, media: mediaAllowed });
  };

  if (!isPending) {
    return null;
  }

  return (
    <div className="cookie-banner-overlay">
      <div className={`cookie-banner ${isSettingsOpen ? 'settings-open' : ''}`}>
        {!isSettingsOpen ? (
          // First Layer
          <div className="banner-main">
            <ShieldCheck className="banner-icon" />
            <div className="banner-text">
              <h3>{t('cookieBanner.title')}</h3>
              <p>
                {t('cookieBanner.description')}
                <a href="/datenschutz" target="_blank" rel="noopener noreferrer">{t('cookieBanner.privacyPolicyLink')}</a>.
              </p>
            </div>
            <div className="banner-actions">
              <button className="cookie-btn btn-secondary" onClick={() => setIsSettingsOpen(true)}>{t('cookieBanner.settings')}</button>
              <button className="cookie-btn btn-secondary" onClick={handleRejectAll}>{t('cookieBanner.rejectAll')}</button>
              <button className="cookie-btn btn-primary" onClick={handleAcceptAll}>{t('cookieBanner.acceptAll')}</button>
            </div>
          </div>
        ) : (
          // Second Layer (Settings)
          <div className="banner-settings">
            <h3>{t('cookieBanner.settingsTitle')}</h3>
            <p>{t('cookieBanner.settingsDescription')}</p>

            <div className="settings-category">
              <div className="category-header">
                <div className="category-title">
                  <ShieldCheck size={20} />
                  <h4>{t('cookieBanner.necessary.title')}</h4>
                </div>
                <div className="category-toggle always-on">
                  <span>{t('cookieBanner.alwaysActive')}</span>
                  <Check size={20} />
                </div>
              </div>
              <p className="category-description">{t('cookieBanner.necessary.description')}</p>
            </div>

            <div className="settings-category">
              <div className="category-header">
                <div className="category-title">
                  <Play size={20} />
                  <h4>{t('cookieBanner.media.title')}</h4>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={mediaAllowed}
                    onChange={() => setMediaAllowed((allowed) => !allowed)}
                    aria-label={t('cookieBanner.media.title')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <p className="category-description">{t('cookieBanner.media.description')}</p>
            </div>

            <div className="settings-actions">
              <button className="cookie-btn btn-primary" onClick={handleSaveSettings}>{t('cookieBanner.saveSettings')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
