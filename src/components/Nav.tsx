import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import resumePdf from "./docs/resume/RESUME.pdf"

const links = ["about", "process", "projects", "skills", "contact"]

export default function Nav() {
  const [active, setActive] = useState("about")
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoCursor, setLogoCursor] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setLogoCursor((v) => !v), 530)
    return () => clearInterval(id)
  }, [reduced])

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l === "about" ? "about" : l))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActive(id === "about" ? "about" : id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 border-b"
      style={{
        height: "72px",
        backgroundColor: "rgba(10, 13, 18, 0.95)",
        borderColor: "var(--color-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-sm select-none"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
          >
            [DEV/
            <span
              style={{
                display: "inline-block",
                width: "0.55ch",
                backgroundColor: "var(--color-accent)",
                height: "1em",
                verticalAlign: "text-bottom",
                opacity: logoCursor ? 1 : 0,
                transition: "opacity 0.1s",
              }}
            />
            ]
          </span>
          <span
            className="text-sm font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text1)" }}
          >
            James Ian Bayonas
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setActive(link)}
              className="relative text-sm lowercase transition-colors duration-150 pb-1"
              style={{
                fontFamily: "var(--font-mono)",
                color: active === link ? "var(--color-accent)" : "var(--color-text2)",
              }}
            >
              {link}
              {active === link && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: "var(--color-accent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}

          {/* Direct Download Button */}
          {/* Desktop Link */}
          <a
            href={resumePdf}
            download="James_Ian_Bayonas_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-150 px-4 py-1.5 border cursor-pointer"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text1)",
              borderColor: "var(--color-border)",
            }}
          >
            Resume
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-px"
            style={{ backgroundColor: "var(--color-text1)" }}
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-px"
            style={{ backgroundColor: "var(--color-text1)" }}
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-5 h-px"
            style={{ backgroundColor: "var(--color-text1)" }}
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden border-t px-10 py-6 flex flex-col gap-4"
            style={{
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-border)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => { setActive(link); setMenuOpen(false) }}
                className="text-sm lowercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: active === link ? "var(--color-accent)" : "var(--color-text2)",
                }}
              >
                {link}
              </a>
            ))}
            
            {/* Mobile Link */}
            <a
              href={resumePdf}
              download="James_Ian_Bayonas_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 border w-fit cursor-pointer"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text1)",
                borderColor: "var(--color-border)",
              }}
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}