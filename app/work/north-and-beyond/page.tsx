import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import NorthAndBeyondCarousel from '@/components/work/NorthAndBeyondCarousel'
import { northAndBeyond } from '@/content/site'

const description =
  'How North & Beyond went from a plain word-processor itinerary to one editorial template refilled for every expedition — print, PDF and Instagram carried by the same identity.'

export const metadata: Metadata = {
  title: 'HikzenLabs — North & Beyond',
  description,
  alternates: { canonical: '/work/north-and-beyond' },
  openGraph: {
    title: 'HikzenLabs — North & Beyond',
    description,
    url: '/work/north-and-beyond',
  },
}

// Mono index label — same treatment as the "01" on the homepage Work
// section, reused here so the case study reads as one numbered sequence.
function IndexLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mut md:text-[12px]">
      {children}
    </span>
  )
}

// BUILD.md §14 — hero image · the problem · the approach · the result · back
// link. The social/visual-language parts are additions specific to this case
// study, not a change to the shared page-section spec. Same section rhythm
// and hairline rules as every other page; only the Showcase gets GSAP.
export default function NorthAndBeyondCaseStudy() {
  const { backLink, client, role, hero, problem, approach, social, visualLanguage, result, nextProject } =
    northAndBeyond

  return (
    <>
      <Nav variant="home" />
      <main>
        <section className="bg-paper">
          <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-28 md:px-12 md:py-[134px]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              sizes="(min-width: 768px) 1084px, 100vw"
              priority
              className="h-auto w-full"
            />
            <div className="flex flex-col gap-2">
              <IndexLabel>{hero.number}</IndexLabel>
              <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
                {client}
              </h1>
              <p className="text-[16px] text-ink-mut md:text-[18px]">{role}</p>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-line bg-paper-2">
          <Reveal className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
            <IndexLabel>{problem.number}</IndexLabel>
            <h2 className="mt-3 font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
              {problem.heading}
            </h2>
            <div className="mt-6 flex max-w-2xl flex-col gap-4">
              {problem.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[16px] leading-[1.65] text-ink-mut md:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-line bg-paper">
          <Reveal className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
            <IndexLabel>{approach.number}</IndexLabel>
            <h2 className="mt-3 font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
              {approach.heading}
            </h2>
            <div className="mt-6 flex max-w-2xl flex-col gap-4">
              {approach.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[16px] leading-[1.65] text-ink-mut md:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="-mx-6 mt-10 flex flex-col gap-4 md:mx-0 md:w-[72%]">
              {approach.images.map((image) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 768px) 850px, 100vw"
                  className="h-auto w-full"
                />
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-line bg-paper-2">
          <Reveal className="mx-auto max-w-[1180px] px-6 pt-28 md:px-12 md:pt-[134px]">
            <IndexLabel>{social.number}</IndexLabel>
            <h2 className="mt-3 font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
              {social.heading}
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">
              {social.body}
            </p>
          </Reveal>

          <div className="mx-auto mt-10 max-w-[1180px] px-6 md:px-12">
            <NorthAndBeyondCarousel slides={social.heroSlides} />
          </div>

          <div className="mx-auto max-w-[1180px] px-6 pb-28 md:px-12 md:pb-[134px]">
            <div className="mt-8 flex flex-col items-center gap-1 text-center">
              <p className="text-[14px] text-ink-mut">{social.caption.client}</p>
              <p className="text-[14px] text-ink-mut">
                {social.caption.label} · {social.caption.year}
              </p>
              <Link
                href={social.link.href}
                className="mt-2 text-[16px] text-ink underline underline-offset-[3px] hover:text-ink-mut"
              >
                {social.link.label}
              </Link>
            </div>

            <div className="mt-10 flex gap-4 overflow-x-auto overflow-y-hidden">
              {social.remainingSlides.map((slide) => (
                <div key={slide.src} className="h-32 w-auto shrink-0 md:h-40">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    sizes="120px"
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-paper">
          <Reveal className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
            <IndexLabel>{visualLanguage.number}</IndexLabel>
            <h2 className="mt-3 font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
              {visualLanguage.heading}
            </h2>
            <div className="mt-6 flex max-w-2xl flex-col gap-4">
              {visualLanguage.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[16px] leading-[1.65] text-ink-mut md:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-line bg-paper-2">
          <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-28 md:px-12 md:py-[134px]">
            <div className="flex flex-col gap-2">
              <IndexLabel>{result.number}</IndexLabel>
              <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
                {result.heading}
              </h2>
            </div>
            <div className="flex max-w-2xl flex-col gap-4">
              {result.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[16px] leading-[1.65] text-ink-mut md:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-line bg-paper">
          <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-12 md:py-24">
            <Link href={nextProject.href} className="group flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mut md:text-[12px]">
                {nextProject.label}
              </span>
              <span className="font-display text-[28px] font-semibold tracking-[-0.02em] underline decoration-transparent underline-offset-[6px] transition-colors group-hover:decoration-ink md:text-[40px]">
                {nextProject.client} →
              </span>
              <span className="text-[16px] text-ink-mut md:text-[18px]">{nextProject.role}</span>
            </Link>
            <Link
              href={backLink.href}
              className="text-[16px] text-ink underline underline-offset-[3px] hover:text-ink-mut"
            >
              {backLink.label}
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer variant="home" />
    </>
  )
}
