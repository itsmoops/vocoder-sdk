"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translation = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TranslationProvider_1 = require("./TranslationProvider");
// Simple message formatter without react-intl
var formatMessage = function (template, values) {
    return template.replace(/\{(\w+)\}/g, function (match, key) {
        return values[key] !== undefined ? String(values[key]) : match;
    });
};
var Translation = function (_a) {
    var _b;
    var id = _a.id, text = _a.text, values = __rest(_a, ["id", "text"]);
    var _c = (0, TranslationProvider_1.useTranslation)(), locale = _c.locale, translations = _c.translations, isLoading = _c.isLoading, error = _c.error;
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)("span", { children: "Loading..." });
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)("span", { children: "Translation error" });
    }
    // Get the translation template from the current locale
    var template = ((_b = translations[locale]) === null || _b === void 0 ? void 0 : _b[id]) || text || id;
    try {
        // Format the message with the provided values
        var result = formatMessage(template, values);
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: result });
    }
    catch (err) {
        console.error('Translation formatting error:', err);
        return (0, jsx_runtime_1.jsx)("span", { children: template });
    }
};
exports.Translation = Translation;
