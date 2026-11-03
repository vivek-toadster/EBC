import { motion } from 'framer-motion'
import { IMG } from '../data/assets'
import { useLang } from '../context/LanguageContext'

export default function Loader() {
  const { t } = useLang()
  return (
    <motion.div
      className="fixed inset-0 z-[200] grid place-items-center bg-forest text-white"
      initial={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center px-6 text-center">
        <motion.img
          src={IMG.markWhite} alt="EBC" className="w-44 md:w-56"
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-beige/80"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
        >
          {t.loader.tagline}
        </motion.p>
        <div className="mt-8 h-px w-56 overflow-hidden bg-white/15">
          <motion.div className="h-full bg-lime" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }} />
        </div>
      </div>
    </motion.div>
  )
}
