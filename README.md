# Rayan Taleb — Personal Portfolio

[![Production Build](https://img.shields.io/badge/Build-Passing-brightgreen)]()
[![React](https://img.shields.io/badge/React-19-blue?logo=react)]()
[![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)]()
[![Linter](https://img.shields.io/badge/Linter-Oxlint-orange)]()

> Modern, high-performance personal portfolio of **Rayan Taleb** — Web Developer & Software Engineer based in Algeria.

🌐 **Live Website:** [portfolio-lime-ten-41.vercel.app](https://portfolio-lime-ten-41.vercel.app/)

---

## 🎯 Overview

This portfolio is built to demonstrate modern frontend engineering practices, fast load times, and refined interactive UI design. It features a curated showcase of real-world projects with interactive browser mockups, responsive layouts, subtle animations, and strict adherence to accessibility and SEO standards.

---

## 🛠️ Tech Stack

- **UI & Framework:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using `@tailwindcss/vite` and modern CSS features)
- **Bundler & Build Tool:** [Vite 8](https://vite.dev/)
- **Linter & Code Quality:** [Oxlint](https://oxc.rs/)
- **Asset Processing:** [Sharp](https://sharp.pixelplumbing.com/) (for AVIF / WebP / Open Graph generation)
- **Deployment:** [Vercel](https://vercel.com/)

---

## ✨ Key Features

- **Semantic Document Outline:** Single semantic `<h1>`, proper heading hierarchy, and accessible landmark elements (`<nav>`, `<main>`, `<section>`, `<footer>`).
- **Interactive Project Showcase (`SelectedWork`):** Interactive browser mockup cards for real projects (*Maison Ember*, *Shoplify*, *VÉLOR*) with multi-image thumbnail carousels and smooth horizontal preview scrolling.
- **Micro-Interactions & GPU Effects:**
  - Dynamic spotlight border and card lighting via CSS custom properties (`--mouse-x`, `--mouse-y`) without React state re-renders.
  - Magnetic CTA button with physics-based hover pull in the Contact section.
  - Cursor-based portrait card parallax in the Hero section.
  - Ambient badge shimmer and line reveal animations.
- **Scroll-Aware Navigation (`Navbar`):** Frosted glass backdrop blur, active section scroll spy synchronized via `requestAnimationFrame`, and responsive mobile drawer.
- **Security Hardening:** Strict URL validation and protocol sanitization (`security.js`) preventing XSS on external outbound links.
- **Performance & Asset Optimization:**
  - Modern hero portrait `<picture>` element serving lightweight AVIF (quality 75) and WebP (quality 82) formats with a legacy fallback.
  - Lazy loading on off-screen screenshots and thumbnails.
  - Zero duplicate font imports and lean build outputs (< 80 kB gzipped JS).
- **Comprehensive SEO & Social Sharing:**
  - Complete Open Graph (Facebook, LinkedIn) and Twitter Card tags.
  - Custom high-resolution share image (`/og-image.jpg`, 1200 × 630 px).
  - Valid `sitemap.xml` and `robots.txt` configuration.
- **Accessibility & Motion Safety:** Full `@media (prefers-reduced-motion: reduce)` support disabling animations and transitions for users requesting reduced motion.

---

## 📁 Project Structure

```text
portfolio/
├── public/                 # Static assets copied directly to dist/
│   ├── projects/           # Optimized project WebP screenshot directories
│   ├── favicon.png         # High-res favicon
│   ├── favicon.svg         # Scalable vector favicon
│   ├── og-image.jpg        # 1200x630 social share card
│   ├── portrait.*          # Hero portraits (AVIF, WebP, JPG)
│   ├── robots.txt          # Search engine crawler directives
│   └── sitemap.xml         # XML sitemap with canonical URL
├── src/
│   ├── components/         # React 19 view sections
│   │   ├── AboutMe.jsx     # Personal background & credentials
│   │   ├── Contact.jsx     # Social channels & magnetic CTA
│   │   ├── Footer.jsx      # Copyright & smooth back-to-top
│   │   ├── Hero.jsx        # Headline & interactive portrait
│   │   ├── Navbar.jsx      # Scroll spy & mobile navigation
│   │   ├── ProjectCard.jsx # Browser preview & thumbnail strip
│   │   ├── SelectedWork.jsx# Featured projects list wrapper
│   │   └── Services.jsx    # Service offerings & spotlight cards
│   ├── data/
│   │   └── projects.js     # Project showcase metadata & screenshot lists
│   ├── utils/
│   │   ├── security.js     # Safe URL sanitization helper
│   │   └── spotlight.js    # High-performance 60fps cursor spotlight utility
│   ├── App.jsx             # Main application layout wrapper
│   ├── index.css           # Tailwind v4 import & custom animation classes
│   └── main.jsx            # React root mount (StrictMode)
├── index.html              # HTML5 entry with complete SEO & social metadata
├── package.json            # Project dependencies and npm scripts
└── vite.config.js          # Vite 8 configuration with React & Tailwind plugins
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20 or later recommended)
- npm (or compatible package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rayan-tl-tech/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build

Create an optimized, minified production build in the `dist/` directory:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Code Quality & Linting

Run Oxlint to check code quality and React 19 best practices:
```bash
npm run lint
```

---

## 👤 Author

**Rayan Taleb**
- Portfolio: [portfolio-lime-ten-41.vercel.app](https://portfolio-lime-ten-41.vercel.app/)
- GitHub: [@Rayan-tl-tech](https://github.com/Rayan-tl-tech)
- LinkedIn: [Rayan Taleb](https://www.linkedin.com/in/rayan-taleb-736ab5438/)
- Email: [rayan.taleb.dev@gmail.com](mailto:rayan.taleb.dev@gmail.com)

---

## 📄 License

This project is personal and private. All rights reserved.
