import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { de } from './de';
import { en } from './en';
import { getMessage, interpolate } from './interpolate';
import {
  detectLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
} from './locale';

const messages = { de, en };

type Translate = (path: string, vars?: Record<string, string | number>) => string;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translate;
  messages: typeof de;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.title = messages[locale].meta.title;
  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute('content', messages[locale].meta.description);
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }, []);

  const t = useCallback<Translate>(
    (path, vars) => {
      const value = getMessage(messages[locale] as unknown as Record<string, unknown>, path);
      if (!value) {
        if (import.meta.env.DEV) {
          console.warn(`Missing translation: ${path}`);
        }
        return path;
      }
      return interpolate(value, vars);
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, messages: messages[locale] }),
    [locale, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
