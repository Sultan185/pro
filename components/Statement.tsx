'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText, MOTION } from '@/lib/gsap'
import { stats } from '@/lib/data'

/** Scroll-scrubbed manifesto: words light up as you read, then the numbers count in. */
export default function Statement() {
  const root = useRef<HTMLElement>(null)
  const text = useRef<HTMLParagraphElement>(null)

  useGSAP(
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
          scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'expo.inOut',
          scrollTrigger: { trigger: '[data-stats]', start: 'top 88%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="section pb-16 sm:pb-20">
      <div className="wrap">
        <p className="eyebrow mb-8">What I do</p>
        <p ref={text} className="max-w-5xl font-display text-[clamp(1.6rem,3.6vw,3.1rem)] font-medium leading-[1.18] tracking-tight">
          I take products from a blank repo to thousands of paying merchants. Multi-tenant Laravel backends, React and
          Inertia frontends, webhook pipelines that never double-fire, and payment flows that reconcile to the cent,
          built for the Saudi and Gulf market.
        </p>

        <div data-stats className="relative mt-20">
          <div data-rule className="h-px w-full bg-line-strong" />
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} data-stat className="border-b border-line px-1 py-8 md:border-b-0 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0">
                <dd className="mb-2 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                  <span data-count={s.value}>{s.value.toLocaleString('en-US')}</span>
                  <span className="text-primary">{s.suffix}</span>
                </dd>
                <dt className="text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
