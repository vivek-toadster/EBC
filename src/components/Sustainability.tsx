import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Leaf, Sprout } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { IMG } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Sustainability() {
  const { t } = useLang()
  const s = t.sustain
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const globeY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 8])

  return (
    <section id="sustainability" ref={ref} className="relative isolate overflow-hidden bg-forest py-24 text-white md:py-36">
      {/* organic floating leaves */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
        {[
          { l: '8%', t: '14%', s: 44, d: 0 }, { l: '46%', t: '8%', s: 28, d: 1.2 },
          { l: '90%', t: '40%', s: 52, d: 2.4 }, { l: '30%', t: '84%', s: 36, d: 3.6 },
        ].map((p, i) => (
          <Leaf key={i} className="absolute animate-float text-lime/30" style={{ left: p.l, top: p.t, animationDelay: `${p.d}s`, rotate: `${i * 40}deg` }} size={p.s} strokeWidth={1.2} />
        ))}
      </div>

      <div className="mx-auto grid max-w-[1500px] items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} dark size="xl" />
          <Reveal delay={0.2}><p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-white/85">{s.intro}</p></Reveal>
          <Reveal delay={0.25}><p className="mt-10 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-lime"><Sprout size={18} />{s.commit}</p></Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {s.items.map((it, i) => (
              <motion.li key={it}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08, duration: 0.7 }}
                whileHover={{ y: -4 }}
                className="glass group flex items-start gap-4 rounded-2xl p-5 transition-colors hover:bg-white/15">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-sm font-extrabold text-forest transition-transform duration-500 group-hover:rotate-[360deg]">{i + 1}</span>
                <span className="font-semibold leading-snug">{it}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div style={{ y: reduce ? 0 : globeY, rotate: reduce ? 0 : rot }}
            className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-full border-[10px] border-white/15 bg-white shadow-2xl">
            <img src={IMG.globe} alt="" loading="lazy" className="h-full w-full scale-110 object-cover" />
          </motion.div>
          <motion.div aria-hidden className="absolute -bottom-4 start-4 h-6 w-32 bg-lime" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ originX: 0 }} />
        </div>
      </div>
    </section>
  )
}
