import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Features.css';
import apartmentBg from '../../assets/apartment.png';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

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
  // State für Immobilienwerte mit festen Werten für Grundstückanteil und Steuersatz
  const [propertyValue, setPropertyValue] = useState(500000);
  // Fester Grundstückanteil von 80% (typischer Wert im deutschen Immobilienmarkt)
  const buildingRatio = 80;
  const [buildingValue, setBuildingValue] = useState(400000);
  const [landValue, setLandValue] = useState(100000);
  const [constructionYear, setConstructionYear] = useState(2023);
  // Degressive Abschreibung mit 5%
  const afaRate = 5;

  // Fester Steuersatz von 42% (Spitzensteuersatz in Deutschland)
  const taxRate = 42;
  const [rentalIncome, setRentalIncome] = useState(24000);

  // State für Ergebnisse
  const [annualDepreciation, setAnnualDepreciation] = useState(0);
  const [taxSavings, setTaxSavings] = useState(0);
  const [totalTaxSavings, setTotalTaxSavings] = useState(0);
  const [effectiveYield, setEffectiveYield] = useState(0);
  
  // State für Chart-Daten
  const [chartData, setChartData] = useState([]);

  // Refs für Animation und Beobachtung
  const headingRef = useRef(null);
  const calculatorRef = useRef(null);
  const resultsRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRefs = useRef([]);

  // Setzt den Gebäudewert basierend auf dem festen Grundstückanteil
  const handlePropertyValueChange = (value) => {
    const newPropertyValue = parseFloat(value) || 0;
    setPropertyValue(newPropertyValue);
    const newBuildingValue = Math.round((newPropertyValue * buildingRatio) / 100);
    const newLandValue = newPropertyValue - newBuildingValue;
    setBuildingValue(newBuildingValue);
    setLandValue(newLandValue);
  };

  // Berechnet die jährliche AfA und Steuerersparnis
  useEffect(() => {
    // Berechne jährliche AfA mit festem Satz von 5%
    const yearlyAfa = Math.round(buildingValue * (afaRate / 100));
    setAnnualDepreciation(yearlyAfa);
    
    // Berechne jährliche Steuerersparnis basierend auf AfA und Steuersatz
    const yearlySaving = Math.round(yearlyAfa * (taxRate / 100));
    setTaxSavings(yearlySaving);
    
    // Berechne Gesamtersparnis über 30 Jahre (vereinfacht)
    const totalSavings = yearlySaving * 30;
    setTotalTaxSavings(totalSavings);
    
    // Berechne effektive Rendite basierend auf Mieteinnahmen und Steuerersparnis
    // Berücksichtige die jährlichen Mieteinnahmen direkt in der Renditeberechnung
    const yearlyReturn = ((rentalIncome * (taxRate / 100)) + yearlySaving) / propertyValue * 100;
    setEffectiveYield(parseFloat(yearlyReturn.toFixed(2)));
    
    // Daten für recharts vorbereiten
    const data = [];
    let cumulativeSavings = 0;
    
    for (let year = 1; year <= 30; year++) {
      cumulativeSavings += yearlySaving;
      
      // Nur für bestimmte Jahre (alle 5 Jahre) in die Daten für recharts einfügen
      if (year === 1 || year % 5 === 0 || year === 30) {
        data.push({
          year: year,
          yearlyTaxSaving: yearlySaving,
          cumulativeSavings: cumulativeSavings,
          yearlyDepreciation: yearlyAfa,
        });
      }
    }
    
    setChartData(data);
    
  }, [buildingValue, taxRate, propertyValue, rentalIncome]);

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
    
    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Formatiert Euro Währungswerte
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Wichtige Steuervorteile-Karten für moderne Darstellung
  const taxBenefitCards = [
    {
      title: "Jährliche Steuerersparnis",
      value: formatCurrency(taxSavings),
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V16M9 11H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "Pro Jahr sparen Sie direkt diese Summe an Steuern"
    },
    {
      title: "Steuerersparnis über 30 Jahre",
      value: formatCurrency(totalTaxSavings),
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15M3 3L6 6M18 6L21 3M8.5 20.001H15.5C19 20.001 20 18.001 20 15.501V8.50099C20 6.00099 19 4.00099 15.5 4.00099H8.5C5 4.00099 4 6.00099 4 8.50099V15.501C4 18.001 5 20.001 8.5 20.001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "Gesamte Steuerersparnis über die Abschreibungsdauer"
    },
    {
      title: "Effektive Rendite",
      value: `${effectiveYield.toFixed(2)}%`,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "Ihre echte Rendite inklusive Steuervorteile"
    }
  ];

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
          <span className="features-title-box">Immobilien-Rechner</span>
          <span className="features-subtitle">Berechne selber wie du mit unseren Immobilien <span className="underlined-special">profitieren</span> kannst</span>
        </h1>

        <div className="calculator-wrapper">
        <div ref={calculatorRef} className="calculator-container">
            <div className="calculator-left-panel">
              <div className="calculator-section">
                <h3 className="calculator-section-title">
                  <span className="calculator-section-icon">🏢</span>
                Immobiliendaten
              </h3>
              
                <div className="input-group modern-input">
                  <label htmlFor="property-value">
                    Gesamtkaufpreis
                    <InfoIcon tooltip="Geben Sie den Gesamtkaufpreis ein. Der Gebäudewert (80%) ist abschreibungsfähig, während der Grundstückswert (20%) nicht abgeschrieben werden kann." />
                  </label>
                <div className="input-with-currency">
                  <input
                    type="number"
                    id="property-value"
                    className="currency-input"
                    value={propertyValue}
                    onChange={(e) => handlePropertyValueChange(e.target.value)}
                    min="0"
                  />
                  <span className="currency-symbol">€</span>
                </div>
              </div>
              
                {/* Verbesserte Darstellung der Wertaufteilung */}
                <div className="property-division">
                  <div className="property-division-header">
                    <h4 className="property-division-title">Aufteilung des Kaufpreises</h4>
                    <p className="property-division-subtitle">Nur der Gebäudewert ist steuerlich abschreibbar</p>
                  </div>
                  
                  <div className="property-division-chart">
                    <div className="property-division-bar">
                      <div 
                        className="building-value" 
                        style={{width: `${buildingRatio}%`}}
                      >
                        <div className="value-label-container">
                          <span className="value-label">Gebäudewert:</span>
                          <span className="value-amount">{formatCurrency(buildingValue)}</span>
                        </div>
                      </div>
                      <div 
                        className="land-value" 
                        style={{width: `${100 - buildingRatio}%`}}
                      >
                        <div className="value-label-container">
                          <span className="value-label">Grundstück:</span>
                          <span className="value-amount">{formatCurrency(landValue)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="property-division-legend">
                      <div className="legend-item">
                        <span className="legend-marker building"></span>
                        <span className="legend-text">Abschreibungsfähig</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-marker land"></span>
                        <span className="legend-text">Nicht abschreibungsfähig</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-group modern-input">
                  <label htmlFor="construction-year">
                    Baujahr des Gebäudes
                    <InfoIcon tooltip="Das Baujahr des Gebäudes. Für degressive Abschreibung (5%) muss das Baujahr ab 2023 sein." />
                  </label>
                <select 
                  id="construction-year"
                  className="select-input"
                  value={constructionYear}
                    onChange={(e) => setConstructionYear(parseInt(e.target.value))}
                  >
                    <option value="2023">Neubau ab 2023</option>
                </select>
              </div>
            </div>
            
              <div className="calculator-section">
                <h3 className="calculator-section-title">
                  <span className="calculator-section-icon">💰</span>
                Steuerparameter
              </h3>
              
                <div className="tax-rate-display">
                  <div className="tax-rate-circle">
                    <div className="tax-rate-value">{taxRate}%</div>
                    <div className="tax-rate-label">Steuersatz</div>
                  </div>
                  <div className="tax-rate-info">
                    <p>Berechnung mit Spitzensteuersatz für maximalen Steuervorteil</p>
                  </div>
              </div>
              
                <div className="input-group modern-input">
                  <label htmlFor="rental-income">
                    Jährliche Mieteinnahmen (netto)
                    <InfoIcon tooltip="Ihre jährlichen Mieteinnahmen nach Abzug der Umlagen." />
                  </label>
                <div className="input-with-currency">
                  <input
                    type="number"
                    id="rental-income"
                    className="currency-input"
                    value={rentalIncome}
                    onChange={(e) => setRentalIncome(parseFloat(e.target.value) || 0)}
                    min="0"
                  />
                  <span className="currency-symbol">€</span>
                </div>
              </div>
              </div>
            </div>
            
            <div ref={resultsRef} className="calculator-right-panel">
              <h3 className="results-heading">Ihre Steuerersparnis im Überblick</h3>
              
              <div className="afa-info-box">
                <div className="afa-info-title">
                  <span className="afa-badge">5%</span> Degressive Abschreibung
              </div>
                <div className="afa-info-text">
                  <p>Mit der degressiven AfA von 5% p.a. in den ersten vier Jahren sparen Sie deutlich mehr Steuern als mit der linearen AfA von 3%.</p>
              </div>
              </div>
              
              <div className="financial-overview">
                <div className="financial-item">
                  <div className="financial-label">Jährliche AfA (Jahre 1-4)</div>
                  <div className="financial-value">{formatCurrency(annualDepreciation)}</div>
              </div>
                <div className="financial-item">
                  <div className="financial-label">Monatliche Steuerersparnis</div>
                  <div className="financial-value highlight">{formatCurrency(Math.round(taxSavings/12))}</div>
            </div>
              </div>
              
              <div className="tax-savings-chart-container">
                <h4 className="tax-savings-chart-title">Steuerersparnis über 30 Jahre</h4>
                <div className="recharts-wrapper">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
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
                        tickFormatter={(value) => `${value / 1000}k€`}
                      />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <Tooltip 
                        formatter={(value) => [`${formatCurrency(value)}`, 'Steuerersparnis']}
                        labelFormatter={(year) => `Jahr ${year}`}
                        contentStyle={{ 
                          backgroundColor: 'rgba(8, 37, 103, 0.9)',
                          border: '1px solid #e2ac6b',
                          color: '#fff',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cumulativeSavings" 
                        name="Kumulierte Steuerersparnis"
                        stroke="#e2ac6b" 
                        strokeWidth={3}
                        fill="url(#colorSavings)" 
                        activeDot={{ r: 8, fill: '#fff', stroke: '#e2ac6b' }}
                      />
                      <Legend 
                        wrapperStyle={{ color: '#fff', paddingTop: '10px' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="total-savings">
                  <div className="total-savings-label">Gesamte Steuerersparnis:</div>
                  <div className="total-savings-value">{formatCurrency(totalTaxSavings)}</div>
                </div>
              </div>
              
              <div className="tax-benefits-summary">
                <div className="tax-benefit-item">
                  <div className="tax-benefit-label">Jährliche Steuerersparnis</div>
                  <div className="tax-benefit-value">{formatCurrency(taxSavings)}</div>
                  <div className="tax-benefit-desc">Durch AfA und Berücksichtigung der Mieteinnahmen</div>
                </div>
                <div className="tax-benefit-item">
                  <div className="tax-benefit-label">Steuerersparnis über 30 Jahre</div>
                  <div className="tax-benefit-value">{formatCurrency(totalTaxSavings)}</div>
                  <div className="tax-benefit-desc">Gesamte Steuerersparnis über die Abschreibungsdauer</div>
                </div>
                <div className="tax-benefit-item">
                  <div className="tax-benefit-label">Effektive Rendite</div>
                  <div className="tax-benefit-value">{effectiveYield.toFixed(2)}%</div>
                  <div className="tax-benefit-desc">Ihre echte Rendite inklusive Steuervorteile</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call-to-Action */}
        <div ref={ctaRef} className="features-cta">
          <div className="cta-content">
            <h3 className="cta-heading">Optimieren Sie Ihre Steuervorteile</h3>
          <p className="cta-text">
              Lassen Sie sich von unseren Experten beraten, wie Sie mit cleveren Immobilieninvestitionen maximale Steuervorteile erzielen können.
            </p>
            <button className="cta-button">
              <span className="button-text">Beratungstermin vereinbaren</span>
              <span className="button-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
