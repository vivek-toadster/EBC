import { motion } from 'framer-motion'
import type { ElementType } from 'react'

interface Props {
  text: string
  className?: string
  as?: ElementType
  delay?: number
  stagger?: number
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean
}

/** Word-by-word masked reveal (clip-path style). Works for Arabic as words are split on spaces. */
export default function SplitText({ text, className = '', as: Tag = 'span', delay = 0, stagger = 0.07, immediate = false }: Props) {
  const words = text.split(' ')
  const anim = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
  return (
    <Tag className={className} aria-label={text}>
      <motion.span initial="hidden" {...anim} transition={{ staggerChildren: stagger, delayChildren: delay }} className="inline" aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: '110%', rotate: 3 }, show: { y: '0%', rotate: 0 } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
