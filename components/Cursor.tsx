'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce || !dot.current || !ring.current) return

    document.documentElement.classList.add('has-cursor')
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e: MouseEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a, button, [data-cursor]')
      const label = t?.getAttribute('data-cursor')
      gsap.to(ring.current, { scale: t ? (label ? 3.2 : 1.8) : 1, duration: 0.35, ease: 'power3.out' })
      gsap.to(dot.current, { scale: t ? 0 : 1, duration: 0.25 })
      if (ring.current) ring.current.dataset.label = label ?? ''
    }
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 })
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 })

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary [html.has-cursor_&]:block" />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 mix-blend-difference after:absolute after:inset-0 after:flex after:items-center after:justify-center after:font-mono after:text-[4px] after:uppercase after:tracking-widest after:text-white after:content-[attr(data-label)] [html.has-cursor_&]:block"
      />
    </>
  )
}
