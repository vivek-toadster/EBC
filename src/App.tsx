import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { LanguageProvider } from './context/LanguageContext'
import { lockScroll, setLenis } from './hooks/scroll'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import VisionMission from './components/VisionMission'
import CoreValues from './components/CoreValues'
import Services from './components/Services'
import WhyChoose from './components/WhyChoose'
import Methodology from './components/Methodology'
import Sustainability from './components/Sustainability'
import SafetyQuality from './components/SafetyQuality'
import Projects from './components/Projects'
import Equipment from './components/Equipment'
import Industries from './components/Industries'
import Certifications from './components/Certifications'
import Partners from './components/Partners'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import AmbientVideoBackground from './components/ui/AmbientVideoBackground'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let lenis: Lenis | null = null
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true })
      setLenis(lenis)
      const loop = (time: number) => { lenis?.raf(time); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)
    }
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); setLenis(null) }
  }, [])

  useEffect(() => {
    lockScroll(true)
    const id = window.setTimeout(() => { setLoading(false); lockScroll(false) }, 2100)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <LanguageProvider>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <AmbientVideoBackground />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <VisionMission />
        <CoreValues />
        <Services />
        <WhyChoose />
        <Methodology />
        <Sustainability />
        <SafetyQuality />
        <Projects />
        <Equipment />
        <Industries />
        <Certifications />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
