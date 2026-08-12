import Reveal from '../Reveal'
import { stack } from '@/content/site'

// Plain type-set line, not a wall of logo badges — BUILD.md §12. Mono only
// on /engineering, per the type spec.
export default function Stack() {
  return (
    <section className="border-t border-line bg-paper-2">
      <Reveal className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
          {stack.heading}
        </h2>
        <p className="mt-6 max-w-2xl font-mono text-[14px] uppercase tracking-wide text-ink-mut md:text-[16px]">
          {stack.items.join(' · ')}
        </p>
      </Reveal>
    </section>
  )
}
