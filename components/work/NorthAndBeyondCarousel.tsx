'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ImageAsset } from '@/content/site'

interface NorthAndBeyondCarouselProps {
  slides: ImageAsset[]
  /** Index of the slide that starts centred and gets `priority`. */
  initialIndex?: number
}

const SIZES = '(min-width: 768px) 400px, 78vw'

// No GSAP here — BUILD.md §2 scopes GSAP to the Showcase only. Depth comes
// from scale + opacity + z-index, never a shadow or rotation — BRAND.md bans
// shadows outright, and the reference composition reads fine without either.
//
// Reduced motion is handled in pure CSS (`motion-reduce:` variants), not a
// JS media-query branch, so there's no post-hydration flash: side slides
// collapse onto the centre position at opacity-0, transitions are instant,
// and switching the active slide becomes a plain state change.
export default function NorthAndBeyondCarousel({
  slides,
  initialIndex = 1,
}: NorthAndBeyondCarouselProps) {
  const [centerIndex, setCenterIndex] = useState(initialIndex)
  const count = slides.length
  const leftIndex = (centerIndex - 1 + count) % count
  const rightIndex = (centerIndex + 1) % count

  const goPrev = () => setCenterIndex(leftIndex)
  const goNext = () => setCenterIndex(rightIndex)

  const roleClasses = (role: 'center' | 'left' | 'right') => {
    const base =
      'absolute left-1/2 top-1/2 w-[62%] -translate-y-1/2 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:duration-0'
    if (role === 'center') {
      return `${base} z-30 translate-x-[-50%] scale-100 opacity-100`
    }
    if (role === 'left') {
      return `${base} z-10 translate-x-[-84%] scale-[0.86] opacity-80 motion-reduce:translate-x-[-50%] motion-reduce:scale-100 motion-reduce:opacity-0`
    }
    return `${base} z-10 translate-x-[-16%] scale-[0.86] opacity-80 motion-reduce:translate-x-[-50%] motion-reduce:scale-100 motion-reduce:opacity-0`
  }

  return (
    <div className="bg-paper py-8 md:py-10">
      {/* Desktop / tablet — layered composition, clickable side slides. */}
      <div className="relative mx-auto hidden h-[440px] w-full max-w-[560px] md:block lg:h-[500px] lg:max-w-[640px]">
        {slides.map((slide, index) => {
          const role =
            index === centerIndex ? 'center' : index === leftIndex ? 'left' : 'right'
          const isSide = role !== 'center'

          const image = (
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              sizes={SIZES}
              priority={index === initialIndex}
              className="h-auto w-full object-contain"
            />
          )

          if (isSide) {
            return (
              <button
                key={slide.src}
                type="button"
                onClick={role === 'left' ? goPrev : goNext}
                aria-label={
                  role === 'left'
                    ? 'View previous North & Beyond carousel slide'
                    : 'View next North & Beyond carousel slide'
                }
                className={roleClasses(role)}
              >
                {image}
              </button>
            )
          }

          return (
            <div key={slide.src} className={roleClasses(role)}>
              {image}
            </div>
          )
        })}
      </div>

      {/* Minimal position control — text only, no icon buttons. */}
      <div className="mt-6 hidden items-center justify-center gap-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-mut md:flex">
        <button
          type="button"
          onClick={goPrev}
          aria-label="View previous North & Beyond carousel slide"
          className="hover:text-ink hover:underline hover:underline-offset-[3px]"
        >
          ← Previous
        </button>
        <span>
          {centerIndex + 1} / {count}
        </span>
        <button
          type="button"
          onClick={goNext}
          aria-label="View next North & Beyond carousel slide"
          className="hover:text-ink hover:underline hover:underline-offset-[3px]"
        >
          Next →
        </button>
      </div>

      {/* Mobile — native horizontal scroll-snap, no JS, no scroll-jacking.
          Vertical page scroll is untouched; this only intercepts horizontal
          gesture inside its own bounded, non-viewport-height container. */}
      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:hidden">
        {slides.map((slide, index) => (
          <div key={slide.src} className="w-[78%] shrink-0 snap-center">
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              sizes={SIZES}
              priority={index === initialIndex}
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
