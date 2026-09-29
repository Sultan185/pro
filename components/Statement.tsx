'use client'

import { useRef } from 'react'
import { useMotion } from '@/lib/useMotion'
import { gsap, SplitText, MOTION } from '@/lib/gsap'
import { stats } from '@/lib/data'
import { useLocale } from '@/lib/i18n'
import { ui } from '@/lib/ui'

/** Scroll-scrubbed manifesto: words light up as you read, then the numbers count in. */
export default function Statement() {
  const { rtl, t } = useLocale()
  const root = useRef<HTMLElement>(null)
  const text = useRef<HTMLParagraphElement>(null)

  useMotion(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        SplitText.create(text.current, {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.12 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.08,
                scrollTrigger: { trigger: text.current, start: 'top 78%', end: 'bottom 45%', scrub: 0.6 },
              },
            ),
        })

        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el, i) => {
          const target = Number(el.dataset.count)
          const obj = { v: 0 }
          el.textContent = '0'
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: 'power3.out',
            delay: i * 0.12,
            onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US') },
            scrollTrigger: { trigger: '[data-stats]', start: 'top 85%', once: true },
          })
        })
        gsap.from('[data-stat]', {
          yPercent: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-stats]', start: 'top 85%', once: true },
        })
        gsap.from('[data-rule]', {
          scaleX: 0, transformOrigin: rtl ? 'right center' : 'left center', duration: 1.4, ease: 'expo.inOut',
          scrollTrigger: { trigger: '[data-stats]', start: 'top 88%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="section pb-16 sm:pb-20">
      <div className="wrap">
        <p className="eyebrow mb-8">{t(ui.statement.eyebrow)}</p>
        <p ref={text} className="max-w-5xl font-display text-[clamp(1.6rem,3.6vw,3.1rem)] font-medium leading-[1.18] tracking-tight">
          {t(ui.statement.body)}
        </p>

        <div data-stats className="relative mt-20">
          <div data-rule className="h-px w-full bg-line-strong" />
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s) => {
              const suffix = <span className="text-primary">{s.suffix}</span>
              return (
                <div key={s.label.en} data-stat className="min-w-0 border-b border-line px-1 py-8 md:border-b-0 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0 ar:md:border-l ar:md:border-r-0 ar:md:last:border-l-0 ar:md:first:pl-8 ar:md:first:pr-0">
                  {/* Arabic puts the sign after the number in reading order, so on its left: +1,000 and %35. */}
                  <dd dir="ltr" className="mb-2 font-display text-[clamp(2.1rem,11vw,3rem)] font-semibold tracking-tight sm:text-6xl ar:text-right">
                    {rtl && suffix}
                    <span data-count={s.value}>{s.value.toLocaleString('en-US')}</span>
                    {!rtl && suffix}
                  </dd>
                  <dt className="text-sm text-muted">{t(s.label)}</dt>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
