# James Ian Bayonas — Developer Portfolio & Systems Showcase

> **Executive Summary:** A high-performance, dark-mode developer portfolio and engineering showcase built with React 19, TypeScript, Vite 8, and Tailwind CSS v4. Engineered to present complex full-stack architectures and project telemetry with sub-frame fluid animations, strict accessibility (WCAG reduced-motion conformance), and zero runtime bloat.

<p align="center">
  <a href="https://portpolio-dun.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Production%20Demo-Click%20To%20Launch-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

---

## Overview & Architectural Deep Dive

### Core Business Problem & Purpose

Modern technical recruiting requires immediate signal clarity: demonstrating full-stack engineering proficiency, architectural rigor, and system-level trade-offs within seconds. This application serves as an interactive systems portfolio, presenting production-grade architectural blueprints (including distributed logistics, clinical POS, and OCR validation engines) through a developer-focused user experience that mirrors high-end IDEs and terminal diff interfaces.

### Technical Challenges & Engineering Trade-offs

* **The Challenge:** Coordinating continuous viewport-driven ambient lighting, cursor-tracked radial spotlights, and scroll-linked interpolation without causing CSS transform conflicts, layout recalculation storms, or dropped frames on low-powered devices.
* **The Solution:** Implemented CSS `left: calc(50% - 450px)` layout math to isolate horizontal centering from the GPU layer, allowing Framer Motion to animate `scale` and `opacity` MotionValues independently. Integrated deep `useReducedMotion` hooks across all component lifecycles to instantly snap rendering states and bypass continuous animation loops for users with motion sensitivities.
* **The Trade-off:** Selected client-side MotionValue physics and native CSS variables over heavy Canvas/WebGL runtime renderers. This trade-off drastically reduces initial JavaScript bundle weight and memory footprint while maintaining consistent 60fps rendering across desktop and mobile viewports.

---

## Tech Stack & Architecture Matrix

| Layer | Technology | Primary Package / Driver | Architectural Role |
| --- | --- | --- | --- |
| **Frontend UI** | React 19 | `react`, `react-dom` | Component composition, reactive state trees, and hook-based viewport monitoring |
| **Language & Typing** | TypeScript 5.7 | `typescript` | End-to-end static typing, strict null checks, and path alias mapping |
| **Animation Engine** | Motion / Framer Motion | `motion`, `framer-motion` | Spring-physics scroll progress, coordinate tracking, and viewport triggers |
| **Styling & Design System** | Tailwind CSS v4 | `@tailwindcss/vite`, `@theme` | Zero-runtime CSS variable design tokens, monospace scales, and responsive grids |
| **Build & Bundling** | Vite 8 | `vite`, `@vitejs/plugin-react` | Hot Module Replacement (HMR), ESM tree-shaking, and asset compilation |
| **Code Formatting** | oxfmt | `oxfmt` | High-speed Rust-based code formatting and syntax consistency |

---

## Key Features & Engineering Capabilities

* **Interactive Git Diff Terminal Simulation (`Hero.tsx`):** Simulates an asynchronous character-by-character typewriter diff with automatic cancellation cleanup (`clearTimeout`) and Strict Mode mounting safeguards → **Impact:** Communicates core engineering philosophy through an interactive code diff without memory leaks or race conditions.
* **Viewport-Aware Intersection Navigation (`Nav.tsx`):** Employs an `IntersectionObserver` configured with tuned dual-root margins (`-40% 0px -55% 0px`) and layout-spring animations (`layoutId="nav-pill"`) → **Impact:** Guarantees sub-pixel active-state tracking across variable section heights during rapid user scrolling.
* **Hardware-Accelerated Ambient Atmosphere (`App.tsx`):** Coordinates scroll position (`scrollY`) with dynamic element opacity and scaling transformations, gracefully snapping to static layouts when reduced motion is requested → **Impact:** Delivers depth and visual continuity while adhering strictly to WCAG 2.1 accessibility criteria.
* **Cursor-Tracked Spotlight Lighting (`SpotlightCard.tsx`):** Real-time client bounding-box calculation that generates smooth, localized radial gradient highlights on hover → **Impact:** Provides tactile micro-interactions with zero third-party canvas overhead.
* **Dynamic Project Telemetry & Diff Metrics (`Projects.tsx`):** Renders dynamic count-up additions/deletions badges triggered upon viewport intersection alongside architecture summaries → **Impact:** Highlights full-stack domain accomplishments across .NET 8, Laravel 11, Node.js, and SQL systems.

---

## Project Structure

```text
├── .gitattributes              # Git LFS tracking rules for media and assets
├── .gitignore                  # Git exclusion definitions (build artifacts, dependencies)
├── .mise.toml                  # Tool version manager lock (Node 22, pnpm 10.34.3)
├── index.html                  # HTML entry point with metadata and root mount target
├── package.json                # Project dependencies, scripts, and runtime engine specs
├── public/
│   └── RESUME.pdf              # Direct static downloadable resume asset
├── src/
│   ├── App.tsx                 # Root application wrapper, scroll progress & ambient engine
│   ├── index.css               # Tailwind v4 @theme tokens, IBM Plex imports & grid masks
│   ├── main.tsx                # StrictMode React DOM root initialization
│   ├── vite-env.d.ts           # Ambient type declarations for Vite clients and PDF imports
│   ├── components/
│   │   ├── About.tsx           # Systems thinking philosophy & discipline capabilities
│   │   ├── ContactFooter.tsx   # Direct contact endpoints, external links & footer bar
│   │   ├── Hero.tsx            # Diff panel typewriter simulation & primary CTA
│   │   ├── Nav.tsx             # Responsive header with scroll tracking & mobile drawer
│   │   ├── Process.tsx         # Engineering workflow: Schema -> Component -> Deployment
│   │   ├── Projects.tsx        # Selected system case studies with diff stat counters
│   │   ├── SkillsMatrix.tsx    # Categorized tooling matrix with contribution heatmaps
│   │   ├── docs/demo/          # Showcase project image assets
│   │   │   ├── centralog-demo.png
│   │   │   ├── dorm-fix-demo.png
│   │   │   ├── isdalog-demo.png
│   │   │   └── pharmalink-demo.png
│   │   └── ui/
│   │       └── SpotlightCard.tsx # Reusable cursor-driven radial glow container
├── tsconfig.json               # TypeScript compiler config with bundler module resolution
└── vite.config.ts              # Vite bundler configuration with Tailwind v4 & path aliases

```

---

## Getting Started & Local Setup

### Prerequisites

* **Runtime:** Node.js >= 22.0.0
* **Package Manager:** pnpm >= 10.34.3 (or npm / yarn / bun)

### Installation & Execution

1. **Clone the Repository:**
```bash
git clone https://github.com/JamesIan-Bayonas/developer-portfolio.git
cd developer-portfolio

```


2. **Install Dependencies:**
```bash
pnpm install

```


3. **Start the Development Server:**
```bash
pnpm dev

```


The application will be accessible at `http://localhost:5173`.
4. **Build for Production:**
```bash
pnpm build

```


5. **Preview Production Build:**
```bash
pnpm preview

```



---

## Verification & Testing

```bash
# Run source code formatting via oxfmt
pnpm format

# Run TypeScript type validation and Vite build
pnpm build

```

---

## Security & Operational Readiness

* **Reverse Tabnabbing Protection:** All external anchor tags (`GitHub`, `LinkedIn`, live demo links) enforce `rel="noopener noreferrer"` with `target="_blank"` to eliminate window opener vulnerabilities.
* **XSS Mitigation:** Static JSX compilation with zero reliance on `dangerouslySetInnerHTML` or unrestricted string evaluation.
* **Asset Integrity & Bundling:** Deterministic dependency resolution locked via `pnpm` and `.mise.toml`, built into static distribution bundles with subresource integrity support.
