import Reveal from '../Reveal'
import { engineeringWhatWeDo } from '@/content/site'

// Static hairline grid — same pattern as Services/Capabilities/Team. No
// pinning, no scroll-jacking, no cards, no decorative icon graphics, no
// rupee figures (BUILD.md keeps prices off /engineering entirely).
export default function WhatWeDo() {
  return (
    <section className="border-t border-line bg-paper-2">
      <Reveal className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
          {engineeringWhatWeDo.heading}
        </h2>
        <p className="mt-4 max-w-lg text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">
          {engineeringWhatWeDo.subheading}
        </p>
        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {engineeringWhatWeDo.items.map((item) => (
            <div key={item.number} className="group flex flex-col gap-3 border-t border-line pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mut group-hover:text-ink md:text-[12px]">
                {item.number}
              </span>
              <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] md:text-[22px]">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-ink-mut group-hover:text-ink">
                {item.description}
              </p>
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-mut group-hover:text-ink">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
