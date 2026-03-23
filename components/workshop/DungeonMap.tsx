"use client"

import React, { useState, useEffect, useCallback } from "react"

/* ═══════ Section definitions matching page.tsx exactly ═══════ */
interface Section {
  id: string
  icon: string
  label: string
}

const SECTIONS: Section[] = [
  { id: "section-hero", icon: "🖥️", label: "Terminal" },
  { id: "section-about", icon: "📜", label: "About Me" },
  { id: "section-experience", icon: "📋", label: "Experience" },
  { id: "section-skills", icon: "⚗️", label: "Skills" },
  { id: "section-education", icon: "📓", label: "Education" },
  { id: "section-projects", icon: "🎒", label: "Projects" },
  { id: "section-interests", icon: "📚", label: "Interests" },
  { id: "section-treasure", icon: "🎁", label: "Secret" },
]

export default function DungeonMap() {
  const [activeIdx, setActiveIdx] = useState(0)

  /* Scroll-based tracking — use scroll position directly for reliability */
  const updateActive = useCallback(() => {
    const viewMid = window.innerHeight * 0.4

    let bestIdx = 0
    let bestDist = Infinity

    SECTIONS.forEach((sec, idx) => {
      const el = document.getElementById(sec.id)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const sectionMid = rect.top + rect.height / 2
      const dist = Math.abs(sectionMid - viewMid)
      if (rect.top < viewMid + 200 && dist < bestDist) {
        bestDist = dist
        bestIdx = idx
      }
    })

    setActiveIdx(bestIdx)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener("scroll", updateActive)
  }, [updateActive])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav className="dungeon-map" aria-label="Section navigation">
      {/* Title */}
      <div className="dungeon-map-title">MAP</div>

      {/* Section list */}
      <div className="dungeon-map-list">
        {SECTIONS.map((sec, idx) => {
          const isActive = idx === activeIdx
          const isPast = idx < activeIdx

          return (
            <React.Fragment key={sec.id}>
              {/* Section node */}
              <div
                className={`dungeon-map-node ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
                onClick={() => scrollTo(sec.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") scrollTo(sec.id)
                }}
              >
                <span className="dungeon-map-icon">{sec.icon}</span>
                <span className="dungeon-map-label">{sec.label}</span>
              </div>

              {/* Connecting line */}
              {idx < SECTIONS.length - 1 && (
                <div
                  className={`dungeon-map-line ${idx < activeIdx ? "past" : ""} ${idx === activeIdx ? "active" : ""}`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </nav>
  )
}
