import React from "react";
import "../../styles/Investment.css";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

const Investment = () => {
  const { t } = useLanguage();
  
  // Immobilienpreisentwicklung Deutschland 1975-2025 (Nominalindex) - Exakte Werte aus Screenshot
  const immobilienPreisData = [
    { year: 1975, preis: 52 },
    { year: 1976, preis: 58 },
    { year: 1977, preis: 62 },
    { year: 1978, preis: 68 },
    { year: 1979, preis: 72 },
    { year: 1980, preis: 76 },
    { year: 1981, preis: 78 },
    { year: 1982, preis: 80 },
    { year: 1983, preis: 82 },
    { year: 1984, preis: 84 },
    { year: 1985, preis: 78 },
    { year: 1986, preis: 76 },
    { year: 1987, preis: 78 },
    { year: 1988, preis: 80 },
    { year: 1989, preis: 82 },
    { year: 1990, preis: 84 },
    { year: 1991, preis: 86 },
    { year: 1992, preis: 88 },
    { year: 1993, preis: 92 },
    { year: 1994, preis: 96 },
    { year: 1995, preis: 100 },
    { year: 1996, preis: 102 },
    { year: 1997, preis: 103 },
    { year: 1998, preis: 102 },
    { year: 1999, preis: 101 },
    { year: 2000, preis: 100 },
    { year: 2001, preis: 99 },
    { year: 2002, preis: 98 },
    { year: 2003, preis: 97 },
    { year: 2004, preis: 96 },
    { year: 2005, preis: 95 },
    { year: 2006, preis: 96 },
    { year: 2007, preis: 98 },
    { year: 2008, preis: 100 },
    { year: 2009, preis: 99 },
    { year: 2010, preis: 100 },
    { year: 2011, preis: 102 },
    { year: 2012, preis: 105 },
    { year: 2013, preis: 108 },
    { year: 2014, preis: 112 },
    { year: 2015, preis: 116 },
    { year: 2016, preis: 120 },
    { year: 2017, preis: 125 },
    { year: 2018, preis: 132 },
    { year: 2019, preis: 140 },
    { year: 2020, preis: 162 },
    { year: 2021, preis: 175 },
    { year: 2022, preis: 185 },
    { year: 2023, preis: 190 },
    { year: 2024, preis: 196 },
    { year: 2025, preis: 202 }
  ];

  return (
    <section className="investment-section">
      <div className="investment-container">
        <div className="section-heading">
          <span className="highlight-blue highlight-text-white">{t('investment.title')}</span> {t('investment.titleHighlight')}
        </div>
        
        <div className="investment-content">
          <div className="investment-text-container">
            <div className="investment-text">
              <p className="section-text">
                {t('investment.description')}
              </p>
              <div className="investment-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">{t('investment.feature1')}</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">{t('investment.feature2')}</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">{t('investment.feature3')}</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">{t('investment.feature4')}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="investment-chart-container">
            <div className="chart-header">
              <h3 className="chart-title">{t('investment.chartTitle')}</h3>
              <p className="chart-subtitle">{t('investment.chartSubtitle')}</p>
            </div>
            
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                  data={immobilienPreisData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorImmobilien" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e2ac6b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#e2ac6b" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: '#fff', fontSize: 12 }} 
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                  />
                  <YAxis 
                    tick={{ fill: '#fff', fontSize: 12 }} 
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                    domain={[40, 210]}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
                  <Tooltip 
                    formatter={(value) => [`${value}`, t('investment.chart.priceIndex')]}
                    labelFormatter={(year) => `${t('investment.chart.year')} ${year}`}
                    contentStyle={{ 
                      backgroundColor: 'rgba(8, 37, 103, 0.95)',
                      border: '1px solid #e2ac6b',
                      borderRadius: '8px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="preis" 
                    stroke="#e2ac6b" 
                    strokeWidth={3}
                    fill="url(#colorImmobilien)" 
                    activeDot={{ r: 8, fill: '#e2ac6b', stroke: '#fff', strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investment; 