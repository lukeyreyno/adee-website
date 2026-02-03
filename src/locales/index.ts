import enStrings from '@adee/locales/en-US.json';

type Locale = 'en-US';

const locales: Record<Locale, typeof enStrings> = {
  'en-US': enStrings,
};

const getCurrentLocale = (): Locale => {
  const stored = localStorage.getItem('locale');
  if (stored && stored in locales) {
    return stored as Locale;
  }
  return window.navigator.language as Locale;
};

const setLocale = (locale: Locale): void => {
  if (locale in locales) {
    localStorage.setItem('locale', locale);
  }
};

const getStrings = (): typeof enStrings => {
  const locale = getCurrentLocale();
  return locales[locale];
};

export {
    getCurrentLocale,
    setLocale,
    getStrings
};

export type {Locale};
