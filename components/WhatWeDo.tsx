'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Websites that book',
    desc: 'Sites people trust enough to book from. Booking forms, catalogues, online stores, and the systems behind them.',
    tag: 'From ₹25,000',
    imgWeb: true,
  },
  {
    num: '02',
    title: 'Apps & custom software',
    desc: 'Mobile apps and internal tools built for your workflow. No off-the-shelf bloat — exactly what your business needs.',
    tag: 'Custom builds',
    imgPattern: true,
  },
  {
    num: '03',
    title: 'AI integration',
    desc: 'Chatbots, smart enquiry routing, auto-replies, and content tools. AI that actually saves you time, not creates more work.',
    tag: 'Smart features',
    imgAi: true,
  },
  {
    num: '04',
    title: 'Travel itineraries & print',
    desc: 'The document system: itineraries, proposals, voucher packs, and Instagram carousels — branded templates your team refills.',
    tag: 'From ₹3,000',
    imgSaffron: true,
  },
  {
    num: '05',
    title: 'UI/UX & product design',
    desc: 'Interfaces that don\'t need a manual. Design systems, dashboards, and brand identity that holds together across every touchpoint.',
    tag: 'Design systems',
    imgUi: true,
  },
  {
    num: '06',
    title: 'Product photography',
    desc: 'Products, spaces, and process — shot properly. Enough images for your website, Instagram, and listings from one session.',
    tag: 'From ₹15,000',
    imgWalnut: true,
  },
  {
    num: '07',
    title: 'Backend & infrastructure',
    desc: 'Databases, APIs, payment gateways, and hosting. The parts users never see but your business can\'t run without.',
    tag: 'Backend',
    imgBackend: true,
  },
  {
    num: '08',
    title: 'AI & automations',
    desc: 'Workflows that run while you sleep. Auto-enquiry routing, order alerts, scheduled posts, and follow-ups — no manual work.',
    tag: 'Automate',
    imgAutomation: true,
  },
  {
    num: '09',
    title: 'Engineering',
    desc: 'Complex problems solved simply. System architecture, performance, security, and the technical decisions that last.',
    tag: 'Engineering',
    imgEngineering: true,
  },
  {
    num: '10',
    title: 'Everything, together',
    desc: 'Shoot, build, launch. One team, one timeline, one invoice. Most clients start with one thing and come back for the rest.',
    tag: 'From ₹55,000',
    imgBundle: true,
  },
]

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-paper-2">
      <div className="h-screen flex items-center overflow-hidden">
        {/* Section label */}
        <div className="absolute top-12 left-6 md:left-12 z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            What we do
          </h2>
          <p className="text-ink-mut text-sm mt-2">
            Ten services. One team. One invoice.
          </p>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-8 pl-6 md:pl-12 pr-[40vw] will-change-transform"
        >
          {services.map((s) => (
            <div
              key={s.num}
              className="flex-shrink-0 w-[320px] md:w-[380px] h-[420px] md:h-[480px] rounded border border-line bg-paper p-8 flex flex-col relative overflow-hidden hover:border-ink transition-colors duration-300"
            >
              {/* Number */}
              <span className="font-display text-6xl md:text-7xl font-bold text-ink/10 leading-none mb-6">
                {s.num}
              </span>

              {/* Image area */}
              <div className="relative w-full h-44 md:h-48 rounded mb-6 overflow-hidden bg-paper-2 border border-line">
                {/* Pashmina weave */}
                {s.imgPattern && (
                  <div className="absolute inset-0 opacity-40" style={{
                    background: `repeating-linear-gradient(90deg, transparent, transparent 10px, var(--line) 10px, var(--line) 11px),
                                 repeating-linear-gradient(0deg, transparent, transparent 14px, var(--line) 14px, var(--line) 15px)`
                  }} />
                )}

                {/* Website frame */}
                {s.imgWeb && (
                  <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-24 border border-ink/20 rounded-md" />
                    <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-20 h-1 bg-ink/15 rounded-full" />
                  </>
                )}

                {/* Saffron thread → ink thread */}
                {s.imgSaffron && (
                  <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-0.5 h-[60%] bg-ink/40" />
                )}

                {/* Walnut → ink form */}
                {s.imgWalnut && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-[70px] bg-ink/15 rounded-[45%_45%_40%_40%]" />
                )}

                {/* AI nodes */}
                {s.imgAi && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-ink/50 rounded-full" />
                      {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <div
                          key={deg}
                          className="absolute top-1/2 left-1/2 w-2 h-2 bg-ink/30 rounded-full"
                          style={{
                            transform: `rotate(${deg}deg) translateX(28px) translateY(-50%)`,
                            transformOrigin: 'center',
                          }}
                        />
                      ))}
                      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="20" fill="none" stroke="var(--ink)" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="var(--ink)" strokeWidth="0.3" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* UI/UX grid */}
                {s.imgUi && (
                  <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 border border-ink/20 rounded" />
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-16 h-1 bg-ink/20 rounded-full" />
                    <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-10 h-1 bg-ink/10 rounded-full" />
                    <div className="absolute top-[48%] left-[35%] w-2 h-2 bg-ink/30 rounded-full" />
                  </>
                )}

                {/* Backend server stack */}
                {s.imgBackend && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-20 h-5 border border-ink/20 rounded flex items-center px-2 gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-ink/40" />
                        <div className="h-px flex-1 bg-ink/10" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Automation flow */}
                {s.imgAutomation && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                    <div className="w-8 h-8 border border-ink/20 rounded flex items-center justify-center text-ink/40 text-xs">In</div>
                    <div className="w-6 h-px bg-ink/20 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-ink/30" />
                    </div>
                    <div className="w-10 h-10 border border-ink/30 rounded flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-ink/40 rounded-full border-t-transparent animate-spin" />
                    </div>
                    <div className="w-6 h-px bg-ink/20 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-ink/30" />
                    </div>
                    <div className="w-8 h-8 border border-ink/20 rounded flex items-center justify-center text-ink/40 text-xs">Out</div>
                  </div>
                )}

                {/* Engineering circuit */}
                {s.imgEngineering && (
                  <div className="absolute inset-0 opacity-50">
                    <svg width="100%" height="100%" viewBox="0 0 200 160" preserveAspectRatio="none">
                      <path d="M20,80 L60,80 L60,40 L100,40" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
                      <path d="M20,100 L80,100 L80,120 L140,120" fill="none" stroke="var(--ink)" strokeWidth="0.8" opacity="0.5" />
                      <circle cx="60" cy="80" r="3" fill="var(--ink)" opacity="0.6" />
                      <circle cx="100" cy="40" r="3" fill="var(--ink)" opacity="0.6" />
                      <circle cx="80" cy="100" r="3" fill="var(--ink)" opacity="0.4" />
                    </svg>
                  </div>
                )}

                {/* Bundle all-in-one */}
                {s.imgBundle && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-8 h-10 border border-ink/20 rounded" />
                    <div className="w-6 h-px bg-ink/20" />
                    <div className="w-10 h-10 border border-ink/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-ink/30 rounded-full" />
                    </div>
                    <div className="w-6 h-px bg-ink/20" />
                    <div className="w-8 h-8 border border-ink/20 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-ink/40 rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Text */}
              <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-3">
                {s.title}
              </h3>
              <p className="text-sm md:text-[15px] text-ink-mut leading-relaxed flex-1 font-body">
                {s.desc}
              </p>

              {/* Tag — bordered, not colored */}
              <span className="inline-flex self-start mt-4 px-4 py-1.5 rounded border border-line text-xs font-medium text-ink-mut">
                {s.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs text-ink-mut uppercase tracking-widest animate-pulse">
          <span className="w-6 h-px bg-line" />
          Keep scrolling
        </div>
      </div>
    </section>
  )
}