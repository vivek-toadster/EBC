import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { whyIcons } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function WhyChoose() {
  const { t } = useLang()
  const w = t.why
  const [hover, setHover] = useState<number | null>(null)
  return (
    <section className="relative isolate overflow-hidden bg-charcoal py-24 text-white md:py-36">
      <div aria-hidden className="absolute -start-40 top-20 -z-10 h-[520px] w-[520px] rounded-full border border-white/[0.06]" />
      <div aria-hidden className="absolute -start-20 top-40 -z-10 h-[360px] w-[360px] animate-float rounded-full border border-lime/20" />
      <div aria-hidden className="absolute -end-32 bottom-10 -z-10 h-[420px] w-[420px] rounded-full bg-forest/40 blur-3xl" />

      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow={w.eyebrow} title={w.title} dark size="lg" />
            <Reveal delay={0.3}><div className="mt-10 h-1 w-24 bg-lime" /></Reveal>
          </div>
        </div>
        <ul className="lg:col-span-7" onMouseLeave={() => setHover(null)}>
          {w.items.map((it, i) => {
            const Icon = whyIcons[i]
            return (
              <Reveal key={it.title} delay={i * 0.05} y={30}>
                <li onMouseEnter={() => setHover(i)}
                  className={`group relative flex gap-5 border-t border-white/10 py-7 transition-opacity duration-500 md:gap-8 ${hover !== null && hover !== i ? 'opacity-40' : 'opacity-100'}`}>
                  <motion.span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-lime rtl:origin-right" initial={{ scaleX: 0 }} animate={{ scaleX: hover === i ? 1 : 0 }} transition={{ duration: 0.6 }} />
                  <span className="w-10 pt-2 text-sm font-bold text-lime md:w-14">0{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold tracking-tight transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 md:text-4xl">{it.title}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-white/60">{it.text}</p>
                  </div>
                  <Icon className="mt-1 hidden shrink-0 text-white/30 transition-all duration-500 group-hover:rotate-12 group-hover:text-lime md:block" size={36} strokeWidth={1.3} />
                </li>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
