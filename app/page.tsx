import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Showcase from '@/components/Showcase'
import Work from '@/components/Work'
import HowWeWork from '@/components/HowWeWork'
import About from '@/components/About'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { homeHero } from '@/content/site'

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
        <HowWeWork />
        <About />
        <CTA variant="home" />
      </main>
      <Footer variant="home" />
    </>
  )
}
