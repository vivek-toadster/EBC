import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { IMG } from '../data/assets'
import { scrollToId } from '../hooks/scroll'
import SplitText from './ui/SplitText'
import Magnetic from './ui/Magnetic'

export default function Hero() {
  const { t, sign } = useLang()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const pillY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const workerScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18])
  const workerX = useTransform(scrollYProgress, [0, 1], ['0%', '-2%'])
  const workerY = useTransform(scrollYProgress, [0, 1], ['1%', '-1%'])
  const D = 2.2 // wait for loader

  return (
    <section id="home" ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-charcoal text-white">
      <video
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src="/images/dashboard.mp4"
        autoPlay muted loop playsInline preload="metadata"
        onLoadedMetadata={event => { event.currentTarget.playbackRate = 0.75 }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-charcoal/50" />
      {/* decorative geometry */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5]">
        {[18, 38, 62, 82].map((l, i) => (
          <motion.span key={l} className="absolute top-0 h-full w-px bg-white/[0.07]" style={{ insetInlineStart: `${l}%` }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: D + i * 0.12, duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
        ))}
        <div className="absolute end-[8%] top-[22%] h-40 w-40 animate-float rounded-full border border-lime/40 md:h-64 md:w-64" />
        <div className="absolute bottom-[18%] start-[6%] h-6 w-6 rotate-45 animate-float border border-white/40" style={{ animationDelay: '1.5s' }} />
        <div className="absolute end-[30%] bottom-[28%] h-3 w-16 animate-float bg-lime/80" style={{ animationDelay: '3s' }} />
      </div>

      {/* pill image (echoes the company profile cover) */}
      <motion.div style={{ y: reduce ? 0 : pillY }} className="absolute end-[6%] top-[16%] z-0 hidden h-[62vh] w-[26vw] max-w-[380px] lg:block">
        <motion.div
          className="h-full w-full overflow-hidden rounded-[999px] border border-white/20 shadow-2xl"
          initial={{ clipPath: 'inset(100% 0 0 0 round 999px)' }} animate={{ clipPath: 'inset(0% 0 0 0 round 999px)' }}
          transition={{ delay: D + 0.2, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute -inset-[3%]"
            animate={reduce ? undefined : { x: [0, -8, 5, 0], y: [0, 5, -4, 0], scale: [1, 1.035, 1.015, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.img
              src={IMG.heroWorker}
              alt=""
              className="h-full w-full object-cover object-center"
              style={{ scale: reduce ? 1.04 : workerScale, x: reduce ? 0 : workerX, y: reduce ? 0 : workerY }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
        </motion.div>
        <div className="absolute -bottom-6 -start-10 h-6 w-28 bg-lime" />
      </motion.div>

      <motion.div style={{ y: reduce ? 0 : textY, opacity: fade }} className="relative mx-auto w-full max-w-[1500px] px-5 pb-28 pt-36 md:px-10">
        <motion.div initial={{ opacity: 0, x: -20 * sign }} animate={{ opacity: 1, x: 0 }} transition={{ delay: D, duration: 0.9 }}
          className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-lime">
          <span className="h-px w-12 bg-lime" />{t.hero.eyebrow}
        </motion.div>

        <h1 className="max-w-[1100px] text-[clamp(2.6rem,7.4vw,7rem)] font-extrabold leading-[0.98] tracking-tight">
          {t.hero.words.map((w, i) => (
            <motion.div
              key={w + i}
              className={i === 2 ? 'text-lime' : ''}
              animate={reduce ? undefined : {
                x: [0, i % 2 === 0 ? 5 : -5, 0],
                y: [0, i % 2 === 0 ? -5 : 4, 0],
              }}
              transition={{ duration: 7 + i * 0.8, delay: D + 2.5 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
            >
              <SplitText text={w} immediate delay={D + 0.15 + i * 0.35} stagger={0.09} />
            </motion.div>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.4, duration: 0.9 }}
          className="mt-9 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
          {t.hero.sub}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.6, duration: 0.9 }} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button onClick={() => scrollToId('projects')} className="group flex items-center gap-3 rounded-full bg-lime px-8 py-4 text-sm font-bold text-forest transition-colors hover:bg-white">
              {t.hero.cta1}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-1.5" />
            </button>
          </Magnetic>
          <Magnetic>
            <button onClick={() => scrollToId('services')} className="glass rounded-full px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-forest">
              {t.hero.cta2}
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.button
        onClick={() => scrollToId('about')} aria-label={t.hero.scroll}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D + 2 }}
        className="absolute bottom-8 start-5 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 md:start-10"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-white/25">
          <motion.span className="absolute inset-x-0 top-0 h-5 bg-lime" animate={{ y: [-20, 56] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
        {t.hero.scroll}
      </motion.button>
    </section>
  )
}
