export declare const getStoredLocale: (key: string, fallback: string) => string;
export declare const setStoredLocale: (key: string, locale: string) => void;
export declare const getBrowserLocale: () => string | null;
export declare const isLocaleSupported: (locale: string, supportedLocales: string[]) => boolean;
export declare const getBestMatchingLocale: (preferredLocale: string, supportedLocales: string[], fallback: string) => string;
