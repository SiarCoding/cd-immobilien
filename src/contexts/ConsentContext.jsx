import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const ConsentContext = createContext();

const CONSENT_STORAGE_KEY = 'cookie_consent';

export const ConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (storedConsent) {
        const parsedConsent = JSON.parse(storedConsent);
        const consentDate = new Date(parsedConsent.timestamp);
        const now = new Date();
        const monthsDiff = (now.getFullYear() - consentDate.getFullYear()) * 12 + (now.getMonth() - consentDate.getMonth());
        
        if (monthsDiff > 6) {
          localStorage.removeItem(CONSENT_STORAGE_KEY);
          setConsent(null);
        } else {
          setConsent(parsedConsent);
        }
      } else {
        setConsent(null);
      }
    } catch (error) {
      console.error("Error reading consent from localStorage", error);
      setConsent(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveConsent = useCallback((newConsent) => {
    const consentToStore = {
      ...newConsent,
      timestamp: new Date().toISOString(),
      needsAction: false, // Ensure this is reset on save
    };
    
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentToStore));
      setConsent(consentToStore);
      window.dispatchEvent(new CustomEvent('consent_update', { detail: consentToStore }));
    } catch (error) {
      console.error("Error saving consent to localStorage", error);
    }
  }, []);

  const openConsentManager = useCallback(() => {
    setConsent(currentConsent => {
      // If there's no consent yet, we do nothing, the banner should be open anyway.
      // If there is consent, we set needsAction to true to reopen the manager.
      return currentConsent ? { ...currentConsent, needsAction: true } : null;
    });
  }, []);

  const value = {
    consent,
    saveConsent,
    openConsentManager,
    // Show banner if not loading AND (no consent is stored OR the user wants to see it)
    isPending: !isLoading && (consent === null || consent?.needsAction),
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}; 