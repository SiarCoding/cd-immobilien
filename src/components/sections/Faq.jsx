import React, { useState } from "react";
import "../../styles/Faq.css";
import { useLanguage } from "../../contexts/LanguageContext";

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
      <div className="centered-content">
        <div className="faq-header">
          <div className="section-heading">{t('faq.title')}</div>
          <div className="section-text">
            {t('faq.subtitle')}
          </div>
        </div>
      </div>
      <div className="faq-container">
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${expandedIndex === index ? 'faq-item-expanded' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <div className="faq-question-text">
                  {faq.question}
                </div>
                <div className={expandedIndex === index ? 'faq-minus-icon' : 'faq-plus-icon'}></div>
              </div>
              {expandedIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="contact-btn">
          {t('faq.button')}
        </button>
      </div>
    </div>
  );
};

export default Faq;
