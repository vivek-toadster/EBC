# EBC — Environmental Boulevard for Contracting
Premium animated bilingual (EN / AR, RTL) corporate website prototype.
Frontend only: no backend, API, database or real form submission.

## Stack
React 18 · TypeScript · Vite · Tailwind CSS 3 · Framer Motion · Lenis (smooth scroll) · Lucide React

## 1. Requirements
- Node.js 18 or newer (20+ recommended) and npm
  Check with: `node -v` and `npm -v`

## 2. Install
```bash
cd ebc-website
npm install
```
This installs everything listed in `package.json`. To install packages manually instead:
```bash
npm install react react-dom framer-motion lenis lucide-react
npm install -D vite @vitejs/plugin-react typescript tailwindcss@3 postcss autoprefixer @types/react @types/react-dom
```

## 3. Run (development)
```bash
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## 4. Production build
```bash
npm run build      # type-checks, then builds to /dist
npm run preview    # serves the production build locally
```

## Project structure
```
public/images/        photos + logo extracted from the company profile PDF
src/i18n/en.ts        English dictionary (source of the type)
src/i18n/ar.ts        Arabic dictionary (must match the English shape)
src/context/          LanguageContext – EN/AR switch, RTL, sessionStorage persistence
src/data/assets.ts    image + icon mapping for services, projects, values, equipment
src/components/       one file per section (Hero, About, Services, Projects, ...)
src/components/ui/    Reveal, SplitText, Counter, Magnetic, ParallaxImage, Modal
```

## Editing content
- All text lives in `src/i18n/en.ts` and `src/i18n/ar.ts`. Edit both.
- To swap a photo, replace the file in `public/images/` (keep the name) or change the path in `src/data/assets.ts`.
- Colors are in `tailwind.config.js` (forest, charcoal, offwhite, beige, sage, lime).

## Notes
- The language choice is kept for the browser session (sessionStorage).
- Reduced-motion users get no smooth scroll, no parallax and minimal animation.
- Fonts (Manrope, IBM Plex Sans Arabic) load from Google Fonts, so an internet connection is needed for them.
- Arabic spellings of project names (e.g. Olaisha, Osus) are transliterations — please have the client confirm them.
