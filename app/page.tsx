import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Showcase from '@/components/Showcase'
import Work from '@/components/Work'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import Process from '@/components/Process'
import About from '@/components/About'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { homeHero } from '@/content/site'
import WhatWeDo from '@/components/WhatWeDo'

export const metadata: Metadata = {
  title: 'HikzenLabs — Websites, design and photography in Kashmir',
  description: homeHero.body,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HikzenLabs — Websites, design and photography in Kashmir',
    description: homeHero.body,
    url: '/',
  },
}

export default function Home() {
  return (
    <>
      <Nav variant="home" />
      <main>
        <Hero variant="home" />
        <Showcase />
        <Work />
        <WhatWeDo />
        <Pricing />
        <Process />
        <About />
        <CTA variant="home" />
      </main>
      <Footer variant="home" />
    </>
  )
}
