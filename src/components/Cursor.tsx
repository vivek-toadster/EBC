import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    setEnabled(mq.matches)
    if (!mq.matches) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY)
      const el = e.target as HTMLElement | null
      setHover(!!el?.closest('a,button,[data-cursor],input,textarea'))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[150] hidden md:block" style={{ x: sx, y: sy }}>
        <motion.div
          className="rounded-full border border-lime mix-blend-difference"
          animate={{ width: hover ? 64 : 40, height: hover ? 64 : 40, marginLeft: hover ? -32 : -20, marginTop: hover ? -32 : -20, backgroundColor: hover ? 'rgba(201,219,68,0.25)' : 'rgba(201,219,68,0)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[150] hidden md:block" style={{ x, y }}>
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-lime" />
      </motion.div>
    </>
  )
}
