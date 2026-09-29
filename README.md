# Mohamed Ashraf Sultan · Portfolio

Personal portfolio for a Full-Stack Developer (Laravel, React, Salla ecosystem). Static site built with Next.js 14 (app router, `output: 'export'`), Tailwind CSS and GSAP. Available in English (`/`) and Arabic (`/ar`, right-to-left).

## Stack

- **Next.js 14 / React 18 / TypeScript** – static export, no server needed
- **Tailwind CSS** – design tokens live in `tailwind.config.js`
- **GSAP 3** with **ScrollTrigger** and **SplitText**, wired through `@gsap/react` (`useGSAP`) and `gsap.matchMedia()`
- **Lenis** – smooth scrolling driven by the GSAP ticker
- **next/font** – Sora (display), Inter (body), JetBrains Mono (labels), plus IBM Plex Sans Arabic on the Arabic page, self-hosted at build time

## Motion system

| Piece | Technique |
| --- | --- |
| Preloader | Timeline: letter stagger, 000→100 counter, two-layer curtain lift, then hands over to the hero via `lib/intro.ts` |
| Hero | Paused intro timeline (SplitText chars, clip-path portrait reveal, scale settle), pointer parallax on `data-depth` layers with `quickTo`, 3D portrait tilt |
| Hero → content | Hero is `position: sticky`; it scales, blurs and dims on scrub while the content sheet slides over it |
| Statement | SplitText words, opacity scrubbed to scroll so the paragraph lights up as you read |
| Stats | Count-up tweens triggered once on enter |
| Marquee | Two counter-moving loops; `timeScale`, direction and `skewX` follow `ScrollTrigger.getVelocity()` |
| Projects | Desktop: pinned section, horizontal track on scrub, per-panel `containerAnimation` triggers (image drift, copy stagger, scale-in), live counter and progress bar. Mobile: `ScrollTrigger.batch` vertical reveals |
| Experience | Rail drawn on scrub, per-role timelines, `toggleClass` highlights the active role |
| Skills | `ScrollTrigger.batch` 3D flip-in, random-order chip stagger, pointer spotlight |
| Contact | Scrubbed giant outline type, SplitText chars, magnetic buttons |
| Nav | Scroll progress, hide on scroll down, active link via `toggleClass` |

Rules the code follows: every animation lives inside `useGSAP` (automatic cleanup), responsive and reduced-motion variants go through `gsap.matchMedia()`, SplitText uses `autoSplit` + `onSplit` so text re-splits after font load and resize, and pointer effects use `gsap.quickTo` instead of React state.

## Languages

The site is two static pages with the same components and different text:

| URL | Language | Root layout |
| --- | --- | --- |
| `/` | English, left-to-right | `app/(en)/layout.tsx` |
| `/ar` | Arabic, right-to-left | `app/(ar)/layout.tsx` |

- Each language has its own root layout, so `<html lang dir>`, the title, the description and the `hreflang` links are correct in the exported HTML. The switch in the nav is a plain link between the two pages.
- Every visible text is a `{ en, ar }` pair. Components read the page language with `useLocale()` and pick a side with `t()`: `t(profile.role)`.
- Mirroring uses the `ar:` Tailwind variant (defined in `tailwind.config.js`), for example `pl-8 ar:pl-0 ar:pr-8`. Tailwind's own `rtl:` variant is avoided because it depends on `:where()`, which the older browsers in the browserslist do not support.
- Arabic letters join up, so Arabic headlines animate word by word instead of letter by letter, and letter-spacing is reset on the Arabic page.
- The marquee and the horizontal project track keep their left-to-right travel in both languages; only the text inside them follows the page direction.
- Emails, phone numbers and counters carry `dir="ltr"` so they never reorder inside Arabic text.

## Structure

```
app/
  (en)/            root layout, page and error boundary for /
  (ar)/            root layout, page and error boundary for /ar
  globals.css      tokens, utilities, initial states gated on html.js, Arabic rules
components/
  Document.tsx     <html>, boot script, JSON-LD, Preloader, SmoothScroll, Cursor
  Home.tsx         sticky hero + content sheet
  Preloader.tsx    intro timeline (skipped on repeat visits and reduced motion)
  Nav.tsx  Hero.tsx  Statement.tsx  Marquee.tsx
  Projects.tsx     pinned horizontal scroll
  Experience.tsx  Skills.tsx  Contact.tsx
  Motion.tsx       page-wide primitives: [data-split], [data-reveal], [data-magnetic]
  SmoothScroll.tsx Lenis integration
  Cursor.tsx       custom cursor (fine pointers only)
  Accent.tsx       headline with its middle part in the accent colour
lib/
  data.ts          content: profile, stats, projects, experience, skills (both languages)
  ui.ts            interface copy: nav, headings, buttons, page description (both languages)
  locale.ts        Locale and Text types, direction and path of each language
  i18n.tsx         LocaleProvider and the useLocale() hook
  seo.ts           metadata, hreflang and JSON-LD per language
  fonts.ts  fonts-ar.ts   font stacks for the English and the Arabic page
cv/
  cv-ar.html       source of the Arabic CV
  build.py         prints it to public/Mohamed_Ashraf_Sultan_CV_AR.pdf
  gsap.ts          plugin registration, defaults, media-query constants
  intro.ts         preloader → hero handoff
  lenis.ts         shared Lenis instance
public/
  projects/*.webp  project screenshots (1200×750)
  profile.jpeg  favicon.svg
  Mohamed_Ashraf_Sultan_CV.pdf  Mohamed_Ashraf_Sultan_CV_AR.pdf
```

## Editing content

Facts about you and your work are in `lib/data.ts`; headings, buttons and other interface copy are in `lib/ui.ts`. Each text is written once per language:

```ts
kicker: { en: 'Premium perfume e-commerce', ar: 'متجر إلكتروني للعطور الفاخرة' },
```

TypeScript reports any text that is missing a language. Product, company and technology names stay in Latin script in both languages.

To add a project, append an entry to `projects` and drop a 1200×750 WebP screenshot in `public/projects/`. Set `featured: true` to give it a larger card.

## Arabic CV

Each page offers the CV in its own language. The Arabic one is written in `cv/cv-ar.html` and printed to PDF with headless Chromium:

```bash
python3 cv/build.py    # needs Chromium or Chrome, pypdf and network access for the fonts
```

The script stops if a font failed to download or if the CV no longer fits on two pages. The CV uses no vowel marks and no optional ligatures: both come out scrambled when text is copied from the PDF, which is how recruiting software reads it.

## Develop / build

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out: index.html (English) and ar.html (Arabic)
```

The build downloads the fonts from Google Fonts, so it needs network access.

Deploy `out/` to any static host (GitHub Pages, Netlify, Vercel, S3). Update `profile.siteUrl` in `lib/data.ts` to the final domain so Open Graph URLs resolve.

## Accessibility

Animations are skipped for `prefers-reduced-motion`; initial hidden states are gated on an `html.js` class so content is visible even without JavaScript; the custom cursor only activates on fine-pointer devices; all interactive elements are real links/buttons.
