'use client'

import { useRef } from 'react'
import { useMotion } from '@/lib/useMotion'
import { gsap, ScrollTrigger, MOTION } from '@/lib/gsap'
import { marquee } from '@/lib/data'

/** Two counter-moving rows whose speed, direction and skew follow scroll velocity. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useMotion(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]')
        const loops = rows.map((row, i) =>
          gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: 'none', repeat: -1 }),
        )
        const skew = gsap.quickTo(rows, 'skewX', { duration: 0.5, ease: 'power3' })
        const clampV = gsap.utils.clamp(-7, 7)
        const clampSkew = gsap.utils.clamp(-14, 14)
        let idle: gsap.core.Tween | undefined

        const st = ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const v = self.getVelocity()
            const scale = clampV(v / 220)
            const dir = v < 0 ? -1 : 1
            loops.forEach((l) => gsap.to(l, { timeScale: dir * Math.max(1, Math.abs(scale)), duration: 0.3, overwrite: true }))
            skew(clampSkew(v / -260))
            idle?.kill()
            idle = gsap.delayedCall(0.25, () => {
              loops.forEach((l) => gsap.to(l, { timeScale: dir, duration: 1.2, ease: 'power2.out', overwrite: true }))
              skew(0)
            })
          },
        })
        return () => { st.kill(); idle?.kill() }
      })
    },
    { scope: root },
  )

  const items = [...marquee, ...marquee]
  return (
    <div ref={root} className="relative space-y-3 overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      {[0, 1].map((r) => (
        <div key={r} data-row className="flex w-max gap-10 whitespace-nowrap will-change-transform">
          {(r ? [...items].reverse() : items).map((t, i) => (
            <span
              key={i}
              className={`flex items-center gap-10 font-display text-2xl font-semibold uppercase tracking-tight sm:text-4xl ${r ? 'outline-text' : 'text-fg/80'}`}
            >
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
