// Core types for Vocoder SDK

export type TranslationsMap = Record<string, Record<string, string>>;

export type TranslationContextValue = {
  locale: string;
  setLocale: (locale: string) => void;
  translations: TranslationsMap;
  isLoading: boolean;
  error: string | null;
};

export type TranslationProps = {
  id: string;
  text?: string;
  [key: string]: any;
};

export type LocaleSelectorProps = {
  className?: string;
  placeholder?: string;
};

export type TranslationProviderProps = {
  children: any; // Changed from React.ReactNode to any to fix linter error
  defaultLocale?: string;
  apiKey?: string;
  translations?: TranslationsMap; // Allow pre-fetched translations for SSR
};
