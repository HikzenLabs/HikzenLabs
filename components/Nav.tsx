'use client'

import { useState } from 'react'
import Link from 'next/link'
import { nav } from '@/content/site'
import Logo from './Logo'

interface NavProps {
  variant: 'home' | 'engineering'
}

export default function Nav({ variant }: NavProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (variant === 'engineering') {
    const { homeLink, cta } = nav.engineering
    return (
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-5 md:px-12">
          <Link href={homeLink.href}>
            <Logo variant="light" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-6 font-mono text-[13px] uppercase tracking-wide">
            <Link href={homeLink.href} className="text-ink-mut hover:text-ink">
              {homeLink.label}
            </Link>
            <Link
              href={cta.href}
              className="inline-flex items-center rounded bg-ink px-4 py-2 text-[13px] font-medium normal-case text-paper hover:bg-ink-hover"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </header>
    )
  }

  const { links, studioLink, cta } = nav.home
  return (
    <header className="relative border-b border-line">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/">
          <Logo variant="light" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink-mut hover:text-ink">
              {link.label}
            </Link>
          ))}
          <Link href={studioLink.href} className="text-ink-mut hover:text-ink">
            {studioLink.label}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA */}
          <Link
            href={cta.href}
            className="inline-flex items-center rounded bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-hover"
          >
            {cta.label}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-ink transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-line bg-paper px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-ink-mut hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={studioLink.href}
              onClick={() => setIsOpen(false)}
              className="text-lg text-ink-mut hover:text-ink"
            >
              {studioLink.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )

  
}