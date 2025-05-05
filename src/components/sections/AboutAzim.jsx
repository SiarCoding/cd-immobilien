import React from 'react';
import '../../styles/AboutAzim.css';

const ChallengesSolutions = () => {
  // Herausforderungen Daten
  const challenges = [
    {
      title: "Entfernung & Lageunsicherheit",
      description: "Viele Einsteiger fürchten, wie weit sie von ihrem Objekt entfernt sind",
      icon: (
        <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#082567"/>
        </svg>
      )
    },
    {
      title: "Sanierungsstau & versteckte Kosten",
      description: "Unerwartete Modernisierungskosten wirken abschreckend",
      icon: (
        <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 17H13V11H11V17ZM12 9C12.55 9 13 8.55 13 8C13 7.45 12.55 7 12 7C11.45 7 11 7.45 11 8C11 8.55 11.45 9 12 9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#082567"/>
        </svg>
      )
    },
    {
      title: "Komplexe Steuer- und Finanzregeln",
      description: "Steuerliche Fallstricke verunsichern Interessenten",
      icon: (
        <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM9 17H6C5.45 17 5 16.55 5 16C5 15.45 5.45 15 6 15H9C9.55 15 10 15.45 10 16C10 16.55 9.55 17 9 17ZM9 13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H9C9.55 11 10 11.45 10 12C10 12.55 9.55 13 9 13ZM9 9H6C5.45 9 5 8.55 5 8C5 7.45 5.45 7 6 7H9C9.55 7 10 7.45 10 8C10 8.55 9.55 9 9 9ZM18 17H13C12.45 17 12 16.55 12 16C12 15.45 12.45 15 13 15H18C18.55 15 19 15.45 19 16C19 16.55 18.55 17 18 17ZM18 13H13C12.45 13 12 12.55 12 12C12 11.45 12.45 11 13 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13ZM18 9H13C12.45 9 12 8.55 12 8C12 7.45 12.45 7 13 7H18C18.55 7 19 7.45 19 8C19 8.55 18.55 9 18 9Z" fill="#082567"/>
        </svg>
      )
    },
    {
      title: "Intransparenter Prozess",
      description: "Unklar, welche Schritte nötig sind",
      icon: (
        <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="#082567"/>
        </svg>
      )
    }
  ];

  // Lösungen Daten
  const solutions = [
    {
      title: "Volle Prozess-Transparenz",
      description: "Detaillierter 6-Schritte-Fahrplan, jederzeit online einsehbar",
      icon: (
        <svg className="solution-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#b87333"/>
        </svg>
      )
    },
    {
      title: "Keine versteckten Kosten",
      description: "Null Provision für Käufer, klare Gebührenstruktur",
      icon: (
        <svg className="solution-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 6.9C11.93 6.9 11.5 7.34 11.5 7.9V8.9H13.5V7.9C13.5 7.34 13.07 6.9 12.5 6.9ZM18.5 12V3C18.5 1.9 17.6 1 16.5 1H8.5C7.4 1 6.5 1.9 6.5 3V12C6.5 13.1 7.4 14 8.5 14H16.5C17.6 14 18.5 13.1 18.5 12ZM16.5 12H8.5V3H16.5V12ZM11.5 11.9H13.5V9.9H11.5V11.9ZM5 16H19C19.55 16 20 16.45 20 17C20 17.55 19.55 18 19 18H5C4.45 18 4 17.55 4 17C4 16.45 4.45 16 5 16ZM7 20H17C17.55 20 18 20.45 18 21C18 21.55 17.55 22 17 22H7C6.45 22 6 21.55 6 21C6 20.45 6.45 20 7 20Z" fill="#b87333"/>
        </svg>
      )
    },
    {
      title: "After-Sales-Management & Garantie",
      description: "5-Jahres-Vermietungsgarantie und Vermietercoaching inklusive",
      icon: (
        <svg className="solution-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="#b87333"/>
        </svg>
      )
    },
    {
      title: "Digitale Tools & Dashboard",
      description: "Echtzeit-Datenanalyse, ROI-Stresstests und Live-Bonitätsprüfung",
      icon: (
        <svg className="solution-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#b87333"/>
        </svg>
      )
    }
  ];

  return (
    <section className="challenges-section">
      <div className="challenges-container">
        <div className="challenges-header">
          <h2 className="section-title">Herausforderungen <span className="highlight-copper">&</span> <span className="highlight-blue">Lösungen</span></h2>
          <p className="section-description">Wir kennen die typischen Hürden beim Immobilienkauf und haben für jede Herausforderung die passende Lösung.</p>
        </div>
        
        <div className="challenges-solutions-wrapper">
          {/* Herausforderungen */}
          <div className="challenges-column">
            <h3 className="column-title">Herausforderungen</h3>
            <div className="cards-container challenges-cards">
              {challenges.map((challenge, index) => (
                <div className="glass-card challenge-card" key={`challenge-${index}`}>
                  <div className="card-icon challenge-icon-container">
                    {challenge.icon}
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">{challenge.title}</h4>
                    <p className="card-description">{challenge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Lösungen */}
          <div className="solutions-column">
            <h3 className="column-title">Lösungen</h3>
            <div className="cards-container solutions-cards">
              {solutions.map((solution, index) => (
                <div className="glass-card solution-card" key={`solution-${index}`}>
                  <div className="card-icon solution-icon-container">
                    {solution.icon}
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">{solution.title}</h4>
                    <p className="card-description">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSolutions;
