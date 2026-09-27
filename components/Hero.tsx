'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useMotion } from '@/lib/useMotion'
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { gsap, ScrollTrigger, SplitText, MOTION, DESKTOP, FINE, REDUCED } from '@/lib/gsap'
import { onIntroDone } from '@/lib/intro'
import { profile } from '@/lib/data'

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const headline = useRef<HTMLHeadingElement>(null)
  const frame = useRef<HTMLDivElement>(null)

  useMotion(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION, () => {
        // ---- 1. Intro timeline (built paused, played when the preloader hands over)
        const split = SplitText.create(headline.current, { type: 'lines,words,chars', mask: 'lines' })
        gsap.set(frame.current, { clipPath: 'inset(100% 0% 0% 0% round 32px)' })
        gsap.set('[data-portrait]', { scale: 1.35 })
        gsap.set('[data-orbit]', { scale: 0.7, opacity: 0 })

        const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        intro
          .from(split.chars, { yPercent: 115, rotate: 8, duration: 1.25, stagger: { each: 0.018, from: 'start' } }, 0)
          .to(frame.current, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.5, ease: 'expo.inOut' }, 0.1)
          .to('[data-portrait]', { scale: 1, duration: 1.9, ease: 'expo.out' }, 0.25)
          .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, 0.55)
          .to('[data-orbit]', { scale: 1, opacity: 1, duration: 1.6, stagger: 0.12 }, 0.6)
          .from('[data-badge]', { scale: 0, rotate: -90, duration: 0.9, ease: 'back.out(2)' }, 1.1)

        const off = onIntroDone(() => intro.play())

        // ---- 2. Idle loops
        void [
          gsap.to('[data-orbit="1"]', { rotate: 360, duration: 45, ease: 'none', repeat: -1 }),
          gsap.to('[data-orbit="2"]', { rotate: -360, duration: 70, ease: 'none', repeat: -1 }),
          gsap.to('[data-scrollcue]', { y: 8, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
        ]

        return () => {
          off()
          split.revert()
        }
      })

      // ---- 3. Desktop only: the hero is sticky and recedes while the sheet slides over it.
      //         Phones get a normal, lightweight scroll (no sticky, no blur, no big layers).
      mm.add(DESKTOP, () => {
        gsap.to(inner.current, {
          scale: 0.9,
          yPercent: -6,
          opacity: 0.25,
          filter: 'blur(6px)',
          ease: 'none',
          scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true, invalidateOnRefresh: true },
        })
        ScrollTrigger.create({
          start: () => window.innerHeight + 20,
          end: 'max',
          onToggle: (self) => gsap.set(inner.current, { visibility: self.isActive ? 'hidden' : 'visible' }),
        })
      })

      // ---- 4. Pointer parallax across depth layers
      mm.add(FINE, () => {
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]').map((el) => {
          const depth = Number(el.dataset.depth)
          return {
            x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
            y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
            depth,
          }
        })
        const tiltX = gsap.quickTo(frame.current, 'rotateX', { duration: 0.9, ease: 'power3' })
        const tiltY = gsap.quickTo(frame.current, 'rotateY', { duration: 0.9, ease: 'power3' })
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          layers.forEach((l) => { l.x(nx * l.depth * -28); l.y(ny * l.depth * -28) })
          tiltY(nx * 8); tiltX(ny * -8)
        }
        window.addEventListener('pointermove', move, { passive: true })
        return () => window.removeEventListener('pointermove', move)
      })

      mm.add(REDUCED, () => {
        gsap.set('[data-hero-fade]', { clearProps: 'all' })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="h-hero relative z-0 overflow-hidden lg:sticky lg:top-0">
      <div ref={inner} className="min-h-hero relative flex origin-top flex-col justify-center pb-16 pt-24 lg:h-full lg:py-0 lg:will-change-transform">
        <div data-depth="0.4" className="grid-bg pointer-events-none absolute inset-[-40px]" />
        <div data-depth="0.8" className="pointer-events-none absolute inset-x-0 -top-40 flex justify-center">
          <div className="glow-orb h-[520px] w-[820px] opacity-60" />
        </div>

        <div className="wrap relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_0.85fr] lg:pt-16">
          <div className="min-w-0">
            <p data-hero-fade className="eyebrow mb-6 translate-y-3">
              {profile.role} · {profile.tagline}
            </p>

            <h1
              ref={headline}
              className="font-display text-[clamp(2rem,10.5vw,2.75rem)] font-semibold leading-[1.02] tracking-tightest [font-kerning:none] sm:text-[clamp(2.75rem,6.6vw,5.4rem)] sm:leading-[1]"
            >
              Building SaaS that <span className="text-primary">holds up</span> under real load.
            </h1>

            <p data-hero-fade className="mt-7 max-w-xl translate-y-3 text-base leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </p>

            <div data-hero-fade className="mt-9 flex translate-y-3 flex-wrap items-center gap-3">
              <a href="#work" className="btn-primary" data-magnetic>
                See the work <ArrowDown size={16} />
              </a>
              <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-magnetic>
                <Download size={16} /> Download CV
              </a>
              <div className="ml-1 flex items-center gap-1">
                {[
                  { href: profile.github, Icon: Github, label: 'GitHub' },
                  { href: profile.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                  { href: profile.whatsapp, Icon: MessageCircle, label: 'WhatsApp' },
                  { href: `mailto:${profile.email}`, Icon: Mail, label: 'Email' },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div data-hero-fade className="mt-8 flex translate-y-3 items-center gap-2 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability} · based in {profile.location}
            </div>
          </div>

          {/* Portrait */}
          <div data-depth="1.6" className="relative mx-auto hidden w-full max-w-[400px] [perspective:1200px] sm:block lg:max-w-none">
            <div data-orbit="1" className="pointer-events-none absolute inset-[-6%] rounded-full border border-dashed border-line-strong" />
            <div data-orbit="2" className="pointer-events-none absolute inset-[-14%] rounded-full border border-line">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-glow" />
            </div>
            <div ref={frame} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface will-change-transform [transform-style:preserve-3d]">
              <Image
                data-portrait
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 80vw"
                className="object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-display text-lg font-semibold">{profile.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-primary-soft">Laravel · React · Salla</p>
                </div>
                <a
                  data-badge
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full bg-fg text-bg"
                  aria-label="LinkedIn profile"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-center sm:flex">
          <a href="#about" data-hero-fade className="pointer-events-auto flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
            Scroll
            <span data-scrollcue className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
          </a>
        </div>
      </div>
    </section>
  )
}
