import type Lenis from 'lenis'

let instance: Lenis | null = null
export const setLenis = (l: Lenis | null) => { instance = l }
export const getLenis = () => instance

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: id === 'home' ? 0 : -70, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function lockScroll(lock: boolean) {
  if (instance) { if (lock) instance.stop(); else instance.start() }
  document.body.style.overflow = lock ? 'hidden' : ''
}
