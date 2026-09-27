type Props = { eyebrow: string; title: React.ReactNode; blurb?: string; align?: 'left' | 'center' }

/** Headline lines are split and masked by <Motion />; eyebrow and blurb use the generic reveal. */
export default function SectionHeading({ eyebrow, title, blurb, align = 'left' }: Props) {
  return (
    <div className={`mb-14 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p data-reveal className={`eyebrow mb-5 ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 data-split className="h2">{title}</h2>
      {blurb && <p data-reveal className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{blurb}</p>}
    </div>
  )
}
