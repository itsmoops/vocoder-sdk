"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestMatchingLocale = exports.isLocaleSupported = exports.getBrowserLocale = exports.setStoredLocale = exports.getStoredLocale = void 0;
// Isomorphic storage utility for locale persistence
var getStoredLocale = function (key, fallback) {
    var _a;
    // Server-side: return fallback (no persistence)
    if (typeof window === 'undefined') {
        return fallback;
    }
    try {
        // Client-side: try localStorage first
        var stored = localStorage.getItem(key);
        if (stored) {
            return stored;
        }
        // Fallback to sessionStorage if localStorage fails
        var sessionStored = sessionStorage.getItem(key);
        if (sessionStored) {
            return sessionStored;
        }
        // Check for URL parameter (useful for sharing links with specific locale)
        var urlParams = new URLSearchParams(window.location.search);
        var urlLocale = urlParams.get('locale');
        if (urlLocale) {
            return urlLocale;
        }
        // Check for Accept-Language header (browser preference)
        var browserLocale = (_a = navigator.language) === null || _a === void 0 ? void 0 : _a.split('-')[0];
        if (browserLocale) {
            return browserLocale;
        }
        return fallback;
    }
    catch (error) {
        // If storage is blocked (private browsing, etc.), fall back gracefully
        console.warn('Storage access blocked, using fallback locale:', fallback);
        return fallback;
    }
};
exports.getStoredLocale = getStoredLocale;
var setStoredLocale = function (key, locale) {
    // Server-side: no-op
    if (typeof window === 'undefined') {
        return;
    }
    try {
        // Try localStorage first
        localStorage.setItem(key, locale);
        // Also update sessionStorage for redundancy
        sessionStorage.setItem(key, locale);
    }
    catch (error) {
        // If localStorage fails, try sessionStorage only
        try {
            sessionStorage.setItem(key, locale);
        }
        catch (sessionError) {
            console.warn('Unable to persist locale preference:', sessionError);
        }
    }
};
exports.setStoredLocale = setStoredLocale;
// Utility to get browser's preferred locale
var getBrowserLocale = function () {
    if (typeof window === 'undefined') {
        return null;
    }
    // Try navigator.language first
    if (navigator.language) {
        return navigator.language.split('-')[0];
    }
    // Fallback to navigator.languages
    if (navigator.languages && navigator.languages.length > 0) {
        return navigator.languages[0].split('-')[0];
    }
    return null;
};
exports.getBrowserLocale = getBrowserLocale;
// Utility to check if a locale is supported
var isLocaleSupported = function (locale, supportedLocales) {
    return supportedLocales.includes(locale);
};
exports.isLocaleSupported = isLocaleSupported;
// Utility to get the best matching locale from supported options
var getBestMatchingLocale = function (preferredLocale, supportedLocales, fallback) {
    // Exact match
    if ((0, exports.isLocaleSupported)(preferredLocale, supportedLocales)) {
        return preferredLocale;
    }
    // Try language code only (e.g., 'en' from 'en-US')
    var languageCode = preferredLocale.split('-')[0];
    if ((0, exports.isLocaleSupported)(languageCode, supportedLocales)) {
        return languageCode;
    }
    // Try to find a similar locale (e.g., 'en-US' -> 'en-GB')
    var similarLocale = supportedLocales.find(function (locale) {
        return locale.startsWith(languageCode + '-');
    });
    if (similarLocale) {
        return similarLocale;
    }
    return fallback;
};
exports.getBestMatchingLocale = getBestMatchingLocale;
