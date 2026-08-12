import Link from 'next/link'
import Reveal from './Reveal'
import { homeHero, engineeringHero } from '@/content/site'

interface HeroProps {
  variant: 'home' | 'engineering'
}

export default function Hero({ variant }: HeroProps) {
  const content = variant === 'engineering' ? engineeringHero : homeHero

  return (
    <section className="bg-paper">
      <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-28 md:px-12 md:py-[179px]">
        <h1 className="max-w-2xl font-display text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[60px]">
          {content.heading}
        </h1>
        <p className="max-w-xl text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">
          {content.body}
        </p>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href={content.primaryCta.href}
            className="inline-flex items-center rounded bg-ink px-6 py-3 text-[16px] font-medium text-paper hover:bg-ink-hover"
          >
            {content.primaryCta.label}
          </Link>
          <Link
            href={content.secondaryCta.href}
            className="inline-flex items-center text-[16px] text-ink underline underline-offset-[3px] hover:text-ink-mut"
          >
            {content.secondaryCta.label}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
