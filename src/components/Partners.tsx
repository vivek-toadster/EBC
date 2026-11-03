import { motion } from 'framer-motion'
import { Handshake } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { IMG } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import ParallaxImage from './ui/ParallaxImage'

export default function Partners() {
  const { t, sign } = useLang()
  const p = t.partners
  return (
    <section className="relative overflow-hidden bg-offwhite py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        {/* partners */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={p.eyebrow} title={p.title} size="xl" dark />
            <Reveal delay={0.2}><p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80">{p.text}</p></Reveal>
          </div>
          <div className="relative flex min-h-[260px] items-center justify-center">
            {p.pillars.map((pl, i) => (
              <motion.div key={pl}
                initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`relative -ms-6 grid h-44 w-44 place-items-center rounded-full border-2 border-gold text-center text-sm font-extrabold uppercase tracking-wider first:ms-0 md:h-56 md:w-56 ${i === 1 ? 'z-10 bg-forest text-lime' : 'bg-charcoal/80 text-white'}`}>
                {i === 1 && <Handshake className="absolute top-8 text-white/70" size={28} strokeWidth={1.4} />}
                <span className="px-4">{pl}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* management message */}
        <div className="mt-32 grid items-stretch gap-0 overflow-hidden rounded-[2.5rem] bg-forest text-white lg:grid-cols-12">
          <Reveal x={-40 * sign} y={0} className="relative min-h-[320px] lg:col-span-5">
            <ParallaxImage src={IMG.rebar} className="absolute inset-0" amount={8} />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
            <div className="absolute bottom-0 start-0 h-6 w-36 bg-lime" />
          </Reveal>
          <div className="relative p-8 md:p-14 lg:col-span-7">
            <span aria-hidden className="absolute end-8 top-0 text-[12rem] font-extrabold leading-none text-white/[0.06]">“</span>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime">{p.msgEyebrow}</p>
            <h3 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">{p.msgTitle}</h3>
            <div className="mt-8 space-y-4 leading-relaxed text-white/75">
              {p.msg.map((m, i) => <Reveal key={i} delay={i * 0.1} y={20}><p>{m}</p></Reveal>)}
            </div>
            <p className="mt-8 border-t border-white/15 pt-5 text-sm font-bold text-lime">{p.signed}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
