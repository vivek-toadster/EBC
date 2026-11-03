import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  direction?: 1 | -1
}

/** Gives cards a restrained, scroll-linked 3D entrance. */
export default function ScrollDepthCard({ children, className = '', direction = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  // The card unfolds as its top edge enters the viewport and folds back on
  // the same path when the user scrolls upward.
  const rotateX = useTransform(scrollYProgress, [0, 1], [48, 0])
  const rotateY = useTransform(scrollYProgress, [0, 1], [direction * 7, 0])
  const y = useTransform(scrollYProgress, [0, 1], [64, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.78], [0.18, 1])

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 1100,
        transformStyle: 'preserve-3d',
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        y: reduce ? 0 : y,
        scale: reduce ? 1 : scale,
        opacity: reduce ? 1 : opacity,
        transformOrigin: 'center bottom',
      }}
    >
      {children}
    </motion.div>
  )
}
