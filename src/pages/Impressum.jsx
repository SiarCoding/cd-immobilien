import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Impressum.css';

const impressumDE = `
<h1>Vollständiges Impressum – Deutsch</h1>
<p>(Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG))</p>
<p>CD Immo-Portfolio GmbH<br />
Bauvereinstraße 47<br />
90489 Nürnberg<br />
Deutschland</p>
<p><strong>Vertreten durch die Geschäftsführerin:</strong><br />
Panadda Srisuwan</p>
<h2>Kontakt</h2>
<p>Telefon: +49 911 130 39 057<br />
E-Mail: p.chowdhury@cd-immo.de</p>
<h2>Registereintrag</h2>
<p>Registergericht: Amtsgericht Nürnberg<br />
Handelsregisternummer: HRB 41173</p>
<h2>Gesellschaftszweck</h2>
<p>Immobilienhandel sowie Immobilienbestandsaufbau im Sinne des § 34 c GewO, ausgenommen Kreditvermittlung.</p>
<h2>Zuständige Aufsichtsbehörde</h2>
<p>Industrie- und Handelskammer für München und Oberbayern<br />
Max-Joseph-Straße 2<br />
80333 München</p>
<h2>Verbraucher­streit­­beilegung (§ 36 VSBG)</h2>
<p>Wir sind weder bereit noch verpflichtet, an Streitbeilegungs­verfahren vor einer Verbraucher­schlichtungs­stelle teilzunehmen.</p>
<p>Stand: November 2026</p>`;

const impressumEN = `
<h1>Complete Legal Notice – English</h1>
<p>(Information pursuant to Sec. 5 German Digital Services Act – DDG)</p>
<p>CD Immo-Portfolio GmbH<br />
Bauvereinstraße 47<br />
D-90489 Nuremberg<br />
Germany</p>
<p><strong>Represented by the Managing Director:</strong><br />
Panadda Srisuwan</p>
<h2>Contact</h2>
<p>Phone: +49 911 130 39 057<br />
Email: p.chowdhury@cd-immo.de</p>
<h2>Commercial Register</h2>
<p>Register Court: Local Court (Nuremberg)<br />
Registration No.: HRB 41173</p>
<h2>Corporate purpose</h2>
<p>Real-estate trading and portfolio build-up within the meaning of Sec. 34 c GewO (excluding credit brokerage).</p>
<h2>Competent supervisory authority</h2>
<p>Chamber of Industry and Commerce for Munich and Upper Bavaria (IHK für München und Oberbayern)<br />
Max-Joseph-Straße 2<br />
80333 Munich, Germany</p>
<h2>Consumer Dispute Resolution (§ 36 VSBG)</h2>
<p>We are neither willing nor obliged to participate in dispute-resolution proceedings before a consumer arbitration board.</p>
<p>As of: November 2026</p>`;

const Impressum = () => {
  const { language } = useLanguage();
  return (
    <div className="impressum-section">
      <div className="impressum-container">
        <div
          dangerouslySetInnerHTML={{ __html: language?.toUpperCase() === 'EN' ? impressumEN : impressumDE }}
        />
      </div>
    </div>
  );
};

export default Impressum;
