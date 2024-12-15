// src/utils/languageHelper.js
const getPreferredLanguage = (req) => {
    const lang = req.headers['accept-language'];
    if (lang && lang.startsWith('kk')) return 'kk';
    if (lang && lang.startsWith('ru')) return 'ru';
    return 'en'; // Default to English
};

module.exports = { getPreferredLanguage };
