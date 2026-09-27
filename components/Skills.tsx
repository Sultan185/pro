'use client'

import { useRef } from 'react'
import { useMotion } from '@/lib/useMotion'
import { gsap, ScrollTrigger, MOTION, FINE } from '@/lib/gsap'
import { skills } from '@/lib/data'
import SectionHeading from './SectionHeading'

export default function Skills() {
  const root = useRef<HTMLElement>(null)

  useMotion(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-skill]')
        gsap.set(cards, { opacity: 0, rotateX: -55, y: 80, transformOrigin: '50% 0%', transformPerspective: 900 })
        ScrollTrigger.batch(cards, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { opacity: 1, rotateX: 0, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1 })
            batch.forEach((card, i) => {
              gsap.from((card as HTMLElement).querySelectorAll('[data-chip]'), {
                opacity: 0, y: 14, scale: 0.9, duration: 0.6, ease: 'back.out(1.8)',
                stagger: { each: 0.035, from: 'random' }, delay: 0.35 + i * 0.1,
              })
            })
          },
        })
      })

      // Spotlight that follows the pointer inside each card.
      mm.add(FINE, () => {
        const cleanups = gsap.utils.toArray<HTMLElement>('[data-skill]').map((card) => {
          const glow = card.querySelector<HTMLElement>('[data-glow]')!
          gsap.set(glow, { xPercent: -50, yPercent: -50 })
          const x = gsap.quickTo(glow, 'x', { duration: 0.4, ease: 'power3' })
          const y = gsap.quickTo(glow, 'y', { duration: 0.4, ease: 'power3' })
          const move = (e: MouseEvent) => {
            const r = card.getBoundingClientRect()
            x(e.clientX - r.left); y(e.clientY - r.top)
          }
          const enter = () => gsap.to(glow, { opacity: 1, duration: 0.4 })
          const leave = () => gsap.to(glow, { opacity: 0, duration: 0.6 })
          card.addEventListener('mousemove', move)
          card.addEventListener('mouseenter', enter)
          card.addEventListener('mouseleave', leave)
          return () => {
            card.removeEventListener('mousemove', move)
            card.removeEventListener('mouseenter', enter)
            card.removeEventListener('mouseleave', leave)
          }
        })
        return () => cleanups.forEach((c) => c())
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="skills" className="section border-t border-line">
      <div className="wrap">
        <SectionHeading
          eyebrow="Capabilities"
          title={<>Full stack, with a bias toward <span className="text-primary">the hard parts.</span></>}
          blurb="Tenancy, payments, webhooks and query performance are where projects fail. Those are the pieces I own first."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => {
            const Icon = g.icon
            return (
              <div key={g.title} data-skill className="card group overflow-hidden p-6 will-change-transform">
                <div data-glow className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/20 opacity-0 blur-3xl" />
                <div className="relative mb-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-black">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{g.title}</h3>
                </div>
                <ul className="relative flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} data-chip className="rounded-md border border-line px-2.5 py-1 text-[13px] text-muted transition-colors group-hover:border-line-strong">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
