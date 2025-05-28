import React, { useEffect, useRef } from 'react';
import '../../styles/Team.css';
import { useLanguage } from '../../contexts/LanguageContext';
// Importiere die Bilder aus dem assets-Ordner
import thaiImage from '../../assets/panadda.jpg';
import azimchoudryImage from '../../assets/azim3.jpg';
import chrisImage from '../../assets/chris.jpg';
import gavinoImage from '../../assets/gavino.jpg';
import mauriceImage from '../../assets/maurice.jpg';

// Kupfer-Effekt Komponente
const CopperBlurEffect = () => (
  <div className="team-copper-effect" style={{ top: '80%', opacity: 0.15, zIndex: -1 }}>
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

const Team = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const teamMembersRef = useRef([]);
  const observerRef = useRef(null);

  // Optimierte Animation beim Scrollen
  useEffect(() => {
    // Nur ein Observer für die gesamte Sektion
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('team-member-card')) {
              // Verzögerte Animation für sanfteres Erscheinen
              const index = parseInt(entry.target.dataset.index, 10);
              setTimeout(() => {
                if (entry.target) {
                  entry.target.classList.add('animate-in');
                }
              }, index * 100); // Verzögerung basierend auf Index
              
              // Nach Animationsstart nicht mehr beobachten
              observerRef.current.unobserve(entry.target);
            }
          }
        });
      },
      { 
        threshold: 0.1, // Reduzierter Schwellenwert für frühere Erkennung
        rootMargin: '0px 0px -50px 0px' // Weniger negativer Wert
      }
    );

    // Beobachte Team-Mitglieder
    teamMembersRef.current.forEach((member) => {
      if (member) observerRef.current.observe(member);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Team Mitglieder Daten
  const teamMembers = [
    {
      id: 1,
      name: t('team.members.panadda.name'),
      position: t('team.members.panadda.position'),
      bio: t('team.members.panadda.bio'),
      image: thaiImage,
      imagePosition: "center 25%", // Nach oben verschoben
      social: {
        linkedin: "https://linkedin.com",
        xing: "https://xing.com"
      }
    },
    {
      id: 2,
      name: t('team.members.azim.name'),
      position: t('team.members.azim.position'),
      bio: t('team.members.azim.bio'),
      image: azimchoudryImage,
      imagePosition: "center 25%", // Nach oben verschoben
      social: {
        linkedin: "https://linkedin.com",
        xing: "https://xing.com"
      }
    },
    {
      id: 3,
      name: t('team.members.chris.name'),
      position: t('team.members.chris.position'),
      bio: t('team.members.chris.bio'),
      image: chrisImage,
      imagePosition: "center center", // Standard-Position
      social: {
        linkedin: "https://linkedin.com",
        xing: "https://xing.com"
      }
    },
    {
      id: 4,
      name: t('team.members.gavino.name'),
      position: t('team.members.gavino.position'),
      bio: t('team.members.gavino.bio'),
      image: gavinoImage,
      imagePosition: "center center", // Standard-Position
      social: {
        linkedin: "https://linkedin.com",
        xing: "https://xing.com"
      }
    },
    {
      id: 5,
      name: t('team.members.peter.name'),
      position: t('team.members.peter.position'),
      bio: t('team.members.peter.bio'),
      image: mauriceImage,
      imagePosition: "center center", // Standard-Position
      social: {
        linkedin: "https://linkedin.com",
        xing: "https://xing.com"
      }
    }
  ];

  return (
    <section className="team-section" ref={sectionRef}>
      {/* Kupfer-Blur-Effekt */}
      <CopperBlurEffect />
      
      <div className="team-container">
        <h2 className="section-title">
          <span>{t('team.title')} <span className="underlined-copper-special">{t('team.titleHighlight')}</span></span>
        </h2>
        
        <p className="team-intro">
          {t('team.intro')}
        </p>

        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <div 
              className="team-member-card" 
              key={member.id}
              ref={el => teamMembersRef.current[index] = el}
              data-index={index} // Index für verzögerte Animation
            >
              <div className="member-image-container">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="member-image" 
                  style={{ objectPosition: member.imagePosition }}
                  loading="lazy" // Lazy-Loading für Bilder
                />
                <div className="member-social">
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href={member.social.xing} target="_blank" rel="noopener noreferrer" className="social-icon xing">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-14.085 15.744c-.421 0-.636-.343-.415-.75l3.342-5.858c.017-.02.033-.038.051-.056v-.001l-2.13-3.67c-.225-.4-.005-.759.42-.759h3.08c.426 0 .624.159.762.529l2.148 3.72c.035.061.011.13-.026.206l-3.522 6.145c-.136.377-.334.494-.763.494h-2.947zm13.05-3.474c.036.063.043.134.018.209l-3.233 5.658c-.137.372-.335.484-.764.484h-3.078c-.419 0-.634-.339-.414-.745l3.232-5.664c.033-.063.042-.134.018-.209l-2.09-3.655c-.22-.406-.001-.744.418-.744h3.082c.426 0 .621.161.76.529l2.051 3.66c.033.061.042.133.018.209l-.018-.039.018.031-.018.032.018.028-.018.031.018.029-.018.029.018.03-.018.027z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-position">{member.position}</p>
                <div className="separator"></div>
                <p className="member-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="team-cta">
          <button className="team-button">
            {t('team.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team; 