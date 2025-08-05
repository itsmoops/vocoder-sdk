"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTranslation = exports.TranslationProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var storage_1 = require("./utils/storage");
var env_1 = require("./utils/env");
var TranslationContext = (0, react_1.createContext)(null);
var STORAGE_KEY = 'vocoder_locale';
var TranslationProvider = function (_a) {
    var children = _a.children, _b = _a.defaultLocale, defaultLocale = _b === void 0 ? 'en' : _b, apiKey = _a.apiKey, initialTranslations = _a.translations;
    var _c = (0, react_1.useState)(initialTranslations || {}), translations = _c[0], setTranslations = _c[1];
    var _d = (0, react_1.useState)(function () {
        // Initialize with smart locale detection
        return (0, storage_1.getStoredLocale)(STORAGE_KEY, defaultLocale);
    }), locale = _d[0], setLocaleState = _d[1];
    var _e = (0, react_1.useState)(!initialTranslations), isLoading = _e[0], setIsLoading = _e[1];
    var _f = (0, react_1.useState)(null), error = _f[0], setError = _f[1];
    // Smart locale setter that persists the choice
    var setLocale = function (newLocale) {
        // Get available locales from translations
        var availableLocales = Object.keys(translations);
        // Find the best matching locale
        var bestLocale = (0, storage_1.getBestMatchingLocale)(newLocale, availableLocales, defaultLocale);
        // Update state
        setLocaleState(bestLocale);
        // Persist the choice
        (0, storage_1.setStoredLocale)(STORAGE_KEY, bestLocale);
    };
    (0, react_1.useEffect)(function () {
        // If translations are provided, don't fetch
        if (initialTranslations) {
            return;
        }
        var fetchTranslations = function () { return __awaiter(void 0, void 0, void 0, function () {
            var key, res, data, availableLocales, currentLocale, bestLocale, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        setIsLoading(true);
                        setError(null);
                        key = apiKey || (0, env_1.getEnvVar)('VOCODER_API_KEY');
                        if (!key) {
                            throw new Error('Missing VOCODER_API_KEY. Please provide it as a prop, set VOCODER_API_KEY environment variable, ' +
                                'add a meta tag <meta name="VOCODER_API_KEY" content="your-key">, ' +
                                'or set window.__VOCODER_API_KEY__ = "your-key"');
                        }
                        // Security warning for client-side API keys
                        if (typeof window !== 'undefined' && key) {
                            console.warn('⚠️  SECURITY WARNING: Using API key on client-side exposes it to users. ' +
                                'Consider using server-side rendering or a proxy API endpoint instead.');
                        }
                        return [4 /*yield*/, fetch("https://api.pierogi.dev/translations", {
                                headers: {
                                    'Authorization': "Bearer ".concat(key),
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            throw new Error("Failed to fetch translations: ".concat(res.status, " ").concat(res.statusText));
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        setTranslations(data);
                        // After fetching translations, update locale to best match if needed
                        if (Object.keys(data).length > 0) {
                            availableLocales = Object.keys(data);
                            currentLocale = (0, storage_1.getStoredLocale)(STORAGE_KEY, defaultLocale);
                            bestLocale = (0, storage_1.getBestMatchingLocale)(currentLocale, availableLocales, defaultLocale);
                            if (bestLocale !== currentLocale) {
                                setLocaleState(bestLocale);
                                (0, storage_1.setStoredLocale)(STORAGE_KEY, bestLocale);
                            }
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        setError(err_1 instanceof Error ? err_1.message : 'Failed to fetch translations');
                        console.error('Vocoder SDK Error:', err_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchTranslations();
    }, [apiKey, initialTranslations, defaultLocale]);
    var value = {
        locale: locale,
        setLocale: setLocale,
        translations: translations,
        isLoading: isLoading,
        error: error
    };
    return ((0, jsx_runtime_1.jsx)(TranslationContext.Provider, { value: value, children: children }));
};
exports.TranslationProvider = TranslationProvider;
var useTranslation = function () {
    var context = (0, react_1.useContext)(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used inside TranslationProvider');
    }
    return context;
};
exports.useTranslation = useTranslation;
