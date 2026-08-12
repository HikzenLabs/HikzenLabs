import Link from 'next/link'
import Reveal from './Reveal'
import { homeCta, engineeringCta, brand } from '@/content/site'

interface CTAProps {
  variant: 'home' | 'engineering'
}

export default function CTA({ variant }: CTAProps) {
  const isEngineering = variant === 'engineering'
  const content = isEngineering ? engineeringCta : homeCta

  return (
    <section id={isEngineering ? undefined : 'contact'} className="border-t border-line bg-paper">
      <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-28 text-center md:px-12 md:py-[134px]">
        <h2 className="mx-auto max-w-xl font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
          {content.heading}
        </h2>
        <p className="mx-auto max-w-md text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">
          {content.body}
        </p>
        <div className="mx-auto flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={content.primaryCta.href}
            className="inline-flex items-center rounded bg-ink px-6 py-3 text-[16px] font-medium text-paper hover:bg-ink-hover"
          >
            {content.primaryCta.label}
          </Link>
          <span className="text-[16px] text-ink-mut">
            <a
              href={content.secondaryCta.href}
              className="text-ink underline underline-offset-[3px] hover:text-ink-mut"
            >
              {content.secondaryCta.label}
            </a>
            {!isEngineering && (
              <>
                {' · '}
                {brand.location}
              </>
            )}
          </span>
        </div>
      </Reveal>
    </section>
  )
}
