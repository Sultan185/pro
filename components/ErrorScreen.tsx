'use client'

import { profile } from '@/lib/data'
import { useLocale } from '@/lib/i18n'
import { ui } from '@/lib/ui'

/** Shown instead of a blank page if anything throws while rendering. */
export default function ErrorScreen({ reset }: { reset: () => void }) {
  const { t } = useLocale()
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-6 px-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{t(ui.error.eyebrow)}</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight">{t(profile.name)}</h1>
      <p className="max-w-md text-muted">{t(profile.role)} {t(ui.sep)} {t(profile.tagline)}. {t(ui.error.body)}</p>
      <div className="flex flex-wrap gap-3">
        <button onClick={reset} className="btn-primary">{t(ui.error.reload)}</button>
        <a href={`mailto:${profile.email}`} dir="ltr" className="btn-ghost">{profile.email}</a>
        <a href={t(profile.cv)} className="btn-ghost">{t(ui.hero.downloadCv)}</a>
      </div>
    </main>
  )
}
