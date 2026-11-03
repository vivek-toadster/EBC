import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { valueIcons } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import ScrollDepthCard from './ui/ScrollDepthCard'

export default function CoreValues() {
  const { t } = useLang()
  const v = t.values
  return (
    <section id="values" className="relative isolate overflow-hidden bg-forest py-24 text-white md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHeading eyebrow={v.eyebrow} title={v.title} dark size="xl" />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {v.items.map((it, i) => {
            const Icon = valueIcons[i]
            return (
              <ScrollDepthCard key={it.title} direction={i % 2 === 0 ? 1 : -1} className={i === 0 ? 'lg:col-span-2' : ''}>
              <motion.article
                whileHover={{ y: -8 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-charcoal/50 p-7 backdrop-blur-md transition-colors hover:border-lime/60 hover:bg-charcoal/70 md:p-9"
              >
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-lime scale-x-0 transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right" />
                <span aria-hidden className="absolute -end-2 -top-5 text-8xl font-extrabold outline-text opacity-60 transition-opacity group-hover:opacity-100">0{i + 1}</span>
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-lime transition-all duration-500 group-hover:-translate-y-1.5 group-hover:rotate-6 group-hover:bg-lime group-hover:text-forest">
                  <Icon size={26} strokeWidth={1.6} />
                </div>
                <h3 className="relative mt-16 text-2xl font-bold">{it.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/70 md:text-base">{it.text}</p>
              </motion.article>
              </ScrollDepthCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
