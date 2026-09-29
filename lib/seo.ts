import type { Metadata, Viewport } from 'next'
import { asset, profile } from './data'
import { pathOf, type Locale } from './locale'
import { ui } from './ui'

const ogLocale = { en: 'en_US', ar: 'ar_SA' } as const

export function buildMetadata(locale: Locale): Metadata {
  const title = `${profile.name[locale]} · ${profile.role[locale]}`
  const description = ui.meta.description[locale]

  return {
    metadataBase: new URL(profile.siteUrl),
    title,
    description,
    keywords: ui.meta.keywords[locale],
    authors: [{ name: profile.name[locale], url: profile.github }],
    creator: profile.name[locale],
    // Tells search engines the two pages are the same content in different languages.
    alternates: {
      canonical: asset(pathOf(locale)),
      languages: { en: asset(pathOf('en')), ar: asset(pathOf('ar')), 'x-default': asset(pathOf('en')) },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: asset(pathOf(locale)),
      siteName: profile.name[locale],
      locale: ogLocale[locale],
      alternateLocale: locale === 'en' ? ogLocale.ar : ogLocale.en,
      images: [{ url: asset('/projects/azz.webp'), width: 1200, height: 750, alt: ui.meta.ogAlt[locale] }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
    icons: { icon: asset('/favicon.svg') },
  }
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export const buildJsonLd = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name[locale],
  alternateName: profile.name[locale === 'en' ? 'ar' : 'en'],
  jobTitle: profile.role[locale],
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: profile.siteUrl,
  sameAs: [profile.github, profile.linkedin],
  address: { '@type': 'PostalAddress', addressLocality: 'Menoufia', addressCountry: 'EG' },
  knowsAbout: ['Laravel', 'PHP', 'React', 'Inertia.js', 'Vue.js', 'MySQL', 'AWS', 'Salla', 'Multi-tenant architecture'],
  knowsLanguage: ['ar', 'en'],
})
