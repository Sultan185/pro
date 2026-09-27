/**
 * Tiny coordination point between the preloader and everything that must wait
 * for it (hero intro, smooth scroll start). No React state, no re-renders.
 */
let done = false
let waiters: Array<() => void> = []

export const introFinished = () => done

export const finishIntro = () => {
  if (done) return
  done = true
  waiters.forEach((w) => w())
  waiters = []
}

export const onIntroDone = (cb: () => void) => {
  if (done) {
    cb()
    return () => {}
  }
  waiters.push(cb)
  return () => {
    waiters = waiters.filter((w) => w !== cb)
  }
}

/** True when the preloader should be skipped (repeat visit in this tab, or reduced motion). */
export const shouldSkipIntro = () => {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  try {
    return sessionStorage.getItem('intro-seen') === '1'
  } catch {
    return false
  }
}

export const markIntroSeen = () => {
  try {
    sessionStorage.setItem('intro-seen', '1')
  } catch {}
}
