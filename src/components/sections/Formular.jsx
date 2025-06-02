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
    phone: '',
    email: '',
    privacyAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        }
        if (!formData.email) {
          newErrors.email = t('formular.step3.validation.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t('formular.step3.validation.emailInvalid');
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

  const handleNext = () => {
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
      // Hier würde normalerweise die API-Anfrage stattfinden
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Nach 3 Sekunden zur Startseite weiterleiten
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
          <div className="formular-content-wrapper">
            <div className="formular-container">
              <div className="formular-card">
                {/* Logo Header */}
                <div className="formular-logo-header">
                  <img src={logo} alt="CD Immobilien Portfolio GmbH Logo" className="formular-logo" />
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
                              />
                              {errors.name && <span className="error-message" style={{display: 'block', color: '#ff6b6b', fontSize: '14px', marginTop: '8px'}}>{errors.name}</span>}
                            </div>
                            
                            <div className="form-group">
                              <input
                                type="tel"
                                placeholder={t('formular.step3.phone')}
                                value={formData.phone}
                                onChange={(e) => updateFormData('phone', e.target.value)}
                                className={`form-input ${errors.phone ? 'error' : ''}`}
                              />
                              {errors.phone && <span className="error-message" style={{display: 'block', color: '#ff6b6b', fontSize: '14px', marginTop: '8px'}}>{errors.phone}</span>}
                            </div>
                            
                            <div className="form-group">
                              <input
                                type="email"
                                placeholder={t('formular.step3.email')}
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                              />
                              {errors.email && <span className="error-message" style={{display: 'block', color: '#ff6b6b', fontSize: '14px', marginTop: '8px'}}>{errors.email}</span>}
                            </div>
                            
                            <div className="privacy-section" style={{marginTop: '24px'}}>
                              <label className="privacy-label" style={{display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', fontFamily: '"Outfit", -apple-system, Roboto, Helvetica, sans-serif', fontWeight: '400', lineHeight: '1.5'}}>
                                <input
                                  type="checkbox"
                                  checked={formData.privacyAccepted}
                                  onChange={(e) => updateFormData('privacyAccepted', e.target.checked)}
                                  className="privacy-checkbox"
                                  style={{opacity: 0, position: 'absolute', pointerEvents: 'none'}}
                                />
                                <span className="checkmark" style={{width: '20px', height: '20px', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px', position: 'relative', transition: 'all 0.3s ease', flexShrink: 0, marginTop: '2px'}}></span>
                                {t('formular.step3.privacy')} <a href="/datenschutz" className="privacy-link" style={{color: '#e2ac6b', textDecoration: 'underline'}}>{t('formular.step3.privacyLink')}</a>
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
                      >
                        {currentStep === totalSteps ? t('formular.step3.submit') : t('formular.step1.continue')}
                        {currentStep < totalSteps && <ChevronRight size={20} />}
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