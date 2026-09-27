'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useMotion } from '@/lib/useMotion'
import { ArrowUpRight, MoveRight } from 'lucide-react'
import { gsap, ScrollTrigger, SplitText, DESKTOP, MOBILE, FINE } from '@/lib/gsap'
import { projects, type Project } from '@/lib/data'

const pad = (n: number) => String(n).padStart(2, '0')

function Panel({ p, i }: { p: Project; i: number }) {
  return (
    <article
      data-panel
      className="group relative flex w-full shrink-0 flex-col lg:h-full lg:w-[46vw] xl:w-[42vw]"
      style={{ ['--accent' as string]: p.accent }}
    >
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="open"
        className="relative block aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface lg:aspect-auto lg:min-h-0 lg:flex-1"
      >
        <div data-img-wrap className="absolute inset-y-0 -inset-x-[8%] will-change-transform">
          <Image
            src={p.image}
            alt={`${p.name} screenshot`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-70" style={{ background: 'var(--accent)' }} />
        <span className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
          {pad(i + 1)} <span className="text-white/40">/ {pad(projects.length)}</span>
        </span>
        <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
          {p.year}
        </span>
        <span className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
          <ArrowUpRight size={20} />
        </span>
      </a>

      <div data-panel-body className="pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>{p.kicker}</p>
        <h3 data-panel-title className="mt-1 font-display text-3xl font-semibold tracking-tight xl:text-4xl">{p.name}</h3>
        <p className="mt-2 line-clamp-3 max-w-xl text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted">{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)

  useMotion(
    () => {
      const mm = gsap.matchMedia()

      // Heading reveal (all motion-enabled sizes)
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        SplitText.create(title.current, {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04,
              scrollTrigger: { trigger: title.current, start: 'top 88%', once: true },
            }),
        })
      })

      // ---- Desktop: pin the section and drive the track horizontally
      mm.add(DESKTOP, () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-panel]')
        const distance = () => track.current!.scrollWidth - window.innerWidth

        const scroll = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin.current,
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => '+=' + distance(),
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(panels.length, Math.floor(self.progress * panels.length) + 1)
              if (count.current) count.current.textContent = pad(idx)
              gsap.set(bar.current, { scaleX: self.progress })
            },
          },
        })

        panels.forEach((panel) => {
          // Inner image drifts against the travel direction for depth.
          gsap.fromTo(
            panel.querySelector('[data-img-wrap]'),
            { xPercent: -7 },
            { xPercent: 7, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true } },
          )
          // Copy rises in as each panel enters.
          gsap.from(panel.querySelectorAll('[data-panel-body] > *'), {
            y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07,
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left 82%', toggleActions: 'play none none reverse' },
          })
          // Panels scale up from slightly small as they take the stage.
          gsap.fromTo(
            panel,
            { scale: 0.9, opacity: 0.45 },
            { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left right', end: 'left 55%', scrub: true } },
          )
        })

        return () => ScrollTrigger.refresh()
      })

      // ---- Mobile / tablet: vertical list with batched reveals
      mm.add(MOBILE, () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-panel]')
        gsap.set(panels, { opacity: 0, y: 60 })
        ScrollTrigger.batch(panels, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12 }),
        })
        panels.forEach((panel) => {
          gsap.fromTo(
            panel.querySelector('[data-img-wrap]'),
            { yPercent: -5 },
            { yPercent: 5, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })

      // ---- Hover tilt on fine pointers
      mm.add(FINE, () => {
        const cleanups = gsap.utils.toArray<HTMLElement>('[data-panel] > a').map((el) => {
          gsap.set(el, { transformPerspective: 1100 })
          const rx = gsap.quickTo(el, 'rotateX', { duration: 0.7, ease: 'power3' })
          const ry = gsap.quickTo(el, 'rotateY', { duration: 0.7, ease: 'power3' })
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect()
            ry(((e.clientX - r.left) / r.width - 0.5) * 7)
            rx(((e.clientY - r.top) / r.height - 0.5) * -7)
          }
          const leave = () => { rx(0); ry(0) }
          el.addEventListener('mousemove', move)
          el.addEventListener('mouseleave', leave)
          return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
        })
        return () => cleanups.forEach((c) => c())
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="work" className="relative border-t border-line">
      <div ref={pin} className="flex flex-col overflow-hidden py-20 lg:h-screen lg:min-h-[680px] lg:py-0 lg:pb-8 lg:pt-24">
        <div className="wrap flex shrink-0 items-end justify-between gap-8 pb-8">
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <h2 ref={title} className="font-display text-[clamp(1.9rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-tightest">
              Products in production, <span className="text-primary">not demos.</span>
            </h2>
          </div>
          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
              Scroll <MoveRight size={14} />
            </span>
            <span className="font-display text-3xl font-semibold tabular-nums">
              <span ref={count}>01</span>
              <span className="text-dim"> / {pad(projects.length)}</span>
            </span>
          </div>
        </div>

        <div ref={track} className="flex min-h-0 flex-1 flex-col gap-14 px-5 sm:px-8 lg:flex-row lg:gap-8 lg:px-[max(2rem,calc((100vw-76rem)/2+2rem))] lg:will-change-transform">
          {projects.map((p, i) => (
            <Panel key={p.slug} p={p} i={i} />
          ))}
          <div className="hidden shrink-0 items-center lg:flex lg:w-[28vw]">
            <a href="#contact" data-magnetic className="group flex flex-col gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">Next</span>
              <span className="font-display text-5xl font-semibold leading-none tracking-tightest">
                Yours could be <span className="text-primary">number {pad(projects.length + 1)}.</span>
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:bg-primary group-hover:text-black">
                <ArrowUpRight size={22} />
              </span>
            </a>
          </div>
        </div>

        <div className="wrap mt-6 hidden shrink-0 lg:block">
          <div className="h-px w-full bg-line">
            <div ref={bar} className="h-px origin-left scale-x-0 bg-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
