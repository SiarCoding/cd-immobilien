import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Formular.css';
import '../../styles/Hero.css';
import '../../styles/AnimatedButton.css';
import '../../styles/LeadForm.css';
import teamImage from '../../assets/team.webp';
import SEOHead from '../SEOHead';
import { useSEO } from '../../contexts/SEOContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { HoverButton } from '../ui/animated-hover-button';
import CountrySelect from '../ui/CountrySelect';
import { ChevronLeft, Check } from 'lucide-react';

const TOTAL_STEPS = 3;

// Der value geht unveraendert an Zapier (Felder familienstand und einkommen)
const STATUS_OPTIONS = [
  { value: 'verheiratet', labelKey: 'formular.step1.married' },
  { value: 'ledig', labelKey: 'formular.step1.single' }
];

const INCOME_OPTIONS = {
  verheiratet: [
    { value: '5.000 - 6.000 EUR', labelKey: 'formular.step2.income.range5000_6000' },
    { value: '6.000 - 10.000 EUR', labelKey: 'formular.step2.income.range6000_10000' },
    { value: 'über 10.000 EUR', labelKey: 'formular.step2.income.above10000' }
  ],
  ledig: [
    { value: '4.000 - 5.000 EUR', labelKey: 'formular.step2.income.range4000_5000' },
    { value: '5.000 - 8.000 EUR', labelKey: 'formular.step2.income.range5000_8000' },
    { value: 'über 8.000 EUR', labelKey: 'formular.step2.income.above8000' }
  ]
};

const OptionButton = ({ selected, onClick, children }) => (
  <button
    type="button"
    className={`lead-option ${selected ? 'is-selected' : ''}`}
    aria-pressed={selected}
    onClick={onClick}
  >
    <span>{children}</span>
    <span className="lead-option-mark" aria-hidden="true">
      {selected && <Check size={16} strokeWidth={3} />}
    </span>
  </button>
);

const Formular = () => {
  const { seoData } = useSEO();
  const { t, language } = useLanguage();
  const formularPageSEO = seoData.formular;
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const isFirstRender = useRef(true);
  const advanceTimer = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    income: '',
    name: '',
    country: 'DE', // Deutschland als Default
    countryCode: '+49',
    phone: '',
    email: '',
    privacyAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Unsichtbares Feld gegen Spam-Bots, wird nicht uebertragen
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => clearTimeout(advanceTimer.current);
  }, []);

  // Tastatur und Screenreader nach jedem Schritt zur neuen Frage fuehren
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [currentStep, isSubmitted]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Auswahl speichern und kurz danach automatisch weitergehen
  const selectAndAdvance = (changes, step) => {
    setFormData((prev) => ({ ...prev, ...changes }));
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      setCurrentStep((current) => (current === step ? step + 1 : current));
    }, 300);
  };

  const selectStatus = (value) => {
    // Andere Einkommensspannen je Familienstand: alte Auswahl verwerfen
    const changes = value === formData.goal ? { goal: value } : { goal: value, income: '' };
    selectAndAdvance(changes, 1);
  };

  const validateContact = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t('formular.step3.validation.nameRequired');
    }
    if (!formData.phone) {
      newErrors.phone = t('formular.step3.validation.phoneRequired');
    }
    if (!formData.email) {
      newErrors.email = t('formular.step3.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('formular.step3.validation.emailInvalid');
    }
    if (!formData.privacyAccepted) {
      newErrors.privacy = t('formular.step3.validation.privacyRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    clearTimeout(advanceTimer.current);
    setCurrentStep((current) => Math.max(1, current - 1));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== TOTAL_STEPS || !validateContact()) {
      return;
    }
    // Von einem Bot ausgefuellt: Erfolg anzeigen, aber nichts senden
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }
    setIsLoading(true);
    try {
      // Zapier Webhook Submission (über FormData): Feldnamen nicht aendern
      const zapierData = {
        familienstand: formData.goal,
        einkommen: formData.income,
        name: formData.name,
        telefon: formData.countryCode + formData.phone,
        email: formData.email,
        datenschutz: formData.privacyAccepted ? 'Akzeptiert' : 'Nicht akzeptiert',
        submission_time: new Date().toISOString()
      };
      const formDataForZapier = new FormData();
      Object.entries(zapierData).forEach(([key, value]) => {
        formDataForZapier.append(key, value);
      });
      const zapierResponse = await fetch('https://hooks.zapier.com/hooks/catch/21594490/uookb2j/', {
        method: 'POST',
        body: formDataForZapier
      });
      if (zapierResponse.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        throw new Error(`Zapier status: ${zapierResponse.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: t('formular.submitError') });
    } finally {
      setIsLoading(false);
    }
  };

  const incomeOptions = INCOME_OPTIONS[formData.goal] || [];

  const hoverButtonProps = {
    startColor: '#b87333',
    endColor: '#e0ac69',
    animationIntensity: 'medium',
    className: 'hero-animated-button'
  };

  return (
    <>
      <SEOHead
        title={formularPageSEO.title}
        description={formularPageSEO.description}
        keywords={formularPageSEO.keywords}
        canonical={formularPageSEO.canonical}
        ogImage={formularPageSEO.ogImage}
        ogType="website"
      />
      <main className="lead-page">
        <div className="lead-card">
          <div className="lead-form-panel">
            {isSubmitted ? (
              <div className="lead-success" role="status">
                <span className="lead-success-icon" aria-hidden="true"><Check size={36} /></span>
                <h1 className="lead-title" tabIndex={-1} ref={headingRef}>{t('formular.success.title')}</h1>
                <p className="lead-subtitle">{t('formular.success.subtitle')}</p>
                <Link to="/">
                  <HoverButton {...hoverButtonProps}>{t('formular.success.backHome')}</HoverButton>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="lead-form">
                <div className="lead-progress">
                  <p className="lead-progress-text">
                    {t('formular.progress', { current: currentStep, total: TOTAL_STEPS })}
                  </p>
                  <div
                    className="lead-progress-track"
                    role="progressbar"
                    aria-valuemin={1}
                    aria-valuemax={TOTAL_STEPS}
                    aria-valuenow={currentStep}
                  >
                    <div className="lead-progress-fill" style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }} />
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="lead-step">
                    <h1 className="lead-title" tabIndex={-1} ref={headingRef}>{t('formular.step1.title')}</h1>
                    <p className="lead-subtitle">{t('formular.step1.subtitle')}</p>
                    <div className="lead-options lead-options--two">
                      {STATUS_OPTIONS.map((option) => (
                        <OptionButton
                          key={option.value}
                          selected={formData.goal === option.value}
                          onClick={() => selectStatus(option.value)}
                        >
                          {t(option.labelKey)}
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="lead-step">
                    <h1 className="lead-title" tabIndex={-1} ref={headingRef}>{t('formular.step2.title')}</h1>
                    <p className="lead-subtitle">{t('formular.step2.subtitle')}</p>
                    <div className="lead-options">
                      {incomeOptions.map((option) => (
                        <OptionButton
                          key={option.value}
                          selected={formData.income === option.value}
                          onClick={() => selectAndAdvance({ income: option.value }, 2)}
                        >
                          {t(option.labelKey)}
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="lead-step">
                    <h1 className="lead-title" tabIndex={-1} ref={headingRef}>{t('formular.step3.title')}</h1>
                    <p className="lead-subtitle">{t('formular.step3.subtitle')}</p>

                    <div className="lead-fields">
                      <div className="lead-field">
                        <label htmlFor="lead-name">{t('formular.step3.name')}</label>
                        <input
                          id="lead-name"
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                        />
                        {errors.name && <span className="lead-error">{errors.name}</span>}
                      </div>

                      <div className="lead-field">
                        <label htmlFor="lead-phone">{t('formular.step3.phone')}</label>
                        <div className="lead-phone">
                          <CountrySelect
                            value={formData.country}
                            language={language}
                            label={t('formular.step3.countryCode')}
                            onChange={(country) => setFormData((prev) => ({
                              ...prev,
                              country: country.iso,
                              countryCode: country.dial
                            }))}
                          />
                          <input
                            id="lead-phone"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value.replace(/\D/g, ''))}
                            aria-invalid={Boolean(errors.phone)}
                          />
                        </div>
                        {errors.phone && <span className="lead-error">{errors.phone}</span>}
                      </div>

                      <div className="lead-field">
                        <label htmlFor="lead-email">{t('formular.step3.email')}</label>
                        <input
                          id="lead-email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                        />
                        {errors.email && <span className="lead-error">{errors.email}</span>}
                      </div>

                      <div className="lead-honeypot" aria-hidden="true">
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="lead-privacy">
                          <input
                            type="checkbox"
                            checked={formData.privacyAccepted}
                            onChange={(e) => {
                              updateFormData('privacyAccepted', e.target.checked);
                              setErrors((prev) => ({ ...prev, privacy: null }));
                            }}
                            aria-invalid={Boolean(errors.privacy)}
                          />
                          <span>
                            {t('formular.step3.consentBefore')}{' '}
                            <a href="/datenschutz" target="_blank" rel="noopener noreferrer">{t('formular.step3.privacyLink')}</a>{' '}
                            {t('formular.step3.consentAfter')}
                          </span>
                        </label>
                        {errors.privacy && <span className="lead-error">{errors.privacy}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {errors.submit && <p className="lead-error lead-error--submit" role="alert">{errors.submit}</p>}

                <div className="lead-actions">
                  {currentStep > 1 ? (
                    <button type="button" className="lead-back" onClick={handleBack} disabled={isLoading}>
                      <ChevronLeft size={20} aria-hidden="true" />
                      {t('formular.back')}
                    </button>
                  ) : <span />}

                  {currentStep === TOTAL_STEPS && (
                    <HoverButton type="submit" disabled={isLoading} {...hoverButtonProps}>
                      <span className="button-text lead-submit-label">
                        {isLoading && <span className="lead-spinner" aria-hidden="true"></span>}
                        {isLoading ? t('formular.sending') : t('formular.step3.submit')}
                      </span>
                    </HoverButton>
                  )}
                </div>
              </form>
            )}
          </div>

          <aside className="lead-aside">
            <img src={teamImage} alt={t('formular.advisor.title')} loading="lazy" />
            <div className="lead-aside-text">
              <h2>{t('formular.advisor.title')}</h2>
              <p>{t('formular.advisor.subtitle')}</p>
              <span className="lead-badge">{t('formular.advisor.badge')}</span>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default Formular;
