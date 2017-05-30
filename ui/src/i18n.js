import Jed from 'jed';
import 'whatwg-fetch';
import moment from 'moment';

import 'moment/locale/ru';
import 'moment/locale/uk';

const DEFAULT_LOCALE = 'ru';
export const SUPPORTED_LOCALES = ['ru', 'uk'];


let i18n;
let locale;

export function sprintf(...args) {
    return Jed.sprintf.apply(this, args);
}

export function l(text, context) {
    return context
        ? i18n.pgettext(context, text)
        : i18n.gettext(text);
}

export function nl(singular, plural, amount, context) {
    if (!Number.isInteger(amount)) {
        return singular;
    }
    return context
        ? i18n.npgettext(context, singular, plural, amount)
        : i18n.ngettext(singular, plural, amount);
}

export function init(localeData, localeCode) {
    i18n = new Jed(localeData);
    locale = localeCode;

    window.l = l;
    window.nl = nl;
    window.sprintf = sprintf;
    moment.locale(localeCode);
}

export function getSupportedLocales() {
    return SUPPORTED_LOCALES;
}

export function getLocale() {
    return locale;
}

export function isLocaleSupported(localeCode) {
    return getSupportedLocales().indexOf(localeCode) !== -1;
}

export function detectUserLocale(userLang) {
    const language = userLang || navigator.language || navigator.userLanguage;
    const lang = language.substr(0, 2);

    if (isLocaleSupported(lang)) {
        return lang;
    }

    return DEFAULT_LOCALE;
}

export function loadLocaleData(localeCode) {
    if (localeCode === DEFAULT_LOCALE) {
        // No need to load as UI already in Russian
        return Promise.resolve({});
    }

    return fetch(`/lang/${localeCode}.json`).then((res) => {
        if (res.status >= 400) {
            throw new Error('Cannot get locale from server', localeCode);
        }

        return res.json();
    });
}

export function setLocaleData(localeCode) {
    return loadLocaleData(localeCode)
        .then((localeData) => {
            init(localeData, localeCode);
        }, err => console.error('error load locale', err));
}

