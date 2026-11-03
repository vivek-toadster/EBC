import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { IMG } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import ParallaxImage from './ui/ParallaxImage'
import Counter from './ui/Counter'

export default function About() {
  const { t, sign } = useLang()
  const a = t.about
  return (
    <section id="about" className="relative overflow-hidden bg-offwhite py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute -top-10 start-0 select-none whitespace-nowrap text-[22vw] font-extrabold leading-none outline-text-dark">EBC</div>

      <div className="relative mx-auto grid max-w-[1500px] items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
        {/* images */}
        <div className="relative lg:col-span-6">
          <Reveal x={-40 * sign} y={0}>
            <ParallaxImage src={IMG.aboutMain} className="aspect-[4/4.6] rounded-[2rem] rounded-ss-[9rem] shadow-2xl" amount={8} position="82% center" />
          </Reveal>
          <Reveal delay={0.25} y={60} className="absolute -bottom-10 -end-2 hidden w-[38%] md:block lg:-end-10">
            <div className="overflow-hidden rounded-[999px] border-8 border-offwhite shadow-xl">
              <ParallaxImage src={IMG.aboutSmall} className="aspect-[2/3.3]" amount={6} position="70% center" />
            </div>
          </Reveal>
          <div className="absolute -start-3 top-1/3 hidden h-28 w-4 bg-lime md:block" />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -top-6 end-6 hidden h-32 w-32 place-items-center rounded-full bg-forest p-4 text-center text-[10px] font-bold uppercase leading-tight tracking-widest text-white md:grid"
          >
            <span className="animate-float">{t.meta.short}<br />Riyadh · KSA</span>
          </motion.div>
        </div>

        {/* copy */}
        <div className="lg:col-span-6 lg:ps-10">
          <SectionHeading eyebrow={a.eyebrow} title={a.title} dark />
          <Reveal delay={0.1}><p className="mt-8 text-lg font-medium leading-relaxed text-white/95">{a.p1}</p></Reveal>
          <Reveal delay={0.15}><p className="mt-5 leading-relaxed text-white/75">{a.p2}</p></Reveal>
          <Reveal delay={0.2}><p className="mt-5 leading-relaxed text-white/75">{a.p3}</p></Reveal>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {a.caps.map((c, i) => (
              <motion.span
                key={c} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.07 }}
                className="rounded-full border border-forest/20 bg-white px-4 py-2 text-xs font-bold text-forest transition hover:bg-forest hover:text-white"
              >{c}</motion.span>
            ))}
          </div>

          {/* end-to-end journey */}
          <div className="mt-12">
            <div className="relative flex items-start justify-between">
              <div className="absolute inset-x-3 top-[7px] h-px bg-white/25" />
              <motion.div
                className="absolute inset-x-3 top-[7px] h-px origin-left bg-gold rtl:origin-right"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
              />
              {a.journey.map((j, i) => (
                <motion.div key={j} className="relative z-10 flex w-1/5 flex-col items-center gap-3 text-center"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.3 }}>
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-gold bg-lime" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 md:text-xs">{j}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="relative mx-auto mt-28 max-w-[1500px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-forest/15 lg:grid-cols-4">
          {a.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-forest p-7 text-white md:p-10">
              <div className="text-5xl font-extrabold tracking-tight text-lime md:text-6xl"><Counter value={s.value} suffix={s.suffix} /></div>
              <p className="mt-3 text-sm leading-snug text-white/75">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* opening statement */}
      <div className="relative mx-auto mt-28 max-w-5xl px-5 text-center md:px-10">
        <Reveal>
          <Quote className="mx-auto mb-6 text-lime" size={56} strokeWidth={1.5} />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sage">{a.quoteLead}</p>
          <blockquote className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">{a.quote}</blockquote>
          <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-white/75">{a.quoteBody}</p>
          <p className="mt-6 text-sm font-bold text-gold">{a.quoteEnd}</p>
        </Reveal>
      </div>
    </section>
  )
}
