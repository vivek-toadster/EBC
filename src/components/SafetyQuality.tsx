import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { IMG, safetyIcons } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import ParallaxImage from './ui/ParallaxImage'

export default function SafetyQuality() {
  const { t, sign } = useLang()
  const s = t.safety
  return (
    <section className="relative overflow-hidden bg-offwhite">
      <div className="grid lg:grid-cols-2">
        <Reveal x={-50 * sign} y={0} className="relative min-h-[520px] lg:min-h-[860px]">
          <ParallaxImage src={IMG.safety} className="absolute inset-0" amount={8} position="center 20%" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
          <div className="absolute -end-0 top-24 hidden h-8 w-48 bg-lime lg:block" />
          {/* animated gauge */}
          <div className="absolute bottom-8 start-8 rounded-2xl bg-charcoal/70 p-5 backdrop-blur-md">
            <svg width="150" height="86" viewBox="0 0 150 86" aria-hidden>
              <path d="M10 76 A65 65 0 0 1 140 76" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" strokeLinecap="round" />
              <motion.path d="M10 76 A65 65 0 0 1 140 76" fill="none" stroke="#C9DB44" strokeWidth="10" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.92 }} viewport={{ once: true }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} />
              <motion.line x1="75" y1="76" x2="75" y2="26" stroke="#fff" strokeWidth="3" strokeLinecap="round" style={{ originX: '75px', originY: '76px' }}
                initial={{ rotate: -80 }} whileInView={{ rotate: 62 }} viewport={{ once: true }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} />
              <circle cx="75" cy="76" r="6" fill="#fff" />
            </svg>
            <p className="mt-1 text-center text-xs font-bold uppercase tracking-[0.25em] text-white">{s.eyebrow}</p>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center px-5 py-20 md:px-14 lg:px-20">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} size="xl" dark />
          <Reveal delay={0.1}><p className="mt-8 text-lg font-medium leading-relaxed text-white/95">{s.p1}</p></Reveal>
          <Reveal delay={0.15}><p className="mt-4 leading-relaxed text-white/75">{s.p2}</p></Reveal>
          <Reveal delay={0.2}><p className="mt-4 border-s-4 border-lime ps-4 font-bold text-white">{s.p3}</p></Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {s.points.map((p, i) => {
              const Icon = safetyIcons[i]
              return (
                <motion.li key={p}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7 }}
                  whileHover={{ x: 6 * sign }}
                  className="group flex items-center gap-4 rounded-2xl border border-forest/10 bg-white p-4 shadow-sm transition-colors hover:border-forest hover:bg-forest hover:text-white">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest/10 text-forest transition-colors group-hover:bg-lime group-hover:text-forest"><Icon size={20} strokeWidth={1.7} /></span>
                  <span className="text-sm font-bold">{p}</span>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
