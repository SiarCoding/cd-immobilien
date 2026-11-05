import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Features.css';
import '../../styles/Hero.css';
import '../../styles/AnimatedButton.css';
import '../../styles/CalculatorHero.css';
import neubauImage from '../../assets/neubau-freisteller.webp';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { HoverButton } from '../ui/animated-hover-button';

// Info-Icon Komponente mit Tooltip
const InfoIcon = ({ tooltip }) => {
  return (
    <span className="calc-info" tabIndex={0} aria-label={tooltip}>
      i
      <span className="calc-info-tip" aria-hidden="true">{tooltip}</span>
    </span>
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
  const verwaltungskosten = 50;
  const steuersatz = 42;

  // Dynamische Werte basierend auf Qualitätsstufe
  const getZinssatz = (qualitaetsstufe) => {
    switch(qualitaetsstufe) {
      case 0.70: return 4.5; // QNG
      case 0.80: return 4.5; // High Quality  
      case 1.20: return 4.5; // Low Quality
      default: return 4.5;
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

  // Loading State für Berechnungen
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(true); // Standard-Ergebnisse anzeigen

  // Refs für Animation
  const headingRef = useRef(null);
  const calculatorRef = useRef(null);
  const resultsRef = useRef(null);
  const ctaRef = useRef(null);

  // Qualitätsstufen-Optionen mit Übersetzungen
  const qualitaetsstufen = [
    { value: 0.70, label: t('features.qngQuality') },
    { value: 0.80, label: t('features.highQuality') },
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

  // Berechnungsfunktion (nur bei Button-Klick)
  const calculateResults = async () => {
    setIsCalculating(true);
    setShowResults(false);
    
    // Loading-Simulation
    await new Promise(resolve => setTimeout(resolve, 1200));
    
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
    
    setIsCalculating(false);
    setShowResults(true);
  };

  // Führe Standard-Berechnungen beim ersten Laden aus
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Nur einmal beim Mounting

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
    // Bei großen Beträgen (über 10.000) weniger Nachkommastellen zeigen für mobile Ansicht
    const isMobile = window.innerWidth <= 576;
    const fractionDigits = (isMobile && Math.abs(amount) >= 10000) ? 0 : 2;
    
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: fractionDigits
    }).format(amount);
  };

  return (
    <section className="calc-hero" aria-labelledby="calc-title">
      <div className="calc-shell">
        <div ref={calculatorRef} className="calc-stage">
          <div className="calc-main">
          <div ref={headingRef} className="calc-intro">
            <h1 id="calc-title" className="calc-title">
              {t('hero.title')} <span className="calc-title-box">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')} <span className="calc-title-mark">{t('hero.titleUnderlined')}</span>
            </h1>
            <p className="calc-lead">{t('hero.subtitle')}</p>
            <div className="calc-intro-cta">
              <Link to="/formular">
                <HoverButton
                  startColor="#b87333"
                  endColor="#e0ac69"
                  animationIntensity="medium"
                  className="hero-animated-button"
                >
                  {t('hero.ctaButton')}
                </HoverButton>
              </Link>
            </div>
          </div>

          <div className="calc-tool">
          <h2 className="calc-tool-title">
            {t('features.calculateYour')} {t('features.cashflow')} {t('features.and')} {t('features.taxBenefit')}
          </h2>
          <p className="calc-tool-lead">{t('features.heroLead')}</p>

          <div className="calc-inputs">
            <h3 className="calc-group-title">{t('features.propertyData')}</h3>

            <div className="calc-field">
              <label htmlFor="kaufpreis">
                {t('features.purchasePrice')}
                <InfoIcon tooltip={t('features.purchasePriceTooltip')} />
              </label>
              <div className="calc-input-wrap">
                <input
                  type="number"
                  id="kaufpreis"
                  className="calc-input calc-input--lead"
                  value={kaufpreis}
                  onChange={handleKaufpreisChange}
                  onBlur={handleBlur(setKaufpreis)}
                  min="0"
                />
                <span className="calc-unit">€</span>
              </div>
            </div>

            <div className="calc-field-row">
              <div className="calc-field">
                <label htmlFor="flaeche">
                  {t('features.area')}
                  <InfoIcon tooltip={t('features.areaTooltip')} />
                </label>
                <div className="calc-input-wrap">
                  <input
                    type="number"
                    id="flaeche"
                    className="calc-input"
                    value={flaeche}
                    onChange={handleFlaecheChange}
                    onBlur={handleBlur(setFlaeche)}
                    min="0"
                  />
                  <span className="calc-unit">m²</span>
                </div>
              </div>

              <div className="calc-field">
                <label htmlFor="kaltmiete">
                  {t('features.coldRent')}
                  <InfoIcon tooltip={t('features.coldRentTooltip')} />
                </label>
                <div className="calc-input-wrap">
                  <input
                    type="number"
                    id="kaltmiete"
                    className="calc-input"
                    value={kaltmiete}
                    onChange={handleKaltmieteChange}
                    onBlur={handleBlur(setKaltmiete)}
                    min="0"
                  />
                  <span className="calc-unit">€</span>
                </div>
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor="qualitaetsstufe">
                {t('features.qualityLevel')}
                <InfoIcon tooltip={t('features.qualityLevelTooltip')} />
              </label>
              <select
                id="qualitaetsstufe"
                className="calc-select"
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

            <div className="calc-button-row">
              <HoverButton
                type="button"
                startColor="#b87333"
                endColor="#e0ac69"
                animationIntensity="medium"
                className="hero-animated-button"
                onClick={calculateResults}
                disabled={isCalculating}
              >
                <span className="button-text calc-button-label">
                  {isCalculating && <span className="calc-spinner" aria-hidden="true"></span>}
                  {isCalculating ? t('features.calculating') : t('features.calculateButton')}
                </span>
              </HoverButton>
            </div>
          </div>
          </div>
          </div>

          <div className="calc-results-col">
          <div className="calc-building-wrap">
            <img src={neubauImage} className="calc-building" alt="" width="840" height="689" decoding="async" />
            <span className="calc-building-caption">{t('features.imageCaption')}</span>
          </div>
          <div
            ref={resultsRef}
            className={`calc-results ${showResults ? 'is-ready' : ''} ${isCalculating ? 'is-calculating' : ''}`}
            aria-live="polite"
            aria-busy={isCalculating}
          >
            <h2 className="calc-visually-hidden">{t('features.resultsHeading')}</h2>
            <p className="calc-results-title">{t('features.taxBenefitsTitle')}</p>

            <p className="calc-main-label">{t('features.yearlyTaxBenefit')}</p>
            <p className="calc-main-value">{formatCurrency(steuervorteilJaehrlich)}</p>

            <dl>
              <div className="calc-result-row">
                <dt>{t('features.monthlyTaxBenefit')}</dt>
                <dd>{formatCurrency(steuervorteilMonatlich)}</dd>
              </div>
            </dl>

            <p className="calc-balance-title">{t('features.results')}</p>
            <dl>
              <div className="calc-result-row">
                <dt>{t('features.cashflowMonthly')}</dt>
                <dd>{formatCurrency(cashflow)}</dd>
              </div>
              <div className="calc-result-row">
                <dt>{t('features.cashflowFirstYear')}</dt>
                <dd>{formatCurrency(cashflowJaehrlich)}</dd>
              </div>
            </dl>

            <div className="calc-results-cta">
              <p>{t('features.resultsCta')}</p>
              <Link to="/formular">
                <HoverButton
                  startColor="#b87333"
                  endColor="#e0ac69"
                  animationIntensity="medium"
                  className="hero-animated-button"
                >
                  {t('features.ctaButton')}
                </HoverButton>
              </Link>
            </div>
          </div>
          </div>
        </div>

        <div className="calc-assumptions">
          <div>
            <h3 className="calc-group-title">{t('features.fixedParameters')}</h3>
            <dl className="calc-assumption-list">
              <div className="calc-assumption-row">
                <dt>{t('features.acquisitionCosts')}</dt>
                <dd>{anschaffungskostenProzent}%</dd>
              </div>
              <div className="calc-assumption-row">
                <dt>{t('features.interestRate')}</dt>
                <dd>{zinssatz}%</dd>
              </div>
              <div className="calc-assumption-row">
                <dt>{t('features.repayment')}</dt>
                <dd>{tilgung}%</dd>
              </div>
              <div className="calc-assumption-row">
                <dt>{t('features.managementCosts')}</dt>
                <dd>{formatCurrency(verwaltungskosten)}</dd>
              </div>
              <div className="calc-assumption-row">
                <dt>{t('features.taxRate')}</dt>
                <dd>{steuersatz}%</dd>
              </div>
              <div className="calc-assumption-row">
                <dt>{t('features.buildingShare')}</dt>
                <dd>{afaAnteil}%</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="calc-group-title">{t('features.costsFinancing')}</h3>
            <dl className="calc-assumption-list">
              <div className="calc-assumption-row">
                <dt>{t('features.acquisitionCostsResult')}</dt>
                <dd>{formatCurrency(anschaffungskosten)}</dd>
              </div>
              <div className="calc-assumption-row">
                <dt>{t('features.interestAmount')} ({zinssatz}%)</dt>
                <dd>{formatCurrency(zinsbetrag)}</dd>
              </div>
              <div className="calc-assumption-row calc-assumption-row--total">
                <dt>{t('features.monthlyBankRate')}</dt>
                <dd>{formatCurrency(monatlicheBankrate)}</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="calc-disclaimer">{t('features.disclaimer')}</p>

        <div ref={ctaRef} className="calc-closing">
          <div>
            <h3 className="calc-closing-title">{t('features.ctaTitle')}</h3>
            <p className="calc-closing-text">{t('features.ctaText')}</p>
          </div>
          <Link to="/formular" className="calc-closing-link">
            <HoverButton
              startColor="#b87333"
              endColor="#e0ac69"
              animationIntensity="medium"
              className="hero-animated-button"
            >
              {t('features.ctaButton')}
            </HoverButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
