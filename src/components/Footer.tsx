import { ArrowUp, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { IMG } from '../data/assets'
import { scrollToId } from '../hooks/scroll'
import { LangSwitch } from './Navbar'
import SplitText from './ui/SplitText'
import Magnetic from './ui/Magnetic'

const navIds = ['home', 'about', 'services', 'projects', 'sustainability', 'contact'] as const

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const socials = [{ i: Linkedin, l: 'LinkedIn' }, { i: Twitter, l: 'X' }, { i: Instagram, l: 'Instagram' }, { i: Youtube, l: 'YouTube' }]
  return (
    <footer className="relative overflow-hidden bg-charcoal text-white">
      <div className="mx-auto max-w-[1500px] px-5 pt-24 md:px-10 md:pt-32">
        <SplitText as="h2" text={f.headline} className="max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl" />
        <div className="mt-16 grid gap-12 border-t border-white/10 pt-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src={IMG.markWhite} alt="EBC" className="h-14" />
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{t.meta.company}</p>
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">{f.intro}</p>
            <div className="mt-8 flex gap-3">
              {socials.map(({ i: I, l }) => (
                <button key={l} type="button" aria-label={l} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-forest"><I size={18} /></button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-lime">{f.navTitle}</h3>
            <ul className="mt-5 space-y-3">
              {navIds.map(id => (
                <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); scrollToId(id) }} className="text-white/70 transition hover:text-white hover:ps-2">{t.nav[id]}</a></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-lime">{f.servicesTitle}</h3>
            <ul className="mt-5 space-y-3">
              {t.services.items.slice(0, 6).map(s => (
                <li key={s.title}><a href="#services" onClick={e => { e.preventDefault(); scrollToId('services') }} className="text-white/70 transition hover:text-white hover:ps-2">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-lime">{f.contactTitle}</h3>
            <ul className="mt-5 space-y-3 text-white/70">
              <li><a href="tel:920035568" dir="ltr" className="inline-block hover:text-white">920035568</a></li>
              <li><a href="mailto:info@ebc-sa.com" dir="ltr" className="inline-block hover:text-white">info@ebc-sa.com</a></li>
              <li><a href="https://ebta-sa.com/" target="_blank" rel="noopener noreferrer" dir="ltr" className="inline-block hover:text-white">ebta-sa.com</a></li>
              <li className="leading-relaxed">{t.contact.addressValue}</li>
            </ul>
            <LangSwitch className="mt-8 inline-flex" />
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/50">
          <p>© {new Date().getFullYear()} {t.meta.company}. {f.rights}</p>
          <Magnetic>
            <button onClick={() => scrollToId('home')} className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-semibold text-white/80 transition hover:bg-lime hover:text-forest">
              {f.top}<ArrowUp size={16} />
            </button>
          </Magnetic>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none text-center text-[32vw] font-extrabold leading-[0.7] outline-text opacity-40">EBC</div>
    </footer>
  )
}
