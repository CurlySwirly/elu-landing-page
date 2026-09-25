export const LOCALES = ['de', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_STORAGE_KEY = 'elu-locale';

export function isLocale(value: string | null): value is Locale {
  return value === 'de' || value === 'en';
}

export function detectBrowserLocale(): Locale {
  const languages =
    typeof navigator !== 'undefined' && navigator.languages?.length
      ? navigator.languages
      : typeof navigator !== 'undefined'
        ? [navigator.language]
        : ['de'];

  for (const language of languages) {
    const code = language.toLowerCase();
    if (code.startsWith('de')) return 'de';
    if (code.startsWith('en')) return 'en';
  }

  return 'de';
}

export function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(stored) ? stored : null;
}

export function detectLocale(): Locale {
  if (typeof window !== 'undefined') {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(requested)) {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, requested);
      return requested;
    }
  }
  return readStoredLocale() ?? detectBrowserLocale();
}
