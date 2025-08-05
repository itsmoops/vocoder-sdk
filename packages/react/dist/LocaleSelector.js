"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleSelector = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TranslationProvider_1 = require("./TranslationProvider");
var LocaleSelector = function (_a) {
    var className = _a.className, _b = _a.placeholder, placeholder = _b === void 0 ? "Select language" : _b;
    var _c = (0, TranslationProvider_1.useTranslation)(), locale = _c.locale, setLocale = _c.setLocale, translations = _c.translations, isLoading = _c.isLoading, error = _c.error;
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("select", { className: className, disabled: true, children: (0, jsx_runtime_1.jsx)("option", { children: "Loading..." }) }));
    }
    if (error) {
        return ((0, jsx_runtime_1.jsx)("select", { className: className, disabled: true, children: (0, jsx_runtime_1.jsx)("option", { children: "Error loading languages" }) }));
    }
    var availableLocales = Object.keys(translations);
    return ((0, jsx_runtime_1.jsxs)("select", { className: className, value: locale, onChange: function (e) { return setLocale(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: placeholder }), availableLocales.map(function (lang) { return ((0, jsx_runtime_1.jsx)("option", { value: lang, children: lang === 'en' ? 'English' :
                    lang === 'fr' ? 'Français' :
                        lang === 'es' ? 'Español' :
                            lang }, lang)); })] }));
};
exports.LocaleSelector = LocaleSelector;
