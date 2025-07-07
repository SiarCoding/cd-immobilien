import React, { useState } from 'react';
import '../../styles/CookieBanner.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useConsent } from '../../contexts/ConsentContext';
import { ShieldCheck, BarChart2, Megaphone, Check } from 'lucide-react';

const CookieBanner = () => {
  const { t } = useLanguage();
  const { saveConsent, isPending } = useConsent();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [localConsent, setLocalConsent] = useState({
    necessary: true,
    statistics: false,
    marketing: false,
  });

  const handleToggle = (category) => {
    setLocalConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleAcceptAll = () => {
    const newConsent = { necessary: true, statistics: true, marketing: true };
    saveConsent(newConsent);
  };

  const handleRejectAll = () => {
    const newConsent = { necessary: true, statistics: false, marketing: false };
    saveConsent(newConsent);
  };
  
  const handleSaveSettings = () => {
    saveConsent(localConsent);
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
                  <BarChart2 size={20} />
                  <h4>{t('cookieBanner.statistics.title')}</h4>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={localConsent.statistics} onChange={() => handleToggle('statistics')} />
                  <span className="slider round"></span>
                </label>
              </div>
              <p className="category-description">{t('cookieBanner.statistics.description')}</p>
            </div>

            <div className="settings-category">
              <div className="category-header">
                <div className="category-title">
                  <Megaphone size={20} />
                  <h4>{t('cookieBanner.marketing.title')}</h4>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={localConsent.marketing} onChange={() => handleToggle('marketing')} />
                  <span className="slider round"></span>
                </label>
              </div>
              <p className="category-description">{t('cookieBanner.marketing.description')}</p>
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