'use client'

import { useGSAP } from '@gsap/react'
import { failOpen } from './safe'

type Config = Parameters<typeof useGSAP>[1]

/** useGSAP with a safety net: an exception in animation code never blanks the page. */
export function useMotion(fn: () => void | (() => void), config?: Config) {
  useGSAP(() => {
    try {
      return fn()
    } catch (e) {
      failOpen(e)
    }
  }, config)
}
