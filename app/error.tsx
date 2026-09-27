'use client'

import { profile } from '@/lib/data'

/** Shown instead of a blank page if anything throws while rendering. */
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-6 px-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Something went wrong</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight">{profile.name}</h1>
      <p className="max-w-md text-muted">{profile.role} · {profile.tagline}. The page failed to load on this device, but you can still reach me.</p>
      <div className="flex flex-wrap gap-3">
        <button onClick={reset} className="btn-primary">Reload</button>
        <a href={`mailto:${profile.email}`} className="btn-ghost">{profile.email}</a>
        <a href={profile.cv} className="btn-ghost">Download CV</a>
      </div>
    </main>
  )
}
