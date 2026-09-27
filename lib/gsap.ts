import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  gsap.defaults({ ease: 'power3.out', duration: 1 })
  gsap.config({ nullTargetWarn: false })
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export const REDUCED = '(prefers-reduced-motion: reduce)'
export const MOTION = '(prefers-reduced-motion: no-preference)'
export const DESKTOP = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
export const MOBILE = '(max-width: 1023px) and (prefers-reduced-motion: no-preference)'
export const FINE = '(pointer: fine) and (prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, SplitText }
