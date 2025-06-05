import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Features.css';
import apartmentBg from '../../assets/apartment.webp';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

// Kupfer-Effekt Komponente für Features-Sektion
const CopperBlurEffect = () => (
  <div className="features-copper-effect">
    <svg className="copper-effect-svg" viewBox="0 0 444 536" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z" fill="url(#copper-gradient)" />
      <defs>
        <linearGradient id="copper-gradient" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B87333" />
          <stop offset="50%" stopColor="#E2AC6B" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Info-Icon Komponente mit Tooltip
const InfoIcon = ({ tooltip }) => {
  return (
    <div className="info-icon">
      i
      <div className="info-tooltip">{tooltip}</div>
    </div>
  );
};

// Diese Komponente wird aktuell nicht verwendet, wurde aber für zukünftige Erweiterungen implementiert
// eslint-disable-next-line no-unused-vars
const BenefitCard = ({ icon, title, value, description }) => {
  return (
    <div className="benefit-card">
      <div className="benefit-card-content">
        <div className="benefit-card-header">
          <div className="benefit-card-icon">{icon}</div>
          <h3 className="benefit-card-title">{title}</h3>
        </div>
        <div className="benefit-card-value">{value}</div>
        <p className="benefit-card-description">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const { t } = useLanguage();
  
  // Eingabewerte
  const [kaufpreis, setKaufpreis] = useState(500000);
  const [flaeche, setFlaeche] = useState(96);
  const [kaltmiete, setKaltmiete] = useState(1450);
  const [qualitaetsstufe, setQualitaetsstufe] = useState(0.70); // QNG Qualität als Standard

  // Feste Werte
  const anschaffungskostenProzent = 5;
  const tilgung = 1.5;
  const verwaltungskosten = 40;
  const steuersatz = 42;

  // Dynamische Werte basierend auf Qualitätsstufe
  const getZinssatz = (qualitaetsstufe) => {
    switch(qualitaetsstufe) {
      case 0.70: return 3.5; // QNG
      case 0.90: return 3.6; // High Quality  
      case 1.20: return 3.8; // Low Quality
      default: return 3.5;
    }
  };

  const getAfaAnteil = (qualitaetsstufe) => {
    return 93; // Alle Qualitätsstufen haben 93% Gebäudeanteil
  };

  const getAfaSatz = (qualitaetsstufe) => {
    return qualitaetsstufe === 0.70 ? 10 : 5; // QNG: 10%, andere: 5%
  };

  const zinssatz = getZinssatz(qualitaetsstufe);
  const afaAnteil = getAfaAnteil(qualitaetsstufe);
  const afaSatz = getAfaSatz(qualitaetsstufe);

  // Berechnete Werte
  const [anschaffungskosten, setAnschaffungskosten] = useState(0);
  const [zinsbetrag, setZinsbetrag] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [tilgungsbetrag, setTilgungsbetrag] = useState(0);
  const [monatlicheBankrate, setMonatlicheBankrate] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [instandhaltungsruecklage, setInstandhaltungsruecklage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [afaAnschaffungskosten, setAfaAnschaffungskosten] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [afaSatzBetrag, setAfaSatzBetrag] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [absetzung, setAbsetzung] = useState(0);
  const [steuervorteilMonatlich, setSteuervorteilMonatlich] = useState(0);
  const [steuervorteilJaehrlich, setSteuervorteilJaehrlich] = useState(0);
  const [cashflow, setCashflow] = useState(0);
  const [cashflowJaehrlich, setCashflowJaehrlich] = useState(0);

  // Refs für Animation
  const headingRef = useRef(null);
  const calculatorRef = useRef(null);
  const resultsRef = useRef(null);
  const ctaRef = useRef(null);

  // Qualitätsstufen-Optionen mit Übersetzungen
  const qualitaetsstufen = [
    { value: 0.70, label: t('features.qngQuality') },
    { value: 0.90, label: t('features.highQuality') },
    { value: 1.20, label: t('features.surfaceQuality') }
  ];

  // Input Handler Funktionen
  const handleKaufpreisChange = (e) => {
    const value = e.target.value;
    setKaufpreis(value === '' ? '' : parseFloat(value) || '');
  };

  const handleFlaecheChange = (e) => {
    const value = e.target.value;
    setFlaeche(value === '' ? '' : parseFloat(value) || '');
  };

  const handleKaltmieteChange = (e) => {
    const value = e.target.value;
    setKaltmiete(value === '' ? '' : parseFloat(value) || '');
  };

  const handleBlur = (setter, defaultValue = 0) => {
    return (e) => {
      const value = e.target.value;
      if (value === '' || isNaN(parseFloat(value))) {
        setter(defaultValue);
      }
    };
  };

  // Berechnungen
  useEffect(() => {
    // Konvertiere leere Strings zu 0 für Berechnungen
    const kaufpreisValue = parseFloat(kaufpreis) || 0;
    const flaecheValue = parseFloat(flaeche) || 0;
    const kaltmieteValue = parseFloat(kaltmiete) || 0;
    
    // Anschaffungskosten 5%: A2*0.05
    const anschaffung = kaufpreisValue * (anschaffungskostenProzent / 100);
    setAnschaffungskosten(anschaffung);

    // Zinssatz 3,7%: A2*0.037
    const zins = kaufpreisValue * (zinssatz / 100);
    setZinsbetrag(zins);
    
    // Tilgung 1,5%: A2*0.015
    const tilg = kaufpreisValue * (tilgung / 100);
    setTilgungsbetrag(tilg);
    
    // Monatlicher Bankbeitrag: (C2+D2)/12
    const bankrate = (zins + tilg) / 12;
    setMonatlicheBankrate(bankrate);

    // Instandhaltungsrücklage: F2*0.7
    const instand = flaecheValue * qualitaetsstufe;
    setInstandhaltungsruecklage(instand);

    // AfA der Anschaffungskosten 93%: (A2 + B2)*0.93
    const afaAnsch = (kaufpreisValue + anschaffung) * (afaAnteil / 100);
    setAfaAnschaffungskosten(afaAnsch);
    
    // AfA Satz der Anschaffungskosten: -J2 * 0.1 (negativ!)
    const afaSatzBetr = -afaAnsch * (afaSatz / 100);
    setAfaSatzBetrag(afaSatzBetr);

    // Absetzung: K2-C2 + ((G2-H2)*12) (AfA Satz - Zinsbetrag + ((Kaltmiete - Verwaltung)*12))
    const absetz = afaSatzBetr - zins + ((kaltmieteValue - verwaltungskosten) * 12);
    setAbsetzung(absetz);

    // Steuervorteil (Monatlich): -M2*0.42/12 (negativ von Absetzung!)
    const steuervorteilMon = (-absetz * 0.42) / 12;
    setSteuervorteilMonatlich(steuervorteilMon);

    // Steuervorteil (Jährlich): N2*12
    const steuervorteilJahr = steuervorteilMon * 12;
    setSteuervorteilJaehrlich(steuervorteilJahr);

    // ZWS (Zwischensumme): Kaltmiete - Verwaltungskosten - Instandhaltungsrücklage - Monatlicher Bankbeitrag
    const zws = kaltmieteValue - verwaltungskosten - instand - bankrate;
    
    // Cashflow: Steuervorteil (Monatlich) + ZWS
    const cf = steuervorteilMon + zws;
    setCashflow(cf);
    
    // Cashflow im ersten Jahr
    const cfJaehrlich = cf * 12;
    setCashflowJaehrlich(cfJaehrlich);
    
  }, [kaufpreis, flaeche, kaltmiete, qualitaetsstufe, zinssatz, afaAnteil, afaSatz]);

  // Intersection Observer für Animationen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (calculatorRef.current) observer.observe(calculatorRef.current);
    if (resultsRef.current) observer.observe(resultsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Formatiert Euro Währungswerte
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <section className="features-section" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75)), url(${apartmentBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      <CopperBlurEffect />
      
      <div className="features-container">
        <h1 className="section-heading">
          <span className="features-subtitle">{t('features.calculateYour')} <span className="features-title-box">{t('features.cashflow')}</span> {t('features.and')} <span className="features-title-box">{t('features.taxBenefit')}</span></span>
        </h1>

        <div className="calculator-wrapper">
        <div ref={calculatorRef} className="calculator-container">
            <div className="calculator-left-panel">
              <div className="calculator-section">
                <h3 className="calculator-section-title">
                  <span className="calculator-section-icon">🏢</span>
                {t('features.propertyData')}
              </h3>
              
                <div className="input-group modern-input">
                  <label htmlFor="kaufpreis">
                    {t('features.purchasePrice')}
                    <InfoIcon tooltip={`${t('features.purchasePriceTooltip')} Basis für degressive AfA nach Wachstumschancengesetz 2024.`} />
                  </label>
                <div className="input-with-currency">
                  <input
                    type="number"
                      id="kaufpreis"
                    className="currency-input"
                      value={kaufpreis}
                      onChange={handleKaufpreisChange}
                    onBlur={handleBlur(setKaufpreis)}
                    min="0"
                  />
                  <span className="currency-symbol">€</span>
                </div>
              </div>
              
                <div className="input-group modern-input">
                  <label htmlFor="flaeche">
                    {t('features.area')}
                    <InfoIcon tooltip={t('features.areaTooltip')} />
                  </label>
                  <div className="input-with-currency">
                    <input
                      type="number"
                      id="flaeche"
                      className="currency-input"
                      value={flaeche}
                      onChange={handleFlaecheChange}
                      onBlur={handleBlur(setFlaeche)}
                      min="0"
                    />
                    <span className="currency-symbol">m²</span>
                      </div>
                    </div>
                    
                <div className="input-group modern-input">
                  <label htmlFor="kaltmiete">
                    {t('features.coldRent')}
                    <InfoIcon tooltip={`${t('features.coldRentTooltip')} Gültig bei Vermietung ab 01.01. des Steuerjahres.`} />
                  </label>
                  <div className="input-with-currency">
                    <input
                      type="number"
                      id="kaltmiete"
                      className="currency-input"
                      value={kaltmiete}
                      onChange={handleKaltmieteChange}
                      onBlur={handleBlur(setKaltmiete)}
                      min="0"
                    />
                    <span className="currency-symbol">€</span>
                  </div>
                </div>

                <div className="input-group modern-input">
                  <label htmlFor="qualitaetsstufe">
                    {t('features.qualityLevel')}
                    <InfoIcon tooltip={t('features.qualityLevelTooltip')} />
                  </label>
                <select 
                    id="qualitaetsstufe"
                  className="select-input"
                    value={qualitaetsstufe}
                    onChange={(e) => setQualitaetsstufe(parseFloat(e.target.value))}
                  >
                    {qualitaetsstufen.map((stufe) => (
                      <option key={stufe.value} value={stufe.value}>
                        {stufe.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            
              <div className="calculator-section">
                <h3 className="calculator-section-title">
                  <span className="calculator-section-icon">💰</span>
                  {t('features.fixedParameters')}
              </h3>
              
                <div className="fixed-parameters">
                  <div className="parameter-item">
                    <span className="parameter-label">{t('features.acquisitionCosts')}</span>
                    <span className="parameter-value">{anschaffungskostenProzent}%</span>
                  </div>
                  <div className="parameter-item">
                    <span className="parameter-label">{t('features.interestRate')}</span>
                    <span className="parameter-value">{zinssatz}%</span>
                  </div>
                  <div className="parameter-item">
                    <span className="parameter-label">{t('features.repayment')}</span>
                    <span className="parameter-value">{tilgung}%</span>
                  </div>
                  <div className="parameter-item">
                    <span className="parameter-label">{t('features.managementCosts')}</span>
                    <span className="parameter-value">{formatCurrency(verwaltungskosten)}</span>
              </div>
                  <div className="parameter-item">
                    <span className="parameter-label">{t('features.taxRate')}</span>
                    <span className="parameter-value">{steuersatz}%</span>
                </div>
                  <div className="parameter-item">
                    <span className="parameter-label">{t('features.buildingShare')}</span>
                    <span className="parameter-value">{afaAnteil}%</span>
                  </div>
                </div>
              </div>

              <div className="calculator-section">
                <h3 className="calculator-section-title">
                  <span className="calculator-section-icon">📊</span>
                  {t('features.costsFinancing')}
                </h3>
                
                <div className="fixed-parameters">
                  <div className="parameter-item">
                    <span className="parameter-label">{t('features.acquisitionCostsResult')}</span>
                    <span className="parameter-value">{formatCurrency(anschaffungskosten)}</span>
                  </div>
                  <div className="parameter-item">
                    <span className="parameter-label">{t('features.interestAmount')} ({zinssatz}%)</span>
                    <span className="parameter-value">{formatCurrency(zinsbetrag)}</span>
                  </div>
                  <div className="parameter-item highlight">
                    <span className="parameter-label">{t('features.monthlyBankRate')}</span>
                    <span className="parameter-value">{formatCurrency(monatlicheBankrate)}</span>
                  </div>
              </div>
              </div>
            </div>
            
            <div ref={resultsRef} className="calculator-right-panel">
              <h3 className="results-heading">{t('features.resultsHeading')}</h3>
              
              <div className="results-grid">
                <div className="results-left-column">
                  {/* Ergebnisse werden jetzt in der rechten Spalte angezeigt */}
                </div>
                
                <div className="results-right-column">
                  <div className="tax-benefits-overview">
                    <h4 className="benefits-main-title">{t('features.taxBenefitsTitle')}</h4>
                    
                    <div className="benefit-highlight-card">
                      <div className="benefit-amount">
                        <span className="benefit-label">{t('features.monthlyTaxBenefit')} (1. Jahr)</span>
                        <span className="benefit-value">{formatCurrency(steuervorteilMonatlich)}</span>
                      </div>
                      <div className="benefit-amount benefit-amount-yearly">
                        <span className="benefit-label">{t('features.yearlyTaxBenefit')} (1. Jahr)</span>
                        <span className="benefit-value">{formatCurrency(steuervorteilJaehrlich)}</span>
                      </div>
                    </div>
                  </div>
              
                  <div className="cashflow-results-overview">
                    <h4 className="cashflow-main-title">{t('features.results')}</h4>
                    
                    <div className="cashflow-highlight-card">
                      <div className="cashflow-amount">
                        <span className="cashflow-label">{t('features.cashflowMonthly')} (nach Steuern, Kosten & Rücklage mtl.)</span>
                        <span className="cashflow-value">{formatCurrency(cashflow)}</span>
                      </div>
                      <div className="cashflow-amount">
                        <span className="cashflow-label">{t('features.cashflowFirstYear')} (nach Steuern, Kosten & Rücklage)</span>
                        <span className="cashflow-value">{formatCurrency(cashflowJaehrlich)}</span>
                      </div>
                </div>
                </div>

                  {/* CTA Bereich */}
                  <div className="results-cta">
                    <p className="results-cta-text">
                      Überzeugt von den Ergebnissen? Verwandeln Sie diese Berechnung noch heute in Realität
                    </p>
                    <div className="cta-arrow">↓</div>
              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call-to-Action */}
        <div ref={ctaRef} className="features-cta">
          <div className="cta-content">
            <h3 className="cta-heading">{t('features.ctaTitle')}</h3>
          <p className="cta-text">
              {t('features.ctaText')} Profitieren Sie von der degressiven Abschreibung von bis zu 10% bei QNG-Qualität und optimieren Sie Ihren Cashflow nach Steuern ab dem ersten Vermietungsjahr.
            </p>
            <Link to="/formular">
            <button className="cta-button">
                <span className="button-text">{t('features.ctaButton')}</span>
              <span className="button-icon">→</span>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
