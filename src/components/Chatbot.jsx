import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chatbot.css';
import chatbotAvatar from '../assets/chatbot-azim.webp';
import logoImg from '../assets/logo-csd.webp';
import { useLanguage } from '../contexts/LanguageContext';

const Chatbot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [askForName, setAskForName] = useState(false);
  const [askForPhone, setAskForPhone] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', phone: '' });
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
            text: t('chatbot.messages.welcome'), 
            sender: 'bot' 
          }
        ]);
        
        // Zweite Nachricht mit Verzögerung anzeigen
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { 
                text: t('chatbot.messages.intro'), 
                sender: 'bot' 
              }
            ]);
            setIsTyping(false);
          }, 1500);
        }, 800);
      }, 1500);
    }
  }, [isOpen, messages.length, t]);

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

  // Funktion zum Abrufen von Antworten von der Gemini API
  const fetchGeminiResponse = async (prompt) => {
    const API_KEY = "AIzaSyC-dB5kebL_AfOkQtWmTh3-4xAuA2tLxAU";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    
    try {
      console.log("Sending request to Gemini API...");
      
      const requestBody = {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };
      
      // Systemkontext mit Übersetzung in separatem Prompt hinzufügen
      const systemContext = `${t('chatbot.systemPrompt')}
      
      Die Frage lautet: ${prompt}`;
      
      // Den erweiterten Prompt in die Anfrage einfügen
      requestBody.contents[0].parts[0].text = systemContext;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error Response:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData}`);
      }
      
      const data = await response.json();
      console.log("Gemini API Response:", data);
      
      if (!data.candidates || data.candidates.length === 0) {
        console.error("No candidates in response", data);
        return t('chatbot.messages.error');
      }
      
      // Extrahieren der Antwort aus der API-Antwort
      const geminiResponse = data.candidates[0]?.content?.parts?.[0]?.text;
      
      if (!geminiResponse) {
        console.error("No text in response", data);
        return t('chatbot.messages.error');
      }
      
      return geminiResponse;
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      return t('chatbot.messages.error');
    }
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
    
    // Wenn im Lead-Generierungsprozess
    if (askForName) {
      setIsTyping(false);
      setLeadData({ ...leadData, name: message });
      setAskForName(false);
      setAskForPhone(true);
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            text: t('chatbot.messages.askPhone').replace('{name}', message), 
            sender: 'bot' 
          }
        ]);
      }, 500);
      
      return;
    }
    
    if (askForPhone) {
      setIsTyping(false);
      setLeadData({ ...leadData, phone: message });
      setAskForPhone(false);
      
      // Lead-Daten speichern (hier könnte man einen API-Call implementieren)
      console.log("Lead generiert:", { ...leadData, phone: message });
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            text: t('chatbot.messages.thankYou'), 
            sender: 'bot' 
          }
        ]);
      }, 500);
      
      return;
    }
    
    try {
      // Gemini API Antwort abrufen
      const botResponse = await fetchGeminiResponse(message);
      
      // Antwort zum Chat hinzufügen
      setTimeout(() => {
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        setIsTyping(false);
        
        // Responsecount erhöhen
        const newCount = responseCount + 1;
        setResponseCount(newCount);
        
        // Nach der zweiten Antwort nach Kontaktdaten fragen
        if (newCount === 2) {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { 
                text: t('chatbot.messages.askName'), 
                sender: 'bot' 
              }
            ]);
            setAskForName(true);
          }, 1500);
        }
      }, 1500); // Verzögerung für natürlicheres Verhalten
      
    } catch (error) {
      console.error("Error handling message:", error);
      setIsTyping(false);
      
      setMessages(prev => [
        ...prev,
        { 
          text: t('chatbot.messages.error'), 
          sender: 'bot' 
        }
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      {showNotification && !isOpen && (
        <div className="chat-notification">
          <div className="notification-avatar">
            <img src={chatbotAvatar} alt="" className="notification-avatar-img" />
          </div>
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
                  <h3>{t('chatbot.header.title')}</h3>
                  <span className="status-indicator online">{t('chatbot.header.status')}</span>
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
                placeholder={
                  askForName ? t('chatbot.placeholders.name') : 
                  askForPhone ? t('chatbot.placeholders.phone') : 
                  t('chatbot.placeholders.default')
                }
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
              <p>{t('chatbot.footer')}</p>
            </div>
          </div>
        )}
        
        <button 
          className="chat-toggle-btn" 
          onClick={toggleChat}
          aria-label={t('chatbot.ariaLabel')}
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
