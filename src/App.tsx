import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import About from "./components/About"
import Process from "./components/Process"
import Projects from "./components/Projects"
import SkillsMatrix from "./components/SkillsMatrix"
import ContactFooter from "./components/ContactFooter"

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <motion.div
      style={{
        position: "fixed",
        top: "72px",
        left: 0,
        right: 0,
        height: "2px",
        backgroundColor: "var(--color-accent)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 49,
        opacity: 0.85,
      }}
    />
  )
}

export default function App() {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text1)" }}
    >
      {/* 1. Ambient Mood Lighting */}
      <div aria-hidden="true" className="ambient-glow" />

      {/* 2. Grid Pattern Layer (catches the light above it) */}
      <div 
        aria-hidden="true"
        className="bg-grid-pattern pointer-events-none fixed inset-0 z-0" 
      />

      <Nav />
      <ScrollProgress />
      <main
        className="relative z-10 max-w-none"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Hero />
        <About />
        <Process />
        <Projects />
        <SkillsMatrix />
        <ContactFooter />
      </main>
    </div>
  )
}