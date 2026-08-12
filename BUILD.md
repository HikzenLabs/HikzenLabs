# BUILD.md — HikzenLabs

Build specification for hikzenlabs.com. Read alongside `BRAND.md` (colour, logo, interaction states) and `COPY.md` (all page text).

All three live in the repo root and are loaded automatically via `CLAUDE.md`. Where this file and your instincts disagree, this file wins. Where this file and `BRAND.md` disagree, **BRAND.md wins.**

**Pages:** `/` (travel, craft and food businesses in Kashmir) · `/engineering` (agencies and product teams)

---

## 1. Locked decisions

- **Monochrome.** No accent colour anywhere. Full palette and interaction states are in `BRAND.md`.
- Four services. Prices live in **one** Pricing section — never inside the Services blocks.
- `/engineering` shows no rupee figures and no photography section.
- Automation is a sub-line under Websites & apps. Never a headline, service block, or nav item.
- No product section, no "coming soon", no blog, no newsletter.
- The word "solutions" appears nowhere. Neither does "one-stop".

**The site's only job:** make a business owner who has just met Faik or Rashid confident enough to send a WhatsApp message.

---

## 2. Stack

| | |
|---|---|
| Framework | Next.js 15, App Router, TypeScript |
| Styling | Tailwind CSS |
| Animation | GSAP + ScrollTrigger, Showcase only. Lenis optional. |
| Content | Typed objects in `content/site.ts`. No CMS. |
| Hosting | Vercel |
| Forms | None — WhatsApp deep links on `/`, mailto + Cal.com on `/engineering` |

**Server-render everything except the Showcase.** Use Server Components by default; `'use client'` only where genuinely interactive. Crawlers must see real HTML, and WhatsApp link previews depend on it.

**Rejected:** Three.js, Rive, Taxi.js, any CMS, any component library.

---

## 3. Repo structure

```
CLAUDE.md  BUILD.md  BRAND.md  COPY.md
app/
  layout.tsx  page.tsx  engineering/page.tsx
  work/north-and-beyond/page.tsx
  opengraph-image.tsx
  icon.png            32px, from brand assets
  apple-icon.png      180px
components/
  Nav.tsx  Hero.tsx  Showcase.tsx  Work.tsx  Services.tsx
  Pricing.tsx  Process.tsx  About.tsx  CTA.tsx  Footer.tsx
  engineering/  Capabilities.tsx  HowWeWork.tsx  Stack.tsx  Team.tsx
lib/gsap.ts
content/site.ts
public/brand/         lockups and marks
public/work/          project and showcase images
public/team/          founder photos
```

**One component per section. Never two components covering the same content.** If a section needs different content, change `content/site.ts` — do not create a parallel component.

---

## 4. Content architecture

Every string and asset path lives in `content/site.ts` as typed exports. Nothing hardcoded in components.

```ts
export interface Img { src: string; alt: string; width: number; height: number }

export interface Project {
  n: string
  client: string
  role: string
  outcome: string
  credit?: string
  images: Img[]
  link?: { label: string; href: string }
  caseStudy?: string
}
```

**Asset contract.** Showcase images are 1200 × 1600 WebP under 200KB. Project images are WebP under 200KB. Replacing them is a file drop into `public/work/` — no code change. Keep `public/work/README.txt` stating this.

**Every image on the site is WebP.** No PNG or JPEG in `public/work/`.

---

## 5. Tokens

Defined once as CSS custom properties. Full rules in `BRAND.md`.

```css
--paper:   #FBFAF6;   /* page background */
--paper-2: #F2EFE7;   /* alternating bands */
--ink:     #141917;   /* text, mark, primary buttons */
--ink-mut: #5A615C;   /* secondary text */
--line:    #DFD9CC;   /* hairlines */
```

No hardcoded hex anywhere in components, including `opengraph-image.tsx`.

Because there is no accent colour, hierarchy comes from scale, weight and whitespace. Inline links are underlined — see `BRAND.md` §2.

## 6. Typography

| Role | Face | Usage |
|---|---|---|
| Display | Bricolage Grotesque 600 | Headings, tracking −0.02em above 40px |
| Body | Newsreader 400 | Paragraphs, 18px, line-height 1.65 |
| Utility | JetBrains Mono 400 | Eyebrows, project numbers, section labels. Uppercase, 0.14em tracking, 11–12px |

Load via `next/font/google`, `display: 'swap'`, latin subset.

**Scale (desktop):** 60 / 40 / 28 / 20 / 18 / 14
**Scale (mobile):** 38 / 28 / 22 / 18 / 16 / 13

Keep a real step between heading and body. Without colour, a weak size jump makes the page read flat.

## 7. Layout

- Container max-width 1180px. Side padding 20px mobile, 48px desktop.
- Sections separated by whitespace and 1px `--line` hairlines. **No cards, no shadows, no borders around content blocks.**
- Alternate `--paper` and `--paper-2` between major sections.
- Border radius 4px maximum.
- **Vertical rhythm:** minimum 120px between major sections on desktop, 80px on mobile. The page should feel spacious — density is the most common failure here.

## 8. Logo

`public/brand/lockup-horizontal-light.svg`, inlined as JSX in the header — not `next/image`. Height 28–32px.

The ح sits slightly taller than the wordmark's cap height. That is correct optical alignment for an Arabic letterform beside Latin capitals. Do not scale it down to match.

Favicons: `app/icon.png` and `app/apple-icon.png`. Next picks these up by filename — no `<link>` tags, no config.

---

## 9. The Work section

The credibility engine of the site. Editorial, not a card grid.

Per project, in this order:
1. **Large image** — full-bleed edge to edge on mobile, 70%+ of the container on desktop
2. Mono index (`01`)
3. Client name, `h3`
4. One line of role — `Editorial design · Itinerary system`
5. One or two lines of outcome, stated concretely
6. Optional `credit` line in `--ink-mut`
7. One link

Projects with several images stack them vertically with generous space. **No carousel, no horizontal scroll, no lightbox, no borders.** Each project occupies close to a full viewport on desktop.

Outcomes are specific, never adjectival. *"Enquiries now come through a form instead of scattered DMs"* — not *"a beautiful digital experience."*

Where work was collaborative, split the credit. Overclaiming reads as freelance inflation; crediting specialists reads as a studio.

---

## 10. The Showcase

The before/after itinerary. The one place motion is spent.

### Desktop (≥768px)

```
ScrollTrigger: trigger: section, start: 'top top', end: '+=180%', pin: true, scrub: 1
```

Two images stacked absolutely, identical dimensions, `after` on top.

| Progress | Behaviour |
|---|---|
| 0 → 0.55 | `after` clip-path `inset(0 100% 0 0)` → `inset(0 0 0 0)`; a 2px `--ink` seam tracks the wipe edge |
| 0 → 0.15 | "BEFORE" label fades out |
| 0.45 → 0.60 | "AFTER" label fades in |
| 0.65 → 1.0 | Three `pages` thumbnails fan out, y 40 → 0, opacity 0 → 1, stagger 0.08 |

Animate **clip-path only** — never `width` or `left` on the images.

### Mobile (<768px)

**No pin. No scrub.** A draggable divider using pointer events, default 50%, visible handle. The `pages` become a horizontal scroll strip.

Build via `gsap.matchMedia()` so the desktop timeline is never constructed on mobile.

### Motion everywhere else

Sections fade up 12px on entering view, 400ms, 60ms stagger. **Nothing else, anywhere.** No other pinning, no other scrub, no `window.innerHeight * n` sections.

`prefers-reduced-motion`: no pin, no scrub, both images side by side, no fade-ups.

Only the topmost image (`after`) gets `priority`. Two priority images compete for LCP.

---

## 11. Performance budget

The buyer is on a mid-range Android on Srinagar 4G. A stuttering page disproves the pitch.

- LCP under 2.5s on 4G
- Total JS under 150KB gzipped. GSAP core + ScrollTrigger only.
- Every image WebP through `next/image`. Set `images: { formats: ['image/webp'] }` in `next.config.ts`.
- Drop Lenis first if Lighthouse falls below 90.
- Lighthouse 90+ all four categories, throttled mobile emulation.

## 12. Accessibility floor

- Visible 2px `--ink` focus rings, 2px offset, on every interactive element
- Real alt text from `content/site.ts`
- Showcase comprehensible with JS disabled — both images visible, stacked
- Verify `--ink-mut` on `--paper-2` clears 4.5:1
- One `h1` per page
- Mobile nav: Escape closes, focus trapped, body scroll locked, outside tap closes

## 13. Do not include

Dark mode · gradients · glassmorphism · cards with shadows · stock photography · logo grids · a blog · a newsletter · "Our Mission" · testimonials you don't have · stat counters · "coming soon" · emoji · any accent colour

---

## 14. Section order and surface

**`/`**

| Section | Surface |
|---|---|
| Nav | paper |
| Hero | paper, with an image |
| Showcase | paper-2 |
| Client quote | paper |
| Work | paper |
| Services | paper-2 |
| Pricing | paper |
| Process | paper-2 |
| About | paper |
| CTA | ink |
| Footer | ink |

**`/engineering`** — Nav · Hero · Capabilities · How we work · Stack · Team · CTA · Footer. No prices, no rupee figures, no photography, no showcase animation.

**`/work/north-and-beyond`** — Hero image · The problem · The approach · The result · back link.

Do not add sections beyond these.

---

## 15. Verify before calling anything done

- [ ] `grep -ri "1B3B6F\|C8891C" .` returns nothing outside `node_modules`
- [ ] `curl -s <preview-url> | grep "Kashmir businesses"` returns the hero text
- [ ] No PNG or JPEG in `public/work/`
- [ ] No file in `public/work/` over 200KB
- [ ] Only one component renders each section
- [ ] `grep -rn "pin: true" components/` returns the Showcase only
- [ ] Every inline link underlined; buttons are not
- [ ] Tab through both pages — focus rings visible throughout
- [ ] 375px: nothing wraps, overflows or crowds
- [ ] Scroll the whole site on a real phone on mobile data — nothing catches
- [ ] Paste the URL into WhatsApp — preview renders
