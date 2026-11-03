import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { serviceIcons, serviceImages } from '../data/assets'
import { scrollToId } from '../hooks/scroll'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import ScrollDepthCard from './ui/ScrollDepthCard'
import Modal from './ui/Modal'

// asymmetric layout on a 6-col grid (sums to 6 per row)
const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2']
const heights = ['lg:h-[520px]', 'lg:h-[520px]', 'lg:h-[400px]', 'lg:h-[400px]', 'lg:h-[400px]', 'lg:h-[460px]', 'lg:h-[460px]', 'lg:h-[420px]', 'lg:h-[420px]', 'lg:h-[380px]', 'lg:h-[380px]', 'lg:h-[380px]']

export default function Services() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const s = t.services
  const [sel, setSel] = useState<number | null>(null)
  const close = useCallback(() => setSel(null), [])
  const Icon = sel !== null ? serviceIcons[sel] : null

  return (
    <section id="services" className="relative bg-offwhite py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} size="xl" dark />
          <Reveal delay={0.2}><p className="max-w-xl text-lg leading-relaxed text-white/85 lg:justify-self-end">{s.intro}</p></Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {s.items.map((it, i) => {
            const img = serviceImages[i]
            return (
              <ScrollDepthCard key={it.title} direction={i % 2 === 0 ? 1 : -1} className={`${spans[i]} ${heights[i]} h-[420px]`}>
                <motion.button
                  data-cursor onClick={() => setSel(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-3xl text-start"
                  whileTap={{ scale: 0.985 }}
                  whileHover={reduce ? undefined : { y: -7, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  aria-label={`${s.view}: ${it.title}`}
                >
                  <motion.img src={img.src} alt="" loading="lazy" style={{ objectPosition: img.pos }}
                    className="absolute inset-0 h-full w-full object-cover"
                    animate={reduce ? undefined : { scale: [1, 1.045, 1] }}
                    whileHover={reduce ? undefined : { scale: 1.1 }}
                    transition={{ scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' }, default: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/10 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/55" />

                  <span className="absolute start-6 top-6 text-sm font-bold tracking-widest text-lime">{String(i + 1).padStart(2, '0')}</span>
                  <span className="absolute end-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-forest transition-all duration-500 group-hover:rotate-45 group-hover:bg-lime">
                    <ArrowUpRight size={20} className="rtl:-scale-x-100" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h3 className="text-2xl font-extrabold leading-tight text-white md:text-3xl">{it.title}</h3>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/85">{it.text}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime">
                          {s.view}<ArrowRight size={14} className="rtl:-scale-x-100" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </ScrollDepthCard>
            )
          })}
        </div>
      </div>

      <Modal open={sel !== null} onClose={close} label={sel !== null ? s.items[sel].title : ''} closeLabel={s.close}>
        {sel !== null && Icon && (
          <div className="grid md:grid-cols-2">
            <div className="relative h-72 md:h-auto md:min-h-[520px]">
              <img src={serviceImages[sel].src} alt="" style={{ objectPosition: serviceImages[sel].pos }} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
              <span className="absolute bottom-6 start-6 text-7xl font-extrabold text-white/90">{String(sel + 1).padStart(2, '0')}</span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-forest text-lime"><Icon size={26} strokeWidth={1.6} /></div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-sage">{s.selected}</p>
              <h3 className="mt-3 text-3xl font-extrabold leading-tight text-forest md:text-4xl">{s.items[sel].title}</h3>
              <p className="mt-5 leading-relaxed text-charcoal/75">{s.items[sel].text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => { close(); window.setTimeout(() => scrollToId('contact'), 350) }} className="rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition hover:bg-charcoal">{t.nav.cta}</button>
                <button onClick={() => setSel((sel + 1) % s.items.length)} className="flex items-center gap-2 rounded-full border border-forest/25 px-6 py-3 text-sm font-bold text-forest transition hover:bg-forest hover:text-white">
                  {s.items[(sel + 1) % s.items.length].title}<ArrowRight size={16} className="rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
