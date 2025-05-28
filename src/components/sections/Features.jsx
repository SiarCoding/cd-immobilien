import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Features.css';
import apartmentBg from '../../assets/apartment.png';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

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

// Vorteilskarte für die Frontansicht
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
  const [kaufpreis, setKaufpreis] = useState(400000);
  const [flaeche, setFlaeche] = useState(77);
  const [kaltmiete, setKaltmiete] = useState(1126);
  const [qualitaetsstufe, setQualitaetsstufe] = useState(0.70); // QNG Qualität als Standard

  // Feste Werte
  const anschaffungskostenProzent = 5;
  const zinssatz = 3.7;
  const tilgung = 1.5;
  const verwaltungskosten = 40;
  const steuersatz = 42;
  const afaAnteil = 93;
  const afaSatz = 10; // 10% im ersten Jahr

  // Berechnete Werte
  const [anschaffungskosten, setAnschaffungskosten] = useState(0);
  const [zinsbetrag, setZinsbetrag] = useState(0);
  const [tilgungsbetrag, setTilgungsbetrag] = useState(0);
  const [monatlicheBankrate, setMonatlicheBankrate] = useState(0);
  const [instandhaltungsruecklage, setInstandhaltungsruecklage] = useState(0);
  const [afaAnschaffungskosten, setAfaAnschaffungskosten] = useState(0);
  const [afaSatzBetrag, setAfaSatzBetrag] = useState(0);
  const [zws, setZws] = useState(0);
  const [absetzung, setAbsetzung] = useState(0);
  const [steuervorteilMonatlich, setSteuervorteilMonatlich] = useState(0);
  const [steuervorteilJaehrlich, setSteuervorteilJaehrlich] = useState(0);
  const [cashflow, setCashflow] = useState(0);
  
  // Chart-Daten
  const [chartData, setChartData] = useState([]);

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

    // ZWS (Zwischensumme): G2 - H2 - I2 - E2 (Kaltmiete - Verwaltung - Instandhaltung - Bankrate)
    const zwischensumme = kaltmieteValue - verwaltungskosten - instand - bankrate;
    setZws(zwischensumme);

    // Absetzung: K2-C2 + ((G2-H2)*12) (AfA Satz - Zinsbetrag + ((Kaltmiete - Verwaltung)*12))
    const absetz = afaSatzBetr - zins + ((kaltmieteValue - verwaltungskosten) * 12);
    setAbsetzung(absetz);

    // Steuervorteil (Monatlich): -M2*0.42/12 (negativ von Absetzung!)
    const steuervorteilMon = (-absetz * 0.42) / 12;
    setSteuervorteilMonatlich(steuervorteilMon);

    // Steuervorteil (Jährlich): N2*12
    const steuervorteilJahr = steuervorteilMon * 12;
    setSteuervorteilJaehrlich(steuervorteilJahr);

    // Cashflow: N2+L2 (Steuervorteil monatlich + ZWS)
    const cf = steuervorteilMon + zwischensumme;
    setCashflow(cf);
    
    // Chart-Daten für 30 Jahre
    const data = [];
    let kumulativerCashflow = 0;
    
    for (let jahr = 1; jahr <= 30; jahr++) {
      kumulativerCashflow += cf * 12;
      
      if (jahr === 1 || jahr % 5 === 0 || jahr === 30) {
        data.push({
          year: jahr,
          monatlicherCashflow: cf,
          kumulativerCashflow: kumulativerCashflow,
          steuervorteilJaehrlich: steuervorteilJahr,
        });
      }
    }
    
    setChartData(data);
    
  }, [kaufpreis, flaeche, kaltmiete, qualitaetsstufe]);

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
                    <InfoIcon tooltip={t('features.purchasePriceTooltip')} />
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
                    <InfoIcon tooltip={t('features.coldRentTooltip')} />
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
              </div>
              </div>
            </div>
            
            <div ref={resultsRef} className="calculator-right-panel">
              <h3 className="results-heading">{t('features.resultsHeading')}</h3>
              
              <div className="results-grid">
                <div className="results-left-column">
                  <div className="result-category">
                    <h4 className="category-title">{t('features.costsFinancing')}</h4>
                    <div className="result-item">
                      <span className="result-label">{t('features.acquisitionCostsResult')}</span>
                      <span className="result-value">{formatCurrency(anschaffungskosten)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">{t('features.interestAmount')}</span>
                      <span className="result-value">{formatCurrency(zinsbetrag)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">{t('features.repaymentAmount')}</span>
                      <span className="result-value">{formatCurrency(tilgungsbetrag)}</span>
                    </div>
                    <div className="result-item highlight">
                      <span className="result-label">{t('features.monthlyBankRate')}</span>
                      <span className="result-value">{formatCurrency(monatlicheBankrate)}</span>
                    </div>
                  </div>

                  <div className="result-category">
                    <h4 className="category-title">{t('features.runningCosts')}</h4>
                    <div className="result-item">
                      <span className="result-label">{t('features.managementCostsResult')}</span>
                      <span className="result-value">{formatCurrency(verwaltungskosten)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">{t('features.maintenanceReserve')}</span>
                      <span className="result-value">{formatCurrency(instandhaltungsruecklage)}</span>
                    </div>
                  </div>

                  <div className="result-category">
                    <h4 className="category-title">{t('features.results')}</h4>
                    <div className="result-item">
                      <span className="result-label">{t('features.zws')}</span>
                      <span className="result-value">{formatCurrency(zws)}</span>
                    </div>
                    <div className="result-item final-result">
                      <span className="result-label">{t('features.cashflowMonthly')}</span>
                      <span className="result-value">{formatCurrency(cashflow)}</span>
                    </div>
                  </div>
                </div>

                <div className="results-right-column">
                  <div className="tax-benefits-overview">
                    <h4 className="benefits-main-title">{t('features.taxBenefitsTitle')}</h4>
                    
                    <div className="benefit-highlight-card">
                      <div className="benefit-amount">
                        <span className="benefit-label">{t('features.monthlyTaxBenefit')}</span>
                        <span className="benefit-value">{formatCurrency(steuervorteilMonatlich)}</span>
                      </div>
                      <div className="benefit-amount">
                        <span className="benefit-label">{t('features.yearlyTaxBenefit')}</span>
                        <span className="benefit-value">{formatCurrency(steuervorteilJaehrlich)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="tax-calculation-details">
                    <h4 className="details-title">{t('features.calculationBasis')}</h4>
                    
                    <div className="calculation-flow">
                      <div className="calc-step">
                        <span className="step-label">{t('features.afaBasis')}</span>
                        <span className="step-value">{formatCurrency(afaAnschaffungskosten)}</span>
                      </div>
                      
                      <div className="calc-arrow">↓</div>
                      
                      <div className="calc-step">
                        <span className="step-label">{t('features.yearlyAfa')}</span>
                        <span className="step-value negative">{formatCurrency(afaSatzBetrag)}</span>
                      </div>
                      
                      <div className="calc-arrow">↓</div>
                      
                      <div className="calc-step final-step">
                        <span className="step-label">{t('features.taxDeduction')}</span>
                        <span className="step-value">{formatCurrency(absetzung)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="cashflow-chart-container">
                <h4 className="chart-title">{t('features.cashflowDevelopment')}</h4>
                <div className="recharts-wrapper">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#e2ac6b" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#e2ac6b" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: '#fff' }} 
                        axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                      />
                      <YAxis 
                        tick={{ fill: '#fff' }} 
                        axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
                      />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <Tooltip 
                        formatter={(value) => [`${formatCurrency(value)}`, t('features.cumulativeCashflow')]}
                        labelFormatter={(year) => `${t('features.year')} ${year}`}
                        contentStyle={{ 
                          backgroundColor: 'rgba(8, 37, 103, 0.9)',
                          border: '1px solid #e2ac6b',
                          color: '#fff',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="kumulativerCashflow" 
                        name={t('features.cumulativeCashflow')}
                        stroke="#e2ac6b" 
                        strokeWidth={3}
                        fill="url(#colorCashflow)" 
                        activeDot={{ r: 8, fill: '#fff', stroke: '#e2ac6b' }}
                      />
                      <Legend 
                        wrapperStyle={{ color: '#fff', paddingTop: '10px' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="total-cashflow">
                  <div className="total-cashflow-label">{t('features.cumulativeCashflow30')}</div>
                  <div className="total-cashflow-value">{formatCurrency(cashflow * 12 * 30)}</div>
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
              {t('features.ctaText')}
            </p>
            <button className="cta-button">
              <span className="button-text">{t('features.ctaButton')}</span>
              <span className="button-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
