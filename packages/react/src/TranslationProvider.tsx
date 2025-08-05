import React, { createContext, useContext, useEffect, useState } from 'react';
import type { TranslationContextValue, TranslationProviderProps, TranslationsMap } from './types';
import {
  getBestMatchingLocale,
  getStoredLocale,
  setStoredLocale
} from './utils/storage';

import { getEnvVar } from './utils/env';

const TranslationContext = createContext<TranslationContextValue | null>(null);

const STORAGE_KEY = 'vocoder_locale';

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children, 
  defaultLocale = 'en',
  apiKey,
  translations: initialTranslations
}) => {
  const [translations, setTranslations] = useState<TranslationsMap>(initialTranslations || {});
  const [locale, setLocaleState] = useState<string>(() => {
    // Initialize with smart locale detection
    return getStoredLocale(STORAGE_KEY, defaultLocale);
  });
  const [isLoading, setIsLoading] = useState(!initialTranslations);
  const [error, setError] = useState<string | null>(null);

  // Smart locale setter that persists the choice
  const setLocale = (newLocale: string) => {
    // Get available locales from translations
    const availableLocales = Object.keys(translations);
    
    // Find the best matching locale
    const bestLocale = getBestMatchingLocale(newLocale, availableLocales, defaultLocale);
    
    // Update state
    setLocaleState(bestLocale);
    
    // Persist the choice
    setStoredLocale(STORAGE_KEY, bestLocale);
  };

  useEffect(() => {
    // If translations are provided, don't fetch
    if (initialTranslations) {
      return;
    }

    const fetchTranslations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get API key from props, then environment variables
        const key = apiKey || getEnvVar('VOCODER_API_KEY');

        if (!key) {
          throw new Error(
            'Missing VOCODER_API_KEY. Please provide it as a prop, set VOCODER_API_KEY environment variable, ' +
            'add a meta tag <meta name="VOCODER_API_KEY" content="your-key">, ' +
            'or set window.__VOCODER_API_KEY__ = "your-key"'
          );
        }

        // Security warning for client-side API keys
        if (typeof window !== 'undefined' && key) {
          console.warn(
            '⚠️  SECURITY WARNING: Using API key on client-side exposes it to users. ' +
            'Consider using server-side rendering or a proxy API endpoint instead.'
          );
        }

        const res = await fetch(`https://api.pierogi.dev/translations`, {
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch translations: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setTranslations(data);

        // After fetching translations, update locale to best match if needed
        if (Object.keys(data).length > 0) {
          const availableLocales = Object.keys(data);
          const currentLocale = getStoredLocale(STORAGE_KEY, defaultLocale);
          const bestLocale = getBestMatchingLocale(currentLocale, availableLocales, defaultLocale);
          
          if (bestLocale !== currentLocale) {
            setLocaleState(bestLocale);
            setStoredLocale(STORAGE_KEY, bestLocale);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch translations');
        console.error('Vocoder SDK Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, [apiKey, initialTranslations, defaultLocale]);

  const value: TranslationContextValue = {
    locale,
    setLocale,
    translations,
    isLoading,
    error
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used inside TranslationProvider');
  }
  return context;
}; 