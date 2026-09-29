export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]

/** A value written once per language, e.g. { en: 'Work', ar: 'الأعمال' }. */
export type Text<T = string> = Record<Locale, T>

/** Headline in three parts; the middle one is painted in the accent colour. */
export type Headline = Text<[before: string, accent: string, after: string]>

export const dirOf = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr')

/** English lives at the site root, Arabic under /ar. */
export const pathOf = (locale: Locale) => (locale === 'en' ? '/' : `/${locale}`)
