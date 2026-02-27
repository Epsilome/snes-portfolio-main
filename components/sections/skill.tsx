"use client"

import React from "react"
import { motion } from "framer-motion"

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const shelfSlide = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

/* ═══════ Detailed 8-bit SVG Icons ═══════ */

/** Glowing Potion Bottle — green liquid with bubbles and cork */
const PotionIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated" }}
  >
    {/* Cork */}
    <rect x="13" y="2" width="6" height="3" fill="#A07818" />
    <rect x="14" y="2" width="2" height="1" fill="#c8a84e" />
    {/* Bottle neck */}
    <rect x="14" y="5" width="4" height="3" fill="rgba(200,220,255,0.3)" />
    <rect x="14" y="5" width="1" height="3" fill="rgba(255,255,255,0.15)" />
    {/* Bottle body */}
    <rect x="10" y="8" width="12" height="2" fill="rgba(200,220,255,0.25)" />
    <rect x="8" y="10" width="16" height="14" fill="rgba(200,220,255,0.2)" />
    {/* Liquid */}
    <rect x="9" y="14" width="14" height="10" fill="#00cc44" opacity="0.7" />
    <rect x="9" y="14" width="14" height="2" fill="#44ff88" opacity="0.4" />
    {/* Bubbles */}
    <rect x="12" y="18" width="2" height="2" fill="#88ffaa" opacity="0.6" />
    <rect x="17" y="16" width="2" height="2" fill="#88ffaa" opacity="0.4" />
    <rect x="14" y="20" width="2" height="2" fill="#88ffaa" opacity="0.3" />
    {/* Highlight */}
    <rect x="10" y="10" width="2" height="6" fill="rgba(255,255,255,0.2)" />
    {/* Bottom */}
    <rect x="8" y="24" width="16" height="2" fill="rgba(200,220,255,0.3)" />
    {/* Glow */}
    <rect x="8" y="14" width="16" height="10" fill="#00ff44" opacity="0.08" />
  </svg>
)

/** Crystal Ball — orb on stand with inner shimmer */
const CrystalBallIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated" }}
  >
    {/* Orb outline */}
    <rect x="12" y="4" width="8" height="2" fill="#aaccff" opacity="0.6" />
    <rect x="10" y="6" width="12" height="2" fill="#aaccff" opacity="0.5" />
    <rect x="8" y="8" width="16" height="2" fill="#8899cc" opacity="0.4" />
    <rect x="8" y="10" width="16" height="6" fill="#8899cc" opacity="0.35" />
    <rect x="8" y="16" width="16" height="2" fill="#8899cc" opacity="0.4" />
    <rect x="10" y="18" width="12" height="2" fill="#aaccff" opacity="0.5" />
    <rect x="12" y="20" width="8" height="2" fill="#aaccff" opacity="0.6" />
    {/* Inner shimmer */}
    <rect x="12" y="8" width="4" height="4" fill="#ffffff" opacity="0.3" />
    <rect x="10" y="10" width="2" height="2" fill="#ffffff" opacity="0.15" />
    {/* Sparkle inside */}
    <rect x="18" y="12" width="2" height="2" fill="#ddeeff" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
    </rect>
    <rect x="14" y="14" width="2" height="2" fill="#ddeeff" opacity="0.3">
      <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.7s" repeatCount="indefinite" />
    </rect>
    {/* Stand */}
    <rect x="12" y="22" width="8" height="2" fill="#8B6914" />
    <rect x="10" y="24" width="12" height="2" fill="#A07818" />
    <rect x="8" y="26" width="16" height="2" fill="#6B510F" />
  </svg>
)

/** Unopened Ancient Book — leather with clasp */
const BookIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated" }}
  >
    {/* Cover */}
    <rect x="6" y="4" width="20" height="22" fill="#8B4513" />
    <rect x="6" y="4" width="20" height="2" fill="#A0522D" />
    <rect x="6" y="24" width="20" height="2" fill="#654321" />
    {/* Spine */}
    <rect x="6" y="4" width="3" height="22" fill="#654321" />
    <rect x="7" y="6" width="1" height="18" fill="#8B4513" />
    {/* Spine ridges */}
    <rect x="6" y="8" width="3" height="1" fill="#553311" />
    <rect x="6" y="14" width="3" height="1" fill="#553311" />
    <rect x="6" y="20" width="3" height="1" fill="#553311" />
    {/* Cover emblem */}
    <rect x="14" y="10" width="6" height="2" fill="var(--accent-color)" opacity="0.6" />
    <rect x="16" y="8" width="2" height="6" fill="var(--accent-color)" opacity="0.6" />
    {/* Clasp */}
    <rect x="24" y="12" width="2" height="6" fill="#c8a84e" />
    <rect x="23" y="14" width="1" height="2" fill="#A07818" />
    {/* Page edges */}
    <rect x="9" y="6" width="15" height="1" fill="#f5e6c8" opacity="0.3" />
    <rect x="9" y="23" width="15" height="1" fill="#f5e6c8" opacity="0.3" />
  </svg>
)

/** Open Book icon for Languages */
const OpenBookIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated" }}
  >
    {/* Left page */}
    <rect x="2" y="6" width="13" height="18" fill="#f5e6c8" />
    <rect x="2" y="6" width="13" height="2" fill="#e8d5a8" />
    {/* Right page */}
    <rect x="17" y="6" width="13" height="18" fill="#f5e6c8" />
    <rect x="17" y="6" width="13" height="2" fill="#e8d5a8" />
    {/* Spine */}
    <rect x="15" y="4" width="2" height="22" fill="#8B4513" />
    {/* Text lines left */}
    <rect x="4" y="10" width="9" height="1" fill="#3d2b1f" opacity="0.3" />
    <rect x="4" y="13" width="8" height="1" fill="#3d2b1f" opacity="0.3" />
    <rect x="4" y="16" width="9" height="1" fill="#3d2b1f" opacity="0.3" />
    <rect x="4" y="19" width="6" height="1" fill="#3d2b1f" opacity="0.3" />
    {/* Text lines right */}
    <rect x="19" y="10" width="9" height="1" fill="#3d2b1f" opacity="0.3" />
    <rect x="19" y="13" width="8" height="1" fill="#3d2b1f" opacity="0.3" />
    <rect x="19" y="16" width="9" height="1" fill="#3d2b1f" opacity="0.3" />
    {/* Cover visible edges */}
    <rect x="1" y="5" width="14" height="1" fill="#8B4513" />
    <rect x="17" y="5" width="14" height="1" fill="#8B4513" />
    <rect x="1" y="24" width="14" height="1" fill="#8B4513" />
    <rect x="17" y="24" width="14" height="1" fill="#8B4513" />
  </svg>
)

const categoryIcons: Record<string, React.FC> = {
  Confident: PotionIcon,
  Comfortable: CrystalBallIcon,
  "Learning / Exploring": BookIcon,
  Languages: OpenBookIcon,
}

type Group = { category: string; items: string[]; note?: string }

export default function Skills() {
  const groups: Group[] = [
    {
      category: "Confident",
      items: ["TypeScript", "Next.js", "Angular", "HTML", "CSS", "REST APIs"],
      note: "Use daily; can design and ship features end-to-end",
    },
    {
      category: "Comfortable",
      items: ["Java", "Spring Boot", "Node.js", "Express.js", "MySQL", "Prisma"],
      note: "Backend CRUD, authentication, clean data models",
    },
    {
      category: "Learning / Exploring",
      items: ["Microservices", "Modular monorepos", "PocketBase", "Jest", "Docker", "Playwright"],
    },
    {
      category: "Languages",
      items: ["English (C1)", "French (C2)", "Arabic (Native)"],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true, margin: "-40px" }}
      className="workshop-panel"
    >
      <h2 className="section-title">⚗ Alchemy Ingredients</h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {groups.map((g) => {
          const Icon = categoryIcons[g.category] ?? PotionIcon
          return (
            <motion.div key={g.category} variants={shelfSlide} className="alchemy-shelf">
              {/* Shelf header with icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <Icon />
                <div>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "var(--accent-color)",
                      fontFamily: '"Press Start 2P", cursive',
                    }}
                  >
                    {g.category}
                  </span>
                  {g.note && <div style={{ fontSize: "7px", opacity: 0.5, marginTop: "2px" }}>{g.note}</div>}
                </div>
              </div>

              {/* Skill items on the shelf */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                {g.items.map((item) => (
                  <div key={item} className="power-up">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
