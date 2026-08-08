'use client'

import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'A short call to scope the work — what you need, what it\'s worth, and a fixed timeline before anything starts.',
  },
  {
    num: '02',
    title: 'Sprint & build',
    desc: 'Work happens in one-week sprints. You see progress every few days, not once at the end.',
  },
  {
    num: '03',
    title: 'Review & refine',
    desc: 'A short demo after every sprint. Feedback goes straight into the next one — no waiting for a final reveal.',
  },
  {
    num: '04',
    title: 'Launch & hand off',
    desc: 'You get the files, the logins, and a walkthrough. Everything is yours from day one.',
  },
]

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * (steps.length - 1)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          )
          setActive((prev) => (prev !== idx ? idx : prev))
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-paper">
      <div className="h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          {/* Left — step list */}
          <div>
            <p className="text-ink-mut text-sm uppercase tracking-widest mb-3">
              How we work
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4">
              Agile, in practice.
            </h2>
            <p className="text-ink-mut text-base md:text-lg leading-relaxed mb-10 max-w-md">
              No six-month roadmaps. Short sprints, visible progress, and a
              fixed scope you agreed to before we started.
            </p>

            <div className="flex flex-col gap-1">
              {steps.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  className="text-left py-4 border-t border-line first:border-t-0 md:first:border-t"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        active === i ? 'text-ink' : 'text-ink-mut/50'
                      }`}
                    >
                      {s.num}
                    </span>
                    <h3
                      className={`font-display text-lg md:text-xl font-semibold transition-all duration-300 ${
                        active === i
                          ? 'text-ink underline underline-offset-4'
                          : 'text-ink-mut'
                      }`}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p
                    className={`text-sm text-ink-mut leading-relaxed mt-2 pl-8 transition-all duration-300 overflow-hidden ${
                      active === i
                        ? 'max-h-24 opacity-100'
                        : 'max-h-0 opacity-0 md:max-h-24 md:opacity-60'
                    }`}
                  >
                    {s.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right — changing center visual */}
          <div className="relative h-[360px] md:h-[440px] rounded border border-line bg-paper-2 overflow-hidden">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                <StepVisual index={i} />
              </div>
            ))}

            {/* progress dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? 20 : 6,
                    background:
                      active === i ? 'var(--ink)' : 'var(--line)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepVisual({ index }: { index: number }) {
  switch (index) {
    // 01 — Discover: a scoping / magnifying-line motif
    case 0:
      return (
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 160 160" className="w-full h-full">
            <circle
              cx="65"
              cy="65"
              r="42"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            <circle
              cx="65"
              cy="65"
              r="28"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <line
              x1="95"
              y1="95"
              x2="140"
              y2="140"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )

    // 02 — Sprint & build: a small kanban / sprint board
    case 1:
      return (
        <div className="flex gap-3">
          {[3, 2, 4].map((rows, col) => (
            <div key={col} className="flex flex-col gap-2 w-14">
              {Array.from({ length: rows }).map((_, r) => (
                <div
                  key={r}
                  className="h-8 rounded border border-ink/20 bg-ink/[0.03]"
                  style={{ opacity: 1 - r * 0.12 }}
                />
              ))}
            </div>
          ))}
        </div>
      )

    // 03 — Review & refine: a comment / feedback loop
    case 2:
      return (
        <div className="relative w-44 h-32">
          <div className="absolute top-0 left-0 w-28 h-16 rounded border border-ink/25 bg-ink/[0.03]" />
          <div className="absolute top-4 left-4 w-16 h-1.5 rounded-full bg-ink/20" />
          <div className="absolute top-8 left-4 w-10 h-1.5 rounded-full bg-ink/10" />
          <svg
            className="absolute top-14 left-20 w-16 h-16"
            viewBox="0 0 60 60"
          >
            <path
              d="M5,30 A25,25 0 1 1 30,55"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <path
              d="M22,48 L30,55 L24,62"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )

    // 04 — Launch: an upward arrow / handoff motif
    case 3:
      return (
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <line
              x1="60"
              y1="100"
              x2="60"
              y2="25"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="2"
            />
            <path
              d="M40,45 L60,20 L80,45"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="60" cy="100" r="4" fill="var(--ink)" fillOpacity="0.4" />
          </svg>
        </div>
      )

    default:
      return null
  }
}