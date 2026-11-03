import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { methodIcons } from '../data/assets'
import SectionHeading from './ui/SectionHeading'

export default function Methodology() {
  const { t, isRTL } = useLang()
  const m = t.method
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const [active, setActive] = useState(0)
  useMotionValueEvent(progress, 'change', v => setActive(Math.min(m.steps.length - 1, Math.max(0, Math.ceil(v * m.steps.length) - 1))))

  return (
    <section className="relative overflow-hidden bg-beige/40 py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHeading eyebrow={m.eyebrow} title={m.title} size="xl" dark />

        <div ref={ref} className="relative mt-20">
          {/* horizontal line (lg) */}
          <div className="absolute inset-x-0 top-7 hidden h-px bg-white/25 lg:block" />
          <motion.div className="absolute inset-x-0 top-7 hidden h-[3px] bg-gold lg:block" style={{ scaleX: progress, transformOrigin: isRTL ? '100% 50%' : '0% 50%' }} />
          {/* vertical line (mobile) */}
          <div className="absolute inset-y-0 start-7 w-px bg-white/25 lg:hidden" />
          <motion.div className="absolute inset-y-0 start-7 w-[3px] -translate-x-px bg-gold lg:hidden rtl:translate-x-px" style={{ scaleY: progress, transformOrigin: '50% 0%' }} />

          <ol className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
            {m.steps.map((s, i) => {
              const Icon = methodIcons[i]
              const on = i <= active
              return (
                <motion.li key={s.title}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.08, duration: 0.8 }}
                  className="relative flex gap-6 lg:block">
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      animate={{ scale: i === active ? 1.12 : 1, backgroundColor: on ? '#123D32' : '#F5F5F0', color: on ? '#C9DB44' : '#123D32' }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="grid h-14 w-14 place-items-center rounded-full border-2 border-forest shadow-lg"
                    >
                      <Icon size={22} strokeWidth={1.7} />
                    </motion.div>
                    {i === active && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-lime/50" />}
                  </div>
                  <div className="lg:mt-8">
                    <div className={`text-5xl font-extrabold leading-none transition-colors duration-500 ${on ? 'text-gold' : 'text-white/35'}`}>0{i + 1}</div>
                    <h3 className="mt-3 text-xl font-extrabold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{s.text}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
