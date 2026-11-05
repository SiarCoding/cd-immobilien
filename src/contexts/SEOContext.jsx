import React, { createContext, useContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';

const SEOContext = createContext();

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within SEOProvider');
  }
  return context;
};

// Erweiterte SEO Data für verschiedene Seiten
export const seoData = {
  home: {
    title: 'CD Immo-Portfolio GmbH - Immobilieninvestition & Steuervorteile',
    description: '🏢 Bauen Sie nachhaltiges Vermögen auf & senken Sie Ihre Steuerlast. ✅ 28+ Jahre Erfahrung ✅ 2000+ zufriedene Kunden ✅ Kostenlose Beratung. Eigenkapitalrendite über 10% p.a. ✅ Inflationsschutz',
    keywords: 'Immobilieninvestition Nürnberg, Steuervorteile Immobilien, Steuerlast senken 90%, Vermögensaufbau Immobilien, Altersvorsorge Immobilien, Cashflow Immobilien, Rendite Immobilien 10%, Immobilien Portfolio, Kapitalanlage Immobilien, Steueroptimierung, Immobilien Nürnberg Bayern, CD Immo-Portfolio GmbH, Eigenkapitalrendite, Inflationsschutz, Immobilienberater Nürnberg, Finanzierung Immobilien, Immobilien Steuern sparen',
    canonical: 'https://www.cd-immo.de/',
    ogImage: 'https://www.cd-immo.de/assets/og-image-home.jpg',
    localData: {
      businessName: 'CD Immo-Portfolio GmbH',
      address: 'Bauvereinstr. 47, 90489 Nürnberg, Deutschland',
      phone: '+49 911 13039057',
      email: 'p.chowdhury@cd-immo.de',
      city: 'Nürnberg',
      state: 'Bayern',
      country: 'Deutschland'
    }
  },
  kontakt: {
    title: 'Kontakt - CD Immo-Portfolio GmbH | Kostenlose Immobilien Beratung Nürnberg',
    description: '📞 Kontaktieren Sie unsere Immobilien-Experten in Nürnberg! ✅ Kostenlose Erstberatung ✅ Persönliche Betreuung ✅ Steuervorteile bis 90% ✅ Termin online buchen. Bauvereinstr. 47, 90489 Nürnberg ☎ +49 911 13039057',
    keywords: 'Immobilien Beratung Nürnberg, Kostenlose Immobilien Beratung,s Immobilien Nürnberg, Kontakt CD Immo-Portfolio GmbH, Termin Immobilienberater Nürnberg, Nürnberg Immobilien Experte, Immobilien Finanzierung Nürnberg, Steuervorteile Immobilien Bayern, Vermögensberatung Nürnberg',
    canonical: 'https://www.cd-immo.de/kontakt',
    ogImage: 'https://www.cd-immo.de/assets/og-image-kontakt.jpg'
  },
  formular: {
    title: 'Beratung anfragen - CD Immo-Portfolio GmbH | Kostenlose Analyse Steuervorteile',
    description: '📝 Beratungstermin anfragen für Ihre Immobilieninvestition! ✅ Kostenlos & unverbindlich ✅ Steuervorteile bis 90% berechnen ✅ Persönliche Beratung in Nürnberg ✅ Cashflow-Analyse ✅ Jetzt Termin sichern',
    keywords: 'Immobilien Beratung anfragen Nürnberg, Kostenlose Immobilien Analyse, Steuervorteile berechnen Immobilien, Immobilieninvestition Beratung Nürnberg, Beratungstermin Immobilien Bayern, CD Immo-Portfolio GmbH Formular, Cashflow Berechnung Immobilien, Immobilien Finanzierung Beratung',
    canonical: 'https://www.cd-immo.de/formular',
    ogImage: 'https://www.cd-immo.de/assets/og-image-formular.jpg'
  },
};

// Globale SEO Konstanten
export const globalSEO = {
  siteName: 'CD Immo-Portfolio GmbH',
  defaultImage: 'https://www.cd-immo.de/assets/og-image.jpg',
  twitterHandle: '@cdimmobilien',
  locale: 'de_DE',
  type: 'website',
  baseUrl: 'https://www.cd-immo.de'
};

export const SEOProvider = ({ children }) => {
  const value = {
    seoData,
    globalSEO
  };

  return (
    <HelmetProvider>
      <SEOContext.Provider value={value}>
        {children}
      </SEOContext.Provider>
    </HelmetProvider>
  );
}; 