import Reveal from '../Reveal'
import { team } from '@/content/site'

export default function Team() {
  return (
    <section className="border-t border-line bg-paper-2">
      <Reveal className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
          {team.heading}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-12">
          {team.members.map((member) => (
            <div key={member.name} className="border-t border-line pt-8">
              <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] md:text-[28px]">
                {member.name}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">
                {member.role}
              </p>
              <div className="mt-4 flex gap-4 font-mono text-[13px] uppercase tracking-wide">
                <a
                  href={member.linkedin}
                  className="text-ink underline underline-offset-[3px] hover:text-ink-mut"
                >
                  LinkedIn
                </a>
                {member.github && (
                  <a
                    href={member.github}
                    className="text-ink underline underline-offset-[3px] hover:text-ink-mut"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
