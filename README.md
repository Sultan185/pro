# Mohamed Ashraf Sultan · Portfolio

Personal portfolio for a Full-Stack Developer (Laravel, React, Salla ecosystem). Static site built with Next.js 14 (app router, `output: 'export'`), Tailwind CSS and GSAP.

## Stack

- **Next.js 14 / React 18 / TypeScript** – static export, no server needed
- **Tailwind CSS** – design tokens live in `tailwind.config.js`
- **GSAP 3** with **ScrollTrigger** and **SplitText**, wired through `@gsap/react` (`useGSAP`) and `gsap.matchMedia()`
- **Lenis** – smooth scrolling driven by the GSAP ticker
- **next/font** – Sora (display), Inter (body), JetBrains Mono (labels), self-hosted at build time

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

## Structure

```
app/
  layout.tsx       metadata, fonts, JSON-LD, Preloader, SmoothScroll, Cursor
  page.tsx         sticky hero + content sheet
  globals.css      tokens, utilities, initial states gated on html.js
components/
  Preloader.tsx    intro timeline (skipped on repeat visits and reduced motion)
  Nav.tsx  Hero.tsx  Statement.tsx  Marquee.tsx
  Projects.tsx     pinned horizontal scroll
  Experience.tsx  Skills.tsx  Contact.tsx
  Motion.tsx       page-wide primitives: [data-split], [data-reveal], [data-magnetic]
  SmoothScroll.tsx Lenis integration
  Cursor.tsx       custom cursor (fine pointers only)
lib/
  data.ts          ALL content: profile, stats, projects, experience, skills
  gsap.ts          plugin registration, defaults, media-query constants
  intro.ts         preloader → hero handoff
  lenis.ts         shared Lenis instance
public/
  projects/*.webp  project screenshots (1200×750)
  profile.jpeg  Mohamed_Ashraf_Sultan_CV.pdf  favicon.svg
```

## Editing content

Everything textual is in `lib/data.ts`. To add a project, append an entry to `projects` and drop a 1200×750 WebP screenshot in `public/projects/`. Set `featured: true` to give it a larger card.

## Develop / build

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

Deploy `out/` to any static host (GitHub Pages, Netlify, Vercel, S3). Update `profile.siteUrl` in `lib/data.ts` to the final domain so Open Graph URLs resolve.

## Accessibility

Animations are skipped for `prefers-reduced-motion`; initial hidden states are gated on an `html.js` class so content is visible even without JavaScript; the custom cursor only activates on fine-pointer devices; all interactive elements are real links/buttons.
