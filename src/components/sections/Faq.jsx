import React, { useState } from "react";
import "../../styles/Faq.css";

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqData = [
    {
      question: "Was macht CD Immobilien Portfolio GmbH einzigartig?",
      answer: "Als CD Immobilien Portfolio GmbH bieten wir einen ganzheitlichen Ansatz zur Immobilieninvestition. Wir kombinieren Expertise in Steueroptimierung, nachhaltiger Vermögensplanung und strategischer Immobilienauswahl. Unser Team aus Experten begleitet Sie von der ersten Beratung bis zur langfristigen Betreuung Ihrer Investition."
    },
    {
      question: "Welche steuerlichen Vorteile bieten Immobilieninvestitionen?",
      answer: "Immobilieninvestitionen bieten zahlreiche steuerliche Vorteile, darunter die AfA (Absetzung für Abnutzung), die es ermöglicht, die Anschaffungskosten über die Nutzungsdauer abzuschreiben. Zusätzlich können Werbungskosten wie Zinsen, Instandhaltungskosten und Verwaltungskosten steuerlich geltend gemacht werden. Bei Neubauten ab 2023 profitieren Sie von der erhöhten linearen AfA von 3% oder der degressiven AfA. Wir beraten Sie individuell, wie Sie diese Vorteile optimal nutzen können."
    },
    {
      question: "Für wen eignen sich unsere Immobilieninvestments?",
      answer: "Unsere Immobilieninvestments eignen sich für Privatanleger und Unternehmer, die nachhaltig Vermögen aufbauen möchten und dabei von Steuervorteilen profitieren wollen. Besonders geeignet sind unsere Angebote für Personen mit hohem Einkommensteuersatz, die eine langfristige Anlagestrategie verfolgen und ihre finanzielle Zukunft absichern möchten. Auch für Personen, die für den Ruhestand vorsorgen oder ein passives Einkommen aufbauen wollen, bieten wir maßgeschneiderte Lösungen."
    },
    {
      question: "Wie läuft der Investitionsprozess mit uns ab?",
      answer: "Der Investitionsprozess beginnt mit einer kostenfreien Erstberatung, in der wir Ihre finanziellen Ziele und Möglichkeiten analysieren. Anschließend erarbeiten wir ein personalisiertes Investitionskonzept und präsentieren Ihnen passende Immobilienobjekte. Nach Ihrer Entscheidung begleiten wir Sie durch den gesamten Kaufprozess, inklusive Finanzierungsberatung, Vertragsgestaltung und steuerlicher Optimierung. Auch nach dem Kauf stehen wir Ihnen mit unserem Vermietungs- und Verwaltungsservice zur Seite."
    },
    {
      question: "Welche Renditen können mit Immobilieninvestitionen erzielt werden?",
      answer: "Die Renditen bei Immobilieninvestitionen setzen sich aus Mietrendite und potentieller Wertsteigerung zusammen. In unseren ausgewählten Standorten erreichen Kunden typischerweise Mietrenditen zwischen 3-5% jährlich. Unter Berücksichtigung der steuerlichen Vorteile und der langfristigen Wertsteigerung können sich effektive Gesamtrenditen von 6-8% oder mehr ergeben. Die genaue Rendite hängt jedoch vom individuellen Objekt, der Finanzierungsstruktur und Ihrer persönlichen Steuersituation ab. In unserer detaillierten Beratung erstellen wir für Sie eine fundierte Renditeprognose."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="centered-content">
        <div className="faq-header">
          <div className="section-heading">Häufig gestellte Fragen</div>
          <div className="section-text">
            Erfahren Sie mehr über Immobilieninvestitionen, Steuervorteile und 
            unsere Dienstleistungen. Bei weiteren Fragen steht Ihnen unser 
            Expertenteam gerne zur Verfügung.
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
          Beratungstermin vereinbaren
        </button>
      </div>
    </div>
  );
};

export default Faq;
