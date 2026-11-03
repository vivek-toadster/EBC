import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { equipmentCounts, equipmentIcons } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Counter from './ui/Counter'
import ScrollDepthCard from './ui/ScrollDepthCard'

export default function Equipment() {
  const { t, isRTL } = useLang()
  const e = t.equipment
  const track = useRef<HTMLDivElement>(null)
  const slide = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const amount = Math.min(420, el.clientWidth * 0.8) * dir * (isRTL ? -1 : 1)
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-offwhite py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-3xl">
            <SectionHeading eyebrow={e.eyebrow} title={e.title} size="xl" dark />
            <Reveal delay={0.2}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{e.intro}</p></Reveal>
          </div>
          <div className="flex gap-3">
            <button onClick={() => slide(-1)} aria-label="Previous" className="grid h-14 w-14 place-items-center rounded-full border border-forest/25 text-forest transition hover:bg-forest hover:text-white"><ArrowLeft size={20} className="rtl:-scale-x-100" /></button>
            <button onClick={() => slide(1)} aria-label="Next" className="grid h-14 w-14 place-items-center rounded-full bg-forest text-white transition hover:bg-charcoal"><ArrowRight size={20} className="rtl:-scale-x-100" /></button>
          </div>
        </div>
      </div>

      <div ref={track} className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-10" data-lenis-prevent-wheel>
        {e.items.map((name, i) => {
          const Icon = equipmentIcons[i]
          return (
            <ScrollDepthCard key={name} direction={i % 2 === 0 ? 1 : -1} className="shrink-0 snap-start">
            <motion.article whileHover={{ y: -10 }}
              className="group relative flex h-[420px] w-[280px] flex-col justify-between overflow-hidden rounded-[2rem] bg-forest p-7 text-white md:w-[340px]">
              <span aria-hidden className="absolute -end-4 top-8 text-[13rem] font-extrabold leading-none outline-text opacity-70 transition-opacity group-hover:opacity-100">{equipmentCounts[i]}</span>
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-lime transition-all duration-500 group-hover:bg-lime group-hover:text-forest"><Icon size={26} strokeWidth={1.6} /></div>
              <div className="relative">
                <div className="text-7xl font-extrabold text-lime"><Counter value={equipmentCounts[i]} duration={1.4} /></div>
                <h3 className="mt-2 text-xl font-bold">{name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/55">{e.units}</p>
                <span className="mt-5 block h-1 w-12 bg-lime transition-all duration-700 group-hover:w-full" />
              </div>
            </motion.article>
            </ScrollDepthCard>
          )
        })}
      </div>
    </section>
  )
}
