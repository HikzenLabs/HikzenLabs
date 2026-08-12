import { ImageResponse } from 'next/og'
import { loadOgFonts } from '@/lib/og-fonts'
import { brand, homeHero } from '@/content/site'

export const alt = `${brand.name} — ${homeHero.heading}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fonts = await loadOgFonts()
  // Satori chokes on a `fontFamily` key whose value is `undefined` (vs. the
  // key being absent entirely), so these are only spread in when a font
  // actually loaded — same reason `fonts` itself is passed conditionally below.
  const display = fonts.length ? { fontFamily: 'Bricolage Grotesque' } : {}
  const body = fonts.length ? { fontFamily: 'Newsreader' } : {}

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 28,
          padding: 80,
          backgroundColor: '#FBFAF6',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            fontWeight: 600,
            color: '#5A615C',
            letterSpacing: -0.5,
            ...display,
          }}
        >
          {brand.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: -1,
            maxWidth: 980,
            color: '#141917',
            ...display,
          }}
        >
          {homeHero.heading}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            maxWidth: 860,
            color: '#5A615C',
            ...body,
          }}
        >
          {homeHero.body}
        </div>
      </div>
    ),
    fonts.length ? { ...size, fonts } : { ...size },
  )
}
