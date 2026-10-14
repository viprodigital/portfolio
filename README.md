# Ruban — Enterprise Portfolio & Technical Field Guide

A world-class, production-grade personal portfolio and technical engineering knowledge base designed and engineered for **Ruban** — Network Engineer, Systems Architect, and AI Strategist.

Built with a premium dark navy design system, purple/blue/cyan luminous accents, 3D Three.js particle constellation network, authentic credentials, and a high-performance repository-controlled technical blog.

**Live URL**: [https://portfolio-omega-six-vei2m47p70.vercel.app/](https://portfolio-omega-six-vei2m47p70.vercel.app/)

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase PostgreSQL credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### 3. Initialize PostgreSQL Database Schema
Execute the SQL script located in [`supabase/schema.sql`](file:///f:/Webapp%20Dev/Portfolio/supabase/schema.sql) in your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql). This creates the `messages` and `posts` tables with Row Level Security (RLS) policies.

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Production Build & Static Site Generation
```bash
npm run build
npm run start
```

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14.2 (App Router)](https://nextjs.org/)
- **UI Library**: [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Motion & Interactions**: [Framer Motion 11](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) (Custom particle mesh with mouse parallax)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Content Engine**: Repository-controlled MDX + [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Dynamic OG Images**: `@vercel/og` (`next/og`) Edge Image generation
- **Micro-interactions**: Canvas Confetti for resume download and contact forms

---

## 🎨 Design System & Palette

- **Background Navy**: `#080B11` / `#0B1120` (Deep Midnight Slate)
- **Primary Indigo Glow**: `#4F46E5` / `#6366F1`
- **Cyan Energy Accent**: `#06B6D4` / `#38BDF8`
- **Emerald Telemetry**: `#10B981` / `#34D399`
- **Glass Surfaces**: `rgba(255, 255, 255, 0.03)` with `backdrop-blur-xl` and `1px` subtle keyline border
- **Typography**: `Inter` for layout and body text, `Fira Code` for terminal consoles and syntax blocks

---

## 🚀 Key Features & Architectural Upgrades

### 1. Rounded Hero Profile with Subtle Glow
- Features Ruban's actual photograph ([`public/images/ruban-profile.jpg`](file:///f:/Webapp%20Dev/Portfolio/public/images/ruban-profile.jpg)) with gradient keyline border, subtle ambient glow, active telemetry ring, and credentials summary.
- Interactive live NOC console with dynamic status checks and quick services grid.
- Dynamic keyword typing stream and resume PDF download button with confetti burst.

### 2. Validated Certifications Section
- Prominently showcases Ruban's authentic verified credentials:
  - **FortiGate 7.6 Operator** (Fortinet Training Institute, verified certificate PDF preview and download).
  - **Cisco Routing & Switching Architecture** (Catalyst switching, VLANs, OSPF, CCNA track).
  - **AWS Cloud & Hybrid Identity Architecture** (IAM Identity Center, VPC, hybrid AD DS).
  - **B.Tech in Computer Science & Engineering** (PKIET, Pondicherry University).
- Interactive modal with certificate verification details and direct PDF downloads.

### 3. Complete Technical Blog (`/blog` & `/blog/[slug]`)
- **Route `/blog`**:
  - Live fuzzy search across titles, descriptions, categories, and tags.
  - Category filter pills (`All`, `Networking`, `Security`, `Linux`, `Cloud`).
  - Tag cloud selector.
  - Featured guide spotlight card.
  - Responsive article cards with reading times, dates, tags, and category chips.
  - Drafts strictly hidden from public viewers.
- **Route `/blog/[slug]`**:
  - Static Site Generation (SSG) with `generateStaticParams()`.
  - Sticky interactive Table of Contents (TOC) with scroll-spy active state tracking.
  - Rich Markdown renderer supporting GitHub-style alerts (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`), tables, and blockquotes.
  - Syntax-highlighted code blocks with line numbers, language badges, and working "Copy Code" button with visual feedback.
  - Author bio card with Ruban's photo and direct social links.
  - Related articles grid matching categories and tags.
  - Share buttons for LinkedIn, Twitter/X, and clipboard copy.

### 4. Five Original Starter Tutorials
1. **Cisco Catalyst Switch Initial Configuration & Hardening Guide**: Console setup, password encryption (scrypt), SSHv2, Port Security, Rapid-PVST+, BPDU Guard, and 802.1Q trunks.
2. **FortiGate 7.6 Firewall Lab Guide**: Policy routing, Source NAT (PAT), Destination NAT (Virtual IPs), Next-Gen Security Profiles (AV, IPS, Web Filter), and SSL-VPN tunnels.
3. **Essential Linux Commands & Troubleshooting for Systems Engineers**: Systemd services, journalctl, socket inspection (`ss`), packet capture (`tcpdump`), storage hunting, and SSH daemon hardening.
4. **Mastering VLANs and Inter-VLAN Routing**: Router-on-a-Stick (ROAS) vs Layer 3 Switch SVIs, 802.1Q sub-interfaces, DHCP relay (`ip helper-address`), and ACLs.
5. **Implementing Zero Trust Security Architecture**: NIST SP 800-207 framework, identity perimeters, 802.1X NAC with Cisco ISE, and micro-segmentation.

### 5. Comprehensive SEO & Syndication
- **Dynamic OpenGraph Image**: Edge runtime generator in [`app/opengraph-image.tsx`](file:///f:/Webapp%20Dev/Portfolio/app/opengraph-image.tsx) outputting a 1200x630 branded social preview.
- **RSS 2.0 Feed**: Live XML endpoint at [`/feed.xml`](file:///f:/Webapp%20Dev/Portfolio/app/feed.xml/route.ts).
- **XML Sitemap**: Dynamic sitemap at `/sitemap.xml` automatically indexing all published non-draft articles.
- **Robots.txt**: Search crawler directives protecting private admin and API paths.
- **Schema.org Structured Data**: `TechArticle` JSON-LD embedded on every article.

### 6. Contact Form & Anti-Spam Security
- Server-side validated Next.js API route at [`/api/contact`](file:///f:/Webapp%20Dev/Portfolio/app/api/contact/route.ts).
- Validates name, RFC-compliant email, subject, and message length.
- Hidden honeypot field traps automated spam bots silently.
- Inserts submissions directly into Supabase PostgreSQL `messages` table with graceful fallback.

### 7. Secure Admin Dashboard (`/admin`)
- Accessible via [`/admin/login`](file:///f:/Webapp%20Dev/Portfolio/app/admin/login/page.tsx) with Supabase Email/Password authentication.
- Full CRUD management for technical articles stored persistently in PostgreSQL (no fake localStorage).
- Publish, edit, toggle drafts, or delete posts.
- Live contact message viewer to inspect incoming client inquiries.

---

## 🚢 Vercel Deployment Guide

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Upgrade portfolio with blog, certifications, and admin portal"
   git push origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/):
   - Import your GitHub repository.
   - Framework Preset: **Next.js**.
   - Root Directory: `./`.
3. Add Environment Variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
4. Deploy! Vercel will automatically build static pages for all routes.

---

## 🛡️ License

MIT License &copy; 2026 Ruban. Built with pride for high-performance networks and mission-critical systems.
