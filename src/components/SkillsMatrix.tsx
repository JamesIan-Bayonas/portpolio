import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

const columns = [
  {
    category: "Frontend",
    tools: [
      { name: "React", activity: [3, 5, 4, 7, 6, 7, 7] },
      { name: "TypeScript", activity: [4, 5, 6, 7, 7, 6, 7] },
      { name: "Next.js", activity: [2, 4, 5, 6, 6, 7, 6] },
      { name: "Tailwind CSS", activity: [3, 4, 5, 6, 7, 7, 6] },
      { name: "Vite", activity: [1, 2, 3, 4, 5, 5, 6] },
    ],
  },
  {
    category: "Backend & APIs",
    tools: [
      { name: "Node.js", activity: [4, 5, 6, 7, 7, 7, 6] },
      { name: "Express", activity: [3, 5, 6, 6, 7, 6, 5] },
      { name: "GraphQL", activity: [1, 2, 3, 4, 5, 5, 4] },
      { name: "REST", activity: [5, 6, 7, 7, 7, 7, 7] },
      { name: "tRPC", activity: [1, 1, 2, 3, 4, 5, 5] },
    ],
  },
  {
    category: "Databases & DevOps",
    tools: [
      { name: "PostgreSQL", activity: [3, 5, 6, 7, 7, 7, 6] },
      { name: "Redis", activity: [1, 2, 3, 4, 5, 5, 4] },
      { name: "Docker", activity: [2, 3, 4, 5, 5, 6, 5] },
      { name: "AWS", activity: [1, 2, 3, 4, 4, 5, 4] },
      { name: "CI/CD", activity: [2, 3, 4, 4, 5, 5, 5] },
    ],
  },
  {
    category: "Tools & Version Control",
    tools: [
      { name: "Git & GitHub", activity: [5, 6, 7, 7, 7, 7, 7] },
      { name: "Figma", activity: [2, 3, 4, 5, 5, 4, 4] },
      { name: "VS Code", activity: [5, 7, 7, 7, 7, 7, 7] },
      { name: "Postman", activity: [2, 3, 4, 4, 5, 4, 4] },
      { name: "Linear", activity: [1, 2, 3, 4, 4, 5, 4] },
    ],
  },
]

const activityLabels = ["Rarely", "Occasionally", "Sometimes", "Regularly", "Often", "Frequently", "Daily"]
const VIEW = { once: true, margin: "-80px" } as const
const EASE = [0.16, 1, 0.3, 1] as const

function ActivitySquare({ level, delay, isRowHovered }: { level: number; delay: number; isRowHovered: boolean }) {
  const [tooltip, setTooltip] = useState(false)
  const reduced = useReducedMotion()
  const baseOpacity = 0.1 + (level / 7) * 0.85

  return (
    <div style={{ position: "relative" }}>
      <motion.span
        className="inline-block cursor-default"
        style={{
          width: "9px",
          height: "9px",
          borderRadius: "2px",
          backgroundColor: "var(--color-diff-add)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: baseOpacity, scale: 1 }}
        viewport={VIEW}
        animate={{
          opacity: tooltip || isRowHovered ? 1 : baseOpacity,
          scale: tooltip ? 1.35 : 1,
        }}
        transition={{ delay: reduced ? 0 : delay, duration: 0.35 }}
        onHoverStart={() => setTooltip(true)}
        onHoverEnd={() => setTooltip(false)}
      />
      {tooltip && (
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "4px",
            padding: "2px 6px",
            fontSize: "10px",
            fontFamily: "var(--font-mono)",
            color: "var(--color-text1)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {activityLabels[level - 1] ?? "None"}
        </div>
      )}
    </div>
  )
}

function ContributionStrip({ activity, isRowHovered }: { activity: number[]; isRowHovered: boolean }) {
  const reduced = useReducedMotion()
  return (
    <div className="flex items-center gap-0.5">
      {activity.map((level, i) => (
        <ActivitySquare key={i} level={level} delay={reduced ? 0 : i * 0.03} isRowHovered={isRowHovered} />
      ))}
    </div>
  )
}

export default function SkillsMatrix() {
  const reduced = useReducedMotion()
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <section
      id="skills"
      className="relative z-10"
      style={{ padding: "96px 40px", borderTop: "1px solid var(--color-border)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.p
          className="text-xs tracking-widest mb-16"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-text2)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.55 }}
        >
          a1d2e3 — TECHNICAL SKILLS
        </motion.p>

        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {columns.map((col, ci) => (
            <motion.div
              key={col.category}
              className="border p-6 relative overflow-hidden group"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                borderRadius: "4px",
              }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.55, delay: ci * 0.07, ease: EASE }}
              whileHover={reduced ? {} : { y: -4, borderColor: "rgba(76,158,235,0.4)" }}
            >
              {/* glow on hover */}
              {!reduced && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(ellipse at top, rgba(76,158,235,0.06) 0%, transparent 70%)",
                  }}
                />
              )}

              <h3
                className="text-sm pb-4 mb-4 border-b relative z-10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: "var(--color-text1)",
                  borderColor: "var(--color-border)",
                }}
              >
                {col.category}
              </h3>

              {/* underline expand on hover */}
              <div
                className="mb-4 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: "var(--color-accent)", marginTop: "-16px" }}
              />

              <div className="flex flex-col relative z-10">
                {col.tools.map((tool, i) => (
                  <div key={tool.name}>
                    <div
                      className="flex items-center justify-between py-2.5 cursor-default"
                      onMouseEnter={() => setHoveredTool(tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      <span
                        className="text-sm transition-colors duration-150"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: hoveredTool === tool.name ? "var(--color-text1)" : "var(--color-text1)",
                        }}
                      >
                        {tool.name}
                      </span>
                      <ContributionStrip
                        activity={tool.activity}
                        isRowHovered={hoveredTool === tool.name}
                      />
                    </div>
                    {i < col.tools.length - 1 && (
                      <div className="h-px" style={{ backgroundColor: "var(--color-border)", opacity: 0.5 }} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
