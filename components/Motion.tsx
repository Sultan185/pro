'use client'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText, MOTION, FINE, REDUCED } from '@/lib/gsap'

/**
 * Page-wide motion primitives, declared once:
 *  - [data-split]    headline lines rise out of a mask, re-split on resize/font load
 *  - [data-reveal]   batched fade-and-rise
 *  - [data-magnetic] element leans toward the pointer
 */
export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(MOTION, () => {
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.035,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        })
      })

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      })
    })

    mm.add(FINE, () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('[data-magnetic]').map((el) => {
        const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
        const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect()
          x((e.clientX - (r.left + r.width / 2)) * 0.35)
          y((e.clientY - (r.top + r.height / 2)) * 0.35)
        }
        const leave = () => { x(0); y(0) }
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseleave', leave)
        return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
      })
      return () => cleanups.forEach((c) => c())
    })

    mm.add(REDUCED, () => {
      gsap.set('[data-reveal], [data-hero-fade]', { clearProps: 'all' })
    })
  }, [])

  return null
}
