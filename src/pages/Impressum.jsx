import React from 'react';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Impressum.css';

const impressumDE = `
<h1>Impressum</h1>

<p>CD Immo-Portfolio GmbH<br />
Bauvereinstr. 47<br />
90489 N&uuml;rnberg</p>

<p>Handelsregister: HRB 41173<br />
Registergericht: Amtsgericht N&uuml;rnberg</p>

<p><strong>Vertreten durch:</strong><br />
Panadda Srisuwan</p>

<h2>Kontakt</h2>
<p>Telefon: +49 911 13039057<br />
E-Mail: p.chowdhury@cd-immo.de</p>

<h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
<p>Berufsbezeichnung:<br />
anderer Beruf</p>
<h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
<p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>`;

const impressumEN = `
<h1>Site Notice</h1>

<p>CD Immo-Portfolio GmbH<br />
Bauvereinstr. 47<br />
90489 N&uuml;rnberg</p>

<p>Commercial Register: HRB 41173<br />
Registration court: Amtsgericht N&uuml;rnberg</p>

<p><strong>Represented by:</strong><br />
Panadda Srisuwan</p>

<h2>Contact</h2>
<p>Phone: +49 911 13039057<br />
E-mail: p.chowdhury@cd-immo.de</p>

<h2>Job title and professional regulations</h2>
<p>Job title:<br />
</p>
<h2>Dispute resolution proceedings in front of a consumer arbitration board</h2>
<p>We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.</p>`;

const Impressum = () => {
  const { language } = useLanguage();
  return (
    <div className="impressum-section">
      <Header />
      <div className="impressum-container">
        <div
          dangerouslySetInnerHTML={{ __html: language?.toUpperCase() === 'EN' ? impressumEN : impressumDE }}
        />
      </div>
    </div>
  );
};

export default Impressum; 