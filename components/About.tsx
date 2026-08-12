import Reveal from './Reveal'
import { about } from '@/content/site'

// Editorial studio/location section. Left ~42%: eyebrow, headline, a small
// hairline, supporting copy. Right ~58%: three columns (Design / Engineering
// / Based in) separated by thin vertical dividers. No cards, no icons, no
// photos — hierarchy comes from type scale, the hairlines and whitespace
// alone, per BRAND.md.
export default function About() {
  return (
    <section id="about" className="border-t border-line bg-paper-2">
      <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-12 px-6 py-28 md:px-12 md:py-[134px] lg:flex-row lg:gap-16">
        {/* Left — eyebrow, headline, hairline, supporting copy. ~42% on desktop. */}
        <div className="flex flex-col gap-6 lg:w-[42%] lg:shrink-0">
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-mut md:text-[14px]">
            {about.eyebrow}
          </span>
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[40px]">
            {about.headline}
          </h2>
          <div className="h-px w-16 bg-line" aria-hidden />
          <p className="max-w-md text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">{about.body}</p>
        </div>

        {/* Right — three columns with thin vertical dividers. ~58% on desktop. */}
        <div className="grid flex-1 grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {about.columns.map((column, index) => (
            <div
              key={column.heading}
              className={
                index === 0
                  ? 'flex flex-col gap-4'
                  : 'flex flex-col gap-4 md:border-l md:border-line md:pl-8'
              }
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-mut">
                  {column.heading}
                </span>
                <div className="h-px w-6 bg-line" aria-hidden />
              </div>
              <div className="flex flex-col gap-2">
                {column.lines.map((line) => (
                  <p key={line} className="text-[15px] leading-[1.65] text-ink-mut">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
