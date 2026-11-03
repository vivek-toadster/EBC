import { useCallback, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, MapPin, Check } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { projectImages } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Counter from './ui/Counter'
import Modal from './ui/Modal'
import ScrollDepthCard from './ui/ScrollDepthCard'

export default function Projects() {
  const { t, sign } = useLang()
  const reduce = useReducedMotion()
  const p = t.projects
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const cur = p.items[active]
  const imgs = projectImages[active]
  const step = (d: number) => setActive(a => (a + d + p.items.length) % p.items.length)

  return (
    <section id="projects" className="relative isolate overflow-hidden bg-charcoal py-24 text-white md:py-36">
      <div aria-hidden className="absolute -end-20 top-10 -z-10 select-none text-[20vw] font-extrabold leading-none outline-text opacity-60">04</div>
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow={p.eyebrow} title={p.title} dark size="lg" />
          <Reveal delay={0.2}><p className="max-w-xl text-lg leading-relaxed text-white/65 lg:justify-self-end">{p.intro}</p></Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* selector */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {p.items.map((it, i) => (
                <li key={it.name}>
                  <button data-cursor onClick={() => setActive(i)} aria-current={i === active}
                    className={`group relative flex w-full items-start gap-5 py-6 text-start transition-colors md:gap-7 ${i === active ? 'text-white' : 'text-white/45 hover:text-white/80'}`}>
                    {i === active && <motion.span layoutId="proj-bar" className="absolute inset-y-0 start-0 w-1 bg-lime" transition={{ type: 'spring', stiffness: 360, damping: 32 }} />}
                    <span className={`ps-4 text-sm font-bold ${i === active ? 'text-lime' : ''}`}>0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block text-xl font-extrabold leading-tight md:text-2xl">{it.name}</span>
                      <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-wider">
                        <span>{it.category}</span>
                        <span className="flex items-center gap-1 text-sage"><MapPin size={12} />{it.location}</span>
                      </span>
                    </span>
                    <ArrowRight size={20} className={`mt-1 shrink-0 transition-all duration-500 rtl:-scale-x-100 ${i === active ? 'translate-x-0 opacity-100 text-lime' : '-translate-x-3 opacity-0 rtl:translate-x-3'}`} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={() => step(-1)} aria-label={p.prev} className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition hover:bg-lime hover:text-forest"><ArrowLeft size={18} className="rtl:-scale-x-100" /></button>
              <button onClick={() => step(1)} aria-label={p.next} className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition hover:bg-lime hover:text-forest"><ArrowRight size={18} className="rtl:-scale-x-100" /></button>
              <span className="ms-3 text-sm font-bold text-white/50"><span className="text-white">0{active + 1}</span> / 0{p.items.length}</span>
            </div>
          </div>

          {/* showcase */}
          <div className="lg:col-span-7">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-[16/11]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={active} className="absolute inset-0"
                  initial={{ clipPath: `inset(0 ${sign === 1 ? '100%' : '0'} 0 ${sign === 1 ? '0' : '100%'})` }}
                  animate={{ clipPath: 'inset(0 0% 0 0%)' }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
                  <motion.img src={imgs.main} alt={cur.name} className="h-full w-full object-cover"
                    initial={false}
                    animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                    whileHover={reduce ? undefined : { scale: 1.08 }}
                    transition={{ scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' }, default: { duration: 1.3, ease: [0.22, 1, 0.36, 1] } }} />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-9">
                <div className="max-w-md">
                  <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-forest">{cur.category}</span>
                  <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-white/85"><MapPin size={15} className="text-lime" />{cur.location}</p>
                </div>
                <button data-cursor onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-forest transition hover:bg-lime">
                  {p.view}<ArrowRight size={16} className="rtl:-scale-x-100" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {cur.stats.map((s, i) => (
                <ScrollDepthCard key={active + s.label} direction={i % 2 === 0 ? 1 : -1}>
                  <motion.div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-lime/35 hover:bg-white/[0.07]"
                    whileHover={reduce ? undefined : { y: -4 }}>
                  <div className="text-4xl font-extrabold text-lime md:text-5xl"><Counter value={s.value} suffix={s.suffix} duration={1.6} /></div>
                  <p className="mt-2 text-xs leading-snug text-white/65" style={{ transitionDelay: `${i * 60}ms` }}>{s.label}</p>
                  </motion.div>
                </ScrollDepthCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={close} label={cur.name} closeLabel={p.close}>
        <div>
          <div className="relative h-64 md:h-96">
            <img src={imgs.main} alt={cur.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
              <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-forest">{cur.category}</span>
              <h3 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight md:text-4xl">{cur.name}</h3>
            </div>
          </div>
          <div className="grid gap-10 p-6 md:grid-cols-5 md:p-10">
            <div className="md:col-span-3">
              <p className="text-lg leading-relaxed text-charcoal/80">{cur.summary}</p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                {[[p.client, cur.client], [p.location, cur.location], [p.category, cur.category]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-forest/5 p-4"><dt className="text-[11px] font-bold uppercase tracking-widest text-sage">{k}</dt><dd className="mt-1 text-sm font-bold text-forest">{v}</dd></div>
                ))}
              </dl>
              <h4 className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-forest">{p.scope}</h4>
              <ul className="mt-4 space-y-3">
                {cur.scope.map(s => (
                  <li key={s} className="flex items-start gap-3 text-charcoal/80"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-lime"><Check size={14} /></span>{s}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-forest">{p.highlights}</h4>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {cur.stats.map(s => (
                  <div key={s.label} className="rounded-2xl bg-forest p-5 text-white">
                    <div className="text-3xl font-extrabold text-lime">{s.value.toLocaleString('en-US')}{s.suffix}</div>
                    <p className="mt-1 text-xs text-white/75">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {imgs.gallery.map(g => <img key={g} src={g} alt="" loading="lazy" className="aspect-square w-full rounded-xl object-cover" />)}
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => step(-1)} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-forest/25 px-4 py-3 text-xs font-bold text-forest transition hover:bg-forest hover:text-white"><ArrowLeft size={14} className="rtl:-scale-x-100" />{p.prev}</button>
                <button onClick={() => step(1)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-xs font-bold text-white transition hover:bg-charcoal">{p.next}<ArrowRight size={14} className="rtl:-scale-x-100" /></button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  )
}
