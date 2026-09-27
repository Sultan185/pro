import { finishIntro } from './intro'

/**
 * Fail open: if any motion code throws, stop hiding content and let the page
 * behave like a plain static site. CSS for html.no-motion lives in globals.css.
 */
export function failOpen(err?: unknown) {
  if (typeof document !== 'undefined') document.documentElement.classList.add('no-motion')
  finishIntro()
  if (err) console.error('[motion] disabled after error:', err)
}

export function markMotionReady() {
  if (typeof window !== 'undefined') (window as unknown as { __motion?: boolean }).__motion = true
}
