import { useLang } from '../context/LanguageContext'
import { industryIcons } from '../data/assets'
import SectionHeading from './ui/SectionHeading'
import ScrollDepthCard from './ui/ScrollDepthCard'

export default function Industries() {
  const { t } = useLang()
  const d = t.industries
  return (
    <section className="relative bg-forest py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHeading eyebrow={d.eyebrow} title={d.title} dark size="lg" />
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-4">
          {d.items.map((it, i) => {
            const Icon = industryIcons[i]
            return (
              <ScrollDepthCard key={it} direction={i % 2 === 0 ? 1 : -1}
                className="group relative flex min-h-[200px] flex-col justify-between bg-forest p-6 transition-colors duration-500 hover:bg-lime hover:text-forest md:min-h-[230px] md:p-8">
                <Icon size={34} strokeWidth={1.4} className="text-lime transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-forest" />
                <h3 className="text-lg font-bold leading-snug md:text-xl">{it}</h3>
              </ScrollDepthCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
