import SplitText from './SplitText'
import Reveal from './Reveal'

interface Props { eyebrow: string; title: string; dark?: boolean; className?: string; size?: 'lg' | 'xl' }

export default function SectionHeading({ eyebrow, title, dark = false, className = '', size = 'lg' }: Props) {
  return (
    <div className={className}>
      <Reveal y={16}>
        <div className={`mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${dark ? 'text-gold' : 'text-gold-dark'}`}>
          <span className={`h-px w-10 ${dark ? 'bg-gold' : 'bg-gold-dark'}`} />
          {eyebrow}
        </div>
      </Reveal>
      <SplitText
        as="h2" text={title}
        className={`font-extrabold leading-[1.05] tracking-tight ${size === 'xl' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'} ${dark ? 'text-white' : 'text-forest'}`}
      />
    </div>
  )
}
