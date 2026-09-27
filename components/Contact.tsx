'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react'
import { gsap, SplitText, MOTION } from '@/lib/gsap'
import { profile } from '@/lib/data'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'WhatsApp', value: profile.phone, href: profile.whatsapp, Icon: MessageCircle },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, Icon: Phone },
  { label: 'LinkedIn', value: 'mohamed-soltan', href: profile.linkedin, Icon: Linkedin },
  { label: 'GitHub', value: 'Sultan185', href: profile.github, Icon: Github },
]

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  const title = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        // Giant outlined words slide across as the footer scrolls into view.
        gsap.fromTo('[data-giant="1"]', { xPercent: 8 }, { xPercent: -28, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
        gsap.fromTo('[data-giant="2"]', { xPercent: -28 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })

        SplitText.create(title.current, {
          type: 'lines,chars',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 115, rotate: 6, duration: 1.1, ease: 'expo.out', stagger: { each: 0.012, from: 'start' },
              scrollTrigger: { trigger: title.current, start: 'top 85%', once: true },
            }),
        })

        gsap.from('[data-cta] > *', {
          y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: '[data-cta]', start: 'top 90%', once: true },
        })
        gsap.from('[data-channel]', {
          yPercent: 100, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: { each: 0.07, from: 'start' },
          scrollTrigger: { trigger: '[data-channels]', start: 'top 92%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <footer ref={root} id="contact" className="relative overflow-hidden border-t border-line pb-10 pt-24 sm:pt-32">
      <div className="glow-orb pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 opacity-50" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 select-none space-y-[-0.12em] font-display font-semibold uppercase leading-none tracking-tightest">
        <div data-giant="1" className="outline-text whitespace-nowrap text-[18vw] will-change-transform">Let&apos;s build · Let&apos;s build</div>
        <div data-giant="2" className="outline-text whitespace-nowrap text-[18vw] will-change-transform">something fast · something fast</div>
      </div>

      <div className="wrap relative pt-[26vw] sm:pt-[22vw]">
        <p className="eyebrow mb-6">Contact</p>
        <h2 ref={title} className="max-w-5xl font-display text-[clamp(2.2rem,6vw,5.2rem)] font-semibold leading-[1] tracking-tightest [font-kerning:none]">
          Have a product that needs to scale? <span className="text-primary">Let&apos;s talk.</span>
        </h2>

        <div data-cta>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Open to remote full-time roles and contract work across KSA and the GCC. I reply within a day.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a data-magnetic href={`mailto:${profile.email}`} className="btn-primary !px-8 !py-4 text-base">
              <Mail size={18} /> {profile.email}
            </a>
            <a data-magnetic href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-8 !py-4 text-base">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>

        <ul data-channels className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {channels.map(({ label, value, href, Icon }) => (
            <li key={label} className="overflow-hidden bg-surface">
              <a data-channel href={href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-surface-2">
                <span className="flex items-center justify-between text-muted">
                  <Icon size={18} />
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-dim">{label}</span>
                  <span className="mt-1 block truncate text-sm">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind and GSAP.</p>
          <a href="#top" className="font-mono uppercase tracking-widest transition-colors hover:text-fg">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
