import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage, 
  ogType = "website",
  noindex = false 
}) => {
  const fullTitle = title || "CD Immobilien Portfolio GmbH - Immobilieninvestition & Steuervorteile | Nürnberg";
  const fullDescription = description || "🏢 Bauen Sie mit Immobilien nachhaltiges Vermögen auf & senken Sie Ihre Steuerlast um bis zu 90%. ✅ 15+ Jahre Erfahrung ✅ 1400+ zufriedene Kunden";
  const fullKeywords = keywords || "Immobilieninvestition, Steuervorteile Immobilien, Vermögensaufbau, Altersvorsorge, Cashflow Immobilien, Rendite Immobilien, Steuerlast senken, Immobilien Portfolio, Kapitalanlage Immobilien, Nürnberg, Bayern, CD Immobilien";
  const fullCanonical = canonical || "https://www.cd-immo.de/";
  const fullOgImage = ogImage || "https://www.cd-immo.de/assets/og-image.jpg";

  return (
    <Helmet>
      {/* Title */}
      <title>{fullTitle}</title>
      
      {/* Basic Meta Tags */}
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="CD Immobilien Portfolio GmbH" />
      <meta name="language" content="German" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Robots Meta Tag */}
      <meta 
        name="robots" 
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} 
      />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="CD Immobilien Portfolio GmbH" />
      <meta property="og:locale" content="de_DE" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullOgImage} />
      
      {/* Additional SEO improvements */}
      <meta name="theme-color" content="#082567" />
      <meta name="msapplication-TileColor" content="#082567" />
      <meta name="apple-mobile-web-app-title" content="CD Immobilien" />
      <meta name="application-name" content="CD Immobilien Portfolio GmbH" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="DE-BY" />
      <meta name="geo.placename" content="Nürnberg" />
      <meta name="geo.position" content="49.4521;11.0767" />
      <meta name="ICBM" content="49.4521, 11.0767" />
      
      {/* Hreflang for German */}
      <link rel="alternate" hrefLang="de" href={fullCanonical} />
      <link rel="alternate" hrefLang="de-DE" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
    </Helmet>
  );
};

export default SEOHead; 