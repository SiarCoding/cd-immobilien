import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Übersetzungen für alle Komponenten
const translations = {
  DE: {
    // Hero Section
    hero: {
      title: "Bauen Sie mit Immobilien nachhaltig",
      titleHighlight: "Vermögen",
      titleEnd: "auf und senken Sie Ihre",
      titleUnderlined: "Steuerlast",
      subtitle: "Mit unserer Expertise helfen wir Ihnen, durch strategische Immobilieninvestitionen ein nachhaltiges Vermögen aufzubauen und Ihre finanzielle Zukunft zu sichern.",
      ctaButton: "Kostenlose Beratung sichern",
      statsNumber: "1400+",
      statsLabel: "Zufriedene Kunden"
    },
    // Header Navigation
    header: {
      home: "Startseite",
      about: "Über uns",
      team: "Team",
      calculator: "Rechner",
      testimonials: "Kundenstimmen",
      contact: "Kontakt",
      consultation: "Beratung anfragen"
    },
    // Stats Section
    stats: {
      title: "Unsere Zahlen",
      titleHighlight: "sprechen für sich",
      projectVolume: "Mio. € Projektvolumen",
      customers: "Zufriedene Kunden", 
      experience: "Jahre Erfahrung"
    },
    // Problem Section
    problem: {
      title: "Die Probleme",
      subtitle: "der traditionellen Altersvorsorge",
      lowReturns: {
        title: "Niedrige Renditen",
        subtitle: "Gefahr durch negative Realzinsen",
        highlight: "Verfehlte finanzielle Ziele",
        description: "Allein durch regelmäßiges Sparen in Versicherungs- und Bankprodukte läuft man Gefahr, seine finanziellen Ziele erheblich zu verfehlen. Egal ob mit Aktiensparen oder Versicherungssparen. Hohe Verwaltungskosten und falsche Risikoeinschätzung führen nach Berücksichtigung der drohenden Inflation zu negativen Realzinsen oder zu massiven Verlusten."
      },
      pensionGap: {
        title: "Rentenlücke",
        subtitle: "Altersarmut als drohende Realität", 
        highlight: "Damoklesschwert der Altersarmut",
        description: "Die Altersarmut als Konsequenz des Nichthandelns während unserer Erwerbsjahre schwebt wie ein Damoklesschwert über uns. Immer mehr Rentner belasten die Rentenkassen. Gleichzeitig zahlen immer weniger Menschen in die Kassen ein. Die Folge: Altersarmut und Entwertung durch Inflation."
      },
      inflation: {
        title: "Inflationsdruck",
        subtitle: "Herausforderungen der Rentenversicherung",
        highlight: "Private Vorsorge als Schlüssel", 
        description: "Die deutsche Rentenversicherung steht vor enormen Herausforderungen. Viele Arbeitnehmer werden im Alter nicht genug zum Leben haben. Private Vorsorge durch Investitionen in diverse Immobilien ist daher ein unerlässlicher Finanzbaustein, um seinen Lebensstil auch im Rentenalter zu bewahren und abzusichern."
      },
      longevity: {
        title: "Langlebigkeitsrisiko",
        subtitle: "Unzureichende Rentenzahlungen",
        highlight: "Gefahr der Altersarmut",
        description: "Rentenzahlungen und Ersparnisse reichen oft nicht bis zum Lebensende aus, da Einkünfte, Leistungen und Bezüge im Rentenalter häufig nicht mit der Inflation Schritt halten. Im Gegenteil, die Folge ist Altersarmut und homöopathische Rentenzahlungen."
      },
      cta: "Schütze dich und deine Zukunft"
    },
    // Solution Section
    solution: {
      title: "Die Lösung",
      subtitle: "für nachhaltigen Vermögensaufbau",
      realAssets: {
        title: "Sachwerte für Ihre Altersvorsorge",
        description: "Immobilieninvestitionen bieten einen beständigen Einkommensstrom und eine hohe Liquiditätsreserve bei einem potentiellen Verkauf."
      },
      taxBenefits: {
        title: "Steuervorteile nutzen", 
        description: "Profitieren Sie von erheblichen Steuerentlastungen durch Abschreibungen und Werbungskosten. Mit unserer Expertise maximieren Sie Ihre Steuervorteile und optimieren Ihre Netto-Rendite."
      },
      stableReturns: {
        title: "Stabile Rendite",
        description: "Erzielen Sie attraktive Eigenkapitalrenditen von mindestens über 10% p. a. durch konservative Mietrenditen."
      },
      inflationProtection: {
        title: "Inflationsschutz",
        description: "Schützen Sie Ihr Vermögen vor Inflation. Immobilien bieten einen natürlichen Inflationsschutz, da Mieten und Immobilienwerte in der Regel mit der Inflation steigen."
      },
      wealthTransfer: {
        title: "Vermögensübertragung",
        description: "Planen Sie Ihren Vermögensaufbau generationenübergreifend. Immobilien bieten exzellente Möglichkeiten zur steueroptimierten Vermögensübertragung an Ihre Nachkommen."
      },
      longTermWealth: {
        title: "Langfristiger Vermögensaufbau",
        description: "Profitieren Sie vom Hebeleffekt durch Fremdkapital und bauen Sie systematisch Vermögen auf. Unsere Strategie zielt auf nachhaltiges Wachstum und kontinuierliche Wertsteigerung."
      },
      ctaTitle: "Starten Sie jetzt Ihren Vermögensaufbau mit Immobilien",
      ctaText: "Unsere Immobilienstrategie bietet Ihnen eine sichere, renditestarke und steueroptimierte Möglichkeit, Vermögen aufzubauen und langfristig für Ihre Altersvorsorge vorzusorgen. Profitieren Sie von unserem Experten-Netzwerk.",
      ctaButton: "Jetzt Beratungstermin vereinbaren"
    },
    // About Section
    about: {
      title: "Unsere Expertise",
      titleHighlight: "für Ihren Erfolg",
      description: "Mit unserer umfassenden Expertise im Immobilienbereich unterstützen wir Sie dabei, fundierte Investitionsentscheidungen zu treffen. Wir bieten maßgeschneiderte Lösungen, die auf Ihre individuellen finanziellen Ziele und Bedürfnisse zugeschnitten sind.",
      personalConsulting: "Persönliche Beratung",
      tailoredStrategies: "Maßgeschneiderte Strategien", 
      experience: "Langjährige Erfahrung",
      secondDescription: "Unser Erfolg basiert auf dem Vertrauen unserer Kunden. Wir arbeiten transparent, ehrlich und stets in Ihrem besten Interesse. Was uns von anderen unterscheidet, ist unsere Verpflichtung zu langfristigen Kundenbeziehungen statt kurzfristigen Gewinnen.",
      transparentCommunication: "Transparente Kommunikation",
      progressReports: "Regelmäßige Fortschrittsberichte",
      satisfaction: "Garantierte Zufriedenheit"
    },
    // Features Section  
    features: {
      title: "Immobilien-Rechner",
      subtitle: "Berechne selber wie du mit unseren Immobilien",
      subtitleHighlight: "profitieren",
      subtitleEnd: "kannst",
      
      // Calculator sections
      propertyData: "Immobiliendaten",
      purchasePrice: "Kaufpreis",
      purchasePriceTooltip: "Der vollständige Kaufpreis der Immobilie",
      area: "Fläche in m²",
      areaTooltip: "Die Größe der Immobilie in Quadratmetern",
      coldRent: "Kaltmiete (Monatlich)",
      coldRentTooltip: "Die monatliche Mieteinnahme ohne Nebenkosten",
      qualityLevel: "Qualitätsstufe Instandhaltungsrücklage",
      qualityLevelTooltip: "Wählen Sie die Qualitätsstufe für die Berechnung der Instandhaltungsrücklage",
      
      // Quality levels
      qngQuality: "QNG Qualität (70 Cent/m²)",
      highQuality: "High Quality (90 Cent/m²)",
      surfaceQuality: "Flächenqualität (1,20€/m²)",
      
      // Fixed parameters
      fixedParameters: "Feste Parameter",
      acquisitionCosts: "Anschaffungskosten:",
      interestRate: "Zinssatz:",
      repayment: "Tilgung:",
      managementCosts: "Verwaltungskosten:",
      taxRate: "Steuersatz:",
      
      // Results
      resultsHeading: "Berechnungsergebnisse",
      
      // Left column categories
      costsFinancing: "Kosten & Finanzierung",
      acquisitionCostsResult: "Anschaffungskosten (5%)",
      interestAmount: "Zinsbetrag (3,7%)",
      repaymentAmount: "Tilgungsbetrag (1,5%)",
      monthlyBankRate: "Monatliche Bankrate",
      
      runningCosts: "Laufende Kosten",
      managementCostsResult: "Verwaltungskosten",
      maintenanceReserve: "Instandhaltungsrücklage",
      
      results: "Ergebnis",
      zws: "ZWS (Zwischensumme)",
      cashflowMonthly: "Cashflow (Monatlich)",
      
      // Right column - Tax benefits
      taxBenefitsTitle: "Ihre Steuervorteile",
      monthlyTaxBenefit: "Monatlicher Steuervorteil",
      yearlyTaxBenefit: "Jährlicher Steuervorteil",
      
      calculationBasis: "Berechnungsgrundlage",
      afaBasis: "AfA-Basis (93% der Gesamtkosten)",
      yearlyAfa: "Jährliche AfA (10%)",
      taxDeduction: "Steuerliche Absetzung",
      
      // Chart
      cashflowDevelopment: "Cashflow-Entwicklung über 30 Jahre",
      cumulativeCashflow: "Kumulativer Cashflow",
      year: "Jahr",
      cumulativeCashflow30: "Kumulativer Cashflow (30 Jahre):",
      cashflowFirstYear: "Cashflow im ersten Jahr",
      
      // CTA
      ctaTitle: "Optimieren Sie Ihren Immobilien-Cashflow",
      ctaText: "Lassen Sie sich von unseren Experten beraten, wie Sie mit cleveren Immobilieninvestitionen maximalen Cashflow und Steuervorteile erzielen können.",
      ctaButton: "Beratungstermin vereinbaren",
      
      // Title parts
      calculateYour: "Berechnen Sie Ihren",
      cashflow: "Cashflow",
      and: "und",
      taxBenefit: "Steuervorteil"
    },
    // Process Section
    process: {
      title: "Unser",
      titleHighlight: "Prozess",
      subtitle: "Wir begleiten Sie durch jeden Schritt Ihrer Immobilieninvestition",
      consultation: {
        title: "Beratungsgespräch",
        phase: "Phase 1",
        content: "In einem persönlichen Gespräch analysieren wir Ihre finanzielle Situation und Ihre Ziele für die Immobilieninvestition."
      },
      search: {
        title: "Objektsuche", 
        phase: "Phase 2",
        content: "Wir suchen gemeinsam nach passenden Immobilien und analysieren deren Rentabilität und Steuervorteile."
      },
      financing: {
        title: "Finanzierung",
        phase: "Phase 3", 
        content: "Wir optimieren Ihre Finanzierungsstruktur und nutzen alle verfügbaren Fördermittel für maximale Rendite."
      },
      purchase: {
        title: "Kaufabwicklung",
        phase: "Phase 4",
        content: "Wir begleiten Sie durch den gesamten Kaufprozess - vom Notartermin bis zur Schlüsselübergabe."
      },
      rental: {
        title: "Vermietungsbetreuung",
        phase: "Phase 5", 
        content: "Nach dem Kauf unterstützen wir Sie bei der Vermietung und der laufenden Verwaltung Ihrer Immobilie."
      },
      relatedPhases: "Verbundene Phasen"
    },
    // Team Section
    team: {
      title: "Unser",
      titleHighlight: "Expertenteam",
      intro: "Unser erfahrenes Team besteht aus Spezialisten in Immobilieninvestment, Finanzierung und Vermögensaufbau. Mit fundiertem Fachwissen und persönlichem Engagement unterstützen wir Sie bei der Realisierung Ihrer finanziellen Ziele.",
      cta: "Vereinbaren Sie ein persönliches Beratungsgespräch",
      members: {
        panadda: {
          name: "Panadda Srisuwan",
          position: "Geschäftsführerin",
          bio: "Frau Srisuwan repräsentiert die zweite Generation eines Straßenbauunternehmens aus Thailand und verfügt seit ihrer Kindheit über umfassende Erfahrungen im Bauwesen. Als Marketingexpertin verantwortet sie den technischen und organisatorischen Ablauf der CD Immo-Portfolio GmbH. Zudem ist sie die zentrale Ansprechpartnerin für institutionelle Auslandsinvestoren aus dem südostasiatischen Raum."
        },
        azim: {
          name: "Azim Chowdhury",
          position: "Gründer",
          bio: "Herr Chowdhury hat eine innovative Methode entwickelt, um gute von schlechten Immobilieninvestments zu unterscheiden. Dabei setzt er auf statistische und finanzmathematische Methoden des Kennzahlencontrollings. Herr Chowdhury vertritt die These, dass Immobilienanlagen trotz eines konservativen Umfeldes eine gute Rendite von über 10% p. a. erzielen sollten. Nur 1-3% der angebotenen Immobilien eignen sich als rentable Kapitalanlage. Finden Sie heraus, wie und vor allem welche!"
        },
        chris: {
          name: "Chris Schwarz",
          position: "Director of Sales",
          bio: "Herr Schwarz zeichnet sich durch seine präzise Anwendung statistischer und finanzmathematischer Methoden zur Identifikation hochwertiger Immobilien aus. Seine analytischen Fähigkeiten in der Beratung hat er sowohl durch seine Erfahrungen als Berufssoldat als auch als erfolgreicher Investor im Private Equity Bereich entwickelt. Seine umfassenden Kenntnisse und Erfahrungen im bilateralen Umfeld machen ihn zu einem wertvollen Berater und unverzichtbaren Mitglied unseres Unternehmens."
        },
        gavino: {
          name: "Gavino Crabu",
          position: "Director of Key Account",
          bio: "Herr Crabu ist unser Sprachgenie. Ob Englisch, Spanisch, Italienisch oder Deutsch – er vermittelt auf kompetentem Niveau klar und verständlich die Botschaft zur effektiven und chancenreichen Immobilieninvestition. Seine Erfahrungen als Weltenbummler, Sänger und Künstler ermöglichen es ihm, gezielt auf die Wünsche und Träume zukünftiger Immobilieninvestoren einzugehen."
        },
        peter: {
          name: "Peter Friedlhuber",
          position: "Externer Berater",
          bio: "Herr Friedlhuber ist ein versierter Investor, der seine wertvollen Kenntnisse auf verständliche Weise an angehende Investoren weitergibt. Sein beeindruckender Werdegang vom angestellten Ingenieur zum erfolgreichen Vollzeitinvestor und Berater ist sowohl vorbildlich als auch inspirierend."
        }
      }
    },
    // Investment Section
    investment: {
      title: "Finanzwissenschaftlicher",
      titleHighlight: "Vermögensaufbau",
      description: "Kostspielige und unrentable Finanzprodukte oder undurchsichtige Rentenversicherungen sind längst überholt. Wir entwickeln Ihre maßgeschneiderte Immobilien-Anlagestrategie und identifizieren für Sie die optimale Lösung, die auf zeitgemäße und wissenschaftlich fundierte Ansätze setzt.",
      feature1: "Passives Investieren",
      feature2: "Steueroptimiert", 
      feature3: "100% unabhängig",
      feature4: "Kostentransparent",
      chartTitle: "Entwicklung der Immobilienpreise in Deutschland seit 1975",
      chartSubtitle: "Immobilienpreise in Deutschland ab 1975 (Nominalindex)"
    },
    // Blog/Testimonials Section  
    blog: {
      title: "Kundenstimmen",
      titleHighlight: "zu unserer Expertise",
      subtitle: "Erfahren Sie, was unsere zufriedenen Kunden über unsere Immobilieninvestitionen und unseren persönlichen Service sagen.",
      testimonials: {
        michael: {
          text: "Die Beratung war erstklassig. Das Team hat uns durch den gesamten Prozess geführt und alle Fragen zur Finanzierung und Steuern kompetent beantwortet. Unsere Immobilie erwirtschaftet jetzt genau die Rendite, die uns versprochen wurde.",
          name: "Michael Schneider",
          title: "Unternehmer, München",
          alt: "Kunde"
        },
        sarah: {
          text: "Als Ärztin habe ich wenig Zeit, mich um Immobilieninvestitionen zu kümmern. Das Team hat mir eine maßgeschneiderte Strategie entwickelt, die perfekt zu meiner steuerlichen Situation passt. Die Kommunikation war immer transparent, und ich wurde in jeden Schritt einbezogen.",
          name: "Dr. Sarah Müller",
          title: "Ärztin, Hamburg",
          alt: "Kundin"
        },
        thomas: {
          text: "Wir haben lange nach einem vertrauenswürdigen Partner für unsere Altersvorsorge gesucht. Das Team hat uns bei der Auswahl der richtigen Immobilien geholfen und uns alle steuerlichen Vorteile aufgezeigt. Der ROI ist besser als erwartet.",
          name: "Thomas Wagner",
          title: "IT-Manager, Berlin",
          alt: "Kunde"
        }
      }
    },
    // Newsletter Section
    newsletter: {
      title: "Erhalte deinen",
      titleHighlight: "kostenlosen",
      titleEnd: "Immobilien-Leitfaden",
      description: "Trag dich ein und erhalte sofort unsere umfassende PDF-Anleitung für erfolgreiche Immobilieninvestitionen - für",
      priceHighlight: "0€",
      priceEnd: "statt regulär für 899,90€.",
      feature1: "Steuervorteile bei Immobilieninvestoren bis 90%",
      feature2: "Finanzierung und Subventionierung für maximale Sicherheit und Rendite", 
      feature3: "Standortanalyse und Markttrends 2025 durch unsere Philosophie der 6 Immobilienkategorien, Stresstests und Rentabilitätsberechnung durch unsere transparente Pencil Selling Methode",
      firstName: "Vorname",
      lastName: "Nachname", 
      email: "Deine E-Mail-Adresse",
      phone: "Telefonnummer",
      button: "PDF-Leitfaden erhalten",
      disclaimer: "Du kannst dich jederzeit abmelden. Wir respektieren deine Privatsphäre.",
      altText: "Immobilien Leitfaden auf iPhone"
    },
    // FAQ Section
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Erfahren Sie mehr über Immobilieninvestitionen, Steuervorteile und unsere Dienstleistungen. Bei weiteren Fragen steht Ihnen unser Expertenteam gerne zur Verfügung.",
      button: "Beratungstermin vereinbaren",
      questions: [
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
      ]
    },
    // Chatbot Section
    chatbot: {
      notification: {
        title: "Fragen zu Ihrer Immobilieninvestition?",
        subtitle: "Jetzt beraten lassen!"
      },
      header: {
        title: "Digitale Assistentin",
        status: "Ich beantworte Ihre Fragen"
      },
      messages: {
        welcome: "Willkommen beim Kundenservice von CD Immobilien Portfolio GmbH!",
        intro: "Haben Sie Fragen zu Immobilieninvestitionen oder wie Sie von den aktuellen Steuervorteilen profitieren können? Ich helfe Ihnen gerne weiter.",
        askName: "Um Ihnen besser helfen zu können, würde ich gerne Ihren Namen wissen. Wie darf ich Sie nennen?",
        askPhone: "Danke {name}! Bitte geben Sie Ihre Telefonnummer ein, damit wir Sie für ein persönliches Beratungsgespräch kontaktieren können:",
        thankYou: "Vielen Dank! Unser Experte wird sich in Kürze bei Ihnen melden, um Ihnen bei Ihrer Immobilieninvestition zu helfen. Sie können uns weiterhin Fragen stellen, oder besuchen Sie unsere Website für mehr Informationen.",
        error: "Entschuldigung, es gab ein Problem bei der Verarbeitung Ihrer Anfrage. Bitte versuchen Sie es später noch einmal."
      },
      placeholders: {
        default: "Schreiben Sie Ihre Nachricht...",
        name: "Bitte geben Sie Ihren Namen ein...",
        phone: "Bitte geben Sie Ihre Telefonnummer ein..."
      },
      footer: "© CD Immobilien Portfolio GmbH",
      ariaLabel: "Chat öffnen",
      systemPrompt: "Du bist ein Kundenberater für CD Immobilien Portfolio GmbH. Dein Name ist Azim Choudry. CD steht für 'Capital Development', eine Immobilien-Investmentgesellschaft in Deutschland. Das Unternehmen hat Immobilien in verschiedenen Großstädten Deutschlands, vor allem in Berlin, München, Hamburg und Frankfurt. CD Immobilien Portfolio GmbH bietet Wohnimmobilien, Gewerbeimmobilien und Grundstücke zur Kapitalanlage an. Bei Fragen nach Immobilien antworte, dass CD Immobilien Portfolio GmbH verschiedene Immobilien in deutschen Großstädten anbietet, von Wohnungen in Berlin und München bis zu Gewerbeobjekten in Hamburg und Frankfurt. Halte deine Antworten knapp, freundlich und informativ. Betone die Vorteile von Immobilieninvestitionen als Inflationsschutz und zur Steueroptimierung. Antworte auf Deutsch."
    },
    // Footer Section
    footer: {
      description: "Wir helfen Ihnen dabei, Ihre finanziellen Ziele zu erreichen und Ihr Vermögen langfristig aufzubauen.",
      services: "Leistungen",
      wealthConsulting: "Vermögensberatung",
      financialStrategy: "Finanzstrategie", 
      fullPackage: "Rund-um-Paket",
      quickAccess: "Schnellzugriff",
      home: "Startseite",
      services2: "Leistungen",
      appointment: "Termin vereinbaren",
      contact: "Kontakt",
      imprint: "Impressum",
      privacy: "Datenschutz",
      contactTitle: "Kontakt",
      address: "CD Immobilien Portfolio GmbH\nBauvereinstr. 47\n90489 Nürnberg\nDeutschland",
      phone: "+49 911 13039057",
      email: "p.chowdhury@cd-immo.de",
      copyright: "© {year} CD Immobilien Portfolio GmbH. Alle Rechte vorbehalten.",
      logoAlt: "CD Immobilien Portfolio GmbH",
      socialInstagram: "Instagram",
      socialLinkedIn: "LinkedIn", 
      socialFacebook: "Facebook"
    },
    // Formular Section
    formular: {
      pageTitle: "Geben Sie Ihr Anliegen ein",
      progress: "Schritt {current} von {total}",
      step1: {
        title: "Wie ist Ihr Familienstand?",
        subtitle: "Diese Information hilft uns bei der optimalen Steuerberatung",
        marriedJointly: "Verheiratet - Gemeinsam veranlagt",
        single: "Ledig",
        marriedSeparately: "Verheiratet - Getrennt veranlagt",
        continue: "Weiter"
      },
      step2: {
        title: "Wie hoch ist Ihr monatliches Nettoeinkommen?",
        subtitle: "Diese Informationen helfen uns, die beste Strategie für Sie zu entwickeln",
        income: {
          under3000: "Unter 3.000€",
          range3000_4000: "3.000€ - 4.000€",
          range4000_5000: "4.000€ - 5.000€",
          above5000: "Über 5.000€"
        },
        equity: "Wie viel Eigenkapital steht Ihnen zur Verfügung?",
        equityOptions: {
          under20k: "Unter 20.000€",
          range20k_50k: "20.000€ - 50.000€",
          above50k: "Über 50.000€"
        },
        continue: "Weiter"
      },
      step3: {
        title: "Ihre Kontaktdaten",
        subtitle: "Unser Experte wird sich in Kürze bei Ihnen melden",
        name: "Vollständiger Name",
        phone: "Telefonnummer",
        email: "E-Mail-Adresse",
        privacy: "Mit dem Absenden des Formulars erkläre ich mich einverstanden mit",
        privacyLink: "Datenschutzerklärung",
        submit: "Daten absenden",
        validation: {
          nameRequired: "Name ist erforderlich",
          phoneRequired: "Telefonnummer ist erforderlich",
          emailRequired: "E-Mail ist erforderlich",
          emailInvalid: "Ungültige E-Mail-Adresse",
          privacyRequired: "Datenschutzerklärung muss akzeptiert werden",
          messageRequired: "Nachricht ist erforderlich"
        }
      },
      success: {
        title: "Vielen Dank!",
        subtitle: "Ihre Daten wurden erfolgreich übermittelt. Unser Experte wird sich in Kürze bei Ihnen melden.",
        backHome: "Zurück zur Startseite"
      },
      back: "Zurück"
    },
    // Contact Section
    contact: {
      title: "Kontakt",
      titleSuffix: "aufnehmen",
      description: "Haben Sie Fragen oder möchten Sie einen Beratungstermin vereinbaren? Kontaktieren Sie uns - unser Expertenteam steht Ihnen gerne zur Verfügung.",
      phone: "Telefon",
      email: "E-Mail",
      address: "Adresse",
      openingHours: "Öffnungszeiten",
      openingHoursText: "Mo-Fr: 9:00 - 18:00 Uhr\nSa: Nach Vereinbarung",
      sendMessage: "Nachricht senden",
      messagePlaceholder: "Ihre Nachricht",
      sendButton: "Nachricht senden"
    }
  },
  EN: {
    // Hero Section
    hero: {
      title: "Build sustainable",
      titleHighlight: "wealth",
      titleEnd: "with real estate and reduce your",
      titleUnderlined: "tax burden",
      subtitle: "With our expertise, we help you build sustainable wealth through strategic real estate investments and secure your financial future.",
      ctaButton: "Get consultation",
      statsNumber: "1400+",
      statsLabel: "Satisfied customers"
    },
    // Header Navigation
    header: {
      home: "Home",
      about: "About us",
      team: "Team", 
      calculator: "Calculator",
      testimonials: "Testimonials",
      contact: "Contact",
      consultation: "Request consultation"
    },
    // Stats Section
    stats: {
      title: "Our numbers",
      titleHighlight: "speak for themselves",
      projectVolume: "Million € project volume",
      customers: "Satisfied customers",
      experience: "Years of experience"
    },
    // Problem Section
    problem: {
      title: "The problems",
      subtitle: "of traditional retirement planning",
      lowReturns: {
        title: "Low returns",
        subtitle: "Risk of negative real interest rates",
        highlight: "Missing financial goals",
        description: "By solely relying on regular savings in insurance and bank products, you risk significantly missing your financial goals. Whether with stock savings or insurance savings. High administrative costs and wrong risk assessment lead to negative real interest rates or massive losses after considering threatening inflation."
      },
      pensionGap: {
        title: "Pension gap",
        subtitle: "Old-age poverty as a threatening reality",
        highlight: "Sword of Damocles of old-age poverty",
        description: "Old-age poverty as a consequence of inaction during our working years hangs like a sword of Damocles over us. More and more retirees burden the pension funds. At the same time, fewer and fewer people pay into the funds. The result: old-age poverty and devaluation through inflation."
      },
      inflation: {
        title: "Inflation pressure",
        subtitle: "Challenges of pension insurance",
        highlight: "Private provision as key",
        description: "German pension insurance faces enormous challenges. Many employees will not have enough to live on in old age. Private provision through investments in diverse real estate is therefore an indispensable financial building block to preserve and secure one's lifestyle even in retirement."
      },
      longevity: {
        title: "Longevity risk",
        subtitle: "Insufficient pension payments", 
        highlight: "Risk of old-age poverty",
        description: "Pension payments and savings often do not last until the end of life, as income, benefits and payments in retirement often do not keep pace with inflation. On the contrary, the result is old-age poverty and homeopathic pension payments."
      },
      cta: "Protect yourself and your future"
    },
    // Solution Section
    solution: {
      title: "The solution",
      subtitle: "for sustainable wealth building",
      realAssets: {
        title: "Real assets for your retirement provision",
        description: "Real estate investments offer a steady income stream and high liquidity reserves in case of a potential sale."
      },
      taxBenefits: {
        title: "Utilize tax benefits",
        description: "Benefit from significant tax relief through depreciation and business expenses. With our expertise, you maximize your tax benefits and optimize your net return."
      },
      stableReturns: {
        title: "Stable returns",
        description: "Achieve attractive equity returns of at least over 10% p.a. through conservative rental returns."
      },
      inflationProtection: {
        title: "Inflation protection",
        description: "Protect your wealth from inflation. Real estate offers natural inflation protection, as rents and real estate values typically rise with inflation."
      },
      wealthTransfer: {
        title: "Wealth transfer",
        description: "Plan your wealth building across generations. Real estate offers excellent opportunities for tax-optimized wealth transfer to your descendants."
      },
      longTermWealth: {
        title: "Long-term wealth building",
        description: "Benefit from leverage through debt capital and systematically build wealth. Our strategy aims for sustainable growth and continuous value appreciation."
      },
      ctaTitle: "Start building your wealth with real estate now",
      ctaText: "Our real estate strategy offers you a secure, high-yield and tax-optimized way to build wealth and provide for your retirement in the long term. Benefit from our expert network.",
      ctaButton: "Schedule consultation now"
    },
    // About Section  
    about: {
      title: "Our expertise",
      titleHighlight: "for your success",
      description: "With our comprehensive expertise in real estate, we support you in making well-founded investment decisions. We offer tailored solutions that are customized to your individual financial goals and needs.",
      personalConsulting: "Personal consulting",
      tailoredStrategies: "Tailored strategies",
      experience: "Years of experience", 
      secondDescription: "Our success is based on the trust of our customers. We work transparently, honestly and always in your best interest. What sets us apart from others is our commitment to long-term customer relationships instead of short-term gains.",
      transparentCommunication: "Transparent communication",
      progressReports: "Regular progress reports",
      satisfaction: "Guaranteed satisfaction"
    },
    // Features Section
    features: {
      title: "Real Estate Calculator",
      subtitle: "Calculate yourself how you can",
      subtitleHighlight: "benefit",
      subtitleEnd: "from our real estate",
      
      // Calculator sections
      propertyData: "Property Data",
      purchasePrice: "Purchase Price",
      purchasePriceTooltip: "The complete purchase price of the property",
      area: "Area in m²",
      areaTooltip: "The size of the property in square meters",
      coldRent: "Cold Rent (Monthly)",
      coldRentTooltip: "The monthly rental income without utilities",
      qualityLevel: "Quality Level Maintenance Reserve",
      qualityLevelTooltip: "Choose the quality level for calculating the maintenance reserve",
      
      // Quality levels
      qngQuality: "QNG Quality (70 Cents/m²)",
      highQuality: "High Quality (90 Cents/m²)",
      surfaceQuality: "Surface Quality (1.20€/m²)",
      
      // Fixed parameters
      fixedParameters: "Fixed Parameters",
      acquisitionCosts: "Acquisition Costs:",
      interestRate: "Interest Rate:",
      repayment: "Repayment:",
      managementCosts: "Management Costs:",
      taxRate: "Tax Rate:",
      
      // Results
      resultsHeading: "Calculation Results",
      
      // Left column categories
      costsFinancing: "Costs & Financing",
      acquisitionCostsResult: "Acquisition Costs (5%)",
      interestAmount: "Interest Amount (3.7%)",
      repaymentAmount: "Repayment Amount (1.5%)",
      monthlyBankRate: "Monthly Bank Payment",
      
      runningCosts: "Running Costs",
      managementCostsResult: "Management Costs",
      maintenanceReserve: "Maintenance Reserve",
      
      results: "Results",
      zws: "IWS (Interim Sum)",
      cashflowMonthly: "Cashflow (Monthly)",
      
      // Right column - Tax benefits
      taxBenefitsTitle: "Your Tax Benefits",
      monthlyTaxBenefit: "Monthly Tax Benefit",
      yearlyTaxBenefit: "Yearly Tax Benefit",
      
      calculationBasis: "Calculation Basis",
      afaBasis: "Depreciation Basis (93% of Total Costs)",
      yearlyAfa: "Annual Depreciation (10%)",
      taxDeduction: "Tax Deduction",
      
      // Chart
      cashflowDevelopment: "Cashflow Development over 30 Years",
      cumulativeCashflow: "Cumulative Cashflow",
      year: "Year",
      cumulativeCashflow30: "Cumulative Cashflow (30 Years):",
      cashflowFirstYear: "Cashflow in the first year",
      
      // CTA
      ctaTitle: "Optimize Your Real Estate Cashflow",
      ctaText: "Let our experts advise you on how to achieve maximum cashflow and tax benefits with smart real estate investments.",
      ctaButton: "Schedule Consultation",
      
      // Title parts
      calculateYour: "Calculate Your",
      cashflow: "Cashflow",
      and: "and",
      taxBenefit: "Tax Benefit"
    },
    // Process Section
    process: {
      title: "Our",
      titleHighlight: "process",
      subtitle: "We guide you through every step of your real estate investment",
      consultation: {
        title: "Consultation meeting",
        phase: "Phase 1",
        content: "In a personal conversation, we analyze your financial situation and your goals for real estate investment."
      },
      search: {
        title: "Property search",
        phase: "Phase 2", 
        content: "We search together for suitable properties and analyze their profitability and tax benefits."
      },
      financing: {
        title: "Financing",
        phase: "Phase 3",
        content: "We optimize your financing structure and utilize all available subsidies for maximum return."
      },
      purchase: {
        title: "Purchase processing",
        phase: "Phase 4",
        content: "We guide you through the entire purchase process - from notary appointment to key handover."
      },
      rental: {
        title: "Rental management",
        phase: "Phase 5",
        content: "After purchase, we support you with rental and ongoing management of your property."
      },
      relatedPhases: "Connected phases"
    },
    // Team Section
    team: {
      title: "Our",
      titleHighlight: "expert team",
      intro: "Our experienced team consists of specialists in real estate investment, financing and wealth building. With solid expertise and personal commitment, we support you in achieving your financial goals.",
      cta: "Schedule a personal consultation",
      members: {
        panadda: {
          name: "Panadda Srisuwan",
          position: "Managing Director",
          bio: "Ms. Srisuwan represents the second generation of a road construction company from Thailand and has extensive experience in construction since childhood. As a marketing expert, she is responsible for the technical and organizational processes of CD Immo-Portfolio GmbH. She is also the central contact person for institutional foreign investors from the Southeast Asian region."
        },
        azim: {
          name: "Azim Chowdhury",
          position: "Founder",
          bio: "Mr. Chowdhury has developed an innovative method to distinguish good from bad real estate investments. He relies on statistical and financial mathematical methods of key performance indicator controlling. Mr. Chowdhury advocates the thesis that real estate investments should achieve a good return of over 10% p.a. despite a conservative environment. Only 1-3% of the offered properties are suitable as profitable capital investments. Find out how and especially which ones!"
        },
        chris: {
          name: "Chris Schwarz",
          position: "Director of Sales",
          bio: "Mr. Schwarz is distinguished by his precise application of statistical and financial mathematical methods for identifying high-quality real estate. He has developed his analytical skills in consulting through his experiences as a professional soldier as well as a successful investor in the private equity sector. His comprehensive knowledge and experience in the bilateral environment make him a valuable advisor and indispensable member of our company."
        },
        gavino: {
          name: "Gavino Crabu",
          position: "Director of Key Account",
          bio: "Mr. Crabu is our language genius. Whether English, Spanish, Italian or German – he conveys the message of effective and promising real estate investment clearly and understandably at a competent level. His experiences as a globetrotter, singer and artist enable him to specifically address the wishes and dreams of future real estate investors."
        },
        peter: {
          name: "Peter Friedlhuber",
          position: "External Consultant",
          bio: "Mr. Friedlhuber is a seasoned investor who passes on his valuable knowledge to aspiring investors in an understandable way. His impressive journey from employed engineer to successful full-time investor and consultant is both exemplary and inspiring."
        }
      }
    },
    // Investment Section
    investment: {
      title: "Financial Scientific",
      titleHighlight: "Wealth Building",
      description: "Costly and unprofitable financial products or opaque pension insurances are long outdated. We develop your customized real estate investment strategy and identify the optimal solution for you, based on contemporary and scientifically founded approaches.",
      feature1: "Passive Investing",
      feature2: "Tax Optimized",
      feature3: "100% Independent", 
      feature4: "Cost Transparent",
      chartTitle: "Development of Real Estate Prices in Germany since 1975",
      chartSubtitle: "Real Estate Prices in Germany from 1975 (Nominal Index)"
    },
    // Blog/Testimonials Section
    blog: {
      title: "Customer testimonials",
      titleHighlight: "about our expertise",
      subtitle: "Learn what our satisfied customers say about our real estate investments and personal service.",
      testimonials: {
        michael: {
          text: "The consultation was first-class. The team guided us through the entire process and competently answered all questions about financing and taxes. Our property now generates exactly the return that was promised to us.",
          name: "Michael Schneider",
          title: "Entrepreneur, Munich",
          alt: "Customer"
        },
        sarah: {
          text: "As a doctor, I have little time to deal with real estate investments. The team developed a customized strategy for me that fits perfectly with my tax situation. Communication was always transparent, and I was involved in every step.",
          name: "Dr. Sarah Müller",
          title: "Doctor, Hamburg",
          alt: "Customer"
        },
        thomas: {
          text: "We have been looking for a trustworthy partner for our retirement planning for a long time. The team helped us select the right properties and showed us all the tax benefits. The ROI is better than expected.",
          name: "Thomas Wagner",
          title: "IT Manager, Berlin",
          alt: "Customer"
        }
      }
    },
    // Newsletter Section
    newsletter: {
      title: "Get your",
      titleHighlight: "free",
      titleEnd: "real estate guide",
      description: "Sign up and receive our comprehensive PDF guide for successful real estate investments immediately - for",
      priceHighlight: "0€",
      priceEnd: "instead of regularly 899.90€.",
      feature1: "Tax benefits for real estate investors up to 90%",
      feature2: "Financing and subsidization for maximum security and return",
      feature3: "Location analysis and market trends 2025 through our philosophy of 6 real estate categories, stress tests and profitability calculation through our transparent Pencil Selling method",
      firstName: "First name",
      lastName: "Last name",
      email: "Your email address",
      phone: "Phone number",
      button: "Get PDF guide",
      disclaimer: "You can unsubscribe at any time. We respect your privacy.",
      altText: "Real Estate Guide on iPhone"
    },
    // FAQ Section
    faq: {
      title: "Frequently asked questions",
      subtitle: "Learn more about real estate investments, tax benefits and our services. For further questions, our expert team is happy to help you.",
      button: "Schedule consultation",
      questions: [
        {
          question: "What makes CD Immobilien Portfolio GmbH unique?",
          answer: "As CD Immobilien Portfolio GmbH, we offer a holistic approach to real estate investment. We combine expertise in tax optimization, sustainable wealth planning and strategic real estate selection. Our team of experts accompanies you from the first consultation to the long-term support of your investment."
        },
        {
          question: "What tax benefits do real estate investments offer?",
          answer: "Real estate investments offer numerous tax benefits, including depreciation (AfA), which allows you to write off acquisition costs over the useful life. Additionally, business expenses such as interest, maintenance costs and management costs can be claimed for tax purposes. For new buildings from 2023, you benefit from the increased linear depreciation of 3% or the declining balance depreciation. We advise you individually on how to optimally use these benefits."
        },
        {
          question: "Who are our real estate investments suitable for?",
          answer: "Our real estate investments are suitable for private investors and entrepreneurs who want to build wealth sustainably while benefiting from tax advantages. Our offers are particularly suitable for people with high income tax rates who pursue a long-term investment strategy and want to secure their financial future. We also offer customized solutions for people who want to provide for retirement or build passive income."
        },
        {
          question: "How does the investment process work with us?",
          answer: "The investment process begins with a free initial consultation in which we analyze your financial goals and possibilities. We then develop a personalized investment concept and present you with suitable real estate properties. After your decision, we accompany you through the entire purchase process, including financing advice, contract design and tax optimization. Even after the purchase, we are at your side with our rental and management service."
        },
        {
          question: "What returns can be achieved with real estate investments?",
          answer: "Returns on real estate investments consist of rental yield and potential appreciation. In our selected locations, customers typically achieve rental yields between 3-5% annually. Taking into account tax benefits and long-term appreciation, effective total returns of 6-8% or more can result. However, the exact return depends on the individual property, financing structure and your personal tax situation. In our detailed consultation, we create a well-founded return forecast for you."
        }
      ]
    },
    // Chatbot Section
    chatbot: {
      notification: {
        title: "Questions about your real estate investment?",
        subtitle: "Get advice now!"
      },
      header: {
        title: "Digital Assistant",
        status: "I answer your questions"
      },
      messages: {
        welcome: "Welcome to the customer service of CD Immobilien Portfolio GmbH!",
        intro: "Do you have questions about real estate investments or how you can benefit from current tax advantages? I'm happy to help you.",
        askName: "To better assist you, I would like to know your name. What should I call you?",
        askPhone: "Thank you {name}! Please enter your phone number so we can contact you for a personal consultation:",
        thankYou: "Thank you! Our expert will contact you shortly to help you with your real estate investment. You can continue to ask us questions, or visit our website for more information.",
        error: "Sorry, there was a problem processing your request. Please try again later."
      },
      placeholders: {
        default: "Write your message...",
        name: "Please enter your name...",
        phone: "Please enter your phone number..."
      },
      footer: "© CD Immobilien Portfolio GmbH",
      ariaLabel: "Open chat",
      systemPrompt: "You are a customer advisor for CD Immobilien Portfolio GmbH. Your name is Azim Choudry. CD stands for 'Capital Development', a real estate investment company in Germany. The company has real estate in various major German cities, especially in Berlin, Munich, Hamburg and Frankfurt. CD Immobilien Portfolio GmbH offers residential real estate, commercial real estate and land for capital investment. When asked about real estate, respond that CD Immobilien Portfolio GmbH offers various real estate in German major cities, from apartments in Berlin and Munich to commercial properties in Hamburg and Frankfurt. Keep your answers concise, friendly and informative. Emphasize the benefits of real estate investments as inflation protection and for tax optimization. Respond in English."
    },
    // Footer Section
    footer: {
      description: "We help you achieve your financial goals and build your wealth long-term.",
      services: "Services",
      wealthConsulting: "Wealth consulting",
      financialStrategy: "Financial strategy",
      fullPackage: "Full package",
      quickAccess: "Quick access",
      home: "Home",
      services2: "Services", 
      appointment: "Schedule appointment",
      contact: "Contact",
      imprint: "Imprint",
      privacy: "Privacy",
      contactTitle: "Contact",
      address: "CD Immobilien Portfolio GmbH\nBauvereinstr. 47\n90489 Nuremberg\nGermany",
      phone: "+49 911 13039057",
      email: "p.chowdhury@cd-immo.de",
      copyright: "© {year} CD Immobilien Portfolio GmbH. All rights reserved.",
      logoAlt: "CD Immobilien Portfolio GmbH",
      socialInstagram: "Instagram",
      socialLinkedIn: "LinkedIn",
      socialFacebook: "Facebook"
    },
    // Formular Section
    formular: {
      pageTitle: "Submit Your Request",
      progress: "Step {current} of {total}",
      step1: {
        title: "What is your marital status?",
        subtitle: "This information helps us provide optimal tax advice",
        marriedJointly: "Married - Filing jointly",
        single: "Single",
        marriedSeparately: "Married - Filing separately",
        continue: "Continue"
      },
      step2: {
        title: "What is your monthly net income?",
        subtitle: "This information helps us develop the best strategy for you",
        income: {
          under3000: "Under €3,000",
          range3000_4000: "€3,000 - €4,000",
          range4000_5000: "€4,000 - €5,000",
          above5000: "Over €5,000"
        },
        equity: "How much equity is available to you?",
        equityOptions: {
          under20k: "Under €20,000",
          range20k_50k: "€20,000 - €50,000",
          above50k: "Over €50,000"
        },
        continue: "Continue"
      },
      step3: {
        title: "Your Contact Details",
        subtitle: "Our expert will contact you shortly",
        name: "Full Name",
        phone: "Phone Number",
        email: "Email Address",
        privacy: "By submitting the form, I agree to the",
        privacyLink: "Privacy Policy",
        submit: "Submit Data",
        validation: {
          nameRequired: "Name is required",
          phoneRequired: "Phone number is required",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email address",
          privacyRequired: "Privacy policy must be accepted",
          messageRequired: "Message is required"
        }
      },
      success: {
        title: "Thank You!",
        subtitle: "Your data has been successfully submitted. Our expert will contact you shortly.",
        backHome: "Back to Home"
      },
      back: "Back"
    },
    // Contact Section
    contact: {
      title: "Contact",
      titleSuffix: "Us",
      description: "Do you have questions or would you like to schedule a consultation appointment? Contact us - our expert team is happy to assist you.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      openingHours: "Opening Hours",
      openingHoursText: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: By appointment",
      sendMessage: "Send Message",
      messagePlaceholder: "Your message",
      sendButton: "Send Message"
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('DE');

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[language];
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value || path;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 