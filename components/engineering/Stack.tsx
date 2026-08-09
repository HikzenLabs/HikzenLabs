'use client'

import { CSSProperties } from 'react'

type Capability = {
  title: string
  desc: string
  tags: string[]
}

const capabilities: Capability[] = [
  {
    title: 'Frontend experience',
    desc: 'Interfaces that feel fast and get out of the way, on any device.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'JavaScript', 'MUI'],
  },
  {
    title: 'Backend & APIs',
    desc: 'Systems that hold up under real traffic, not just the demo.',
    tags: ["Java", 'Node', 'Python', 'Prisma', "Supabase"],
  },
  {
    title: 'Data & infrastructure',
    desc: 'Your data stored safely, queried fast, and backed up without you thinking about it.',
    tags: ['Postgres', "MySql", 'AWS', 'Vercel'],
  },
  {
    title: 'SEO & performance',
    desc: 'Found on Google, loads in under a second, ranks on its own merit.',
    tags: ['Core web vitals', 'Structured data', 'Edge caching', 'Analytics'],
  },
]

const colors = {
  page: '#f4f1ea',
  eyebrow: '#8a877e',
  heading: '#1a1a1a',
  subhead: '#6b685f',
  line: 'rgba(26,26,26,0.1)',
  cardTitle: '#1a1a1a',
  cardDesc: '#6b685f',
  tagBg: 'rgba(26,26,26,0.05)',
  tagText: '#4a473f',
}

export default function Stack() {
  return (
    <section style={{ backgroundColor: colors.page, padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p
          style={{
            color: colors.eyebrow,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 12,
          }}
        >
          What you get
        </p>
        <h2
          style={{
            color: colors.heading,
            fontWeight: 700,
            fontSize: 'clamp(28px, 5vw, 44px)',
            marginBottom: 16,
          }}
        >
          Everything the build needs, nothing it does not.
        </h2>
        <p
          style={{
            color: colors.subhead,
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: 560,
            marginBottom: 48,
          }}
        >
          A small set of tools we know well, mapped to what they actually
          do for you.
        </p>

        <div
          className="cap-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 1,
            backgroundColor: colors.line,
            border: `1px solid ${colors.line}`,
          }}
        >
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.title} cap={cap} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .cap-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}

function CapabilityCard({ cap }: { cap: Capability }) {
  const cardStyle: CSSProperties = {
    backgroundColor: colors.page,
    padding: '32px 28px',
  }

  return (
    <div style={cardStyle}>
      <h3
        style={{
          fontSize: 19,
          fontWeight: 600,
          color: colors.cardTitle,
          marginBottom: 10,
        }}
      >
        {cap.title}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: colors.cardDesc,
          marginBottom: 20,
        }}
      >
        {cap.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {cap.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: colors.tagText,
              backgroundColor: colors.tagBg,
              borderRadius: 4,
              padding: '4px 10px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}