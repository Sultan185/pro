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

// Runs before any bundle. Plain ES5 so every browser can execute it.
//  1. marks JS as available and arms the watchdog that un-hides content
//  2. with ?debug in the URL, prints device info and every error on screen
const bootScript = `(function(){
var d=document.documentElement;d.classList.add('js');
setTimeout(function(){if(!window.__motion)d.classList.add('no-motion')},4000);
if(location.search.indexOf('debug')<0)return;
var box=document.createElement('pre');
box.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99999;max-height:60%;overflow:auto;margin:0;padding:10px;background:#000;color:#0f0;font:11px/1.4 monospace;white-space:pre-wrap;word-break:break-all;border-top:2px solid #ff6a00';
function log(m){box.textContent+=m+'\\n';if(!box.parentNode&&document.body)document.body.appendChild(box)}
document.addEventListener('DOMContentLoaded',function(){if(!box.parentNode)document.body.appendChild(box)});
log('UA: '+navigator.userAgent);
log('screen: '+screen.width+'x'+screen.height+' viewport: '+window.innerWidth+'x'+window.innerHeight+' dpr: '+window.devicePixelRatio);
log('reduced-motion: '+(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)+' pointer-fine: '+(window.matchMedia&&matchMedia('(pointer: fine)').matches));
window.addEventListener('error',function(e){var t=e.target||{};if(t.src||t.href)log('LOAD FAILED: '+(t.src||t.href));else log('ERROR: '+e.message+' @ '+(e.filename||'').split('/').pop()+':'+e.lineno)},true);
window.addEventListener('unhandledrejection',function(e){log('REJECTION: '+(e.reason&&(e.reason.message||e.reason)))});
setTimeout(function(){log('after 5s: motion='+(!!window.__motion)+' classes='+d.className.replace(/__variable_\\w+/g,'').replace(/\\s+/g,' ')+' layoutW='+d.scrollWidth+' preloader='+(!!document.querySelector('[data-bar]')))},5000);
})()`
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body className="noise">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  )
}
