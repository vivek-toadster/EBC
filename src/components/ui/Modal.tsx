import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { lockScroll } from '../../hooks/scroll'

interface Props { open: boolean; onClose: () => void; children: ReactNode; label: string; closeLabel: string }

export default function Modal({ open, onClose, children, label, closeLabel }: Props) {
  useEffect(() => {
    if (!open) return
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { lockScroll(false); window.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center md:items-center md:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          role="dialog" aria-modal="true" aria-label={label}
        >
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-md" onClick={onClose} />
          <motion.div
            data-lenis-prevent
            className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-t-3xl bg-offwhite shadow-2xl md:rounded-3xl"
            initial={{ y: 80, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose} aria-label={closeLabel}
              className="absolute end-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-charcoal/80 text-white backdrop-blur transition hover:bg-forest hover:rotate-90"
            >
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
