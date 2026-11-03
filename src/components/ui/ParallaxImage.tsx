import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface Props { src: string; alt?: string; className?: string; imgClassName?: string; amount?: number; position?: string }

export default function ParallaxImage({ src, alt = '', className = '', imgClassName = '', amount = 12, position = 'center' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // A slow push-in with a small diagonal drift gives the image a sense of depth
  // without making it feel like it's simply sliding up the page.
  const y = useTransform(scrollYProgress, [0, 1], [`${amount * 0.16}%`, `-${amount * 0.16}%`])
  const x = useTransform(scrollYProgress, [0, 1], [`${amount * 0.08}%`, `-${amount * 0.08}%`])
  const scale = useTransform(scrollYProgress, [0, 1], [1.035, 1.12])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        aria-hidden="true"
        className="absolute -inset-[4%]"
        animate={reduce ? undefined : { x: [0, -3, 2, 0], y: [0, 2, -2, 0], scale: [1, 1.018, 1.008, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.img
          src={src} alt={alt} loading="lazy" draggable={false}
          style={{ x: reduce ? 0 : x, y: reduce ? 0 : y, objectPosition: position, scale: reduce ? 1.04 : scale }}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  )
}
