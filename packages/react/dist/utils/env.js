"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = void 0;
// Isomorphic environment variable getter
var getEnvVar = function (key) {
    // Server
    if (typeof process !== 'undefined' && process.env && typeof process.env === 'object') {
        return process.env[key];
    }
    // Client
    if (typeof window !== 'undefined') {
        // Check for global variables set by the parent app
        var globalKey = "__".concat(key, "__");
        if (window[globalKey]) {
            return window[globalKey];
        }
        // Check for meta tags (common pattern)
        var metaTag = document.querySelector("meta[name=\"".concat(key, "\"]"));
        if (metaTag) {
            return metaTag.getAttribute('content') || undefined;
        }
    }
    return undefined;
};
exports.getEnvVar = getEnvVar;
