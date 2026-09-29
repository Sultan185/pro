'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { finishIntro, markIntroSeen, shouldSkipIntro } from '@/lib/intro'
import { profile } from '@/lib/data'
import { useLocale } from '@/lib/i18n'
import { ui } from '@/lib/ui'

/**
 * Counter + name reveal, then a curtain lift that hands over to the hero intro.
 * Skipped on repeat visits within the tab and for reduced-motion users.
 */
export default function Preloader() {
  const { rtl, t } = useLocale()
  const root = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState<boolean | null>(null)

  useEffect(() => {
    if (shouldSkipIntro()) {
      setActive(false)
      finishIntro()
      return
    }
    setActive(true)
  }, [])

  useEffect(() => {
    if (!active || !root.current) return
    const el = root.current
    const letters = el.querySelectorAll<HTMLElement>('[data-letter]')
    const n = { v: 0 }
    const close = () => {
      markIntroSeen()
      finishIntro()
      setActive(false)
    }
    // Whatever happens to the animation, the overlay is gone after 5s.
    const failsafe = window.setTimeout(close, 5000)
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        window.clearTimeout(failsafe)
        close()
      },
    })

    tl.from(letters, { yPercent: 110, duration: 1, stagger: rtl ? 0.12 : 0.035 }, 0.1)
      .to(n, {
        v: 100, duration: 1.7, ease: 'power2.inOut',
        onUpdate: () => { if (counter.current) counter.current.textContent = String(Math.round(n.v)).padStart(3, '0') },
      }, 0.1)
      .to('[data-bar]', { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0.1)
      .to(letters, { yPercent: -110, duration: 0.7, ease: 'expo.in', stagger: rtl ? 0.06 : 0.02 }, '-=0.15')
      .to('[data-meta]', { opacity: 0, duration: 0.3 }, '<')
      .add(() => finishIntro(), '-=0.05')
      .to(el, { yPercent: -100, duration: 1.05, ease: 'expo.inOut' }, '<')
      .to('[data-curtain]', { yPercent: -100, duration: 1.05, ease: 'expo.inOut' }, '<0.06')

    return () => { window.clearTimeout(failsafe); tl.kill() }
  }, [active])

  if (!active) return null

  // Latin animates letter by letter; Arabic letters join up, so that name moves word by word.
  const name = t(profile.name)
  const pieces = rtl ? name.split(' ').map((word) => `${word} `) : name.split('')

  return (
    <div ref={root} className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg p-6 sm:p-10 will-change-transform" aria-hidden="true">
      <div data-curtain className="pointer-events-none absolute inset-0 -z-10 translate-y-full bg-primary" />
      <div data-meta className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-dim ar:text-[13px]">
        <span>{t(ui.preloader.portfolio)} · 2026</span>
        <span>{t(profile.location)}</span>
      </div>

      <div className="flex flex-wrap overflow-hidden font-display text-[clamp(2.4rem,9vw,7rem)] font-semibold leading-none tracking-tightest ar:leading-[1.4]">
        {pieces.map((ch, i) => (
          <span key={i} data-letter className="inline-block will-change-transform" style={{ whiteSpace: 'pre' }}>
            {ch}
          </span>
        ))}
      </div>

      <div data-meta className="flex items-end justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim ar:text-[13px]">{t(ui.preloader.loading)}</span>
        <span ref={counter} className="font-mono text-5xl tabular-nums text-fg sm:text-7xl">000</span>
      </div>
      <div data-bar className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-primary ar:origin-right" />
    </div>
  )
}
