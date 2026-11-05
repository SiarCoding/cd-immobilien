import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Datenschutz.css';

const datenschutzDE = `
<h1>Datenschutzerklärung</h1>
<p>Stand: November 2026</p>

<h2>1. Verantwortlicher</h2>
<p>CD Immo-Portfolio GmbH<br />
Bauvereinstraße 47<br />
90489 Nürnberg<br />
Deutschland<br />
Telefon: +49 911 13039057<br />
E-Mail: p.chowdhury@cd-immo.de</p>

<h2>2. Überblick</h2>
<p>Diese Website verwendet keine Analyse- oder Werbe-Tools und keine eingebundenen Social-Media-Plugins. Personenbezogene Daten verarbeiten wir beim technischen Bereitstellen der Website, wenn Sie externe Inhalte (Video, Karte) freigeben und wenn Sie uns über ein Formular, per E-Mail oder telefonisch kontaktieren. Der Immobilien-Rechner läuft nur in Ihrem Browser. Ihre Eingaben dort werden nicht an uns übertragen.</p>
<p><strong>Kurz erklärt:</strong></p>
<ul>
<li>Video und Karte laden erst, wenn Sie im Cookie-Banner zustimmen. Beim Video ist der Anbieter Gumlet aus Singapur, bei der Karte Google.</li>
<li>Formularanfragen gelangen über den US-Dienst Zapier in unsere internen Systeme zur Bearbeitung von Anfragen.</li>
<li>Ihre Einwilligung können Sie jederzeit über „Cookie-Einstellungen“ im Footer ändern.</li>
</ul>

<h2>3. Hosting und Domain</h2>
<h3>Hosting</h3>
<p>Die Website wird gehostet bei Statichost.eu, c/o Knackeriet, Sankt Paulsgatan 25, Stockholm, Schweden. Eingesetzte Unterauftragsverarbeiter des Anbieters sind die Hetzner Online GmbH (Deutschland, Rechenzentrum) und die BunnyWay d.o.o. (Slowenien, Content Delivery Network).</p>
<p>Beim Aufruf der Website wird Ihre IP-Adresse technisch verarbeitet, damit die Inhalte an Ihr Gerät ausgeliefert werden können. Nach Angaben des Anbieters werden dabei keine personenbezogenen Daten zu Websitebesuchen gespeichert. Technische Protokolle ohne personenbezogene Daten werden höchstens 7 Tage aufbewahrt.</p>
<p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren und zuverlässigen Bereitstellung der Website. Der Anbieter stellt einen Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO bereit.</p>
<h3>Domain</h3>
<p>Die Domain-Nameserver werden betrieben von ALL-INKL.COM – Neue Medien Münnich, Inh. René Münnich, Hauptstraße 68, 02742 Friedersdorf. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der zuverlässigen Erreichbarkeit unserer Domain.</p>

<h2>4. Einwilligungsverwaltung und Speicherung auf Ihrem Gerät</h2>
<p>Ihre Auswahl im Cookie-Banner speichern wir im lokalen Speicher Ihres Browsers (Eintrag „cookie_consent“, mit Auswahl und Zeitpunkt). Der Eintrag verlässt Ihr Gerät nicht und läuft nach 6 Monaten ab. Danach fragen wir erneut.</p>
<p>Diese Speicherung ist unbedingt erforderlich, um Ihre Entscheidung zu beachten (§ 25 Abs. 2 Nr. 2 TDDDG). Rechtsgrundlage der damit verbundenen Verarbeitung ist Art. 6 Abs. 1 lit. c DSGVO in Verbindung mit Art. 7 Abs. 1 DSGVO. Über „Cookie-Einstellungen“ im Footer können Sie Ihre Auswahl jederzeit ändern.</p>

<h2>5. Externe Inhalte (nur mit Ihrer Einwilligung)</h2>
<p>Video und Karte werden erst geladen, wenn Sie dem zustimmen. Vorher besteht keine Verbindung zu den Anbietern. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Sie können die Einwilligung jederzeit mit Wirkung für die Zukunft über „Cookie-Einstellungen“ im Footer widerrufen. Die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt unberührt.</p>
<h3>Video (Gumlet)</h3>
<p>Für unser Video nutzen wir den Dienst der Gumlet Pte. Ltd., Singapur. Beim Laden erhält der Anbieter insbesondere Ihre IP-Adresse und technische Daten zum Abruf. Er kann außerdem Cookies zur Sitzungsverwaltung setzen. Nach Angaben des Anbieters werden Daten von EU-Kunden in Frankfurt verarbeitet.</p>
<p>Für Singapur besteht kein Angemessenheitsbeschluss der EU-Kommission. Soweit im Einzelfall eine Übermittlung dorthin erfolgt, stützen wir sie auf Ihre ausdrückliche Einwilligung nach Art. 49 Abs. 1 lit. a DSGVO. Das damit verbundene Risiko: Dort besteht möglicherweise kein dem EU-Recht gleichwertiges Datenschutzniveau, und Ihre Rechte lassen sich dort unter Umständen schwerer durchsetzen. Weitere Informationen: <a href="https://www.gumlet.com/privacy/" target="_blank" rel="noopener noreferrer">https://www.gumlet.com/privacy/</a>.</p>
<h3>Karte (Google Maps)</h3>
<p>Auf der Kontaktseite können Sie eine Karte von Google Maps laden. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Laden erhält Google insbesondere Ihre IP-Adresse und kann Cookies setzen und Schriftarten nachladen. Daten können in die USA übertragen werden. Google LLC ist nach dem EU-US Data Privacy Framework zertifiziert (Art. 45 DSGVO): <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noopener noreferrer">Teilnehmerseite</a>. Weitere Informationen: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.</p>
<p>Alternativ können Sie die Karte über einen normalen Link direkt bei Google öffnen. Dann gelten ab dem Klick die Bedingungen von Google.</p>
<h3>Schriftarten</h3>
<p>Schriftarten werden nicht von externen Servern geladen. Dabei entsteht keine Verbindung zu Google oder anderen Schriftarten-Anbietern.</p>

<h2>6. Kontaktformular</h2>
<p>Über das Kontaktformular verarbeiten wir Name, E-Mail-Adresse, Ihre Nachricht sowie die Bestätigung des Datenschutzhinweises und den Zeitpunkt der Anfrage. Die Telefonnummer ist freiwillig. Die übrigen Angaben benötigen wir, um Ihre Anfrage zu bearbeiten. Ohne sie können wir über das Formular nicht antworten.</p>
<p>Zweck ist die Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag gerichtet ist, sonst Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Beantwortung von Anfragen.</p>

<h2>7. Beratungsanfrage</h2>
<p>Im Formular „Beratung anfragen“ verarbeiten wir Familienstand, Spanne des monatlichen Nettoeinkommens, Name, Telefonnummer, E-Mail-Adresse sowie die Bestätigung des Datenschutzhinweises und den Zeitpunkt der Anfrage. Alle Angaben sind erforderlich, um die Anfrage über dieses Formular zu senden. Familienstand und Einkommen helfen uns, das Gespräch auf Ihre finanzielle und steuerliche Ausgangslage vorzubereiten. Stattdessen können Sie uns auch telefonisch oder per E-Mail kontaktieren.</p>
<p>Zweck sind die Vorbereitung und Durchführung der von Ihnen angefragten Beratung sowie die Kontaktaufnahme per Telefon oder E-Mail dazu. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage).</p>

<h2>8. Übermittlung der Formulardaten über Zapier</h2>
<p>Die Daten aus beiden Formularen werden direkt aus Ihrem Browser an die Zapier Inc., USA, übermittelt und von dort automatisiert an unsere internen Systeme zur Bearbeitung von Anfragen weitergeleitet. Zapier verarbeitet die Daten auf Servern in den USA als unser Auftragsverarbeiter. Der Vertrag zur Auftragsverarbeitung ist Bestandteil der Nutzungsbedingungen von Zapier und enthält auch Standardvertragsklauseln.</p>
<p>Die Übermittlung in die USA stützen wir auf das EU-US Data Privacy Framework, nach dem Zapier zertifiziert ist (Art. 45 DSGVO): <a href="https://www.dataprivacyframework.gov/participant/4425" target="_blank" rel="noopener noreferrer">Teilnehmerseite</a>. Ergänzend gelten die genannten Standardvertragsklauseln (Art. 46 DSGVO). EU-Vertreter von Zapier nach Art. 27 DSGVO: DP-Dock GmbH, Attn: Zapier Inc., Ballindamm 39, 20095 Hamburg. Weitere Informationen: <a href="https://zapier.com/legal/data-privacy" target="_blank" rel="noopener noreferrer">https://zapier.com/legal/data-privacy</a>.</p>

<h2>9. Kontakt per E-Mail und Telefon</h2>
<p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um einen Vertrag oder dessen Anbahnung geht, sonst Art. 6 Abs. 1 lit. f DSGVO.</p>
<p>Für E-Mails nutzen wir Dienste der Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland, als Auftragsverarbeiter. Soweit Daten in die USA gelangen, stützen wir das auf das EU-US Data Privacy Framework (Art. 45 DSGVO): <a href="https://www.dataprivacyframework.gov/participant/6474" target="_blank" rel="noopener noreferrer">Teilnehmerseite</a>.</p>

<h2>10. Online-Besprechungen</h2>
<p>Für Online-Besprechungen nutzen wir Microsoft Teams (Anbieter siehe Abschnitt 9). Dabei werden insbesondere Ihre Teilnahmedaten, technische Verbindungsdaten und von Ihnen geteilte Inhalte verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Besprechung einen Vertrag oder dessen Anbahnung betrifft, sonst Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen: <a href="https://privacy.microsoft.com/de-de/privacystatement" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Microsoft</a>.</p>

<h2>11. Links zu sozialen Netzwerken</h2>
<p>Im Footer verlinken wir auf unsere Profile bei Instagram, Facebook und TikTok. Es handelt sich um normale Links. Beim Aufruf unserer Website werden dadurch keine Daten an diese Netzwerke übertragen. Erst nach einem Klick gelten die Datenschutzbestimmungen des jeweiligen Netzwerks.</p>

<h2>12. Speicherdauer</h2>
<p>Wir speichern Anfragen, solange dies für ihre Bearbeitung und mögliche Rückfragen erforderlich ist. Kommt es zu keinem Vertrag, löschen wir die Daten, sobald der Vorgang abgeschlossen ist und keine Aufbewahrungspflichten entgegenstehen. Gesetzliche Aufbewahrungsfristen, insbesondere nach § 147 AO und § 257 HGB, bleiben unberührt. Für Daten, die Anbieter zu eigenen Zwecken verarbeiten, gelten deren Angaben.</p>

<h2>13. Keine automatisierte Entscheidung</h2>
<p>Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet nicht statt.</p>

<h2>14. Ihre Rechte</h2>
<p>Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20). Eine Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3). Wenden Sie sich dazu an die in Abschnitt 1 genannten Kontaktdaten.</p>
<p><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Soweit wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Der Verarbeitung zu Zwecken der Direktwerbung können Sie jederzeit ohne Angabe von Gründen widersprechen.</p>
<p><strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns zuständig ist das Bayerische Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach, <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">www.lda.bayern.de</a>.</p>

<h2>15. Verschlüsselung</h2>
<p>Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung. Sie erkennen sie an „https://“ in der Adresszeile und am Schloss-Symbol Ihres Browsers.</p>

<h2>16. Änderungen</h2>
<p>Wir passen diese Datenschutzerklärung an, wenn sich die Website, die eingesetzten Dienste oder die Rechtslage ändern. Es gilt die jeweils hier veröffentlichte Fassung.</p>`;

const datenschutzEN = `
<h1>Privacy Policy</h1>
<p>As of: November 2026</p>

<h2>1. Controller</h2>
<p>CD Immo-Portfolio GmbH<br />
Bauvereinstraße 47<br />
90489 Nuremberg<br />
Germany<br />
Phone: +49 911 13039057<br />
Email: p.chowdhury@cd-immo.de</p>

<h2>2. Overview</h2>
<p>This website uses no analytics or advertising tools and no embedded social media plugins. We process personal data to provide the website technically, when you enable external content (video, map) and when you contact us by form, email or phone. The real estate calculator runs only in your browser. What you enter there is not sent to us.</p>
<p><strong>In short:</strong></p>
<ul>
<li>The video and map only load once you agree in the cookie banner. The video provider is Gumlet from Singapore, the map provider is Google.</li>
<li>Form requests reach our internal systems for handling requests via the US service Zapier.</li>
<li>You can change your consent at any time under "Cookie settings" in the footer.</li>
</ul>

<h2>3. Hosting and domain</h2>
<h3>Hosting</h3>
<p>The website is hosted by Statichost.eu, c/o Knackeriet, Sankt Paulsgatan 25, Stockholm, Sweden. The provider's sub-processors are Hetzner Online GmbH (Germany, data centre) and BunnyWay d.o.o. (Slovenia, content delivery network).</p>
<p>When you open the website, your IP address is processed technically so the content can be delivered to your device. According to the provider, no personal data about website visits is stored. Technical logs without personal data are kept for a maximum of 7 days.</p>
<p>The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is providing the website securely and reliably. The provider offers a data processing agreement under Art. 28 GDPR.</p>
<h3>Domain</h3>
<p>The domain name servers are operated by ALL-INKL.COM – Neue Medien Münnich, owner René Münnich, Hauptstraße 68, 02742 Friedersdorf, Germany. The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is keeping our domain reliably available.</p>

<h2>4. Consent management and storage on your device</h2>
<p>We save your choice in the cookie banner in your browser's local storage (entry "cookie_consent", containing your choice and the time). The entry does not leave your device and expires after 6 months, after which we ask again.</p>
<p>This storage is strictly necessary to respect your decision (Sec. 25(2) no. 2 TDDDG). The legal basis for the related processing is Art. 6(1)(c) GDPR in conjunction with Art. 7(1) GDPR. You can change your choice at any time under "Cookie settings" in the footer.</p>

<h2>5. External content (only with your consent)</h2>
<p>The video and map only load once you agree. Until then, there is no connection to the providers. The legal basis is your consent under Art. 6(1)(a) GDPR and Sec. 25(1) TDDDG. You can withdraw your consent at any time with effect for the future under "Cookie settings" in the footer. This does not affect the lawfulness of processing up to that point.</p>
<h3>Video (Gumlet)</h3>
<p>For our video, we use the service of Gumlet Pte. Ltd., Singapore. When the video loads, the provider receives in particular your IP address and technical data about the request. It may also set cookies for session management. According to the provider, data of EU customers is processed in Frankfurt.</p>
<p>There is no EU Commission adequacy decision for Singapore. If data is transferred there in an individual case, we rely on your explicit consent under Art. 49(1)(a) GDPR. The associated risk is that a level of data protection equivalent to EU law may not exist there, and your rights may be harder to enforce. More information: <a href="https://www.gumlet.com/privacy/" target="_blank" rel="noopener noreferrer">https://www.gumlet.com/privacy/</a>.</p>
<h3>Map (Google Maps)</h3>
<p>On the contact page, you can load a Google Maps map. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. When the map loads, Google receives in particular your IP address and may set cookies and load fonts. Data may be transferred to the USA. Google LLC is certified under the EU-US Data Privacy Framework (Art. 45 GDPR): <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noopener noreferrer">participant page</a>. More information: <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.</p>
<p>Alternatively, you can open the map directly at Google using a normal link. Google's terms apply from the moment you click.</p>
<h3>Fonts</h3>
<p>Fonts are not loaded from external servers. This creates no connection to Google or other font providers.</p>

<h2>6. Contact form</h2>
<p>Through the contact form, we process your name, email address, your message, your confirmation of the privacy notice and the time of the request. Your phone number is optional. We need the other details to handle your request. Without them, we cannot reply through the form.</p>
<p>The purpose is to handle your request. The legal basis is Art. 6(1)(b) GDPR where your request is aimed at a contract, otherwise Art. 6(1)(f) GDPR. Our legitimate interest is answering requests.</p>

<h2>7. Consultation request</h2>
<p>In the "Request consultation" form, we process your marital status, your monthly net income range, name, phone number, email address, your confirmation of the privacy notice and the time of the request. All details are required to send a request through this form. Marital status and income help us prepare the conversation for your financial and tax situation. You can also contact us by phone or email instead.</p>
<p>The purpose is to prepare and provide the consultation you requested and to contact you about it by phone or email. The legal basis is Art. 6(1)(b) GDPR (pre-contractual steps at your request).</p>

<h2>8. Transfer of form data via Zapier</h2>
<p>Data from both forms is sent directly from your browser to Zapier Inc., USA, and automatically forwarded from there to our internal systems for handling requests. Zapier processes the data on servers in the USA as our processor. The data processing agreement is part of Zapier's terms of service and also contains standard contractual clauses.</p>
<p>We base the transfer to the USA on the EU-US Data Privacy Framework, under which Zapier is certified (Art. 45 GDPR): <a href="https://www.dataprivacyframework.gov/participant/4425" target="_blank" rel="noopener noreferrer">participant page</a>. The standard contractual clauses mentioned above apply in addition (Art. 46 GDPR). Zapier's EU representative under Art. 27 GDPR: DP-Dock GmbH, Attn: Zapier Inc., Ballindamm 39, 20095 Hamburg, Germany. More information: <a href="https://zapier.com/legal/data-privacy" target="_blank" rel="noopener noreferrer">https://zapier.com/legal/data-privacy</a>.</p>

<h2>9. Contact by email and phone</h2>
<p>If you contact us by email or phone, we process your details to handle your matter. The legal basis is Art. 6(1)(b) GDPR where it concerns a contract or steps towards one, otherwise Art. 6(1)(f) GDPR.</p>
<p>For email, we use services of Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Ireland, as a processor. Where data reaches the USA, we rely on the EU-US Data Privacy Framework (Art. 45 GDPR): <a href="https://www.dataprivacyframework.gov/participant/6474" target="_blank" rel="noopener noreferrer">participant page</a>.</p>

<h2>10. Online meetings</h2>
<p>For online meetings, we use Microsoft Teams (provider: see section 9). This involves processing in particular your participation data, technical connection data and content you share. The legal basis is Art. 6(1)(b) GDPR where the meeting concerns a contract or steps towards one, otherwise Art. 6(1)(f) GDPR. More information: <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft privacy statement</a>.</p>

<h2>11. Links to social networks</h2>
<p>In the footer, we link to our profiles on Instagram, Facebook and TikTok. These are normal links. Opening our website does not send any data to these networks. The respective network's privacy terms apply only after you click.</p>

<h2>12. Storage period</h2>
<p>We keep requests for as long as needed to handle them and answer possible follow-up questions. If no contract results, we delete the data once the matter is closed and no retention duties apply. Statutory retention periods, in particular under Sec. 147 AO and Sec. 257 HGB, remain unaffected. For data that providers process for their own purposes, their own information applies.</p>

<h2>13. No automated decisions</h2>
<p>We do not carry out automated decision-making, including profiling, within the meaning of Art. 22 GDPR.</p>

<h2>14. Your rights</h2>
<p>Under the GDPR, you have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18) and data portability (Art. 20). You can withdraw consent at any time with effect for the future (Art. 7(3)). Please use the contact details in section 1.</p>
<p><strong>Right to object (Art. 21 GDPR):</strong> Where we process data on the basis of Art. 6(1)(f) GDPR, you can object at any time on grounds relating to your particular situation. We will then stop processing the data unless we can demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the processing serves to establish, exercise or defend legal claims. You can object to processing for direct marketing at any time without giving reasons.</p>
<p><strong>Right to lodge a complaint (Art. 77 GDPR):</strong> You can complain to a data protection supervisory authority. The authority responsible for us is the Bayerisches Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach, Germany, <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">www.lda.bayern.de</a>.</p>

<h2>15. Encryption</h2>
<p>For security reasons, this website uses TLS encryption. You can recognise it by "https://" in the address bar and the lock icon in your browser.</p>

<h2>16. Changes</h2>
<p>We update this privacy policy when the website, the services we use or the legal situation changes. The version published here applies.</p>`;

const Datenschutz = () => {
  const { language } = useLanguage();
  return (
    <div className="datenschutz-section">
      <div className="datenschutz-container">
        <div
          dangerouslySetInnerHTML={{ __html: language?.toUpperCase() === 'EN' ? datenschutzEN : datenschutzDE }}
        />
      </div>
    </div>
  );
};

export default Datenschutz;
