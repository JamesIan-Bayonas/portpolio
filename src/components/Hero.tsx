import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

const linePairs = [
  {
    old: '  role: "builds websites for clients",',
    next: '  role: "architects scalable distributed systems",',
  },
  {
    old: '  approach: "solves bugs when they appear",',
    next: '  approach: "eliminates failure modes before production",',
  },
  {
    old: '  scope: "knows React and some backend",',
    next: '  scope: "owns the full stack, schema through deploy",',
  },
]

const CHAR_DELAY = 28
const LINE_STAGGER = 280
const INITIAL_PAUSE = 600

function DiffPanel() {
  const [typedLines, setTypedLines] = useState<string[]>(["", "", ""])
  const [visibleLines, setVisibleLines] = useState<boolean[]>([false, false, false])

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    function sleep(ms: number) {
      return new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        timers.push(id)
      })
    }

    async function run() {
      // Reset cleanly on each mount (handles Strict Mode double-invoke)
      setTypedLines(["", "", ""])
      setVisibleLines([false, false, false])

      await sleep(INITIAL_PAUSE)

      for (let i = 0; i < linePairs.length; i++) {
        if (cancelled) return
        if (i > 0) {
          await sleep(LINE_STAGGER)
          if (cancelled) return
        }

        const target = linePairs[i].next
        setVisibleLines((prev) => prev.map((v, j) => (j === i ? true : v)))

        for (let c = 1; c <= target.length; c++) {
          if (cancelled) return
          const lineIdx = i
          setTypedLines((prev) => prev.map((l, j) => (j === lineIdx ? target.slice(0, c) : l)))
          await sleep(CHAR_DELAY)
        }
      }
    }

    run()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div
      className="border"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
        </div>
        <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text2)" }}>
          developer.config.ts
        </span>
        <span
          className="ml-auto text-xs px-2 py-0.5 border"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-diff-add)",
            borderColor: "var(--color-border)",
            borderRadius: "4px",
          }}
        >
          +3 −3
        </span>
      </div>

      <div className="p-0 text-sm leading-7" style={{ fontFamily: "var(--font-mono)" }}>
        <DiffLine type="ctx">{"const config = {"}</DiffLine>
        <DiffLine type="ctx">{'  name: "James Ian Bayonas",'}</DiffLine>

        {linePairs.map((pair, i) => (
          <div key={i}>
            <DiffLine type="remove">{pair.old}</DiffLine>
            {visibleLines[i] && (
              <DiffLine type="add">
                {typedLines[i]}
                {typedLines[i].length < pair.next.length && (
                  <span
                    className="inline-block w-1.5 h-4 align-middle animate-pulse"
                    style={{ backgroundColor: "var(--color-accent)", marginLeft: "1px" }}
                  />
                )}
              </DiffLine>
            )}
          </div>
        ))}

        <DiffLine type="ctx">{"}"}</DiffLine>

        <div
          className="px-4 pt-4 pb-4 border-t text-xs italic"
          style={{
            borderColor: "var(--color-border)",
            fontFamily: "var(--font-serif)",
            color: "var(--color-text2)",
          }}
        >
          refactor: clarify self-description to match actual scope of work
        </div>
      </div>
    </div>
  )
}

function DiffLine({ type, children }: { type: "add" | "remove" | "ctx"; children: ReactNode }) {
  const prefix = type === "add" ? "+" : type === "remove" ? "−" : " "
  const color =
    type === "add"
      ? "var(--color-diff-add)"
      : type === "remove"
        ? "var(--color-diff-remove)"
        : "var(--color-text2)"
  const bg =
    type === "add"
      ? "rgba(63, 185, 99, 0.08)"
      : type === "remove"
        ? "rgba(226, 88, 75, 0.08)"
        : "transparent"

  return (
    <div className="flex items-baseline gap-3 px-4" style={{ backgroundColor: bg, minHeight: "28px" }}>
      <span className="text-xs w-3 shrink-0 select-none" style={{ color, opacity: 0.7 }}>
        {prefix}
      </span>
      <span
        style={{
          color,
          textDecoration: type === "remove" ? "line-through" : "none",
          opacity: type === "remove" ? 0.55 : 1,
          wordBreak: "break-all",
        }}
      >
        {children}
      </span>
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()

  function fadeUp(delay: number) {
    if (reduced) return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay } }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    }
  }

  return (
    <section id="about" className="relative z-10 min-h-screen flex items-center" style={{ paddingTop: "72px" }}>
      <div
        className="max-w-[1440px] mx-auto px-10 w-full grid gap-16 items-center"
        style={{ gridTemplateColumns: "55fr 45fr" }}
      >
        {/* Left */}
        <div className="flex flex-col gap-0">
          <motion.p
            {...fadeUp(0)}
            className="text-xs tracking-widest mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-text2)" }}
          >
            a3f9c2 — FULL-STACK DEVELOPER
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(40px, 4.5vw, 64px)",
              color: "var(--color-text1)",
            }}
          >
            Building scalable web systems where precision meets logic.
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base leading-relaxed max-w-md mb-8"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text2)" }}
          >
            I design and engineer full-stack systems—from transactional database schemas in MSSQL,
            PostgreSQL, and MySQL to reactive interfaces in React—with an emphasis on correctness,
            data integrity, and performance. Based in the Philippines, open to remote opportunities.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex items-center gap-4 mb-8">
            <motion.a
              href="#projects"
              className="text-sm px-6 py-3"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-bg)",
                display: "inline-block",
              }}
              whileHover={reduced ? {} : { y: -2, boxShadow: "0 0 28px -4px rgba(76, 158, 235, 0.5)" }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              Explore Work →
            </motion.a>
            <a
              href="https://github.com/JamesIan-Bayonas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-6 py-3 border transition-colors duration-150"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text1)",
                borderColor: "var(--color-border)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)"
                ;(e.currentTarget as HTMLElement).style.color = "var(--color-accent)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"
                ;(e.currentTarget as HTMLElement).style.color = "var(--color-text1)"
              }}
            >
              View GitHub
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="flex items-center gap-5">
            <a
              href="https://github.com/JamesIan-Bayonas"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150"
              style={{ color: "var(--color-text2)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text1)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text2)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/james-ian-bayonas-6a556323a/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150"
              style={{ color: "var(--color-text2)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text1)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text2)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right — diff panel */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <DiffPanel />
        </motion.div>
      </div>
    </section>
  )
}
