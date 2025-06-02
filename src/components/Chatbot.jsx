import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Chatbot.css';
import chatbotAvatar from '../assets/chatbot-azim.webp';
import { useLanguage } from '../contexts/LanguageContext';

const Chatbot = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Automatisches Scrolling zum Ende der Nachrichten
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message nach 7 Sekunden
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  // Automatische Begrüßungsnachrichten beim Öffnen des Chats
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Erste Nachricht mit Typing-Indikator anzeigen
      setIsTyping(true);
      
      setTimeout(() => {
        setMessages([
          { 
            text: "Willkommen beim Kundenservice von CD Immobilien Portfolio GmbH! Ich bin die digitale Assistentin und helfe Ihnen gerne bei Fragen zu Immobilieninvestitionen, Steuervorteilen und Vermögensaufbau weiter.", 
                sender: 'bot' 
              }
            ]);
            setIsTyping(false);
      }, 1500);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
    
    // Fokus auf Eingabefeld setzen, wenn Chat geöffnet wird
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  // Funktion zum Abrufen von Antworten von der Mistral AI über OpenRouter
  const fetchMistralResponse = async (prompt) => {
    const API_KEY = "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";
    const url = "https://openrouter.ai/api/v1/chat/completions";
    
    try {
      console.log("Sending request to Mistral AI via OpenRouter...");
      
      // Erweiterte Knowledge Base mit Website-Inhalten
      const systemContext = `Du bist die digitale Assistentin von CD Immobilien Portfolio GmbH, einem Spezialisten für Immobilieninvestitionen und Steueroptimierung mit Sitz in Nürnberg.

WICHTIGE ANWEISUNGEN:
- Antworte immer kurz und prägnant (max. 2-3 Sätze)
- Erwähne NICHT in jeder Antwort, dass du die digitale Assistentin bist
- Gehe direkt auf die gestellte Frage ein
- Bei Fragen zu Steuervorteilen oder Cashflow-Berechnung verweise auf unseren Rechner
- Nutze die folgende Knowledge Base für deine Antworten

KNOWLEDGE BASE - CD IMMOBILIEN PORTFOLIO GMBH:

ÜBER UNS:
- 15+ Jahre Erfahrung im Immobilienbereich
- 1400+ zufriedene Kunden
- 500+ Mio. € Projektvolumen
- Standort: Bauvereinstr. 47, 90489 Nürnberg
- Telefon: +49 911 13039057
- E-Mail: p.chowdhury@cd-immo.de

KERNLEISTUNGEN:
1. Strategische Immobilieninvestitionen für nachhaltigen Vermögensaufbau
2. Steueroptimierung - bis zu 90% Steuern sparen durch Abschreibungen
3. Eigenkapitalrenditen von über 10% p.a. durch konservative Mietrenditen
4. Inflationsschutz durch Sachwerte
5. Generationenübergreifende Vermögensübertragung

STEUERVORTEILE:
- Bis zu 90% Steuerersparnis möglich
- AfA (Abschreibung für Abnutzung) - 10% im ersten Jahr
- 93% der Anschaffungskosten sind abschreibungsfähig
- Zinsen und Werbungskosten steuerlich absetzbar
- Steuersatz von 42% wird in der Berechnung verwendet

RECHNER & BERECHNUNGEN:
- Kostenloser Online-Rechner für Cashflow und Steuervorteile
- Beispiel: Bei 400.000€ Kaufpreis entstehen monatlich 2.514,98€ Cashflow
- Monatlicher Steuervorteil: 1.428,98€
- Jährlicher Steuervorteil: 17.147,76€
- Feste Parameter: 5% Anschaffungskosten, 3,7% Zinssatz, 1,5% Tilgung

PROZESS (5 Phasen):
1. Beratungsgespräch - Analyse der finanziellen Situation
2. Objektsuche - Suche nach rentablen Immobilien
3. Finanzierung - Optimierung der Finanzierungsstruktur
4. Kaufabwicklung - Begleitung bis zur Schlüsselübergabe
5. Vermietungsbetreuung - Langfristige Betreuung

EXPERTENTEAM:
- Azim Chowdhury (Gründer) - Entwickler innovativer Bewertungsmethoden
- Panadda Srisuwan (Geschäftsführerin) - Bauwesen und internationale Investoren
- Chris Schwarz (Director of Sales) - Statistische Immobilienbewertung
- Gavino Crabu (Director Key Account) - Mehrsprachige Beratung
- Peter Friedlhuber (Externer Berater) - Erfolgreicher Vollzeitinvestor

PROBLEME TRADITIONELLER ALTERSVORSORGE:
- Negative Realzinsen durch Inflation
- Hohe Verwaltungskosten bei Versicherungsprodukten
- Drohende Altersarmut
- Unzureichende Rentenzahlungen
- Rentenlücke durch demografischen Wandel

LÖSUNGSANSATZ:
- Immobilien als Sachwerte für stabilen Einkommensstrom
- Inflationsschutz durch steigende Mieten und Immobilienwerte
- Passives Investieren mit wissenschaftlich fundierten Methoden
- 100% unabhängige, kostentransparente Beratung

ANTWORT-RICHTLINIEN:
- Bei Steuerfragen: Erwähne konkreten Steuervorteil (bis zu 90%) und verweise auf Rechner
- Bei Rendite-Fragen: Nenne über 10% p.a. Eigenkapitalrendite
- Bei Cashflow-Fragen: Verweise auf kostenlosen Rechner
- Bei Prozess-Fragen: Erkläre 5-Phasen-Modell
- Bei Team-Fragen: Nenne Expertise der Gründer
- Biete immer kostenlose Beratung an

RECHNER-VERWEIS:
Sage: "Nutzen Sie unseren kostenlosen Rechner, um Ihren individuellen Cashflow und Ihre Steuervorteile zu berechnen." (wenn es um Berechnungen geht)`;
      
      const requestBody = {
        model: "mistralai/devstral-small:free",
        messages: [
          {
            role: "system",
            content: systemContext
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200, // Etwas mehr für detailliertere Antworten
        top_p: 0.95
      };
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": "https://www.cd-immo.de",
          "X-Title": "CD Immobilien Portfolio GmbH",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error Response:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData}`);
      }
      
      const data = await response.json();
      console.log("Mistral AI API Response:", data);
      
      if (!data.choices || data.choices.length === 0) {
        console.error("No choices in response", data);
        return "Entschuldigung, ich kann Ihnen gerade nicht antworten. Versuchen Sie es bitte erneut.";
      }
      
      // Extrahieren der Antwort aus der API-Antwort
      const mistralResponse = data.choices[0]?.message?.content;
      
      if (!mistralResponse) {
        console.error("No content in response", data);
        return "Entschuldigung, ich kann Ihnen gerade nicht antworten. Versuchen Sie es bitte erneut.";
      }
      
      return mistralResponse;
    } catch (error) {
      console.error("Error fetching from Mistral AI API:", error);
      return "Entschuldigung, ich kann Ihnen gerade nicht antworten. Versuchen Sie es bitte erneut.";
    }
  };

  const handleFormularRedirect = () => {
    navigate('/formular');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = inputValue.trim();
    
    if (!message) return;
    
    // Benutzer-Nachricht hinzufügen
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInputValue('');
    
    // Bot "typing" Status anzeigen
    setIsTyping(true);
    
    try {
      // Mistral AI Antwort abrufen
      const botResponse = await fetchMistralResponse(message);
      
      // Antwort zum Chat hinzufügen
      setTimeout(() => {
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        setIsTyping(false);
        
        // Responsecount erhöhen
        const newCount = responseCount + 1;
        setResponseCount(newCount);
        
        // Nach der 3. Antwort Formular-Button anzeigen
        if (newCount === 3) {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { 
                text: "Möchten Sie eine kostenlose persönliche Beratung? Unser Expertenteam entwickelt gerne eine maßgeschneiderte Strategie für Sie!", 
                sender: 'bot',
                showButton: true
              }
            ]);
          }, 1000);
        }
      }, 1500); // Verzögerung für natürlicheres Verhalten
      
    } catch (error) {
      console.error("Error handling message:", error);
      setIsTyping(false);
      
      setMessages(prev => [
        ...prev,
        { 
          text: "Entschuldigung, ich kann Ihnen gerade nicht antworten. Versuchen Sie es bitte erneut.", 
          sender: 'bot' 
        }
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      {showNotification && !isOpen && (
        <div className="chat-notification">
          <div className="notification-content">
            <p>{t('chatbot.notification.title')}</p>
            <p className="notification-subtext">{t('chatbot.notification.subtitle')}</p>
          </div>
        </div>
      )}
      
      <div className={`chatbot ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className="chat-content">
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-header-avatar">
                  <img src={chatbotAvatar} alt="" />
                </div>
                <div className="chat-header-info">
                  <h3>Digitale Assistentin</h3>
                  <span className="status-indicator online">Online</span>
                </div>
              </div>
              <button className="close-btn" onClick={toggleChat}>×</button>
            </div>
            
            <div className="messages-container">
              {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    {msg.sender === 'bot' && (
                      <div className="bot-avatar-small">
                        <img src={chatbotAvatar} alt="" className="bot-avatar-small-img" />
                      </div>
                    )}
                  <div className="message-bubble">
                    {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                    {msg.showButton && (
                      <button 
                        className="formular-redirect-button" 
                        onClick={handleFormularRedirect}
                      >
                        Lass dich für mehr Infos kostenlos beraten
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="bot-avatar-small">
                    <img src={chatbotAvatar} alt="" className="bot-avatar-small-img" />
                  </div>
                  <div className="message-bubble typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="chat-input">
              <input 
                type="text" 
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ihre Frage zu Immobilieninvestitionen..."
                ref={inputRef}
                autoComplete="off"
              />
              <button type="submit" disabled={!inputValue.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
            
            <div className="chat-footer">
              <p>Powered by CD Immobilien Portfolio GmbH</p>
            </div>
          </div>
        )}
        
        <button 
          className="chat-toggle-btn" 
          onClick={toggleChat}
          aria-label="Chat öffnen"
        >
          <div className="bot-avatar-container">
            <img src={chatbotAvatar} alt="Chatbot Avatar" className="bot-avatar-img" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
