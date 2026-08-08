import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Capabilities from '@/components/engineering/Capabilities'
import HowWeWork from '@/components/engineering/HowWeWork'
import Team from '@/components/engineering/Team'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { stack, engineeringHero } from '@/content/site'
import WhatWeDo from '@/components/WhatWeDo'

const description = engineeringHero.body

export const metadata: Metadata = {
  title: 'HikzenLabs — Engineering',
  description,
  alternates: { canonical: '/engineering' },
  openGraph: {
    title: 'HikzenLabs — Engineering',
    description,
    url: '/engineering',
  },
}

export default function Engineering() {
  return (
    <>
      <Nav variant="engineering" />
      <main>
        <Hero variant="engineering" />
        <Capabilities />
        <WhatWeDo />
        <HowWeWork />
        <section className="border-t border-line bg-paper">
          <Reveal className="mx-auto max-w-[1180px] px-6 py-20 md:px-12 md:py-24">
            <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
              {stack.heading}
            </h2>
            <p className="mt-4 font-mono text-[16px] text-ink md:text-[18px]">
              {stack.items.join(' · ')}
            </p>
          </Reveal>
        </section>
        <Team />
        <CTA variant="engineering" />
      </main>
      <Footer variant="engineering" />
    </>
  )
}
