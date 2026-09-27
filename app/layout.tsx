import type { Metadata, Viewport } from 'next'
import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { profile } from '@/lib/data'
import SmoothScroll from '@/components/SmoothScroll'
import Cursor from '@/components/Cursor'
import Preloader from '@/components/Preloader'

const sora = Sora({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700'], display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'], display: 'swap' })

const title = `${profile.name} · ${profile.role}`
const description =
  'Full-Stack Developer shipping multi-tenant SaaS on Laravel, React and the Salla ecosystem. Salla App Store apps, ERP, clinic and EdTech platforms running across 1,000+ live merchant stores.'

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  keywords: ['Laravel developer', 'Full-Stack Developer', 'Salla App Store', 'React', 'Inertia.js', 'Multi-tenant SaaS', 'Saudi Arabia', 'Egypt', 'Remote'],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: profile.name,
    images: [{ url: '/projects/azz.webp', width: 1200, height: 750, alt: 'Azz on the Salla App Store' }],
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: profile.siteUrl,
  sameAs: [profile.github, profile.linkedin],
  address: { '@type': 'PostalAddress', addressLocality: 'Menoufia', addressCountry: 'EG' },
  knowsAbout: ['Laravel', 'PHP', 'React', 'Inertia.js', 'Vue.js', 'MySQL', 'AWS', 'Salla', 'Multi-tenant architecture'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body className="noise">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__motion)document.documentElement.classList.add('no-motion')},4000)",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  )
}
