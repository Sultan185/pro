'use client'

import { useRef } from 'react'
import { useMotion } from '@/lib/useMotion'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, MOTION } from '@/lib/gsap'
import { experience, education } from '@/lib/data'
import SectionHeading from './SectionHeading'

export default function Experience() {
  const root = useRef<HTMLElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useMotion(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        // The rail draws itself with scroll.
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-timeline]', start: 'top 65%', end: 'bottom 65%', scrub: 0.5 } },
        )

        gsap.utils.toArray<HTMLElement>('[data-job]').forEach((job) => {
          const dot = job.querySelector('[data-dot]')
          const parts = job.querySelectorAll('[data-job-part]')
          gsap.set(parts, { opacity: 0, y: 28 })
          gsap.set(dot, { scale: 0 })

          const tl = gsap.timeline({ scrollTrigger: { trigger: job, start: 'top 78%', once: true } })
          tl.to(dot, { scale: 1, duration: 0.6, ease: 'back.out(3)' })
            .to(parts, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.05)

          // Highlight whichever role is crossing the reading line.
          ScrollTrigger.create({
            trigger: job,
            start: 'top 60%',
            end: 'bottom 60%',
            toggleClass: { targets: job, className: 'is-active' },
          })
        })

        gsap.from('[data-edu]', {
          y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.12,
          scrollTrigger: { trigger: '[data-edu]', start: 'top 90%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="experience" className="section overflow-x-clip border-t border-line">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Experience"
            title={<>Three years, four teams, <span className="text-primary">one obsession</span>: systems that stay fast.</>}
            blurb="Remote contracts for Saudi and Turkish companies alongside a full-time role in Egypt, then my own products."
          />
          <div className="space-y-4">
            {education.map((e) => (
              <div key={e.title} data-edu className="card p-5">
                <p className="font-display font-semibold">{e.title}</p>
                <p className="mt-1 text-sm text-muted">{e.org}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-dim">
                  {e.period}{e.note ? ` · ${e.note}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div data-timeline className="relative pl-8 sm:pl-12">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line sm:left-[11px]" />
          <div ref={line} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-primary to-primary-soft sm:left-[11px]" />

          <ol className="space-y-14">
            {experience.map((x) => (
              <li key={x.company + x.period} data-job className="job relative">
                <span data-dot className="job-dot absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border border-line-strong bg-bg transition-colors duration-500 sm:-left-12 sm:h-6 sm:w-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-dim transition-colors duration-500" />
                </span>
                <p data-job-part className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{x.period}</p>
                <h3 data-job-part className="job-role mt-2 font-display text-2xl font-semibold tracking-tight text-fg/60 transition-colors duration-500 sm:text-3xl">
                  {x.role}
                </h3>
                <p data-job-part className="mt-1 flex flex-wrap items-center gap-x-2 text-muted">
                  {x.url ? (
                    <a href={x.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg underline-offset-4 hover:underline">
                      {x.company} <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span className="text-fg">{x.company}</span>
                  )}
                  <span className="text-dim">·</span>
                  <span className="text-sm">{x.meta}</span>
                </p>
                {x.note && <p data-job-part className="mt-1 text-sm text-primary-soft">{x.note}</p>}
                <ul className="mt-4 space-y-2">
                  {x.bullets.map((b) => (
                    <li key={b} data-job-part className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-[11px] h-px w-4 shrink-0 bg-line-strong" />
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
