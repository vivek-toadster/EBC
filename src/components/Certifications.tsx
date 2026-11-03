import { motion } from 'framer-motion'
import { Award, Landmark, ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { scrollToId } from '../hooks/scroll'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Certifications() {
  const { t } = useLang()
  const c = t.certs
  const cards = [
    { icon: Award, title: c.isoTitle, text: c.isoText, tag: 'ISO' },
    { icon: Landmark, title: c.govTitle, text: c.govText, tag: 'KSA' },
  ]
  return (
    <section className="relative overflow-hidden bg-beige/40 py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} dark />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.tag} delay={i * 0.12} y={50}>
              <motion.div whileHover={{ y: -8 }} className="group relative h-full overflow-hidden rounded-[2rem] border border-forest/10 bg-white p-8 shadow-sm md:p-12">
                <span aria-hidden className="absolute -end-6 -top-8 text-[9rem] font-extrabold leading-none outline-text-dark">{card.tag}</span>
                <div className="relative grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-forest/40 text-forest transition-transform duration-[1200ms] group-hover:rotate-[360deg]">
                  <card.icon size={34} strokeWidth={1.4} />
                </div>
                <h3 className="relative mt-10 text-2xl font-extrabold text-forest md:text-3xl">{card.title}</h3>
                <p className="relative mt-4 max-w-md leading-relaxed text-charcoal/70">{card.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right" />
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <button onClick={() => scrollToId('contact')} className="mt-10 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-charcoal">
            {c.cta}<ArrowRight size={18} className="rtl:-scale-x-100" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
