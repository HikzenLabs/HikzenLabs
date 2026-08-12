'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { showcase } from '@/content/site'
import Reveal from './Reveal'

// Before/after must occupy the identical box and request identically-sized
// sources — they're stacked and clip-path wiped between one another, so any
// mismatch in requested width or crop behaviour reads as a jump cut. Shared
// between both <Image> elements below; object-contain (never cover) so nothing
// crops even if a future asset swap doesn't share the exact same aspect ratio.
const FRAME_SIZES = '(min-width: 768px) 450px, 90vw'

// The one signature animated moment on the site — BUILD.md §8. Everything
// else gets the plain fade-up from <Reveal>; this gets a dedicated pinned
// scroll-scrub wipe on desktop and a draggable divider on mobile, built via
// gsap.matchMedia() so the desktop timeline never exists on a phone.
//
// The base markup (no JS) is just two stacked, fully visible images — the
// accessibility floor in BUILD.md §10. `motion-reduce:` puts them side by
// side statically for prefers-reduced-motion, in pure CSS, independent of
// whether JS runs at all. JS only ever progressively enhances on top of
// that: it never has to un-hide anything for a user who can't run it.
//
// The heading lives outside the pinned trigger. Pinning holds its trigger
// element fixed at its scroll position for the whole scrub — it doesn't let
// you scroll through content taller than the viewport, it just freezes
// whatever's there. So `pinTargetRef` (frame + caption + thumbnails) is
// explicitly capped to fit one viewport; the heading scrolls past normally
// before the pin ever engages.
export default function Showcase() {
  const pinTargetRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const beforeRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLDivElement>(null)
  const beforeLabelRef = useRef<HTMLSpanElement>(null)
  const afterLabelRef = useRef<HTMLSpanElement>(null)
  const pagesRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const before = beforeRef.current
    const after = afterRef.current
    const seam = seamRef.current
    if (!frame || !before || !after || !seam) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions as {
          isDesktop: boolean
          isMobile: boolean
        }

        // Lift both images out of normal flow into a stacked overlay frame.
        // All gsap.set calls here are auto-reverted by matchMedia when the
        // breakpoint or reduced-motion state changes.
        gsap.set([before, after], { position: 'absolute', inset: 0 })
        gsap.set(after, { clipPath: 'inset(0% 100% 0% 0%)' })
        gsap.set(seam, { display: 'block', left: '0%' })

        if (isDesktop) {
          // Height-driven, not width-driven: caps the whole pinned scene to
          // a comfortable fraction of the viewport so it — and the seam, and
          // the thumbnails fanning in at the end — actually stay visible for
          // the whole pin instead of running off the bottom of the screen.
          gsap.set(frame, {
            aspectRatio: '3 / 4',
            height: 'min(52vh, 600px)',
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
          })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinTargetRef.current,
              start: 'top top',
              end: '+=180%',
              pin: true,
              scrub: 1,
            },
          })

          // Clip-path only — never width/left — so this stays on the compositor.
          tl.to(after, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 0.55 }, 0)
          tl.to(seam, { left: '100%', ease: 'none', duration: 0.55 }, 0)
          tl.to(beforeLabelRef.current, { opacity: 0, ease: 'none', duration: 0.15 }, 0)
          tl.to(afterLabelRef.current, { opacity: 1, ease: 'none', duration: 0.15 }, 0.45)

          const pages = pagesRef.current
          if (pages) {
            gsap.set(pages.children, { y: 40, opacity: 0 })
            tl.to(
              pages.children,
              { y: 0, opacity: 1, ease: 'none', duration: 0.19, stagger: 0.08 },
              0.65,
            )
          }

          const onLoad = () => ScrollTrigger.refresh()
          window.addEventListener('load', onLoad)
          return () => window.removeEventListener('load', onLoad)
        }

        if (isMobile) {
          // Not pinned, so no viewport-fit constraint needed — width-driven
          // sizing (fills the column, height follows the 3:4 ratio) is fine.
          gsap.set(frame, { aspectRatio: '3 / 4' })

          let dragging = false

          const setSplit = (percent: number) => {
            const clamped = Math.min(100, Math.max(0, percent))
            gsap.set(after, { clipPath: `inset(0% ${100 - clamped}% 0% 0%)` })
            gsap.set(seam, { left: `${clamped}%` })
          }

          setSplit(50)

          const percentFromEvent = (clientX: number) => {
            const rect = frame.getBoundingClientRect()
            return ((clientX - rect.left) / rect.width) * 100
          }

          const onPointerDown = (event: PointerEvent) => {
            dragging = true
            setSplit(percentFromEvent(event.clientX))
          }
          const onPointerMove = (event: PointerEvent) => {
            if (!dragging) return
            setSplit(percentFromEvent(event.clientX))
          }
          const onPointerUp = () => {
            dragging = false
          }

          frame.addEventListener('pointerdown', onPointerDown)
          window.addEventListener('pointermove', onPointerMove)
          window.addEventListener('pointerup', onPointerUp)

          return () => {
            frame.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
          }
        }

        return undefined
      },
    )

    return () => mm.revert()
  }, [])

  return (
    <section className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
        <Reveal className="flex flex-col gap-3">
          <span className="text-[13px] uppercase tracking-wide text-ink-mut md:text-[14px]">
            {showcase.eyebrow}
          </span>
          <h2 className="max-w-xl font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
            {showcase.heading}
          </h2>
        </Reveal>

        <div ref={pinTargetRef} className="mt-10 md:mt-12">
          <div
            ref={frameRef}
            className="relative flex flex-col gap-2 motion-reduce:grid motion-reduce:grid-cols-2 motion-reduce:gap-4"
          >
            <div ref={beforeRef} className="relative aspect-[3/4]">
              <Image
                src={showcase.before.src}
                alt={showcase.before.alt}
                width={showcase.before.width}
                height={showcase.before.height}
                sizes={FRAME_SIZES}
                className="h-full w-full bg-paper object-contain"
              />
              <span
                ref={beforeLabelRef}
                className="absolute left-4 top-4 bg-paper px-3 py-1 text-[14px] font-medium text-ink"
              >
                {showcase.beforeLabel}
              </span>
            </div>
            <div ref={afterRef} className="relative aspect-[3/4]">
              <Image
                src={showcase.after.src}
                alt={showcase.after.alt}
                width={showcase.after.width}
                height={showcase.after.height}
                sizes={FRAME_SIZES}
                priority
                className="h-full w-full bg-paper object-contain"
              />
              <span
                ref={afterLabelRef}
                className="absolute left-4 top-4 bg-paper px-3 py-1 text-[14px] font-medium text-ink"
              >
                {showcase.afterLabel}
              </span>
            </div>
            {/* Wipe seam (desktop) / draggable divider (mobile). Hidden until
                JS enhances the layout — decorative, not part of the no-JS or
                reduced-motion fallback. */}
            <div
              ref={seamRef}
              aria-hidden
              className="absolute top-0 hidden h-full w-[2px] -translate-x-1/2 cursor-ew-resize bg-ink touch-none"
            >
              {/* The "visible handle" BUILD.md §8 asks for on the mobile draggable divider. */}
              <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink md:hidden" />
            </div>
          </div>

          <p className="mt-6 text-[16px] text-ink-mut md:text-[18px]">{showcase.caption}</p>

          <div ref={pagesRef} className="mt-8 flex gap-4 overflow-x-auto overflow-y-hidden">
            {showcase.pages.map((page) => (
              <div key={page.src} className="h-32 w-auto shrink-0 md:h-40">
                <Image
                  src={page.src}
                  alt={page.alt}
                  width={page.width}
                  height={page.height}
                  sizes="120px"
                  className="h-full w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
