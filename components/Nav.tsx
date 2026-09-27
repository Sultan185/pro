'use client'

import { useRef, useState } from 'react'
import { useMotion } from '@/lib/useMotion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { onIntroDone } from '@/lib/intro'
import { profile } from '@/lib/data'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const bar = useRef<HTMLElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

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
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} data-nav-item className="nav-link">
                {l.label}
              </a>
            ))}
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" data-magnetic className="btn-ghost !px-4 !py-2 text-xs">
              Résumé <ArrowUpRight size={14} />
            </a>
          </nav>

          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <div ref={progress} className="h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-primary-soft" />
      </div>

      {open && (
        <div className="border-b border-line bg-bg/95 backdrop-blur-xl md:hidden">
          <div className="wrap flex flex-col py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 font-display text-2xl font-medium">
                {l.label}
              </a>
            ))}
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full">
              Download résumé
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
