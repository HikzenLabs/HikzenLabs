import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { work, workHeading } from '@/content/site'

// BUILD.md §9 — editorial, not a card grid. Per project: large image(s)
// first (full-bleed on mobile, 70%+ of the container on desktop), then mono
// index, client name, role, outcome, optional credit, one link. Multiple
// images stack vertically — no carousel. Hairline rules between projects
// only; no borders around the content itself.
export default function Work() {
  return (
    <section id="work" className="border-t border-line bg-paper-2">
      <Reveal className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
          {workHeading}
        </h2>
        <div className="mt-12 flex flex-col md:mt-16">
          {work.map((project, index) => (
            <article
              key={project.n}
              className={
                index === 0
                  ? 'flex flex-col gap-8'
                  : 'flex flex-col gap-8 border-t border-line pt-20 md:pt-[120px]'
              }
            >
              {project.images.length > 0 && (
                <div className="-mx-6 flex flex-col gap-4 md:mx-0 md:w-[72%]">
                  {project.images.map((image) => (
                    <Image
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 768px) 850px, 100vw"
                      className="h-auto w-full"
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mut md:text-[12px]">
                  {project.n}
                </span>
                <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] md:text-[28px]">
                  {project.client}
                </h3>
                <p className="text-[16px] text-ink-mut md:text-[18px]">{project.role}</p>
                <p className="text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">
                  {project.outcome}
                </p>
                {project.credit && (
                  <p className="text-[14px] text-ink-mut">{project.credit}</p>
                )}
                {(project.caseStudy || project.link) && (
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {project.caseStudy && (
                      <Link
                        href={project.caseStudy}
                        className="text-[16px] text-ink underline underline-offset-[3px] hover:text-ink-mut"
                      >
                        Read the case study →
                      </Link>
                    )}
                    {project.link && (
                      <Link
                        href={project.link.href}
                        className="text-[16px] text-ink underline underline-offset-[3px] hover:text-ink-mut"
                      >
                        {project.link.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
