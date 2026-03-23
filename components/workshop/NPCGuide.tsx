"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"

const NPC_LINES: Record<string, string[]> = {
  "section-hero": [
    "Welcome, adventurer! Scroll to explore the workshop.",
    "A new challenger approaches! ...Oh wait, it's a recruiter.",
    "Press START to begin your quest!",
  ],
  "section-about": [
    "The Artificer reveals their craft...",
    "Every hero has an origin story.",
    "Full-stack? More like Full-quest!",
  ],
  "section-experience": [
    "A scroll of past battles unfurls!",
    "These internships were the training arc.",
    "XP gained: +3000. Level up!",
  ],
  "section-skills": [
    "Rare alchemy ingredients found here!",
    "TypeScript: +99 ATK. Angular: +85 DEF.",
    "The potion is almost ready...",
  ],
  "section-education": [
    "Knowledge is the true XP source.",
    "CPGE: the hardest dungeon in Morocco.",
    "A wise sage once said: study hard.",
  ],
  "section-projects": [
    "Choose your quest wisely, adventurer.",
    "Each project is a boss battle conquered.",
    "Inventory full! Time to showcase.",
  ],
  "section-interests": [
    "A hero needs hobbies too!",
    "D&D player spotted in the wild!",
    "Reading: because mana needs recharging.",
  ],
}

export default function NPCGuide() {
  const [activeSection, setActiveSection] = useState("section-hero")
  const [displayedText, setDisplayedText] = useState("")
  const [targetText, setTargetText] = useState("")
  const prevSectionRef = useRef("section-hero")
  const typewriterRef = useRef<NodeJS.Timeout | null>(null)

  // Track scroll position
  useEffect(() => {
    const sectionIds = Object.keys(NPC_LINES)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  // Pick a new line when section changes
  useEffect(() => {
    if (activeSection !== prevSectionRef.current) {
      prevSectionRef.current = activeSection
      const lines = NPC_LINES[activeSection] ?? NPC_LINES["section-hero"]!
      const line = lines[Math.floor(Math.random() * lines.length)]!
      setTargetText(line)
    }
  }, [activeSection])

  // Initialize first line
  useEffect(() => {
    const lines = NPC_LINES["section-hero"]!
    setTargetText(lines[0]!)
  }, [])

  // Typewriter effect
  const typewriterCallback = useCallback(() => {
    if (typewriterRef.current) clearInterval(typewriterRef.current)
    setDisplayedText("")
    let i = 0
    typewriterRef.current = setInterval(() => {
      i++
      setDisplayedText(targetText.slice(0, i))
      if (i >= targetText.length) {
        if (typewriterRef.current) clearInterval(typewriterRef.current)
      }
    }, 35)
    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current)
    }
  }, [targetText])

  useEffect(() => {
    return typewriterCallback()
  }, [typewriterCallback])

  return (
    <div className="npc-guide">
      {/* Speech bubble */}
      <div className="npc-speech-bubble">
        <span style={{ fontFamily: '"Press Start 2P", cursive', fontSize: "8px", lineHeight: "2" }}>
          {displayedText}
          <span className="typewriter-cursor" style={{ fontSize: "8px" }} />
        </span>
      </div>

      {/* NPC Sprite — Pixel-art Wizard */}
      <svg
        width="72"
        height="84"
        viewBox="0 0 48 56"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated", display: "block", margin: "0 auto" }}
      >
        {/* Hat */}
        <rect x="20" y="0" width="8" height="4" fill="#4a2080" />
        <rect x="16" y="4" width="16" height="4" fill="#5c30a0" />
        <rect x="12" y="8" width="24" height="4" fill="#5c30a0" />
        {/* Hat brim */}
        <rect x="8" y="12" width="32" height="4" fill="#4a2080" />
        {/* Star on hat */}
        <rect x="22" y="5" width="4" height="4" fill="var(--accent-color)" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
        </rect>

        {/* Face */}
        <rect x="14" y="16" width="20" height="12" fill="#e8c898" />
        {/* Eyes */}
        <rect x="18" y="20" width="4" height="4" fill="#2a1a0a" />
        <rect x="26" y="20" width="4" height="4" fill="#2a1a0a" />
        {/* Eye highlight */}
        <rect x="18" y="20" width="2" height="2" fill="white" opacity="0.5" />
        <rect x="26" y="20" width="2" height="2" fill="white" opacity="0.5" />
        {/* Nose */}
        <rect x="22" y="23" width="4" height="2" fill="#d4a878" />
        {/* Beard */}
        <rect x="14" y="28" width="20" height="4" fill="#c8c8c8" />
        <rect x="16" y="32" width="16" height="4" fill="#b8b8b8" />
        <rect x="18" y="36" width="12" height="4" fill="#a8a8a8" />
        <rect x="20" y="40" width="8" height="2" fill="#989898" />

        {/* Robe */}
        <rect x="12" y="28" width="4" height="16" fill="#5c30a0" />
        <rect x="32" y="28" width="4" height="16" fill="#5c30a0" />
        <rect x="16" y="36" width="4" height="8" fill="#4a2080" />
        <rect x="28" y="36" width="4" height="8" fill="#4a2080" />

        {/* Staff (left hand) */}
        <rect x="8" y="24" width="4" height="28" fill="#8B6914" />
        <rect x="6" y="22" width="8" height="4" fill="var(--accent-color)">
          <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
        </rect>

        {/* Feet */}
        <rect x="16" y="44" width="6" height="4" fill="#3a1860" />
        <rect x="26" y="44" width="6" height="4" fill="#3a1860" />
      </svg>

      {/* NPC label */}
      <div
        style={{
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "7px",
          color: "var(--accent-color)",
          textAlign: "center",
          marginTop: "8px",
          opacity: 0.7,
          letterSpacing: "1px",
        }}
      >
        SAGE OTTY
      </div>
    </div>
  )
}
