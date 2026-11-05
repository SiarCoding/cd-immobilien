import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

// Flaggen liegen lokal als SVG (country-flag-icons, MIT), Windows zeigt Flaggen-Emojis nur als Buchstaben.
const flagFiles = require.context('../../assets/flags', false, /\.svg$/);
const flagUrl = (iso) => flagFiles(`./${iso}.svg`);

export const COUNTRIES = [
  ['DE', '+49'], ['AT', '+43'], ['CH', '+41'], ['FR', '+33'], ['IT', '+39'], ['ES', '+34'],
  ['NL', '+31'], ['BE', '+32'], ['DK', '+45'], ['SE', '+46'], ['NO', '+47'], ['FI', '+358'],
  ['PL', '+48'], ['CZ', '+420'], ['HU', '+36'], ['HR', '+385'], ['SI', '+386'], ['SK', '+421'],
  ['RO', '+40'], ['BG', '+359'], ['GR', '+30'], ['PT', '+351'], ['IE', '+353'], ['GB', '+44'],
  ['US', '+1'], ['CA', '+1'], ['AU', '+61'], ['AF', '+93'], ['TR', '+90'], ['RU', '+7'],
  ['CN', '+86'], ['IN', '+91'], ['JP', '+81'], ['KR', '+82']
].map(([iso, dial]) => ({ iso, dial }));

const CountrySelect = ({ value, onChange, language, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const countries = useMemo(() => {
    const names = new Intl.DisplayNames([language.toLowerCase()], { type: 'region' });
    return COUNTRIES.map((country) => ({ ...country, name: names.of(country.iso) }));
  }, [language]);

  const selected = countries.find((country) => country.iso === value) || countries[0];

  // Beim Oeffnen die aktuelle Auswahl markieren und Fokus in die Liste setzen
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(countries.findIndex((country) => country.iso === selected.iso));
      listRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  // Klick ausserhalb schliesst die Liste
  useEffect(() => {
    if (!isOpen) return undefined;
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const choose = (country) => {
    onChange(country);
    close();
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (event) => {
    const last = countries.length - 1;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, last));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(last);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(countries[activeIndex]);
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        // Tippen eines Buchstabens springt zum ersten passenden Land
        if (event.key.length === 1) {
          const key = event.key.toLowerCase();
          const match = countries.findIndex((country) => country.name.toLowerCase().startsWith(key));
          if (match >= 0) setActiveIndex(match);
        }
    }
  };

  return (
    <div className="lead-country" ref={containerRef}>
      <button
        type="button"
        ref={buttonRef}
        className="lead-country-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${label}: ${selected.name} ${selected.dial}`}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleButtonKeyDown}
      >
        <img className="lead-flag" src={flagUrl(selected.iso)} alt="" width="24" height="16" />
        <span>{selected.dial}</span>
        <ChevronDown className={`lead-country-chevron ${isOpen ? 'is-open' : ''}`} size={18} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          className="lead-country-list"
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`lead-country-${countries[activeIndex]?.iso}`}
          onKeyDown={handleListKeyDown}
        >
          {countries.map((country, index) => {
            const isSelected = country.iso === selected.iso;
            return (
              <li
                key={country.iso}
                id={`lead-country-${country.iso}`}
                role="option"
                aria-selected={isSelected}
                className={`lead-country-option ${index === activeIndex ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(country)}
              >
                <img className="lead-flag" src={flagUrl(country.iso)} alt="" width="24" height="16" />
                <span className="lead-country-name">{country.name}</span>
                <span className="lead-country-dial">{country.dial}</span>
                <span className="lead-country-check" aria-hidden="true">
                  {isSelected && <Check size={16} />}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CountrySelect;
