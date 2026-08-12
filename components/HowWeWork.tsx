import Reveal from './Reveal'
import { howWeWork } from '@/content/site'

// Homepage's own "How We Work" — a separate, independently-authored
// component from /engineering's (components/engineering/HowWeWork.tsx).
// Same canonical content (content/site.ts), deliberately compact spacing
// and no per-stage decorative motifs, so this reads as a shorter, quieter
// beat than the engineering page's fuller treatment, and as a distinct
// chapter from the "Based in Srinagar" section immediately after it — no
// three-column layout, no vertical dividers, no shared spacing rhythm.
export default function HowWeWork() {
  const { eyebrow, statement, body, stages } = howWeWork

  return (
    <section id="how-we-work" className="border-t border-line bg-paper">
      <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-24 md:px-12 md:py-32 lg:flex-row lg:items-start lg:gap-16">
        {/* Left — eyebrow, statement, supporting copy. ~32% on desktop. */}
        <div className="flex flex-col gap-5 lg:w-[32%] lg:shrink-0">
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-mut md:text-[14px]">
            {eyebrow}
          </span>
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[36px]">
            {statement}
          </h2>
          <p className="max-w-sm text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">{body}</p>
        </div>

        {/* Right — four-stage timeline, one continuous progression. ~68% on desktop. */}
        <div className="flex-1">
          {/* Desktop / tablet — horizontal hairline timeline, ≥768px. */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-6 md:gap-8">
              {stages.map((stage) => (
                <div key={stage.number} className="flex flex-col gap-2">
                  <span className="font-display text-[24px] font-semibold tracking-[-0.02em] text-ink md:text-[30px]">
                    {stage.number}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-mut">
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative my-5 h-2">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
              <div className="absolute inset-0 grid grid-cols-4 gap-6 md:gap-8">
                {stages.map((stage) => (
                  <div key={stage.number} className="relative">
                    <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 md:gap-8">
              {stages.map((stage) => (
                <p key={stage.number} className="text-[15px] leading-[1.65] text-ink-mut">
                  {stage.description}
                </p>
              ))}
            </div>
          </div>

          {/* Mobile — vertical timeline, <768px. Not a shrunk desktop copy. */}
          <div className="flex flex-col md:hidden">
            {stages.map((stage, index) => (
              <div key={stage.number} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ink" />
                  {index < stages.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-line" aria-hidden />
                  )}
                </div>
                <div
                  className={
                    index < stages.length - 1 ? 'flex flex-col gap-2 pb-8' : 'flex flex-col gap-2'
                  }
                >
                  <span className="font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
                    {stage.number}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-mut">
                    {stage.name}
                  </span>
                  <p className="mt-1 text-[16px] leading-[1.65] text-ink-mut">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
