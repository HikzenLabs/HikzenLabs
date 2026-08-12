'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { nav } from '@/content/site'
import Logo from './Logo'

interface NavProps {
  variant: 'home' | 'engineering'
}

export default function Nav({ variant }: NavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Mobile dropdown accessibility floor — BUILD.md §12: Escape closes, focus
  // trapped, body scroll locked, outside tap closes. Only ever runs for the
  // home variant, since that's the only nav with a toggleable panel — the
  // engineering nav has no hamburger, so `isOpen` never becomes true there.
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusable = (): HTMLElement[] => {
      const toggle = toggleRef.current
      const panel = panelRef.current
      if (!toggle || !panel) return []
      return [toggle, ...Array.from(panel.querySelectorAll<HTMLElement>('a, button'))]
    }

    getFocusable()[1]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key === 'Tab') {
        const focusable = getFocusable()
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

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
            ref={toggleRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
          >
            <span className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-ink transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          className="absolute left-0 right-0 top-full border-b border-line bg-paper px-6 py-6 md:hidden"
        >
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
