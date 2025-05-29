import React, { useState } from "react";
import "../../styles/Faq.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { PhoneCall, ChevronDown } from "lucide-react";

const Faq = () => {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState(0);

  // FAQ-Daten aus den Übersetzungen holen
  const faqData = t('faq.questions');

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-container">
        <div className="faq-grid">
          {/* Left Column - Content */}
          <div className="faq-content">
            <div className="faq-content-inner">
              <div className="faq-text-content">
                <h2 className="faq-title">
                  {t('faq.title')}
                </h2>
                <p className="faq-description">
                  {t('faq.subtitle')}
                </p>
              </div>
              <button className="faq-contact-btn">
                <span>{t('faq.button')}</span>
                <PhoneCall className="faq-btn-icon" />
              </button>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="faq-accordion">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${expandedIndex === index ? 'faq-item-expanded' : ''}`}
              >
                <button 
                  className="faq-trigger"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="faq-question-text">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`faq-chevron ${expandedIndex === index ? 'faq-chevron-rotated' : ''}`}
                  />
                </button>
                <div className={`faq-content-wrapper ${expandedIndex === index ? 'faq-content-expanded' : ''}`}>
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
