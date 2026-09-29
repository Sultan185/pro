'use client'

import { useRef } from 'react'
import { useMotion } from '@/lib/useMotion'
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react'
import { gsap, SplitText, MOTION } from '@/lib/gsap'
import { profile } from '@/lib/data'
import { useLocale } from '@/lib/i18n'
import type { Text } from '@/lib/locale'
import { ui } from '@/lib/ui'
import Accent from './Accent'

const brand = (name: string): Text => ({ en: name, ar: name })

const channels = [
  { label: ui.contact.email, value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: ui.contact.whatsapp, value: profile.phone, href: profile.whatsapp, Icon: MessageCircle },
  { label: ui.contact.phone, value: profile.phone, href: profile.phoneHref, Icon: Phone },
  { label: brand('LinkedIn'), value: 'mohamed-soltan', href: profile.linkedin, Icon: Linkedin },
  { label: brand('GitHub'), value: 'Sultan185', href: profile.github, Icon: Github },
]

export default function Contact() {
  const { rtl, t } = useLocale()
  const root = useRef<HTMLElement>(null)
  const title = useRef<HTMLHeadingElement>(null)

  useMotion(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        // Giant outlined words slide across as the footer scrolls into view.
        // Right-to-left text overflows to the left, so there the travel is mirrored.
        const dir = rtl ? -1 : 1
        gsap.fromTo('[data-giant="1"]', { xPercent: 8 * dir }, { xPercent: -28 * dir, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
        gsap.fromTo('[data-giant="2"]', { xPercent: -28 * dir }, { xPercent: 8 * dir, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })

        // Arabic letters join up, so that headline moves word by word, never letter by letter.
        SplitText.create(title.current, {
          type: rtl ? 'lines,words' : 'lines,chars',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(rtl ? self.words : self.chars, {
              yPercent: 115, rotate: rtl ? -3 : 6, duration: 1.1, ease: 'expo.out', stagger: { each: rtl ? 0.06 : 0.012, from: 'start' },
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
        <div data-giant="1" className="outline-text whitespace-nowrap text-[18vw] will-change-transform">{t(ui.contact.giant)[0]}</div>
        <div data-giant="2" className="outline-text whitespace-nowrap text-[18vw] will-change-transform">{t(ui.contact.giant)[1]}</div>
      </div>

      <div className="wrap relative pt-[26vw] sm:pt-[22vw]">
        <p className="eyebrow mb-6">{t(ui.contact.eyebrow)}</p>
        <h2 ref={title} className="max-w-5xl font-display text-[clamp(2.2rem,6vw,5.2rem)] font-semibold leading-[1] tracking-tightest [font-kerning:none]">
          <Accent parts={t(ui.contact.title)} />
        </h2>

        <div data-cta>
          <p className="mt-6 max-w-xl text-lg text-muted">
            {t(ui.contact.body)}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a data-magnetic href={`mailto:${profile.email}`} className="btn-primary max-w-full !px-6 !py-4 text-sm sm:!px-8 sm:text-base">
              <Mail size={18} className="shrink-0" /> <span dir="ltr" className="truncate">{profile.email}</span>
            </a>
            <a data-magnetic href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-8 !py-4 text-base">
              <MessageCircle size={18} /> {t(ui.contact.whatsapp)}
            </a>
          </div>
        </div>

        <ul data-channels className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {channels.map(({ label, value, href, Icon }) => (
            <li key={label.en} className="overflow-hidden bg-surface">
              <a data-channel href={href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-surface-2">
                <span className="flex items-center justify-between text-muted">
                  <Icon size={18} />
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ar:-scale-x-100 ar:group-hover:-translate-x-0.5" />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-dim ar:text-[13px]">{t(label)}</span>
                  {/* Addresses and phone numbers always read left-to-right. */}
                  <span dir="ltr" className="mt-1 block truncate text-sm ar:text-right">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {t(profile.name)}. {t(ui.contact.builtWith)}</p>
          <a href="#top" className="font-mono uppercase tracking-widest transition-colors hover:text-fg">{t(ui.contact.backToTop)} ↑</a>
        </div>
      </div>
    </footer>
  )
}
