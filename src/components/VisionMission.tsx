import { motion } from 'framer-motion'
import { Eye, Target } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { IMG } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function VisionMission() {
  const { t, isRTL } = useLang()
  const v = t.vm
  const cards = [
    { icon: Eye, title: v.visionTitle, text: v.visionText, bg: 'bg-forest text-white', accent: 'text-lime', n: '01' },
    { icon: Target, title: v.missionTitle, text: v.missionText, bg: 'bg-charcoal text-white', accent: 'text-sage', n: '02' },
  ]
  return (
    <section className="relative bg-beige/40 py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHeading eyebrow={v.eyebrow} title={v.title} dark />
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.15} y={60}>
              <motion.article
                whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className={`group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[2rem] p-8 md:p-12 ${c.bg}`}
              >
                <img src={IMG.garden} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 mix-blend-luminosity transition-all duration-[1200ms] group-hover:scale-100 group-hover:opacity-[0.22]" />
                <div aria-hidden className="absolute -end-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-lime/25 to-transparent blur-2xl transition-transform duration-700 group-hover:scale-125" />
                <div className="relative flex items-start justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/20 bg-white/10 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <c.icon className={c.accent} size={30} strokeWidth={1.5} />
                  </div>
                  <span className="text-7xl font-extrabold leading-none outline-text">{c.n}</span>
                </div>
                <div className="relative">
                  <h3 className="mb-5 text-5xl font-extrabold tracking-tight md:text-7xl">{isRTL ? <span className={c.accent}>{c.title}</span> : <><span className={c.accent}>{c.title.charAt(0)}</span>{c.title.slice(1)}</>}</h3>
                  <p className="max-w-xl text-lg leading-relaxed text-white/80">{c.text}</p>
                  <span className="mt-8 block h-1 w-16 bg-lime transition-all duration-700 group-hover:w-40" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
