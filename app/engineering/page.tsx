import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Capabilities from '@/components/engineering/Capabilities'
import WhatWeDo from '@/components/engineering/WhatWeDo'
import HowWeWork from '@/components/engineering/HowWeWork'
import Stack from '@/components/engineering/Stack'
import Team from '@/components/engineering/Team'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { engineeringHero } from '@/content/site'

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
        <Stack />
        <Team />
        <CTA variant="engineering" />
      </main>
      <Footer variant="engineering" />
    </>
  )
}
