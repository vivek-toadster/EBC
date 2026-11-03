import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { translations, type Dict, type Lang } from '../i18n'

interface LangCtx {
  lang: Lang
  t: Dict
  isRTL: boolean
  /** +1 for LTR, -1 for RTL – use to mirror horizontal offsets */
  sign: 1 | -1
  setLang: (l: Lang) => void
}

const Ctx = createContext<LangCtx | null>(null)
const KEY = 'ebc-lang'

function readInitial(): Lang {
  try {
    const v = sessionStorage.getItem(KEY)
    if (v === 'ar' || v === 'en') return v
  } catch { /* storage unavailable */ }
  return 'en'
}

function applyToDocument(l: Lang) {
  document.documentElement.lang = l
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const l = readInitial()
    applyToDocument(l)
    return l
  })
  const [curtain, setCurtain] = useState(false)
  const reduce = useReducedMotion()
  const busy = useRef(false)

  const commit = useCallback((l: Lang) => {
    applyToDocument(l)
    setLangState(l)
    try { sessionStorage.setItem(KEY, l) } catch { /* ignore */ }
  }, [])

  const setLang = useCallback((l: Lang) => {
    if (l === lang || busy.current) return
    if (reduce) { commit(l); return }
    busy.current = true
    setCurtain(true)
    window.setTimeout(() => commit(l), 480)
    window.setTimeout(() => { setCurtain(false); busy.current = false }, 560)
  }, [lang, reduce, commit])

  useEffect(() => { applyToDocument(lang) }, [lang])

  const value = useMemo<LangCtx>(() => ({
    lang, t: translations[lang], isRTL: lang === 'ar', sign: lang === 'ar' ? -1 : 1, setLang,
  }), [lang, setLang])

  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>
        {curtain && (
          <motion.div
            key="curtain"
            aria-hidden
            className="fixed inset-0 z-[120] bg-forest pointer-events-none"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}

export function useLang(): LangCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useLang must be used inside LanguageProvider')
  return c
}
