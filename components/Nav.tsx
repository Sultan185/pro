'use client'

import { useRef, useState } from 'react'
import { useMotion } from '@/lib/useMotion'
import { ArrowUpRight, Languages, Menu, X } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { onIntroDone } from '@/lib/intro'
import { asset, profile } from '@/lib/data'
import { useLocale } from '@/lib/i18n'
import { pathOf } from '@/lib/locale'
import { ui } from '@/lib/ui'

const links = [
  { href: '#work', label: ui.nav.work },
  { href: '#experience', label: ui.nav.experience },
  { href: '#skills', label: ui.nav.skills },
  { href: '#contact', label: ui.nav.contact },
]

export default function Nav() {
  const bar = useRef<HTMLElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const { locale, t } = useLocale()

  // A plain link: the other language is a separate page with its own <html lang dir>.
  const other = locale === 'en' ? 'ar' : 'en'
  const switchLang = { href: asset(pathOf(other)), lang: other, hrefLang: other }

  useMotion(
    () => {
      let ready = false
      gsap.set(bar.current, { yPercent: -100 })
      const off = onIntroDone(() => {
        gsap.to(bar.current, { yPercent: 0, duration: 1.1, delay: 0.7, ease: 'expo.out', onComplete: () => { ready = true } })
        gsap.from('[data-nav-item]', { y: -16, opacity: 0, duration: 0.8, delay: 0.9, stagger: 0.06, ease: 'expo.out' })
      })

      gsap.to(progress.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })

      // Hide on scroll down, reveal on scroll up (only once the user is in control).
      ScrollTrigger.create({
        start: 120,
        end: 'max',
        onUpdate: (self) => {
          if (!ready) return
          gsap.to(bar.current, { yPercent: self.direction === 1 ? -100 : 0, duration: 0.5, ease: 'power3.out', overwrite: true })
        },
        onLeaveBack: () => ready && gsap.to(bar.current, { yPercent: 0, duration: 0.4, overwrite: true }),
      })

      // Mark the link of the section currently under the reading line.
      links.forEach(({ href }) => {
        const section = document.querySelector(href)
        const link = bar.current?.querySelector(`[data-nav-item][href="${href}"]`)
        if (!section || !link) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleClass: { targets: link, className: 'is-active' },
        })
      })

      return () => off()
    },
    { scope: bar },
  )

  return (
    <header ref={bar} className="fixed inset-x-0 top-0 z-50 will-change-transform">
      <div className="border-b border-line bg-bg/70 backdrop-blur-xl">
        <div className="wrap flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary font-mono text-xs text-black">MS</span>
            <span className="hidden sm:inline">{t(profile.name)}</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} data-nav-item className="nav-link">
                {t(l.label)}
              </a>
            ))}
            <a {...switchLang} data-nav-item className="nav-link inline-flex items-center gap-1.5">
              <Languages size={15} /> {t(ui.nav.switchTo)}
            </a>
            <a href={t(profile.cv)} target="_blank" rel="noopener noreferrer" data-magnetic className="btn-ghost !px-4 !py-2 text-xs">
              {t(ui.nav.resume)} <ArrowUpRight size={14} className="ar:-scale-x-100" />
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a {...switchLang} className="flex h-10 items-center gap-1.5 rounded-full border border-line px-3.5 text-sm">
              <Languages size={15} /> {t(ui.nav.switchTo)}
            </a>
            <button
              aria-label={t(open ? ui.nav.closeMenu : ui.nav.openMenu)}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <div ref={progress} className="h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-primary-soft ar:origin-right ar:bg-gradient-to-l" />
      </div>

      {open && (
        <div className="border-b border-line bg-bg/95 backdrop-blur-xl md:hidden">
          <div className="wrap flex flex-col py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 font-display text-2xl font-medium">
                {t(l.label)}
              </a>
            ))}
            <a href={t(profile.cv)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full">
              {t(ui.nav.downloadResume)}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
