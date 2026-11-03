import {
  Building2, Route, Trees, Layers, Sprout, Droplets, Leaf, ClipboardCheck, PaintRoller, Wrench, Recycle, Users,
  Star, ShieldCheck, Lightbulb, Handshake, BadgeCheck, HardHat, Gauge, ListChecks, Timer, Truck, Headset, LineChart,
  Tractor, Construction, Snowflake, Landmark, Briefcase, Factory, Home, Hotel, Globe2, Cog,
  Eye, Search, ShieldAlert, Activity, type LucideIcon,
} from 'lucide-react'

const img = (n: string) => `/images/${n}`

export const IMG = {
  logoFull: img('logo-full.png'),
  mark: img('logo-mark.png'),
  markWhite: img('logo-mark-white.png'),
  heroWorker: img('hero-worker.jpg'),
  aboutMain: img('about-worker.jpg'),
  aboutSmall: img('blueprint-helmet.jpg'),
  garden: img('vision-garden.jpg'),
  valuesBg: img('values-bg.jpg'),
  safety: img('safety.jpg'),
  globe: img('globe.jpg'),
  rebar: img('rebar.jpg'),
  skyline: img('skyline.jpg'),
  blueprint: img('blueprint-helmet.jpg'),
  contact: img('contact-helmet.jpg'),
}

export const serviceImages: { src: string; pos: string }[] = [
  { src: img('villa-structure.jpg'), pos: 'center' },
  { src: img('skyline.jpg'), pos: 'center 80%' },
  { src: img('svc-pavers.jpg'), pos: 'center' },
  { src: img('svc-pavers.jpg'), pos: 'left center' },
  { src: img('vision-garden.jpg'), pos: 'center 70%' },
  { src: img('svc-pump.jpg'), pos: 'center' },
  { src: img('vision-garden.jpg'), pos: 'center 30%' },
  { src: img('safety.jpg'), pos: 'center 30%' },
  { src: img('painter.jpg'), pos: 'center' },
  { src: img('svc-electrical.jpg'), pos: 'center' },
  { src: img('globe.jpg'), pos: 'center' },
  { src: img('blueprint-helmet.jpg'), pos: 'center' },
]

export const projectImages: { main: string; gallery: string[] }[] = [
  { main: img('proj-pump.jpg'), gallery: [img('proj-pump-a.jpg'), img('svc-pump.jpg')] },
  { main: img('fence-desert.jpg'), gallery: [img('fence-hafar-a.jpg'), img('fence-hafar-b.jpg'), img('fence-hafar-c.jpg')] },
  { main: img('painter.jpg'), gallery: [img('villa-structure.jpg'), img('villa-facade.jpg')] },
  { main: img('fence-qassim.jpg'), gallery: [img('fence-desert.jpg')] },
]

export const valueIcons: LucideIcon[] = [Star, HardHat, Leaf, Lightbulb, Handshake, BadgeCheck, ShieldCheck]
export const whyIcons: LucideIcon[] = [Gauge, Users, ClipboardCheck, Recycle, ShieldCheck, Handshake, Cog]
export const methodIcons: LucideIcon[] = [LineChart, ListChecks, Timer, BadgeCheck, Truck, Headset]
export const serviceIcons: LucideIcon[] = [Building2, Route, Trees, Layers, Sprout, Droplets, Leaf, ClipboardCheck, PaintRoller, Wrench, Recycle, Users]
export const equipmentIcons: LucideIcon[] = [Tractor, Droplets, Truck, Tractor, Construction, Truck, Snowflake]
export const equipmentCounts = [6, 4, 4, 4, 1, 2, 2]
export const industryIcons: LucideIcon[] = [Landmark, Briefcase, Factory, Home, Hotel, Route, Leaf, Building2]
export const safetyIcons: LucideIcon[] = [Cog, Search, ShieldAlert, Eye, HardHat, Activity]
export { Globe2 }
