"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  // Detect system language on mount
  useEffect(() => {
    const detectSystemLanguage = (): Language => {
      const browserLang = navigator.language.toLowerCase();
      
      if (browserLang.startsWith('uk')) return 'uk';
      if (browserLang.startsWith('ru')) return 'ru';
      if (browserLang.startsWith('es')) return 'es';
      
      return 'en'; // Default to English
    };

    setLanguage(detectSystemLanguage());
  }, []);

  // Translation function
  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 