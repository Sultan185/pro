import type { Headline, Text } from './locale'

/** Interface copy: everything on the page that is not a fact about a person or a project. */
export const ui = {
  /**
   * Separator between two phrases. The Arabic one carries right-to-left marks: without them,
   * Latin words on both sides of the dot ("Full-Stack · Laravel") swap places on screen.
   */
  sep: { en: '·', ar: '\u200F·\u200F' } as Text,

  meta: {
    description: {
      en: 'Full-Stack Developer shipping multi-tenant SaaS on Laravel, React and the Salla ecosystem. Salla App Store apps, ERP, clinic and EdTech platforms running across 1,000+ live merchant stores.',
      ar: 'مطوّر Full-Stack يبني منتجات SaaS متعددة المستأجرين باستخدام Laravel و React ومنظومة سلة. تطبيقات على متجر تطبيقات سلة وأنظمة ERP وعيادات ومنصات تعليمية تعمل في أكثر من 1,000 متجر نشط.',
    } as Text,
    keywords: {
      en: ['Laravel developer', 'Full-Stack Developer', 'Salla App Store', 'React', 'Inertia.js', 'Multi-tenant SaaS', 'Saudi Arabia', 'Egypt', 'Remote'],
      ar: ['مطور Laravel', 'مطور Full-Stack', 'متجر تطبيقات سلة', 'React', 'Inertia.js', 'SaaS متعدد المستأجرين', 'السعودية', 'مصر', 'عمل عن بعد'],
    } as Text<string[]>,
    ogAlt: { en: 'Azz on the Salla App Store', ar: 'تطبيق Azz على متجر تطبيقات سلة' } as Text,
  },

  nav: {
    work: { en: 'Work', ar: 'الأعمال' } as Text,
    experience: { en: 'Experience', ar: 'الخبرات' } as Text,
    skills: { en: 'Skills', ar: 'المهارات' } as Text,
    contact: { en: 'Contact', ar: 'تواصل' } as Text,
    resume: { en: 'Résumé', ar: 'السيرة الذاتية' } as Text,
    downloadResume: { en: 'Download résumé', ar: 'تحميل السيرة الذاتية' } as Text,
    openMenu: { en: 'Open menu', ar: 'فتح القائمة' } as Text,
    closeMenu: { en: 'Close menu', ar: 'إغلاق القائمة' } as Text,
    /** Shown on each page as the link to the other language, written in that language. */
    switchTo: { en: 'العربية', ar: 'English' } as Text,
  },

  hero: {
    headline: {
      en: ['Building SaaS that ', 'holds up', ' under real load.'],
      ar: ['أبني منتجات SaaS ', 'تصمد', ' تحت الضغط الحقيقي.'],
    } as Headline,
    seeWork: { en: 'See the work', ar: 'شاهد الأعمال' } as Text,
    downloadCv: { en: 'Download CV', ar: 'تحميل السيرة الذاتية' } as Text,
    basedIn: { en: 'based in', ar: 'مقيم في' } as Text,
    email: { en: 'Email', ar: 'البريد الإلكتروني' } as Text,
    linkedinProfile: { en: 'LinkedIn profile', ar: 'حساب LinkedIn' } as Text,
    scroll: { en: 'Scroll', ar: 'مرّر للأسفل' } as Text,
  },

  statement: {
    eyebrow: { en: 'What I do', ar: 'ما أقدّمه' } as Text,
    body: {
      en: 'I take products from a blank repo to thousands of paying merchants. Multi-tenant Laravel backends, React and Inertia frontends, webhook pipelines that never double-fire, and payment flows that reconcile to the cent, built for the Saudi and Gulf market.',
      ar: 'آخذ المنتجات من مستودع فارغ إلى آلاف التجّار المشتركين. أنظمة Laravel خلفية متعددة المستأجرين، وواجهات React و Inertia، ومسارات Webhook لا تتكرر أحداثها أبدًا، ومسارات دفع تتطابق حتى آخر هللة، مبنية للسوق السعودي والخليجي.',
    } as Text,
  },

  projects: {
    eyebrow: { en: 'Selected work', ar: 'أعمال مختارة' } as Text,
    title: {
      en: ['Products in production, ', 'not demos.', ''],
      ar: ['منتجات تعمل فعليًا، ', 'لا نماذج تجريبية.', ''],
    } as Headline,
    scroll: { en: 'Scroll', ar: 'مرّر' } as Text,
    next: { en: 'Next', ar: 'التالي' } as Text,
    /** Followed by the next project number. */
    yours: {
      en: ['Yours could be ', 'number '],
      ar: ['مشروعك قد يكون ', 'رقم '],
    } as Text<[string, string]>,
    screenshot: { en: 'screenshot', ar: 'لقطة شاشة' } as Text,
    /** Label inside the cursor ring while hovering a project. */
    open: { en: 'open', ar: 'افتح' } as Text,
  },

  experience: {
    eyebrow: { en: 'Experience', ar: 'الخبرات' } as Text,
    title: {
      en: ['Three years, four teams, ', 'one obsession', ': systems that stay fast.'],
      // "و" and ":" stay inside the accent: split apart, they would wrap onto their own lines.
      ar: ['ثلاث سنوات وأربعة فرق، ', 'وهاجس واحد:', ' أنظمة تبقى سريعة.'],
    } as Headline,
    blurb: {
      en: 'Remote contracts for Saudi and Turkish companies alongside a full-time role in Egypt, then my own products.',
      ar: 'عقود عمل عن بُعد مع شركات سعودية وتركية بجانب وظيفة بدوام كامل في مصر، ثم منتجاتي الخاصة.',
    } as Text,
  },

  skills: {
    eyebrow: { en: 'Capabilities', ar: 'القدرات' } as Text,
    title: {
      en: ['Full stack, with a bias toward ', 'the hard parts.', ''],
      ar: ['تطوير متكامل، مع ميل إلى ', 'الأجزاء الصعبة.', ''],
    } as Headline,
    blurb: {
      en: 'Tenancy, payments, webhooks and query performance are where projects fail. Those are the pieces I own first.',
      ar: 'تعدد المستأجرين والمدفوعات والـ Webhooks وأداء الاستعلامات هي المواضع التي تتعثر عندها المشاريع. وهذه هي الأجزاء التي أتولّاها أولًا.',
    } as Text,
  },

  contact: {
    giant: {
      en: ["Let's build · Let's build", 'something fast · something fast'],
      // No vowel marks here: outlined at this size they turn into stray shapes.
      ar: ['لنصنع معا · لنصنع معا', 'منتجا سريعا · منتجا سريعا'],
    } as Text<[string, string]>,
    eyebrow: { en: 'Contact', ar: 'تواصل' } as Text,
    title: {
      en: ['Have a product that needs to scale? ', "Let's talk.", ''],
      ar: ['لديك منتج يحتاج إلى التوسّع؟ ', 'لنتحدث.', ''],
    } as Headline,
    body: {
      en: 'Open to remote full-time roles and contract work across KSA and the GCC. I reply within a day.',
      ar: 'متاح لوظائف بدوام كامل عن بُعد وللعمل بنظام التعاقد في السعودية ودول الخليج. أردّ خلال يوم واحد.',
    } as Text,
    email: { en: 'Email', ar: 'البريد الإلكتروني' } as Text,
    whatsapp: { en: 'WhatsApp', ar: 'واتساب' } as Text,
    phone: { en: 'Phone', ar: 'الهاتف' } as Text,
    builtWith: { en: 'Built with Next.js, Tailwind and GSAP.', ar: 'بُني باستخدام Next.js و Tailwind و GSAP.' } as Text,
    backToTop: { en: 'Back to top', ar: 'العودة إلى الأعلى' } as Text,
  },

  preloader: {
    portfolio: { en: 'Portfolio', ar: 'معرض الأعمال' } as Text,
    loading: { en: 'Loading', ar: 'جارٍ التحميل' } as Text,
  },

  error: {
    eyebrow: { en: 'Something went wrong', ar: 'حدث خطأ ما' } as Text,
    body: {
      en: 'The page failed to load on this device, but you can still reach me.',
      ar: 'تعذّر تحميل الصفحة على هذا الجهاز، لكن ما زال بإمكانك التواصل معي.',
    } as Text,
    reload: { en: 'Reload', ar: 'إعادة التحميل' } as Text,
  },
}
