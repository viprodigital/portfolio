# Ruban — Premium Personal Portfolio Website

A world-class, Awwwards-inspired personal portfolio engineered for **Ruban** — Network Engineer, Systems Architect, and AI Strategist.

Built to compete with top-tier designs from Apple, Stripe, Linear, and Framer with modern dark aesthetics, glassmorphism, Three.js 3D interactive particle network, and Framer Motion spring physics.

---

## ⚡ Quick Start

### 1. Development Server
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live website.

### 2. Production Build & Start
```bash
npm run build
npm run start
```

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **UI Library**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Motion & Interactions**: [Framer Motion](https://www.framer.com/motion/)
- **3D Interactive Graphics**: [Three.js](https://threejs.org/) (Constellation particle network with mouse parallax)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: Canvas Confetti for resume download and contact form dispatch
- **Fonts**: Next.js Google Fonts (`Inter` + `Fira Code`)

---

## 🎨 Design System & Color Palette

- **Background**: `#0B1120` (Deep Midnight Slate)
- **Primary**: `#4F46E5` (Indigo Glow)
- **Secondary**: `#7C3AED` (Violet Neon)
- **Accent**: `#06B6D4` (Cyan Energy)
- **Glass Cards**: `rgba(255, 255, 255, 0.05)` with `backdrop-blur-xl` and `1px` subtle border
- **Typography**: `Inter` for clean corporate readability, `Fira Code` for terminal & tech badges

---

## 🧭 Project Architecture

```
app/
 ├── layout.tsx         # Root layout with fonts, OpenGraph, Twitter card, SEO
 ├── page.tsx           # Main page orchestrating all 9 sections
 ├── globals.css        # Aurora gradients, glassmorphism, scrollbars, accessibility
 ├── icon.svg           # High-resolution brand emblem
 ├── robots.ts          # Search engine crawler directives
 └── sitemap.ts         # XML Sitemap generator
components/
 ├── Navbar.tsx         # Sticky glass navbar with scroll spy & mobile menu
 ├── Hero.tsx           # Typing animation, exact bio, Three.js canvas & terminal
 ├── About.tsx          # 2-column layout, count-up statistics & skill pills
 ├── Skills.tsx         # Grouped cards with animated progress bars & filters
 ├── Experience.tsx     # Timeline layout with 2.5+ years enterprise breakdown
 ├── Projects.tsx       # 4 premium cards with visual architecture diagrams
 ├── Services.tsx       # 6 high-impact service offerings with CTAs
 ├── Contact.tsx        # Interactive form with validation & confetti dispatch
 ├── Footer.tsx         # Quick links, copyright & smooth back-to-top
 └── ui/
     ├── ThreeCanvas.tsx    # 3D interactive node constellation with mouse parallax
     ├── GlassCard.tsx      # 3D tilt with dynamic glare
     ├── ProjectModal.tsx   # Architectural deep-dive case study modal
     ├── SectionHeading.tsx # Linear/Apple badge & gradient title
     └── TechBadge.tsx      # Neon tech chips
lib/
 ├── constants.ts       # Central data store for all content & projects
 ├── animations.ts      # Framer Motion variants & spring configurations
 └── utils.ts           # Tailwind merge helper
public/
 ├── resume.pdf         # Printable enterprise resume for instant download
 └── icon.svg           # Browser tab icon
```

---

## 🎯 Verification & Quality Metrics

- **TypeScript**: Strict type check passing with 0 errors
- **Lighthouse Performance**: Optimized with Next.js App Router static pre-rendering
- **Accessibility**: Full WCAG AA focus rings, semantic HTML5 landmarks, aria-labels, and reduced-motion fallback
- **SEO Ready**: Dynamic sitemap (`/sitemap.xml`), robots directive (`/robots.txt`), OpenGraph meta tags, and Canonical URLs.
