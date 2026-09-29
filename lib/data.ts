import type { LucideIcon } from 'lucide-react'
import {
  Server,
  MonitorSmartphone,
  ShoppingBag,
  Database,
  CreditCard,
  Cloud,
} from 'lucide-react'
import type { Text } from './locale'

/** Public files live under the base path on GitHub Pages and at the root elsewhere. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`

// Anything a visitor reads is a { en, ar } pair. Product, company and technology
// names stay in Latin script in both languages.

export const profile = {
  name: { en: 'Mohamed Ashraf Sultan', ar: 'محمد أشرف سلطان' } as Text,
  firstName: { en: 'Mohamed', ar: 'محمد' } as Text,
  role: { en: 'Full-Stack Developer', ar: 'مطوّر Full-Stack' } as Text,
  tagline: { en: 'Laravel, React & the Salla ecosystem', ar: 'Laravel و React ومنظومة سلة' } as Text,
  location: { en: 'Menoufia, Egypt', ar: 'المنوفية، مصر' } as Text,
  availability: { en: 'Open to remote roles · KSA & GCC', ar: 'متاح للعمل عن بُعد · السعودية ودول الخليج' } as Text,
  email: 'mohamedsoltan1852@gmail.com',
  phone: '+20 10 9979 3552',
  phoneHref: 'tel:+201099793552',
  whatsapp: 'https://wa.me/201099793552',
  github: 'https://github.com/Sultan185',
  linkedin: 'https://linkedin.com/in/mohamed-soltan-36551a21a',
  // The Arabic file is printed from cv/cv-ar.html (python3 cv/build.py).
  cv: { en: asset('/Mohamed_Ashraf_Sultan_CV.pdf'), ar: asset('/Mohamed_Ashraf_Sultan_CV_AR.pdf') } as Text,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mohamed-sultan.mohamedsoltan1852.workers.dev',
  photo: asset('/profile.jpeg'),
  intro: {
    en: 'I design and ship multi-tenant SaaS products that hold up under real load: idempotent webhook pipelines, tuned MySQL schemas and payment flows that reconcile to the cent. My work runs in production across 1,000+ live merchant stores.',
    ar: 'أصمّم وأطلق منتجات SaaS متعددة المستأجرين تصمد تحت الضغط الحقيقي: مسارات Webhook لا تتكرر أحداثها، ومخططات MySQL مضبوطة الأداء، ومسارات دفع تتطابق حتى آخر هللة. أعمالي تعمل اليوم في أكثر من 1,000 متجر نشط.',
  } as Text,
}

export const stats: { value: number; suffix: string; label: Text }[] = [
  { value: 3, suffix: '+', label: { en: 'Years shipping production code', ar: 'سنوات في بناء أنظمة تعمل فعليًا' } },
  { value: 1000, suffix: '+', label: { en: 'Live merchant stores served', ar: 'متجر نشط يعمل بمنتجاتي' } },
  { value: 35, suffix: '%', label: { en: 'Faster API response times', ar: 'استجابة أسرع للـ API' } },
  { value: 40, suffix: '%', label: { en: 'Lower query latency', ar: 'زمن أقل لتنفيذ الاستعلامات' } },
]

export type Project = {
  slug: string
  name: string
  kicker: Text
  description: Text
  highlights: Text<string[]>
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
    kicker: { en: 'Salla App Store · Conversion SaaS', ar: 'متجر تطبيقات سلة · منصة SaaS لزيادة المبيعات' },
    description: {
      en: 'Social-proof and conversion widgets for Salla merchants. Customers leave voice, photo or video reviews after delivery; the app injects lightweight widgets, live sales notifications and review strips into the storefront.',
      ar: 'أدوات للإثبات الاجتماعي وزيادة المبيعات لتجّار سلة. يترك العملاء تقييمات صوتية أو بالصور أو بالفيديو بعد استلام الطلب، ويضيف التطبيق إلى واجهة المتجر عناصر خفيفة وإشعارات مبيعات حيّة وشرائط للتقييمات.',
    },
    highlights: {
      en: [
        'Multi-tenant Laravel backend with idempotent, webhook-driven sync against Salla APIs',
        'Async media pipeline on AWS S3 with signed uploads and duplicate-event protection',
        'Script injection tuned to add zero layout shift across 1,000+ active stores',
      ],
      ar: [
        'نظام Laravel خلفي متعدد المستأجرين مع مزامنة عبر الـ Webhooks لا تتكرر أحداثها مع واجهات سلة البرمجية',
        'معالجة غير متزامنة للوسائط على AWS S3 مع روابط رفع موقّعة وحماية من تكرار الأحداث',
        'حقن سكربتات مضبوط بحيث لا يسبب أي إزاحة في تخطيط الصفحة عبر أكثر من 1,000 متجر نشط',
      ],
    },
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
    kicker: { en: 'EdTech · Interactive classroom platform', ar: 'تقنيات التعليم · منصة صفّية تفاعلية' },
    description: {
      en: 'A teacher workspace that turns a lesson into an experience. Teachers design activities in stages, add questions by hand or import them from JSON, then run team competitions, escape rooms and letter challenges that students join through a link or QR code.',
      ar: 'مساحة عمل للمعلّم تحوّل الدرس إلى تجربة. يصمّم المعلّمون الأنشطة على مراحل، ويضيفون الأسئلة يدويًا أو يستوردونها من ملف JSON، ثم يديرون مسابقات الفرق وغرف الهروب وتحديات الحروف التي ينضم إليها الطلاب عبر رابط أو رمز QR.',
    },
    highlights: {
      en: [
        'Laravel + Inertia/React with an Arabic-first bilingual UI, dark mode and a content-readiness dashboard',
        'Live game sessions with instant scoring, team leaderboards and multiple game modes',
        'Teacher analytics across activities, questions, teams and sessions; subscriptions via the Zid store',
      ],
      ar: [
        'Laravel مع Inertia/React بواجهة ثنائية اللغة تبدأ بالعربية، ووضع داكن ولوحة لمتابعة جاهزية المحتوى',
        'جلسات لعب مباشرة مع احتساب فوري للنقاط ولوحات ترتيب للفرق وأنماط لعب متعددة',
        'تحليلات للمعلّم تشمل الأنشطة والأسئلة والفرق والجلسات، والاشتراكات عبر متجر زد',
      ],
    },
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
    kicker: { en: 'Healthcare · Clinic booking & management', ar: 'الرعاية الصحية · حجز وإدارة العيادات' },
    description: {
      en: 'Clinic management system with public online booking. Patients search doctors by specialty, pick a live slot and get instant confirmation; the clinic side handles patients, e-prescriptions, invoicing and WhatsApp notifications.',
      ar: 'نظام لإدارة العيادات مع حجز إلكتروني متاح للجميع. يبحث المرضى عن الأطباء حسب التخصص ويختارون موعدًا متاحًا ويحصلون على تأكيد فوري، بينما تدير العيادة ملفات المرضى والوصفات الإلكترونية والفواتير وإشعارات واتساب.',
    },
    highlights: {
      en: [
        'Laravel 12 with Inertia/React, typed routes and a bilingual, dark-mode interface',
        'Real-time slot availability engine across doctors, specialties and days',
        'Patient portal with visit history, e-prescriptions and invoice records',
      ],
      ar: [
        'Laravel 12 مع Inertia/React ومسارات محدّدة الأنواع (Typed Routes) وواجهة ثنائية اللغة بوضع داكن',
        'محرّك لحظي لتوفّر المواعيد عبر الأطباء والتخصصات والأيام',
        'بوابة للمريض تضم سجل الزيارات والوصفات الإلكترونية والفواتير',
      ],
    },
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
    kicker: { en: 'Document archiving SaaS · Saudi market', ar: 'منصة SaaS لأرشفة المستندات · السوق السعودي' },
    description: {
      en: 'Electronic archiving platform for companies in Saudi Arabia. OCR-powered search inside scanned documents, custom folder trees and metadata fields, digital signatures and stamps, and team workspaces with granular permissions.',
      ar: 'منصة أرشفة إلكترونية للشركات في السعودية. بحث داخل المستندات الممسوحة ضوئيًا بتقنية OCR، وهياكل مجلدات وحقول بيانات وصفية مخصّصة، وتوقيعات وأختام رقمية، ومساحات عمل للفرق بصلاحيات دقيقة.',
    },
    highlights: {
      en: [
        'Multi-tenant access control lists with full audit logging of every operation',
        'Encrypted storage on AWS S3 with per-transaction barcodes for tracking',
        'Automated transaction routing that links related documents together',
      ],
      ar: [
        'قوائم تحكّم بالوصول (ACL) متعددة المستأجرين مع سجل تدقيق كامل لكل عملية',
        'تخزين مشفّر على AWS S3 مع باركود لكل معاملة لتتبّعها',
        'توجيه آلي للمعاملات يربط المستندات ذات الصلة ببعضها',
      ],
    },
    tags: ['Laravel', 'AWS S3', 'OCR', 'Multi-tenant', 'ACL'],
    url: 'https://filein.cloud/',
    image: asset('/projects/filein.webp'),
    year: '2025 – 2026',
    accent: '#4f7cf0',
  },
  {
    slug: 'gdawel',
    name: 'Gdawel',
    kicker: { en: 'Cloud ERP & ZATCA e-invoicing', ar: 'نظام ERP سحابي وفوترة إلكترونية (ZATCA)' },
    description: {
      en: 'Multi-tenant ERP and billing system for small and medium businesses, issuing ZATCA-compliant e-invoices (Phase 1 & 2) with accounting, sales, customers and payroll in one place.',
      ar: 'نظام ERP وفوترة متعدد المستأجرين للمنشآت الصغيرة والمتوسطة، يصدر فواتير إلكترونية متوافقة مع هيئة الزكاة والضريبة والجمارك (المرحلتان الأولى والثانية)، ويجمع المحاسبة والمبيعات والعملاء والرواتب في مكان واحد.',
    },
    highlights: {
      en: [
        'Strict data isolation across diverse business accounts',
        'MyFatoorah, Tabby and Tamara integrated through asynchronous split-payment flows',
      ],
      ar: [
        'عزل صارم للبيانات بين حسابات الأعمال المختلفة',
        'ربط ماي فاتورة وتابي وتمارا عبر مسارات غير متزامنة للدفع بالتقسيط',
      ],
    },
    tags: ['Laravel', 'Vue', 'MySQL', 'ZATCA', 'Payments'],
    url: 'https://gdawel.app/',
    image: asset('/projects/gdawel.webp'),
    year: '2025',
    accent: '#e0a526',
  },
  {
    slug: 'basma',
    name: 'Basma HR',
    kicker: { en: 'Enterprise HRM · Multi-database tenancy', ar: 'موارد بشرية للمؤسسات · قاعدة بيانات لكل مستأجر' },
    description: {
      en: 'HR management platform covering payroll, leave, attendance and performance, with a dedicated database instance per enterprise account and a companion mobile app.',
      ar: 'منصة لإدارة الموارد البشرية تغطي الرواتب والإجازات والحضور وتقييم الأداء، مع قاعدة بيانات مستقلة لكل حساب مؤسسي وتطبيق جوال مرافق.',
    },
    highlights: {
      en: [
        'Database-per-tenant architecture for isolation and predictable performance',
        'REST API layer consumed by the iOS and Android apps',
      ],
      ar: [
        'معمارية قاعدة بيانات لكل مستأجر لضمان العزل وأداء يمكن توقّعه',
        'طبقة REST API تعتمد عليها تطبيقات iOS و Android',
      ],
    },
    tags: ['Laravel', 'Multi-DB tenancy', 'MySQL', 'REST API'],
    url: 'https://pasma.hashstudio.dev',
    image: asset('/projects/basma.webp'),
    year: '2024 – 2025',
    accent: '#2f3b8f',
  },
  {
    slug: 'nabil',
    name: 'Nabil.im',
    kicker: { en: 'Personal brand site & content dashboard', ar: 'موقع شخصي ولوحة لإدارة المحتوى' },
    description: {
      en: 'Bilingual personal site backed by a custom Filament dashboard. The owner publishes posts, pages, media and SEO metadata through a draft/publish workflow without touching code.',
      ar: 'موقع شخصي ثنائي اللغة تديره لوحة تحكم مخصّصة مبنية بـ Filament. ينشر صاحب الموقع المقالات والصفحات والوسائط وبيانات SEO عبر مسار مسودة ثم نشر، دون أن يلمس الكود.',
    },
    highlights: {
      en: [
        'Server-rendered, cache-backed pages with Open Graph, sitemap and RSS',
        'Rich-text editing, image optimization and role-based access control',
      ],
      ar: [
        'صفحات تُولَّد على الخادم ومدعومة بالتخزين المؤقت، مع Open Graph وخريطة الموقع و RSS',
        'محرّر نصوص غني وتحسين للصور وتحكّم بالوصول حسب الأدوار',
      ],
    },
    tags: ['Laravel', 'Filament', 'Livewire', 'Tailwind CSS'],
    url: 'https://nabil.im/',
    image: asset('/projects/nabil.webp'),
    year: '2025',
    accent: '#ff6a00',
  },
  {
    slug: 'parfum',
    name: 'Parfum',
    kicker: { en: 'Premium perfume e-commerce', ar: 'متجر إلكتروني للعطور الفاخرة' },
    description: {
      en: 'Single-page checkout built with Inertia.js and Laravel, with embedded Tabby and Tamara split-payment widgets for the Saudi market.',
      ar: 'صفحة دفع واحدة مبنية بـ Inertia.js و Laravel، مع أدوات تابي وتمارا المضمّنة للدفع بالتقسيط في السوق السعودي.',
    },
    highlights: {
      en: ['Inertia-driven cart and checkout with server-side validation'],
      ar: ['سلة وإتمام طلب يعملان عبر Inertia مع تحقق من جهة الخادم'],
    },
    tags: ['Laravel', 'Inertia', 'React', 'Tabby', 'Tamara'],
    url: 'https://parfum.sa/',
    image: asset('/projects/parfum.webp'),
    year: '2024',
    accent: '#c9a45c',
  },
  {
    slug: '2me',
    name: '2ME Sport',
    kicker: { en: 'Mobile-first sports e-commerce', ar: 'متجر رياضي إلكتروني مصمَّم للجوال أولًا' },
    description: {
      en: 'Storefront, catalogue and order management for a sports retailer in Egypt, built on Laravel with a modern JavaScript frontend.',
      ar: 'واجهة متجر وكتالوج وإدارة طلبات لمتجر مستلزمات رياضية في مصر، مبنية على Laravel مع واجهة JavaScript حديثة.',
    },
    highlights: {
      en: ['Category and inventory management with promotional pricing'],
      ar: ['إدارة الأقسام والمخزون مع أسعار العروض الترويجية'],
    },
    tags: ['Laravel', 'MySQL', 'JavaScript'],
    url: 'https://2me.com.eg/',
    image: asset('/projects/2me.webp'),
    year: '2024',
    accent: '#e3245b',
  },
]

export type Experience = {
  company: Text
  role: Text
  period: Text
  meta: Text
  bullets: Text<string[]>
  url?: string
  note?: Text
}

export const experience: Experience[] = [
  {
    company: { en: 'Independent SaaS products', ar: 'منتجات SaaS مستقلة' },
    role: { en: 'Founder & Full-Stack Engineer', ar: 'مؤسس ومهندس Full-Stack' },
    period: { en: 'Mar 2026 – Present', ar: 'مارس 2026 – الآن' },
    meta: { en: 'Remote · Saudi market', ar: 'عن بُعد · السوق السعودي' },
    url: 'https://useazz.com/',
    bullets: {
      en: [
        'Building and operating Azz, Ansheta, MediFlow Clinics and Filein end to end: product, backend, frontend, infrastructure and merchant support.',
        'Shipped Azz to the Salla App Store and scaled it across 1,000+ active merchant stores.',
      ],
      ar: [
        'أبني وأشغّل Azz و Ansheta و MediFlow Clinics و Filein من البداية إلى النهاية: المنتج والأنظمة الخلفية والواجهات والبنية التحتية ودعم التجّار.',
        'أطلقت Azz على متجر تطبيقات سلة ووسّعت انتشاره إلى أكثر من 1,000 متجر نشط.',
      ],
    },
  },
  {
    company: { en: 'Al-Mansa Al-Raqmeya for Technical Information', ar: 'المنصة الرقمية لتقنية المعلومات' },
    role: { en: 'Full-Stack Developer', ar: 'مطوّر Full-Stack' },
    period: { en: 'Jan 2025 – Feb 2026', ar: 'يناير 2025 – فبراير 2026' },
    meta: { en: 'Contract · Remote · Saudi Arabia', ar: 'عقد · عن بُعد · السعودية' },
    url: 'https://www.mnsah.com.sa/',
    bullets: {
      en: [
        'Optimized high-frequency backend modules, improving API response times by 35% on enterprise-scale platforms.',
        'Delivered secure, localized SaaS solutions on customized API layers built for the Saudi commercial market.',
        'Restructured database indexing across multiple live merchant instances, cutting query latency by 40%.',
      ],
      ar: [
        'حسّنت وحدات خلفية عالية الاستخدام، فتحسّن زمن استجابة الـ API بنسبة 35% على منصات بحجم المؤسسات.',
        'سلّمت حلول SaaS آمنة ومعرّبة على طبقات API مخصّصة ومبنية للسوق التجاري السعودي.',
        'أعدت هيكلة فهارس قواعد البيانات عبر عدة بيئات حيّة للتجّار، فانخفض زمن تنفيذ الاستعلامات بنسبة 40%.',
      ],
    },
  },
  {
    company: { en: 'Hash Studio Inc.', ar: 'Hash Studio Inc.' },
    role: { en: 'Full-Stack Developer', ar: 'مطوّر Full-Stack' },
    period: { en: 'Sep 2024 – Jan 2026', ar: 'سبتمبر 2024 – يناير 2026' },
    meta: { en: 'Full-time · Onsite · Egypt', ar: 'دوام كامل · من المقر · مصر' },
    url: 'https://hashstudio.com/',
    note: {
      en: 'Promoted from Backend Development Intern (Sep 2023 – Jan 2024)',
      ar: 'بعد ترقية من متدرب تطوير Backend (سبتمبر 2023 – يناير 2024)',
    },
    bullets: {
      en: [
        'Owned full-lifecycle delivery of regional SaaS products, from local staging to production cloud environments.',
        'Built administrative portals with Filament and Livewire, reducing internal configuration overhead by 30%.',
      ],
      ar: [
        'تولّيت تسليم منتجات SaaS إقليمية بدورة حياتها الكاملة، من بيئات التجربة المحلية إلى بيئات الإنتاج السحابية.',
        'بنيت لوحات إدارية باستخدام Filament و Livewire، فانخفض عبء الإعدادات الداخلية بنسبة 30%.',
      ],
    },
  },
  {
    company: { en: 'ACWAD', ar: 'ACWAD' },
    role: { en: 'Backend Developer', ar: 'مطوّر Backend' },
    period: { en: 'Sep 2024 – Jan 2025', ar: 'سبتمبر 2024 – يناير 2025' },
    meta: { en: 'Contract · Remote · Turkey', ar: 'عقد · عن بُعد · تركيا' },
    bullets: {
      en: [
        'Designed low-latency, cross-border REST APIs handling 50,000+ requests per month under strict encryption requirements.',
        'Coordinated version-control pipelines and distributed builds across agile, cross-functional teams.',
      ],
      ar: [
        'صمّمت واجهات REST API سريعة الاستجابة وعابرة للحدود تعالج أكثر من 50,000 طلب شهريًا وفق متطلبات تشفير صارمة.',
        'نسّقت مسارات إدارة الإصدارات وعمليات البناء الموزّعة بين فرق Agile متعددة التخصصات.',
      ],
    },
  },
  {
    company: { en: 'Pure Soft', ar: 'Pure Soft' },
    role: { en: 'Backend Development Intern', ar: 'متدرب تطوير Backend' },
    period: { en: 'Apr 2023 – Aug 2023', ar: 'أبريل 2023 – أغسطس 2023' },
    meta: { en: 'Egypt', ar: 'مصر' },
    bullets: {
      en: ['Refactored legacy relational schemas and resolved code-level bottlenecks in Laravel applications.'],
      ar: ['أعدت هيكلة مخططات قواعد بيانات علائقية قديمة وعالجت اختناقات الأداء على مستوى الكود في تطبيقات Laravel.'],
    },
  },
]

export type SkillGroup = { title: Text; icon: LucideIcon; items: Text<string[]> }

export const skills: SkillGroup[] = [
  {
    title: { en: 'Backend', ar: 'الأنظمة الخلفية' },
    icon: Server,
    items: {
      en: ['PHP', 'Laravel', 'Livewire', 'Filament', 'REST API design', 'Event-driven architecture', 'Queues & jobs', 'CodeIgniter'],
      ar: ['PHP', 'Laravel', 'Livewire', 'Filament', 'تصميم REST API', 'معمارية مبنية على الأحداث', 'الطوابير والمهام', 'CodeIgniter'],
    },
  },
  {
    title: { en: 'Frontend', ar: 'الواجهات الأمامية' },
    icon: MonitorSmartphone,
    items: {
      en: ['React', 'Vue.js', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'State management'],
      ar: ['React', 'Vue.js', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'إدارة الحالة'],
    },
  },
  {
    title: { en: 'Salla, Zid & E-commerce', ar: 'سلة وزد والتجارة الإلكترونية' },
    icon: ShoppingBag,
    items: {
      en: ['Salla App Store', 'Salla REST APIs', 'Twilight theme engine', 'Zid integration', 'Webhook sync', 'Script injection', 'Conversion widgets'],
      ar: ['متجر تطبيقات سلة', 'واجهات سلة البرمجية', 'محرّك قوالب Twilight', 'الربط مع زد', 'مزامنة Webhooks', 'حقن السكربتات', 'أدوات زيادة المبيعات'],
    },
  },
  {
    title: { en: 'Architecture & Data', ar: 'المعمارية والبيانات' },
    icon: Database,
    items: {
      en: ['Multi-tenant (single & multi-DB)', 'MySQL optimization', 'Indexing & query tuning', 'Redis caching', 'Idempotent pipelines'],
      ar: ['تعدد المستأجرين (قاعدة واحدة أو عدة قواعد)', 'تحسين أداء MySQL', 'الفهرسة وضبط الاستعلامات', 'التخزين المؤقت بـ Redis', 'مسارات Idempotent'],
    },
  },
  {
    title: { en: 'Payments', ar: 'المدفوعات' },
    icon: CreditCard,
    items: {
      en: ['MyFatoorah', 'Tabby', 'Tamara', 'Split payments', 'Async invoicing', 'ZATCA e-invoicing'],
      ar: ['ماي فاتورة', 'تابي', 'تمارا', 'الدفع بالتقسيط', 'فوترة غير متزامنة', 'الفوترة الإلكترونية (ZATCA)'],
    },
  },
  {
    title: { en: 'Cloud & Tooling', ar: 'السحابة والأدوات' },
    icon: Cloud,
    items: {
      en: ['AWS EC2 & S3', 'Linux', 'Git & GitHub', 'CI pipelines', 'Docker'],
      ar: ['AWS EC2 و S3', 'Linux', 'Git و GitHub', 'مسارات CI', 'Docker'],
    },
  },
]

export const marquee = [
  'Laravel', 'React', 'Inertia.js', 'Vue.js', 'MySQL', 'Redis', 'AWS', 'Salla', 'Zid',
  'Filament', 'Livewire', 'Tailwind CSS', 'TypeScript', 'GSAP', 'Tabby', 'Tamara', 'MyFatoorah',
]

export const education: { title: Text; org: Text; period: Text; note?: Text }[] = [
  {
    title: { en: 'B.Sc. in Computer Science', ar: 'بكالوريوس علوم الحاسب' },
    org: {
      en: 'Menoufia University · Faculty of Computers and Information',
      ar: 'جامعة المنوفية · كلية الحاسبات والمعلومات',
    },
    period: { en: '2020 – 2024', ar: '2020 – 2024' },
    note: { en: 'Cumulative grade: Very Good', ar: 'التقدير التراكمي: جيد جدًا' },
  },
  {
    title: {
      en: 'Advanced Web Development Bootcamp (PHP / Laravel)',
      ar: 'معسكر تطوير الويب المتقدم (PHP / Laravel)',
    },
    org: { en: 'Information Technology Institute (ITI)', ar: 'معهد تكنولوجيا المعلومات (ITI)' },
    period: { en: 'Completed', ar: 'مكتمل' },
  },
]
