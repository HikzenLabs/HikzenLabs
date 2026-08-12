// content/site.ts
//
// Every string on the site lives here, typed. Components import from this
// file and never hardcode copy. Edit this file to change what the site says;
// edit components to change how it says it.
//
// Bracketed placeholders (e.g. "[Travel client name]") are copy that COPY.md
// leaves open pending real client names, photos, and confirmed handles —
// replace them before launch, not the surrounding structure.

export interface Link {
  label: string
  href: string
}

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
}

// ---------------------------------------------------------------------------
// Brand + contact
// ---------------------------------------------------------------------------

export const brand = {
  name: 'HikzenLabs',
  domain: 'hikzenlabs.com',
  location: 'Srinagar, Kashmir',
}

export const contact = {
  // TODO: swap to hello@hikzenlabs.com once the domain inbox is set up —
  // BUILD.md's own launch checklist and SITE-PROFESSIONAL-UPGRADE.md flag a
  // Gmail address here as the thing to fix before launch, not ship with.
  email: 'hikzenlabs@gmail.com',
  // Placeholder — replace with the HikzenLabs WhatsApp Business number
  // (digits only, country code first, no leading +) before launch.
  whatsappNumber: '917889912123',
  whatsappMessage: "Hi HikzenLabs! I'd like to talk about a project.",
  // Placeholder — replace with the real Cal.com booking link before launch.
  calLink: 'https://cal.com/hikzenlabs',
} as const

export const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`

// ---------------------------------------------------------------------------
// Nav — homepage and /engineering read different shapes
// ---------------------------------------------------------------------------

export const nav = {
  home: {
    logo: brand.name,
    links: [
      { label: 'Work', href: '#work' },
      { label: 'How we work', href: '#how-we-work' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ] satisfies Link[],
    studioLink: { label: 'Engineering →', href: '/engineering' } satisfies Link,
    cta: { label: 'WhatsApp us', href: whatsappHref } satisfies Link,
  },
  engineering: {
    logo: brand.name,
    homeLink: { label: '← HikzenLabs', href: '/' } satisfies Link,
    cta: { label: 'Book a call', href: contact.calLink } satisfies Link,
  },
}

// ---------------------------------------------------------------------------
// Homepage — Hero
// ---------------------------------------------------------------------------

export const homeHero = {
  heading: 'We make Kashmir businesses look as good as they are.',
  body: 'Websites, design and photography for travel operators, craft houses and food brands. Built in Srinagar by two people who answer their own phones.',
  primaryCta: { label: 'Message us on WhatsApp', href: whatsappHref } satisfies Link,
  secondaryCta: { label: 'See our work ↓', href: '#work' } satisfies Link,
}

// ---------------------------------------------------------------------------
// Homepage — Showcase (the before/after signature moment). BUILD.md §4, §8.
//
// Asset replacement contract: images are 1200×1600, WebP, under 200KB each,
// at these exact filenames — see public/work/showcase/README.txt. The files
// below are flat-fill placeholders in PNG (no WebP encoder available in this
// environment); swap them for the real WebP exports before launch and update
// these five `src` extensions to match — nothing else in this file changes
// unless the dimensions themselves change.
// ---------------------------------------------------------------------------

export const showcase = {
  eyebrow: 'The difference',
  heading: 'Most itineraries look like this.',
  beforeLabel: 'Before',
  afterLabel: 'After',
  before: {
    src: '/work/showcase/before.webp',
    alt: 'A plain word-processor itinerary, unformatted',
    width: 1200,
    height: 1600,
  } satisfies ImageAsset,
  after: {
    src: '/work/showcase/after.webp',
    alt: 'The same itinerary, redesigned',
    width: 1200,
    height: 1600,
  } satisfies ImageAsset,
  pages: [
    {
      src: '/work/showcase/page-02.webp',
      alt: 'Day-by-day spread',
      width: 1200,
      height: 1600,
    },
    {
      src: '/work/showcase/page-03.webp',
      alt: 'At a glance and altitude profile',
      width: 1200,
      height: 1600,
    },
    {
      src: '/work/showcase/page-04.webp',
      alt: 'The route map',
      width: 1200,
      height: 1600,
    },
  ] satisfies ImageAsset[],
  caption: 'Itinerary design for North & Beyond.',
}

// ---------------------------------------------------------------------------
// Homepage — Work. Shape follows BUILD.md §4's Project interface exactly —
// `images` is stacked vertically per project (no carousel), not one image
// per item, so every asset in the array is meant to render.
// ---------------------------------------------------------------------------

export interface Project {
  n: string
  client: string
  role: string
  outcome: string
  credit?: string
  images: ImageAsset[]
  link?: Link
  caseStudy?: string
}

export const workHeading = 'Recent work'

export const work = [
  {
    n: '01',
    client: 'North & Beyond',
    role: 'Editorial design · Itinerary system',
    outcome:
      'Two expedition documents — Zanskar and Kala Pari — built on one template the team refills for every departure. Print, PDF and the Instagram carousel all carry the same identity.',
    images: [
      { src: '/work/nb-hero.webp',   alt: 'Zanskar and Kala Pari expedition covers side by side', width: 1600, height: 1100 },
      { src: '/work/nb-spread.webp', alt: 'Four interior spreads from the itinerary system',      width: 1800, height: 940 },
      { src: '/work/nb-detail.webp', alt: 'Altitude profile from the Kala Pari itinerary',        width: 1600, height: 760 },
    ],
    link: { label: 'See it on Instagram', href: 'https://www.instagram.com/p/Dbw6RbZER_j/' },
    caseStudy: '/work/north-and-beyond',
  },
  {
    n: '02',
    client: 'Climbex Adventures',
    role: 'Website · Booking enquiry flow',
    outcome:
      'Enquiries now come through a structured form instead of scattered DMs.',
    images: [
      { src: '/work/climbex-hero.webp', alt: 'Climbex Adventures website homepage', width: 1600, height: 1100 },
    ],
    link: { label: 'View site', href: 'https://www.climbexadventures.com' },
  },
  {
    n: '03',
    client: 'Cactuss Jewellery',
    role: 'Website · Product photography',
    outcome:
      'Shot the full range, built the store, launched in three weeks.',
    credit: 'Product photography by Jannan Kazmi.',
    images: [
      {
        src: '/work/cactuss-01.webp',
        alt: 'Gold crescent moon pendant necklace on a light fabric backdrop',
        width: 1200,
        height: 1600,
      },
    ] satisfies ImageAsset[],
  },
] satisfies Project[]

// ---------------------------------------------------------------------------
// Homepage — About
// ---------------------------------------------------------------------------

export interface AboutColumn {
  heading: string
  lines: string[]
}

export const about = {
  eyebrow: 'Based in Srinagar',
  headline: 'Based in Srinagar. Built to go further.',
  body: "We're a design and engineering studio working with people and businesses to shape digital experiences, visual systems and products — from early ideas to the finished thing.",
  columns: [
    {
      heading: 'Design',
      lines: ['Websites', 'Editorial', 'Visual Systems', 'Brand Experiences'],
    },
    {
      heading: 'Engineering',
      lines: ['Web Applications', 'Digital Products', 'API & Integrations', 'Performance & Scale'],
    },
    {
      heading: 'Based in',
      lines: ['Srinagar, Kashmir', 'Working remotely across locations.', '34.0837° N, 74.7973° E'],
    },
  ] satisfies AboutColumn[],
}

// ---------------------------------------------------------------------------
// Homepage — Closing CTA
// ---------------------------------------------------------------------------

export const homeCta = {
  heading: "Tell us what you're working on.",
  body: "Send a message and we'll come back within a day — usually sooner.",
  primaryCta: { label: 'WhatsApp us', href: whatsappHref } satisfies Link,
  secondaryCta: { label: contact.email, href: `mailto:${contact.email}` } satisfies Link,
}

// ---------------------------------------------------------------------------
// Footer — shared shape, per-page content
// ---------------------------------------------------------------------------

export const footer = {
  home: {
    logo: brand.name,
    email: contact.email,
    location: brand.location,
    links: [
      { label: 'Work', href: '#work' },
      { label: 'Engineering →', href: '/engineering' },
    ] satisfies Link[],
  },
  engineering: {
    logo: brand.name,
    email: contact.email,
    location: brand.location,
    links: [{ label: '← HikzenLabs', href: '/' }] satisfies Link[],
  },
  copyright: `© ${new Date().getFullYear()} ${brand.name}.`,
}

// ---------------------------------------------------------------------------
// /engineering — Hero
// ---------------------------------------------------------------------------

export const engineeringHero = {
  heading: 'Engineering partners for product teams and agencies.',
  body: 'Full-stack development from Srinagar, India. Two senior developers, direct contact, no layers.',
  primaryCta: { label: 'Book a call', href: contact.calLink } satisfies Link,
  secondaryCta: { label: contact.email, href: `mailto:${contact.email}` } satisfies Link,
}

// ---------------------------------------------------------------------------
// /engineering — What we take on
// ---------------------------------------------------------------------------

export interface CapabilityItem {
  name: string
  description: string
}

export const whatWeTakeOn = {
  heading: 'What we take on',
  items: [
    {
      name: 'Product engineering',
      description:
        'Web applications end to end. React, Next.js, TypeScript, Postgres. Discovery through deployment.',
    },
    {
      name: 'White-label delivery',
      description:
        'We build under your brand for your clients. NDA-friendly, your process, your repo, your client relationship.',
    },
    {
      name: 'Automation & AI integration',
      description:
        'Document generation, data pipelines, LLM-backed internal tools. Things that remove hours from a week.',
    },
  ] satisfies CapabilityItem[],
}

// ---------------------------------------------------------------------------
// /engineering — What we do (granular ten-item breakdown, sits alongside the
// three-item "What we take on" above). No rupee figures here — BUILD.md
// keeps prices off /engineering entirely, so the four items that originally
// carried a price show a plain capability tag instead.
// ---------------------------------------------------------------------------

export interface WhatWeDoItem {
  number: string
  title: string
  description: string
  tag: string
}

export const engineeringWhatWeDo = {
  heading: 'What we do',
  subheading: 'Ten services. One team, one invoice.',
  items: [
    {
      number: '01',
      title: 'Websites that book',
      description:
        'Sites people trust enough to book from. Booking forms, catalogues, online stores, and the systems behind them.',
      tag: 'Web builds',
    },
    {
      number: '02',
      title: 'Apps & custom software',
      description:
        'Mobile apps and internal tools built for your workflow. No off-the-shelf bloat — exactly what your business needs.',
      tag: 'Custom builds',
    },
    {
      number: '03',
      title: 'AI integration',
      description:
        'Chatbots, smart enquiry routing, auto-replies, and content tools. AI that actually saves you time, not creates more work.',
      tag: 'Smart features',
    },
    {
      number: '04',
      title: 'Travel itineraries & print',
      description:
        'The document system: itineraries, proposals, voucher packs, and Instagram carousels — branded templates your team refills.',
      tag: 'Print & documents',
    },
    {
      number: '05',
      title: 'UI/UX & product design',
      description:
        "Interfaces that don't need a manual. Design systems, dashboards, and brand identity that holds together across every touchpoint.",
      tag: 'Design systems',
    },
    {
      number: '06',
      title: 'Product photography',
      description:
        'Products, spaces, and process — shot properly. Enough images for your website, Instagram, and listings from one session.',
      tag: 'Photography',
    },
    {
      number: '07',
      title: 'Backend & infrastructure',
      description:
        "Databases, APIs, payment gateways, and hosting. The parts users never see but your business can't run without.",
      tag: 'Backend',
    },
    {
      number: '08',
      title: 'AI & automations',
      description:
        'Workflows that run while you sleep. Auto-enquiry routing, order alerts, scheduled posts, and follow-ups — no manual work.',
      tag: 'Automate',
    },
    {
      number: '09',
      title: 'Engineering',
      description:
        'Complex problems solved simply. System architecture, performance, security, and the technical decisions that last.',
      tag: 'Engineering',
    },
    {
      number: '10',
      title: 'Everything, together',
      description:
        'Shoot, build, launch. One team, one timeline, one invoice. Most clients start with one thing and come back for the rest.',
      tag: 'End to end',
    },
  ] satisfies WhatWeDoItem[],
}

// ---------------------------------------------------------------------------
// /engineering — How we work
// ---------------------------------------------------------------------------

export interface HowWeWorkStage {
  number: string
  name: string
  description: string
}

export const howWeWork = {
  eyebrow: 'How we work',
  statement: 'Good work starts with clarity and ends with impact.',
  body: 'A thoughtful, collaborative process that keeps things simple, intentional and well-built.',
  stages: [
    {
      number: '01',
      name: 'Understand',
      description: 'We start by understanding the problem, the context and what actually matters.',
    },
    {
      number: '02',
      name: 'Shape',
      description: 'We turn the thinking into a clear strategy, visual direction and plan.',
    },
    {
      number: '03',
      name: 'Build',
      description: 'Design and engineering come together to build it the right way.',
    },
    {
      number: '04',
      name: 'Refine',
      description: 'We test, improve and refine until everything feels just right.',
    },
  ] satisfies HowWeWorkStage[],
}

// ---------------------------------------------------------------------------
// /engineering — Stack (plain type-set line, never a logo grid)
// ---------------------------------------------------------------------------

export const stack = {
  heading: 'Stack',
  items: [
    'Next.js',
    'React',
    'TypeScript',
    'Node',
    'Python',
    'Postgres',
    'Prisma',
    'Tailwind',
    'AWS',
    'Vercel',
  ],
}

// ---------------------------------------------------------------------------
// /engineering — Team
// ---------------------------------------------------------------------------

export interface TeamMember {
  name: string
  role: string
  linkedin: string
  // Removed for now — add back once there's a GitHub link worth showing.
  github?: string
}

export const team = {
  heading: "Who you'd be working with",
  members: [
    {
      name: 'Faik Aijaz',
      // Drafted copy — confirm this actually matches before launch.
      role: 'Product design and AI integration.',
      linkedin: 'https://in.linkedin.com/in/faik-aijaz',
      github: undefined,
    },
    {
      name: 'Rashid Geelani',
      // Drafted copy — confirm this actually matches before launch.
      role: 'Full-stack development and infrastructure.',
      linkedin: 'https://in.linkedin.com/in/syed-rashid-geelani-b00719202',
      github: undefined,
    },
  ] satisfies TeamMember[],
}

// ---------------------------------------------------------------------------
// /engineering — Closing CTA
// ---------------------------------------------------------------------------

export const engineeringCta = {
  heading: 'Send us the brief.',
  body: "We'll tell you within a day whether we're the right fit — and if we're not, we'll say so.",
  primaryCta: { label: 'Book a call', href: contact.calLink } satisfies Link,
  secondaryCta: { label: contact.email, href: `mailto:${contact.email}` } satisfies Link,
}

// ---------------------------------------------------------------------------
// /work/north-and-beyond — case study. BUILD.md §14: hero image · the
// problem · the approach · the result · back link.
// ---------------------------------------------------------------------------

export const northAndBeyond = {
  backLink: { label: '← Recent work', href: '/#work' } satisfies Link,
  client: 'North & Beyond',
  role: 'Editorial design · Itinerary system',
  hero: {
    number: '01',
    image: {
      src: '/work/nb-hero.webp',
      alt: 'Zanskar and Kala Pari expedition covers side by side',
      width: 1600,
      height: 1100,
    } satisfies ImageAsset,
  },
  problem: {
    number: '02',
    heading: 'The problem',
    paragraphs: [
      'North & Beyond runs a new expedition every few weeks — Zanskar, then Kala Pari, then whatever comes after. Each one needed its own itinerary, and there was no repeatable way to produce one.',
      'What clients received was a plain word-processor document: unformatted, inconsistent from trip to trip, and not what a booking at this price should feel like before it has even started.',
    ],
  },
  approach: {
    number: '03',
    heading: 'The approach',
    paragraphs: [
      'One template, not one document. A disciplined serif and small-caps system, a cinematic cover per expedition, an altitude profile and a hand-drawn route map for the terrain, honest inclusion tables, and a cancellation policy laid out without shame.',
      'Every field the North & Beyond team needs to change for a new departure — dates, route, price, group size — sits in the same place on the page, every time.',
    ],
    images: [
      {
        src: '/work/nb-spread.webp',
        alt: 'Four interior spreads from the itinerary system',
        width: 1800,
        height: 940,
      },
      {
        src: '/work/nb-detail.webp',
        alt: 'Altitude profile from the Kala Pari itinerary',
        width: 1600,
        height: 760,
      },
    ] satisfies ImageAsset[],
  },
  // The carousel showcase. `heroSlides` is the strongest 3, shown large and
  // layered (desktop) or as a peek-scroller (mobile) — see
  // components/work/NorthAndBeyondCarousel.tsx. `heroSlides[1]` is the
  // initial centre slide and the only one of the seven that gets `priority`.
  // `remainingSlides` are the other four, shown as a plain strip beneath.
  social: {
    number: '04',
    heading: 'Social / Instagram',
    body: 'The expedition story continues beyond the itinerary — translated into a visual language designed for social.',
    heroSlides: [
      {
        src: '/work/nb-carousel-why.webp',
        alt: 'Instagram carousel slide — "Why Kalapari?" over a hiker facing a glacier',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/nb-carousel-cover.webp',
        alt: 'Instagram carousel cover slide — Kalapari Lake Expedition, with Leo',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/nb-carousel-for-you.webp',
        alt: 'Instagram carousel slide — "Is this expedition for you?" over a turquoise glacial lake',
        width: 1080,
        height: 1350,
      },
    ] satisfies ImageAsset[],
    remainingSlides: [
      {
        src: '/work/nb-carousel-trek.webp',
        alt: 'Instagram carousel slide — trek essentials at a glance',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/nb-carousel-journey.webp',
        alt: 'Instagram carousel slide — the eight-stage route',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/nb-carousel-quote.webp',
        alt: 'Instagram carousel slide — a quote over a campsite photo',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/nb-carousel-reserve.webp',
        alt: 'Instagram carousel slide — reservations open, call to action',
        width: 1080,
        height: 1350,
      },
    ] satisfies ImageAsset[],
    caption: { client: 'North & Beyond', label: 'Instagram carousel', year: '2026' },
    link: {
      label: 'See the carousel on Instagram',
      href: 'https://www.instagram.com/p/Dbw6RbZER_j/',
    } satisfies Link,
  },
  visualLanguage: {
    number: '05',
    heading: 'One visual language',
    paragraphs: [
      'The same serif system, the same restraint, the same palette — whether someone is holding the printed pack, reading the PDF, or swiping through a carousel before they have even messaged.',
    ],
  },
  result: {
    number: '06',
    heading: 'The result',
    paragraphs: [
      'Two expedition documents — Zanskar and Kala Pari — built on one template the team refills for every departure, with no design work needed in between.',
      'Print, PDF and Instagram now read as one studio, not three separate efforts stitched together after the fact.',
    ],
  },
  nextProject: {
    label: 'Next project',
    client: 'Climbex Adventures',
    role: 'Website · Booking enquiry flow',
    href: '/#work',
  },
}
