import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import SpotlightCard from "./ui/SpotlightCard"

// 1. Import image assets directly
import dormFixImg from "./docs/demo/dorm-fix-demo.png"
import isdaLogImg from "./docs/demo/isdalog-demo.png"
import pharmaLinkImg from "./docs/demo/pharmalink-demo.png"
import centraLogImg from "./docs/demo/centralog-demo.png"

const projects = [
  {
    num: "01",
    hash: "7e1d40",
    title: "DORMFIX — Property & Dormitory Management System",
    description:
      "A full-stack dormitory management platform featuring a Zero-Trust AI payment verification pipeline (Tesseract OCR + LLM receipt audit), ACID-compliant room capacity allocation in MSSQL, real-time WebSocket communication, and automated maintenance triaging.",
    tech: ["React 19", "TypeScript", "Node.js", "Express 5", "MSSQL", "Tesseract.js", "Gemini AI", "Socket.io", "Tailwind CSS"],
    additions: 1240,
    deletions: 182,
    demo: "https://dormfix-jamesian-bayonas-projects.vercel.app",
    source: "https://github.com/JamesIan-Bayonas/dormfix",
    image: dormFixImg,
    imageAlt: "Dormitory management dashboard",
  },
  {
    num: "02",
    hash: "b2c8f1",
    title: "ISDALOG — Maritime Catch Consignment & Escrow Logistics Ecosystem",
    description:
      "An autonomous maritime catch consignment and cold-chain logistics platform coupling an Edge-to-Cloud AI Telegram gateway (Gemini 2.5 Flash + Ollama LLaVA vision fallback) with a real-time Laravel/Inertia core, sub-second Reverb WebSocket bidding, cryptographic dual-OTP custody handshakes, and automated wallet escrow settlements.",
    tech: ["Laravel 11", "React 18", "Inertia.js", "Laravel Reverb", "Node.js", "Gemini AI", "Ollama", "Leaflet", "MySQL", "Tailwind CSS"],
    additions: 1540,
    deletions: 210,
    demo: "https://isdalog-production.up.railway.app",
    source: "https://github.com/JamesIan-Bayonas/isdalog",
    image: isdaLogImg,
    imageAlt: "Maritime logistics platform",
  },
  {
    num: "03",
    hash: "d4a391",
    title: "PHARMALINK — Clinical Pharmacy Inventory & POS System",
    description:
      "A high-availability clinical pharmacy management and POS platform built with ASP.NET Core 8 and Dapper. Features atomic ACID-compliant multi-table sales transactions, automated stock deduction and void restoration, custom JWT role-based access control (Admin/Pharmacist), and real-time expiration audits.",
    tech: ["ASP.NET Core 8", "C#", "React 19", "TypeScript", "PostgreSQL", "Dapper", "JWT Auth", "Tailwind CSS", "Recharts"],
    additions: 1120,
    deletions: 145,
    demo: "https://pharmalink-web-wine.vercel.app/dashboard",
    source: "https://github.com/JamesIan-Bayonas/pharmalink",
    image: pharmaLinkImg,
    imageAlt: "Pharmacy inventory and POS system",
  },
  {
    num: "04",
    hash: "9fe05c",
    title: "CENTRALOG — Institutional Asset Telemetry & Depreciation Ledger",
    description:
      "An enterprise hardware resource management and financial accounting platform built with .NET 8 and React 19. Features dynamic straight-line/double-declining depreciation accounting adjusting for repair downtime, an autonomous 60-second preventative maintenance background daemon, atomic bulk transfers with audit trails, and printable QR sticker queues.",
    tech: ["ASP.NET Core 8", "C#", "React 19", "TypeScript", "EF Core 8", "MySQL", "JWT Auth", "Vitest", "xUnit"],
    additions: 1420,
    deletions: 165,
    demo: "https://centralog.vercel.app/",
    source: "https://github.com/JamesIan-Bayonas/centralog",
    image: centraLogImg,
    imageAlt: "Asset telemetry and depreciation dashboard",
  },
]

function useCountUp(target: number, duration = 600) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) { setValue(target); return }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced, started, target])

  useEffect(() => {
    if (!started || reduced) return
    let frame: number
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, reduced, target, duration])

  return { value, ref }
}

function DiffStatBadge({ additions, deletions }: { additions: number; deletions: number }) {
  const add = useCountUp(additions)
  const del = useCountUp(deletions)
  return (
    <div
      ref={add.ref}
      className="absolute top-4 right-4 z-20 flex items-center gap-2 border px-3 py-1"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        borderRadius: "4px",
      }}
    >
      <span className="text-xs font-mono" style={{ color: "var(--color-diff-add)" }}>+{add.value}</span>
      <span className="text-xs font-mono" style={{ color: "var(--color-text2)" }}>/</span>
      <span className="text-xs font-mono" style={{ color: "var(--color-diff-remove)" }}>−{del.value}</span>
    </div>
  )
}

const VIEW = { once: true, margin: "-80px" } as const
const EASE = [0.16, 1, 0.3, 1] as const

export default function Projects() {
  const reduced = useReducedMotion()

  return (
    <section
      id="projects"
      className="relative z-10"
      style={{ padding: "96px 40px", borderTop: "1px solid var(--color-border)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.p
          className="text-xs tracking-widest mb-16 font-mono"
          style={{ color: "var(--color-text2)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.55 }}
        >
          7e1d40 — SELECTED WORK
        </motion.p>

        {projects.map((project, i) => {
          const isEven = i % 2 === 1

          const visual = (
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: isEven ? 28 : -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              <SpotlightCard
                className="relative border flex items-center justify-center overflow-hidden p-2"
                style={{
                  aspectRatio: "16/9",
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  borderRadius: "4px",
                }}
              >
                <DiffStatBadge additions={project.additions} deletions={project.deletions} />
                <motion.img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover rounded-[2px]"
                  style={{ opacity: 0.85 }}
                  whileHover={reduced ? {} : { scale: 1.03, opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </SpotlightCard>
            </motion.div>
          )

          const content = (
            <motion.div
              className="flex flex-col justify-center"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
              whileHover={reduced ? {} : { y: -4 }}
            >
              <p className="text-xs mb-3 font-mono" style={{ color: "var(--color-text2)" }}>
                {project.hash} · {project.num} of 04
              </p>
              <h3
                className="mb-4 leading-tight font-display font-semibold"
                style={{ fontSize: "clamp(22px, 2vw, 30px)", color: "var(--color-text1)" }}
              >
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed mb-6 font-body" style={{ color: "var(--color-text2)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t, ti) => (
                  <motion.span
                    key={t}
                    className="text-xs px-3 py-1 border font-mono"
                    style={{
                      color: "var(--color-text2)",
                      borderColor: "var(--color-border)",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEW}
                    transition={{ duration: 0.35, delay: 0.25 + ti * 0.04 }}
                    whileHover={reduced ? {} : { borderColor: "var(--color-accent)", color: "var(--color-text1)" }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-5 py-2.5 border font-mono transition-colors duration-150"
                  style={{ color: "var(--color-text1)", borderColor: "var(--color-border)" }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)"
                    ;(e.currentTarget as HTMLElement).style.color = "var(--color-accent)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"
                    ;(e.currentTarget as HTMLElement).style.color = "var(--color-text1)"
                  }}
                >
                  Live Demo
                </a>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-5 py-2.5 font-mono transition-colors duration-150"
                  style={{ color: "var(--color-text2)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text1)" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text2)" }}
                >
                  Source Code
                </a>
              </div>
            </motion.div>
          )

          return (
            <div
              key={project.num}
              className="grid gap-16 items-center"
              style={{
                gridTemplateColumns: "1fr 1fr",
                marginBottom: i < projects.length - 1 ? "96px" : 0,
              }}
            >
              {isEven ? <>{content}{visual}</> : <>{visual}{content}</>}
            </div>
          )
        })}
      </div>
    </section>
  )
}