import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, Mail, Globe, MapPin, Check, Loader2, Send } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const PHONE = '920035568'
const EMAIL = 'info@ebc-sa.com'
const SITE = 'https://ebta-sa.com/'

export default function Contact() {
  const { t, sign } = useLang()
  const c = t.contact
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    window.setTimeout(() => {
      setStatus('done')
      form.reset()
      window.setTimeout(() => setStatus('idle'), 5000)
    }, 1300)
  }

  const cards = [
    { icon: Phone, k: c.cards.phone, v: PHONE, href: `tel:${PHONE}`, ltr: true },
    { icon: Mail, k: c.cards.email, v: EMAIL, href: `mailto:${EMAIL}`, ltr: true },
    { icon: Globe, k: c.cards.website, v: 'ebta-sa.com', href: SITE, ltr: true, ext: true },
    { icon: MapPin, k: c.cards.address, v: c.addressValue, href: undefined, ltr: false },
  ]
  const field = 'w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-white/50 outline-none transition focus:border-lime focus:bg-white/15'

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-charcoal py-24 text-white md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} dark size="xl" />
        <Reveal delay={0.2}><p className="mt-6 max-w-xl text-lg text-white/75">{c.intro}</p></Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {cards.map((card, i) => {
              const inner = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime text-forest transition-transform duration-500 group-hover:rotate-12"><card.icon size={20} /></span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-lime">{card.k}</span>
                    <span className="mt-1 block break-words font-semibold" dir={card.ltr ? 'ltr' : undefined}>{card.v}</span>
                  </span>
                </>
              )
              const cls = 'glass group flex items-center gap-4 rounded-2xl p-5 transition hover:bg-white/15'
              return (
                <Reveal key={card.k} delay={i * 0.08} x={-30 * sign} y={0}>
                  {card.href
                    ? <a href={card.href} className={cls} {...(card.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
                    : <div className={cls}>{inner}</div>}
                </Reveal>
              )
            })}

            {/* map-style placeholder */}
            <Reveal delay={0.3}>
              <div className="relative h-52 overflow-hidden rounded-2xl border border-white/15 bg-forest/60">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 210" preserveAspectRatio="xMidYMid slice" aria-hidden>
                  <defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,0.08)" /></pattern></defs>
                  <rect width="400" height="210" fill="url(#grid)" />
                  <path d="M-10 150 C80 120 140 170 230 110 S350 90 420 40" stroke="rgba(201,219,68,0.55)" strokeWidth="6" fill="none" />
                  <path d="M60 -10 C90 60 70 120 120 220" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                  <path d="M250 -10 C240 70 300 130 280 220" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                  <rect x="150" y="60" width="50" height="30" rx="4" fill="rgba(255,255,255,0.08)" />
                  <rect x="310" y="130" width="60" height="40" rx="4" fill="rgba(255,255,255,0.08)" />
                </svg>
                <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2">
                  <span className="absolute -inset-4 animate-ping rounded-full bg-lime/40" />
                  <MapPin className="relative -translate-y-3 text-lime drop-shadow-lg" size={38} fill="#123D32" />
                </div>
                <span className="absolute bottom-3 start-3 rounded-full bg-charcoal/80 px-3 py-1 text-[11px] font-bold tracking-wider">{c.mapLabel}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={50} className="lg:col-span-7">
            <form onSubmit={submit} className="glass rounded-[2rem] p-6 md:p-10">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/70">{c.form.name}</span><input required name="name" className={field} /></label>
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/70">{c.form.email}</span><input required type="email" name="email" dir="ltr" className={`${field} text-start`} /></label>
              </div>
              <label className="mt-4 block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/70">{c.form.phone}</span><input name="phone" type="tel" dir="ltr" className={`${field} text-start`} /></label>
              <label className="mt-4 block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/70">{c.form.message}</span><textarea required name="message" rows={5} className={`${field} resize-none`} /></label>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                <motion.button type="submit" disabled={status !== 'idle'} layout
                  className={`relative flex min-w-[200px] items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-bold transition-colors ${status === 'done' ? 'bg-white text-forest' : 'bg-lime text-forest hover:bg-white'} disabled:cursor-default`}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={status} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} transition={{ duration: 0.25 }} className="flex items-center gap-3">
                      {status === 'idle' && <>{c.form.send}<Send size={16} className="rtl:-scale-x-100" /></>}
                      {status === 'sending' && <><Loader2 size={16} className="animate-spin" />{c.form.sending}</>}
                      {status === 'done' && <><Check size={18} />OK</>}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
                <p className="text-xs text-white/55">{c.demoNote}</p>
              </div>

              <AnimatePresence>
                {status === 'done' && (
                  <motion.p role="status" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-5 overflow-hidden rounded-xl bg-lime/20 px-4 py-3 text-sm font-semibold text-lime">
                    {c.form.success}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
