'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { dirOf, type Locale, type Text } from './locale'

const LocaleContext = createContext<Locale>('en')

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

/** The page language, plus `t()` to pick the matching side of a { en, ar } pair. */
export function useLocale() {
  const locale = useContext(LocaleContext)
  return {
    locale,
    rtl: dirOf(locale) === 'rtl',
    t: <T,>(text: Text<T>) => text[locale],
  }
}
