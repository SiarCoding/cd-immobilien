import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Formular.css';
import azimBg from '../../assets/azimformular.jpg';
import teamImage from '../../assets/team.webp';
import logo from '../../assets/logo-csd.webp';
import Header from '../Header';
import SEOHead from '../SEOHead';
import { useSEO } from '../../contexts/SEOContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const Formular = () => {
  const { seoData } = useSEO();
  const { t } = useLanguage();
  const formularPageSEO = seoData.formular;
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    income: '',
    name: '',
    countryCode: '+49', // Deutschland als Default
    phone: '',
    email: '',
    privacyAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const totalSteps = 3;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mailboxlayer API E-Mail Verification
  const verifyEmailWithMailboxlayer = async (email) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return { valid: false, message: 'Ungültiges E-Mail-Format' };
    }

    setIsVerifyingEmail(true);
    try {
      const response = await fetch(
        `https://apilayer.net/api/check?access_key=aff245b39924cee2a5ad19fe68237f5b&email=${encodeURIComponent(email)}&smtp=1&format=1`
      );
      
      if (!response.ok) {
        throw new Error('API-Fehler');
      }
      
      const data = await response.json();
      
      // Prüfe verschiedene Qualitätsfaktoren
      const isValid = data.format_valid && 
                     data.mx_found && 
                     data.smtp_check && 
                     !data.disposable && 
                     (data.score ? data.score > 0.6 : true);
                     
      let message = '';
      if (!data.format_valid) {
        message = 'E-Mail-Format ist ungültig';
      } else if (!data.mx_found) {
        message = 'E-Mail-Domain existiert nicht';
      } else if (!data.smtp_check) {
        message = 'E-Mail-Adresse ist nicht erreichbar';
      } else if (data.disposable) {
        message = 'Wegwerf-E-Mail-Adressen sind nicht erlaubt';
      } else if (data.score && data.score <= 0.6) {
        message = 'E-Mail-Qualität ist zu niedrig';
      }
      
      return {
        valid: isValid,
        message: isValid ? 'E-Mail erfolgreich verifiziert' : message,
        data: data
      };
      
    } catch (error) {
      console.error('Mailboxlayer API Error:', error);
      // Bei API-Fehler: E-Mail als gültig betrachten (Fallback)
      return { 
        valid: true, 
        message: 'E-Mail-Verifizierung nicht verfügbar, Eingabe akzeptiert',
        fallback: true 
      };
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.goal) {
          newErrors.goal = true;
        }
        break;
      case 2:
        if (!formData.income) {
          newErrors.income = true;
        }
        break;
      case 3:
        if (!formData.name) {
          newErrors.name = t('formular.step3.validation.nameRequired');
        }
        if (!formData.phone) {
          newErrors.phone = t('formular.step3.validation.phoneRequired');
        } else if (!/^\d+$/.test(formData.phone)) {
          newErrors.phone = 'Telefonnummer darf nur Zahlen enthalten';
        }
        if (!formData.email) {
          newErrors.email = t('formular.step3.validation.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t('formular.step3.validation.emailInvalid');
        } else if (!emailVerified) {
          newErrors.email = 'E-Mail muss erst verifiziert werden';
        }
        if (!formData.privacyAccepted) {
          newErrors.privacy = t('formular.step3.validation.privacyRequired');
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === 3 && formData.email && !emailVerified) {
      // E-Mail verifizieren bevor Submit
      const verification = await verifyEmailWithMailboxlayer(formData.email);
      if (verification.valid) {
        setEmailVerified(true);
        setErrors(prev => ({ ...prev, email: null }));
      } else {
        setErrors(prev => ({ ...prev, email: verification.message }));
        return;
      }
    }
    
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      setIsLoading(true);
      try {
        // Netlify Forms Submission
        const formDataForSubmission = new FormData();
        formDataForSubmission.append('form-name', 'immobilienberatung');
        formDataForSubmission.append('familienstand', formData.goal);
        formDataForSubmission.append('einkommen', formData.income);
        formDataForSubmission.append('name', formData.name);
        formDataForSubmission.append('telefon', formData.countryCode + formData.phone);
        formDataForSubmission.append('email', formData.email);
        formDataForSubmission.append('datenschutz', formData.privacyAccepted ? 'Akzeptiert' : 'Nicht akzeptiert');
        formDataForSubmission.append('submission-time', new Date().toLocaleString('de-DE'));

        const response = await fetch('/', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formDataForSubmission).toString()
        });

        if (response.ok) {
          console.log('Form submitted successfully:', formData);
          setIsSubmitted(true);
          
          // Nach 3 Sekunden zur Startseite weiterleiten
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Es gab einen Fehler beim Senden des Formulars. Bitte versuchen Sie es erneut.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // E-Mail-Verifizierung zurücksetzen wenn E-Mail geändert wird
    if (field === 'email') {
      setEmailVerified(false);
    }
    
    // Clear errors when user makes changes
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
    
    // Auto-forward on option selection (but not on the last step)
    if ((field === 'goal' || field === 'income') && currentStep < totalSteps) {
      setTimeout(() => {
        if (validateStep(currentStep)) {
          setCurrentStep(currentStep + 1);
        }
      }, 600); // Small delay for better UX
    }
  };

  // E-Mail-Verifizierung Handler
  const handleEmailVerification = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' }));
      return;
    }
    
    const verification = await verifyEmailWithMailboxlayer(formData.email);
    
    if (verification.valid) {
      setEmailVerified(true);
      setErrors(prev => ({ ...prev, email: null }));
    } else {
      setEmailVerified(false);
      setErrors(prev => ({ ...prev, email: verification.message }));
    }
  };

  const ProgressBar = () => (
    <div className="progress-container">
      <div className="progress-bar-wrapper">
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
      <p className="progress-text">
        {t('formular.progress', { current: currentStep, total: totalSteps })}
      </p>
    </div>
  );

  const OptionButton = ({ value, currentValue, onChange, children, error }) => (
    <button
      type="button"
      className={`option-button ${currentValue === value ? 'selected' : ''} ${error ? 'error' : ''}`}
      onClick={() => onChange(value)}
    >
      {children}
      <ChevronRight className="option-arrow" size={20} />
    </button>
  );

  if (isSubmitted) {
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
        <Header />
        <div className="formular-page">
          <div className="formular-background" style={{ backgroundImage: `url(${azimBg})` }} />
          <div className="formular-overlay" />
          
          <div className="formular-container">
            <div className="success-content">
              <div className="success-icon">
                <Check size={48} />
              </div>
              <h1 className="success-title">{t('formular.success.title')}</h1>
              <p className="success-subtitle">{t('formular.success.subtitle')}</p>
              <button 
                className="success-button"
                onClick={() => navigate('/')}
              >
                {t('formular.success.backHome')}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
      <Header />
      <main>
        <div className="formular-page">
          {/* Verstecktes Netlify Form für Build-Zeit Detection */}
          <form 
            name="immobilienberatung" 
            method="POST" 
            data-netlify="true" 
            netlify
            style={{ display: 'none' }}
          >
            <input type="text" name="familienstand" />
            <input type="text" name="einkommen" />
            <input type="text" name="name" />
            <input type="tel" name="telefon" />
            <input type="email" name="email" />
            <input type="text" name="datenschutz" />
            <input type="text" name="submission-time" />
          </form>
          
          <div className="formular-content-wrapper">
            <div className="formular-container">
              <div className="formular-card">
                {/* Logo Header */}
                <div className="formular-logo-header">
                  <img src={logo} alt="CD Immo-Portfolio GmbH Logo" className="formular-logo" />
                </div>
                
                <div className="formular-card-content">
                  {/* Left Side - Form */}
                  <div className="formular-form-section">
                    <ProgressBar />
                    
                    <div className="formular-content">
                      {currentStep === 1 && (
                        <div className="step-content">
                          <h1 className="step-title">{t('formular.step1.title')}</h1>
                          <p className="step-subtitle">{t('formular.step1.subtitle')}</p>
                          
                          <div className="options-container">
                            <OptionButton
                              value="gemeinsam-veranlagt"
                              currentValue={formData.goal}
                              onChange={(value) => updateFormData('goal', value)}
                              error={errors.goal}
                            >
                              {t('formular.step1.marriedJointly')}
                            </OptionButton>
                            
                            <OptionButton
                              value="ledig"
                              currentValue={formData.goal}
                              onChange={(value) => updateFormData('goal', value)}
                              error={errors.goal}
                            >
                              {t('formular.step1.single')}
                            </OptionButton>
                            
                            <OptionButton
                              value="allein-veranlagt"
                              currentValue={formData.goal}
                              onChange={(value) => updateFormData('goal', value)}
                              error={errors.goal}
                            >
                              {t('formular.step1.marriedSeparately')}
                            </OptionButton>
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="step-content">
                          <h1 className="step-title">{t('formular.step2.title')}</h1>
                          <p className="step-subtitle">{t('formular.step2.subtitle')}</p>
                          
                          <div className="options-container">
                            <OptionButton
                              value="unter3000"
                              currentValue={formData.income}
                              onChange={(value) => updateFormData('income', value)}
                              error={errors.income}
                            >
                              {t('formular.step2.income.under3000')}
                            </OptionButton>
                            
                            <OptionButton
                              value="range3000_4000"
                              currentValue={formData.income}
                              onChange={(value) => updateFormData('income', value)}
                              error={errors.income}
                            >
                              {t('formular.step2.income.range3000_4000')}
                            </OptionButton>
                            
                            <OptionButton
                              value="range4000_5000"
                              currentValue={formData.income}
                              onChange={(value) => updateFormData('income', value)}
                              error={errors.income}
                            >
                              {t('formular.step2.income.range4000_5000')}
                            </OptionButton>
                            
                            <OptionButton
                              value="above5000"
                              currentValue={formData.income}
                              onChange={(value) => updateFormData('income', value)}
                              error={errors.income}
                            >
                              {t('formular.step2.income.above5000')}
                            </OptionButton>
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="step-content">
                          <h1 className="step-title">{t('formular.step3.title')}</h1>
                          <p className="step-subtitle">{t('formular.step3.subtitle')}</p>
                          
                          <div className="form-fields">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder={t('formular.step3.name')}
                                value={formData.name}
                                onChange={(e) => updateFormData('name', e.target.value)}
                                className={`form-input ${errors.name ? 'error' : ''}`}
                                required
                              />
                              {errors.name && <span className="error-message" style={{display: 'block', color: '#ff6b6b', fontSize: '14px', marginTop: '8px'}}>{errors.name}</span>}
                            </div>
                            
                            <div className="form-group">
                              <div className="phone-input-group">
                                <select
                                  value={formData.countryCode}
                                  onChange={(e) => updateFormData('countryCode', e.target.value)}
                                  className="country-select"
                                >
                                  <option value="+49">🇩🇪 +49</option>
                                  <option value="+43">🇦🇹 +43</option>
                                  <option value="+41">🇨🇭 +41</option>
                                  <option value="+33">🇫🇷 +33</option>
                                  <option value="+39">🇮🇹 +39</option>
                                  <option value="+34">🇪🇸 +34</option>
                                  <option value="+31">🇳🇱 +31</option>
                                  <option value="+32">🇧🇪 +32</option>
                                  <option value="+45">🇩🇰 +45</option>
                                  <option value="+46">🇸🇪 +46</option>
                                  <option value="+47">🇳🇴 +47</option>
                                  <option value="+358">🇫🇮 +358</option>
                                  <option value="+48">🇵🇱 +48</option>
                                  <option value="+420">🇨🇿 +420</option>
                                  <option value="+36">🇭🇺 +36</option>
                                  <option value="+385">🇭🇷 +385</option>
                                  <option value="+386">🇸🇮 +386</option>
                                  <option value="+421">🇸🇰 +421</option>
                                  <option value="+40">🇷🇴 +40</option>
                                  <option value="+359">🇧🇬 +359</option>
                                  <option value="+30">🇬🇷 +30</option>
                                  <option value="+351">🇵🇹 +351</option>
                                  <option value="+353">🇮🇪 +353</option>
                                  <option value="+44">🇬🇧 +44</option>
                                  <option value="+1">🇺🇸 +1</option>
                                  <option value="+1">🇨🇦 +1</option>
                                  <option value="+61">🇦🇺 +61</option>
                                  <option value="+93">🇦🇫 +93</option>
                                  <option value="+90">🇹🇷 +90</option>
                                  <option value="+7">🇷🇺 +7</option>
                                  <option value="+86">🇨🇳 +86</option>
                                  <option value="+91">🇮🇳 +91</option>
                                  <option value="+81">🇯🇵 +81</option>
                                  <option value="+82">🇰🇷 +82</option>
                                </select>
                                <input
                                  type="tel"
                                  placeholder="1234567890"
                                  value={formData.phone}
                                  onChange={(e) => {
                                    // Nur Zahlen erlauben
                                    const value = e.target.value.replace(/\D/g, '');
                                    updateFormData('phone', value);
                                  }}
                                  className={`form-input phone-input ${errors.phone ? 'error' : ''}`}
                                  required
                                />
                              </div>
                              {errors.phone && <span className="error-message" style={{display: 'block', color: '#ff6b6b', fontSize: '14px', marginTop: '8px'}}>{errors.phone}</span>}
                            </div>
                            
                            <div className="form-group">
                              <div className="email-input-group">
                                <input
                                  type="email"
                                  placeholder={t('formular.step3.email')}
                                  value={formData.email}
                                  onChange={(e) => updateFormData('email', e.target.value)}
                                  className={`form-input ${errors.email ? 'error' : ''} ${emailVerified ? 'verified' : ''}`}
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={handleEmailVerification}
                                  disabled={isVerifyingEmail || !formData.email || emailVerified}
                                  className={`verify-email-btn ${emailVerified ? 'verified' : ''}`}
                                >
                                  {isVerifyingEmail ? (
                                    <>
                                      <span className="loading-spinner-small"></span>
                                      Prüfe...
                                    </>
                                  ) : emailVerified ? (
                                    <>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{marginRight: '4px'}}>
                                        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                      Verifiziert
                                    </>
                                  ) : (
                                    'Verifizieren'
                                  )}
                                </button>
                              </div>
                              {errors.email && <span className="error-message" style={{display: 'block', color: '#ff6b6b', fontSize: '14px', marginTop: '8px'}}>{errors.email}</span>}
                              {emailVerified && !errors.email && (
                                <span className="success-message" style={{display: 'block', color: '#4ade80', fontSize: '14px', marginTop: '8px'}}>
                                  ✓ E-Mail erfolgreich verifiziert
                                </span>
                              )}
                            </div>
                            
                            <div className="privacy-section" style={{marginTop: '24px'}}>
                              <label className="privacy-label" style={{display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', fontFamily: '"Outfit", -apple-system, Roboto, Helvetica, sans-serif', fontWeight: '400', lineHeight: '1.5'}}>
                                <input
                                  type="checkbox"
                                  checked={formData.privacyAccepted}
                                  onChange={(e) => updateFormData('privacyAccepted', e.target.checked)}
                                  className="privacy-checkbox"
                                  style={{opacity: 0, position: 'absolute', pointerEvents: 'none'}}
                                  required
                                />
                                <span 
                                  className={`checkmark ${formData.privacyAccepted ? 'checked' : ''}`} 
                                  style={{
                                    width: '20px', 
                                    height: '20px', 
                                    background: formData.privacyAccepted ? '#e2ac6b' : 'rgba(255, 255, 255, 0.1)', 
                                    border: `2px solid ${formData.privacyAccepted ? '#e2ac6b' : 'rgba(255, 255, 255, 0.3)'}`, 
                                    borderRadius: '4px', 
                                    position: 'relative', 
                                    transition: 'all 0.3s ease', 
                                    flexShrink: 0, 
                                    marginTop: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  {formData.privacyAccepted && (
                                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" style={{color: 'white'}}>
                                      <path d="M1 4.5L4 7.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </span>
                                <span>
                                  Ich akzeptiere die <a href="/datenschutz" className="privacy-link" style={{color: '#e2ac6b', textDecoration: 'underline'}}>Datenschutzerklärung</a> und stimme der Verarbeitung meiner personenbezogenen Daten gemäß DSGVO zu. Diese Einwilligung ist freiwillig und kann jederzeit widerrufen werden. *
                                </span>
                              </label>
                              {errors.privacy && <span className="error-message" style={{display: 'block', color: '#ff6b6b', fontSize: '14px', marginTop: '8px'}}>{errors.privacy}</span>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="formular-actions">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          className="action-button secondary"
                          onClick={handleBack}
                        >
                          <ChevronLeft size={20} />
                          {t('formular.back')}
                        </button>
                      )}
                      
                      <button
                        type="button"
                        className="action-button primary"
                        onClick={handleNext}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="loading-spinner"></span>
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            {currentStep === totalSteps ? t('formular.step3.submit') : t('formular.step1.continue')}
                            {currentStep < totalSteps && <ChevronRight size={20} />}
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right Side - Team */}
                  <div className="formular-advisor-section">
                    <div className="advisor-image">
                      <img src={teamImage} alt="Unser Expertenteam" />
                    </div>
                    <div className="advisor-content">
                      <h3 className="advisor-title">Unser Expertenteam</h3>
                      <p className="advisor-subtitle">kümmert sich um Ihre Finanzierung und Beratung</p>
                      <div className="advisor-badge">
                        <span className="badge-text">100% kostenfrei</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Formular; 