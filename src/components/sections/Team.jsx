import React, { useEffect, useRef } from 'react';
import '../../styles/Team.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
// Importiere die Bilder aus dem assets-Ordner
import thaiImage from '../../assets/panadda.webp';
import azimchoudryImage from '../../assets/azim3.webp';
import chrisImage from '../../assets/chris2.jpg';
import gavinoImage from '../../assets/gavino.webp';
import mauriceImage from '../../assets/maurice.webp';

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
      imagePosition: "center 25%" // Nach oben verschoben
    },
    {
      id: 2,
      name: t('team.members.azim.name'),
      position: t('team.members.azim.position'),
      bio: t('team.members.azim.bio'),
      image: azimchoudryImage,
      imagePosition: "center 25%" // Nach oben verschoben
    },
    {
      id: 3,
      name: t('team.members.chris.name'),
      position: t('team.members.chris.position'),
      bio: t('team.members.chris.bio'),
      image: chrisImage,
      imagePosition: "center center" // Standard-Position
    },
    {
      id: 4,
      name: t('team.members.gavino.name'),
      position: t('team.members.gavino.position'),
      bio: t('team.members.gavino.bio'),
      image: gavinoImage,
      imagePosition: "center center" // Standard-Position
    },
    {
      id: 5,
      name: t('team.members.peter.name'),
      position: t('team.members.peter.position'),
      bio: t('team.members.peter.bio'),
      image: mauriceImage,
      imagePosition: "center center" // Standard-Position
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
          <Link to="/formular">
            <button className="team-button">
              {t('team.cta')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Team;
