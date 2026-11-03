import { motion, useReducedMotion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-lime"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
