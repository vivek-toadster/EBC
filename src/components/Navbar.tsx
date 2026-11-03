import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { IMG } from '../data/assets'
import { lockScroll, scrollToId } from '../hooks/scroll'
import Magnetic from './ui/Magnetic'

const ids = ['home', 'about', 'services', 'projects', 'sustainability', 'contact'] as const
type Id = typeof ids[number]

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex items-center gap-1 rounded-full border border-white/20 p-1 text-xs font-bold ${className}`} role="group" aria-label="Language">
      {(['en', 'ar'] as const).map(l => (
        <button
          key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`relative rounded-full px-3 py-1.5 transition-colors ${lang === l ? 'text-forest' : 'text-white/80 hover:text-white'}`}
        >
          {lang === l && <motion.span layoutId={`lang-pill-${className}`} className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          <span className="relative">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { t, isRTL } = useLang()
  const origin = isRTL ? '40px' : 'calc(100% - 40px)'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Id>('home')

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id as Id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  useEffect(() => { lockScroll(open); return () => { if (open) lockScroll(false) } }, [open])

  const go = (id: string) => {
    setOpen(false)
    window.setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${scrolled ? 'bg-charcoal/85 py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl' : 'bg-transparent py-6'}`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 md:px-10">
          <a href="#home" onClick={e => { e.preventDefault(); go('home') }} className="flex items-center gap-3" aria-label="EBC home">
            <img src={IMG.markWhite} alt="EBC" className="h-9 w-auto md:h-11" />
            <span className="hidden max-w-[150px] border-s border-white/25 ps-3 text-[10px] font-semibold uppercase leading-tight tracking-[0.18em] text-white/80 xl:block">
              {t.meta.company}
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {ids.map(id => (
              <a
                key={id} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}
                className="group relative py-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
              >
                {t.nav[id]}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-lime transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
                {active === id && <motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-lime" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch className="hidden sm:flex" />
            <div className="hidden lg:block">
              <Magnetic strength={0.25}>
                <button onClick={() => go('contact')} className="group flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-forest transition hover:bg-white">
                  {t.nav.cta}
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </button>
              </Magnetic>
            </div>
            <button onClick={() => setOpen(true)} aria-label={t.nav.menu} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-forest text-white"
            initial={{ clipPath: `circle(0% at ${origin} 40px)` }}
            animate={{ clipPath: `circle(150% at ${origin} 40px)` }}
            exit={{ clipPath: `circle(0% at ${origin} 40px)` }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between px-5 py-5">
              <img src={IMG.markWhite} alt="EBC" className="h-9" />
              <button onClick={() => setOpen(false)} aria-label={t.nav.close} className="grid h-11 w-11 place-items-center rounded-full border border-white/25"><X size={20} /></button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {ids.map((id, i) => (
                <div key={id} className="overflow-hidden">
                  <motion.a
                    href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}
                    initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-baseline gap-4 py-2 text-4xl font-extrabold tracking-tight"
                  >
                    <span className="text-sm font-semibold text-lime">0{i + 1}</span>{t.nav[id]}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col gap-4 px-8 pb-10">
              <button onClick={() => go('contact')} className="rounded-full bg-lime px-6 py-4 text-center text-sm font-bold text-forest">{t.nav.cta}</button>
              <LangSwitch className="self-start" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
