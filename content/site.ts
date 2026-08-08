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
  email: 'hello@hikzenlabs.com',
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
      { label: 'Services', href: '#services' },
      { label: 'Pricing', href: '#pricing' },
    ] satisfies Link[],
    studioLink: { label: 'Studio →', href: '/engineering' } satisfies Link,
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
    // Real dimensions of the delivered asset — see note on `after` below.
    width: 652,
    height: 743,
  } satisfies ImageAsset,
  after: {
    src: '/work/showcase/after.webp',
    alt: 'The same itinerary, redesigned',
    // Real dimensions of the delivered asset — not the spec's 1200x1600 (see
    // README.txt). Fine as-is: the frame renders both images via
    // object-cover inside a fixed 3:4 box, so exact source dimensions don't
    // need to match each other or the spec for correct display.
    width: 506,
    height: 712,
  } satisfies ImageAsset,
  pages: [
    {
      src: '/work/showcase/page-02.png',
      alt: 'Day-by-day spread',
      width: 1200,
      height: 1600,
    },
    {
      src: '/work/showcase/page-03.png',
      alt: 'Inclusions page',
      width: 1200,
      height: 1600,
    },
    {
      src: '/work/showcase/page-04.png',
      alt: 'Pricing page',
      width: 1200,
      height: 1600,
    },
  ] satisfies ImageAsset[],
  caption: 'Itinerary design for North & Beyond.',
}

// ---------------------------------------------------------------------------
// Homepage — Work
// ---------------------------------------------------------------------------

export interface WorkItem {
  number: string
  client: string
  description: string
  outcome?: string
  link?: Link
  image: ImageAsset
}

export const work = {
  heading: 'Recent work',
  items: [
    {
      number: '01',
      client: 'North & Beyond',
      description: 'Itinerary and package design.',
      outcome: 'A print-ready template system the team refills for every new departure.',
      link: { label: 'check on their handles →', href: 'https://www.instagram.com/p/Dbw6RbZER_j/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
      image: {
        src: '/work/projects/northandbeyond.png',
        alt: 'Itinerary and package design work sample',
        width: 1200,
        height: 900,
      },
    },
    {
      number: '02',
      client: 'Climbex Adventures',
      description: 'Website design and build.',
      outcome: 'Enquiries now come through a form instead of scattered DMs.',
      link: { label: 'View site →', href: 'https://www.climbexadventures.com' },
      image: {
        src: '/work/projects/climbexadventures.png',
        alt: 'Website design and build work sample',
        width: 1200,
        height: 900,
      },
    },
    {
      number: '03',
      client: 'Cactuss Jewellery',
      description: 'Product photography and website.',
      outcome: 'Shot the full range, built the store, launched in three weeks.',
      link: {
        label: 'Photography with Jannan Kazmi →',
        href: 'https://www.instagram.com/wordlesstories',
      },
      image: {
        src: '/work/projects/product_shoot.jpeg',
        alt: 'Jewellery product photography for Cactuss Jewellery',
        width: 854,
        height: 1280,
      },
    },
  ] satisfies WorkItem[],
}

// ---------------------------------------------------------------------------
// Homepage — Services (no prices here — BUILD.md keeps prices to Pricing only)
// ---------------------------------------------------------------------------

export interface ServiceItem {
  name: string
  description: string
}

export const services = {
  heading: 'What we do',
  subheading: 'Most clients start with one thing and come back for the rest.',
  items: [
    {
      name: 'Websites & apps',
      description:
        'Sites people trust enough to book from. Booking forms, catalogues, online stores, and the quiet automations behind them — enquiry routing, WhatsApp replies, order alerts.',
    },
    {
      name: 'Design',
      description:
        'Itineraries, brochures, catalogues, menus, brand identity. Print-ready, and yours to reuse.',
    },
    {
      name: 'Photography & video',
      description:
        'Your products, shot properly. Enough images for your website, your Instagram, and your listings — from one session.',
    },
    {
      name: 'Everything, together',
      description: 'Shoot, build, launch. One team, one timeline, one invoice.',
    },
  ] satisfies ServiceItem[],
}

// ---------------------------------------------------------------------------
// Homepage — Pricing (the one place prices appear)
// ---------------------------------------------------------------------------

export interface PricingItem {
  name: string
  price: string
}

export const pricing = {
  heading: 'Pricing',
  items: [
    { name: 'Websites & apps', price: 'From ₹25,000' },
    { name: 'Design', price: 'From ₹3,000' },
    { name: 'Photography & video', price: 'From ₹15,000' },
    { name: 'Everything, together', price: 'From ₹55,000' },
  ] satisfies PricingItem[],
}

// ---------------------------------------------------------------------------
// Homepage — Process
// ---------------------------------------------------------------------------

export interface ProcessStep {
  name: string
  description: string
}

export const process = {
  heading: 'How it works',
  steps: [
    { name: 'Shoot', description: 'We photograph your products, your space, your work.' },
    { name: 'Build', description: 'Website, design, and the systems behind them.' },
    {
      name: 'Launch',
      description: 'You get the files, the logins, and a walkthrough. Everything is yours.',
    },
  ] satisfies ProcessStep[],
}

// ---------------------------------------------------------------------------
// Homepage — About
// ---------------------------------------------------------------------------

export interface Founder {
  name: string
  photo: ImageAsset
}

export const about = {
  heading: 'Two people, Srinagar',
  paragraphs: [
    "HikzenLabs is Faik Aijaz and Rashid Geelani. We're both developers, and between us we handle the design, the build and the shoot.",
    "You won't be passed to an account manager. You'll talk to whoever is doing the work.",
  ],
  founders: [
    {
      name: 'Faik Aijaz',
      // Placeholder — swap for the real photo, same dimensions.
      photo: {
        src: '/team/faik.png',
        alt: 'Faik Aijaz, co-founder of HikzenLabs',
        width: 800,
        height: 1000,
      },
    },
    {
      name: 'Rashid Geelani',
      photo: {
        src: '/team/rashid.png',
        alt: 'Rashid Geelani, co-founder of HikzenLabs',
        width: 800,
        height: 1000,
      },
    },
  ] satisfies Founder[],
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
      { label: 'Services', href: '#services' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Studio →', href: '/engineering' },
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
// /engineering — How we work
// ---------------------------------------------------------------------------

export interface HowWeWorkItem {
  label: string
  description: string
}

export const howWeWork = {
  heading: 'How we work',
  items: [
    { label: 'Direct contact.', description: 'You talk to the people writing the code.' },
    {
      label: 'Fixed scope or retainer.',
      description: 'Whichever suits the work. Fixed scope for defined builds, retainer for ongoing.',
    },
    {
      label: 'Overlapping hours.',
      description:
        'IST is UTC+5:30 — full working overlap with the Gulf and Europe, and our evenings meet the US East Coast morning.',
    },
    {
      label: 'Your infrastructure.',
      description:
        'Your repos, your cloud, your accounts. We leave when the work is done and take nothing with us.',
    },
  ] satisfies HowWeWorkItem[],
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
  github: string
}

export const team = {
  heading: "Who you'd be working with",
  members: [
    {
      name: 'Faik Aijaz',
      // Placeholder — confirm one-line focus area before launch.
      role: '[one line: focus area, e.g. full-stack and AI integration]',
      linkedin: '#',
      github: '#',
    },
    {
      name: 'Rashid Geelani',
      role: '[one line: focus area]',
      linkedin: '#',
      github: '#',
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
