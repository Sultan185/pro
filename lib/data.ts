import type { LucideIcon } from 'lucide-react'
import {
  Server,
  MonitorSmartphone,
  ShoppingBag,
  Database,
  CreditCard,
  Cloud,
} from 'lucide-react'

/** Public files live under the base path on GitHub Pages and at the root elsewhere. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`

export const profile = {
  name: 'Mohamed Ashraf Sultan',
  firstName: 'Mohamed',
  role: 'Full-Stack Developer',
  tagline: 'Laravel, React & the Salla ecosystem',
  location: 'Menoufia, Egypt',
  availability: 'Open to remote roles · KSA & GCC',
  email: 'mohamedsoltan1852@gmail.com',
  phone: '+20 10 9979 3552',
  phoneHref: 'tel:+201099793552',
  whatsapp: 'https://wa.me/201099793552',
  github: 'https://github.com/Sultan185',
  linkedin: 'https://linkedin.com/in/mohamed-soltan-36551a21a',
  cv: asset('/Mohamed_Ashraf_Sultan_CV.pdf'),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mohamed-sultan.mohamedsoltan1852.workers.dev',
  photo: asset('/profile.jpeg'),
  intro:
    'I design and ship multi-tenant SaaS products that hold up under real load: idempotent webhook pipelines, tuned MySQL schemas and payment flows that reconcile to the cent. My work runs in production across 1,000+ live merchant stores.',
}

export const stats = [
  { value: 3, suffix: '+', label: 'Years shipping production code' },
  { value: 1000, suffix: '+', label: 'Live merchant stores served' },
  { value: 35, suffix: '%', label: 'Faster API response times' },
  { value: 40, suffix: '%', label: 'Lower query latency' },
]

export type Project = {
  slug: string
  name: string
  kicker: string
  description: string
  highlights: string[]
  tags: string[]
  url: string
  image: string
  year: string
  featured?: boolean
  accent: string
}

export const projects: Project[] = [
  {
    slug: 'azz',
    name: 'Azz',
    kicker: 'Salla App Store · Conversion SaaS',
    description:
      'Social-proof and conversion widgets for Salla merchants. Customers leave voice, photo or video reviews after delivery; the app injects lightweight widgets, live sales notifications and review strips into the storefront.',
    highlights: [
      'Multi-tenant Laravel backend with idempotent, webhook-driven sync against Salla APIs',
      'Async media pipeline on AWS S3 with signed uploads and duplicate-event protection',
      'Script injection tuned to add zero layout shift across 1,000+ active stores',
    ],
    tags: ['Laravel', 'Inertia', 'React', 'Salla APIs', 'AWS S3', 'GSAP'],
    url: 'https://useazz.com/',
    image: asset('/projects/azz.webp'),
    year: '2026',
    featured: true,
    accent: '#7d40e4',
  },
  {
    slug: 'ansheta',
    name: 'Ansheta',
    kicker: 'EdTech · Interactive classroom platform',
    description:
      'A teacher workspace that turns a lesson into an experience. Teachers design activities in stages, add questions by hand or import them from JSON, then run team competitions, escape rooms and letter challenges that students join through a link or QR code.',
    highlights: [
      'Laravel + Inertia/React with an Arabic-first bilingual UI, dark mode and a content-readiness dashboard',
      'Live game sessions with instant scoring, team leaderboards and multiple game modes',
      'Teacher analytics across activities, questions, teams and sessions; subscriptions via the Zid store',
    ],
    tags: ['Laravel', 'Inertia', 'React', 'Zid', 'Tailwind CSS'],
    url: 'https://anshetaapp.com/',
    image: asset('/projects/ansheta.webp'),
    year: '2026',
    featured: true,
    accent: '#b56de0',
  },
  {
    slug: 'mediflow',
    name: 'MediFlow Clinics',
    kicker: 'Healthcare · Clinic booking & management',
    description:
      'Clinic management system with public online booking. Patients search doctors by specialty, pick a live slot and get instant confirmation; the clinic side handles patients, e-prescriptions, invoicing and WhatsApp notifications.',
    highlights: [
      'Laravel 12 with Inertia/React, typed routes and a bilingual, dark-mode interface',
      'Real-time slot availability engine across doctors, specialties and days',
      'Patient portal with visit history, e-prescriptions and invoice records',
    ],
    tags: ['Laravel 12', 'Inertia', 'React', 'MySQL', 'WhatsApp API'],
    url: 'https://clinic.namowsecure.com/',
    image: asset('/projects/clinic.webp'),
    year: '2026',
    featured: true,
    accent: '#19b5a1',
  },
  {
    slug: 'filein',
    name: 'Filein',
    kicker: 'Document archiving SaaS · Saudi market',
    description:
      'Electronic archiving platform for companies in Saudi Arabia. OCR-powered search inside scanned documents, custom folder trees and metadata fields, digital signatures and stamps, and team workspaces with granular permissions.',
    highlights: [
      'Multi-tenant access control lists with full audit logging of every operation',
      'Encrypted storage on AWS S3 with per-transaction barcodes for tracking',
      'Automated transaction routing that links related documents together',
    ],
    tags: ['Laravel', 'AWS S3', 'OCR', 'Multi-tenant', 'ACL'],
    url: 'https://filein.cloud/',
    image: asset('/projects/filein.webp'),
    year: '2025 – 2026',
    accent: '#4f7cf0',
  },
  {
    slug: 'gdawel',
    name: 'Gdawel',
    kicker: 'Cloud ERP & ZATCA e-invoicing',
    description:
      'Multi-tenant ERP and billing system for small and medium businesses, issuing ZATCA-compliant e-invoices (Phase 1 & 2) with accounting, sales, customers and payroll in one place.',
    highlights: [
      'Strict data isolation across diverse business accounts',
      'MyFatoorah, Tabby and Tamara integrated through asynchronous split-payment flows',
    ],
    tags: ['Laravel', 'Vue', 'MySQL', 'ZATCA', 'Payments'],
    url: 'https://gdawel.app/',
    image: asset('/projects/gdawel.webp'),
    year: '2025',
    accent: '#e0a526',
  },
  {
    slug: 'basma',
    name: 'Basma HR',
    kicker: 'Enterprise HRM · Multi-database tenancy',
    description:
      'HR management platform covering payroll, leave, attendance and performance, with a dedicated database instance per enterprise account and a companion mobile app.',
    highlights: [
      'Database-per-tenant architecture for isolation and predictable performance',
      'REST API layer consumed by the iOS and Android apps',
    ],
    tags: ['Laravel', 'Multi-DB tenancy', 'MySQL', 'REST API'],
    url: 'https://pasma.hashstudio.dev',
    image: asset('/projects/basma.webp'),
    year: '2024 – 2025',
    accent: '#2f3b8f',
  },
  {
    slug: 'nabil',
    name: 'Nabil.im',
    kicker: 'Personal brand site & content dashboard',
    description:
      'Bilingual personal site backed by a custom Filament dashboard. The owner publishes posts, pages, media and SEO metadata through a draft/publish workflow without touching code.',
    highlights: [
      'Server-rendered, cache-backed pages with Open Graph, sitemap and RSS',
      'Rich-text editing, image optimization and role-based access control',
    ],
    tags: ['Laravel', 'Filament', 'Livewire', 'Tailwind CSS'],
    url: 'https://nabil.im/',
    image: asset('/projects/nabil.webp'),
    year: '2025',
    accent: '#ff6a00',
  },
  {
    slug: 'parfum',
    name: 'Parfum',
    kicker: 'Premium perfume e-commerce',
    description:
      'Single-page checkout built with Inertia.js and Laravel, with embedded Tabby and Tamara split-payment widgets for the Saudi market.',
    highlights: ['Inertia-driven cart and checkout with server-side validation'],
    tags: ['Laravel', 'Inertia', 'React', 'Tabby', 'Tamara'],
    url: 'https://parfum.sa/',
    image: asset('/projects/parfum.webp'),
    year: '2024',
    accent: '#c9a45c',
  },
  {
    slug: '2me',
    name: '2ME Sport',
    kicker: 'Mobile-first sports e-commerce',
    description:
      'Storefront, catalogue and order management for a sports retailer in Egypt, built on Laravel with a modern JavaScript frontend.',
    highlights: ['Category and inventory management with promotional pricing'],
    tags: ['Laravel', 'MySQL', 'JavaScript'],
    url: 'https://2me.com.eg/',
    image: asset('/projects/2me.webp'),
    year: '2024',
    accent: '#e3245b',
  },
]

export type Experience = {
  company: string
  role: string
  period: string
  meta: string
  bullets: string[]
  url?: string
  note?: string
}

export const experience: Experience[] = [
  {
    company: 'Independent SaaS products',
    role: 'Founder & Full-Stack Engineer',
    period: 'Mar 2026 – Present',
    meta: 'Remote · Saudi market',
    url: 'https://useazz.com/',
    bullets: [
      'Building and operating Azz, Ansheta, MediFlow Clinics and Filein end to end: product, backend, frontend, infrastructure and merchant support.',
      'Shipped Azz to the Salla App Store and scaled it across 1,000+ active merchant stores.',
    ],
  },
  {
    company: 'Al-Mansa Al-Raqmeya for Technical Information',
    role: 'Full-Stack Developer',
    period: 'Jan 2025 – Feb 2026',
    meta: 'Contract · Remote · Saudi Arabia',
    url: 'https://www.mnsah.com.sa/',
    bullets: [
      'Optimized high-frequency backend modules, improving API response times by 35% on enterprise-scale platforms.',
      'Delivered secure, localized SaaS solutions on customized API layers built for the Saudi commercial market.',
      'Restructured database indexing across multiple live merchant instances, cutting query latency by 40%.',
    ],
  },
  {
    company: 'Hash Studio Inc.',
    role: 'Full-Stack Developer',
    period: 'Sep 2024 – Jan 2026',
    meta: 'Full-time · Onsite · Egypt',
    url: 'https://hashstudio.com/',
    note: 'Promoted from Backend Development Intern (Sep 2023 – Jan 2024)',
    bullets: [
      'Owned full-lifecycle delivery of regional SaaS products, from local staging to production cloud environments.',
      'Built administrative portals with Filament and Livewire, reducing internal configuration overhead by 30%.',
    ],
  },
  {
    company: 'ACWAD',
    role: 'Backend Developer',
    period: 'Sep 2024 – Jan 2025',
    meta: 'Contract · Remote · Turkey',
    bullets: [
      'Designed low-latency, cross-border REST APIs handling 50,000+ requests per month under strict encryption requirements.',
      'Coordinated version-control pipelines and distributed builds across agile, cross-functional teams.',
    ],
  },
  {
    company: 'Pure Soft',
    role: 'Backend Development Intern',
    period: 'Apr 2023 – Aug 2023',
    meta: 'Egypt',
    bullets: [
      'Refactored legacy relational schemas and resolved code-level bottlenecks in Laravel applications.',
    ],
  },
]

export type SkillGroup = { title: string; icon: LucideIcon; items: string[] }

export const skills: SkillGroup[] = [
  {
    title: 'Backend',
    icon: Server,
    items: ['PHP', 'Laravel', 'Livewire', 'Filament', 'REST API design', 'Event-driven architecture', 'Queues & jobs', 'CodeIgniter'],
  },
  {
    title: 'Frontend',
    icon: MonitorSmartphone,
    items: ['React', 'Vue.js', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'State management'],
  },
  {
    title: 'Salla, Zid & E-commerce',
    icon: ShoppingBag,
    items: ['Salla App Store', 'Salla REST APIs', 'Twilight theme engine', 'Zid integration', 'Webhook sync', 'Script injection', 'Conversion widgets'],
  },
  {
    title: 'Architecture & Data',
    icon: Database,
    items: ['Multi-tenant (single & multi-DB)', 'MySQL optimization', 'Indexing & query tuning', 'Redis caching', 'Idempotent pipelines'],
  },
  {
    title: 'Payments',
    icon: CreditCard,
    items: ['MyFatoorah', 'Tabby', 'Tamara', 'Split payments', 'Async invoicing', 'ZATCA e-invoicing'],
  },
  {
    title: 'Cloud & Tooling',
    icon: Cloud,
    items: ['AWS EC2 & S3', 'Linux', 'Git & GitHub', 'CI pipelines', 'Docker'],
  },
]

export const marquee = [
  'Laravel', 'React', 'Inertia.js', 'Vue.js', 'MySQL', 'Redis', 'AWS', 'Salla', 'Zid',
  'Filament', 'Livewire', 'Tailwind CSS', 'TypeScript', 'GSAP', 'Tabby', 'Tamara', 'MyFatoorah',
]

export const education = [
  {
    title: 'B.Sc. in Computer Science',
    org: 'Menoufia University · Faculty of Computers and Information',
    period: '2020 – 2024',
    note: 'Cumulative grade: Very Good',
  },
  {
    title: 'Advanced Web Development Bootcamp (PHP / Laravel)',
    org: 'Information Technology Institute (ITI)',
    period: 'Completed',
    note: '',
  },
]
