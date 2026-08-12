import Reveal from '../Reveal'
import { whatWeTakeOn } from '@/content/site'

export default function Capabilities() {
  return (
    <section className="border-t border-line bg-paper-2">
      <Reveal className="mx-auto max-w-[1180px] px-6 py-28 md:px-12 md:py-[134px]">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[40px]">
          {whatWeTakeOn.heading}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
          {whatWeTakeOn.items.map((item) => (
            <div key={item.name} className="border-t border-line pt-8">
              <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] md:text-[28px]">
                {item.name}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.65] text-ink-mut md:text-[18px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
