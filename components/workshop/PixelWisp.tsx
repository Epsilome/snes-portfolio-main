"use client"

import React, { useEffect, useRef, useState } from "react"
import { useGame } from "../ConfigContext"

/* ═══════ Hint messages for room objects ═══════ */
const ROOM_HINTS: Record<string, string> = {
  monitor: "Access the Quest Terminal",
  hearth: "View Current Focus",
  letter: "Read the Artificer's Letter",
  treasure: "A secret awaits...",
  shelf: "Sign the Message Tome",
}

/* Legacy section hints for classic mode */
const SECTION_HINTS: Record<string, string> = {
  "section-hero": "Your journey begins here!",
  "section-about": "Learn about the Artificer",
  "section-experience": "Battle history ahead",
  "section-skills": "Check the alchemy shelf",
  "section-education": "Quest journal entries",
  "section-projects": "Browse the inventory",
  "section-interests": "The Artificer's hobbies",
  "section-treasure": "A secret awaits...",
}

/* ═══════ Ambient Firefly ═══════ */
interface Firefly {
  id: number
  x: number
  y: number
  size: number
  speed: number
  drift: number
  phase: number
  opacity: number
}

function createFireflies(count: number): Firefly[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    speed: 0.3 + Math.random() * 0.5,
    drift: Math.random() * 360,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.2 + Math.random() * 0.4,
  }))
}

function AmbientFireflies() {
  const [fireflies] = useState(() => createFireflies(7))
  const [tick, setTick] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    let t = 0
    const animate = () => {
      t += 0.01
      setTick(t)
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      {fireflies.map((f) => {
        const x = f.x + Math.sin(tick * f.speed + f.phase) * f.drift * 0.05
        const y = f.y + Math.cos(tick * f.speed * 0.7 + f.phase) * 2
        const glow = f.opacity * (0.5 + 0.5 * Math.sin(tick * 2 + f.phase))
        return (
          <div
            key={f.id}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              borderRadius: "50%",
              background: "var(--accent-color)",
              opacity: glow,
              boxShadow: `0 0 ${f.size * 3}px ${f.size}px var(--accent-color)`,
              transition: "opacity 0.3s ease",
            }}
          />
        )
      })}
    </div>
  )
}

/* ═══════ Cursor-Following Fairy (JARVIS Game Guide) ═══════ */
function CursorFairy() {
  const { hoveredObject, classicMode } = useGame()
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [fairyPos, setFairyPos] = useState({ x: -100, y: -100 })
  const [hint, setHint] = useState("")
  const [isIdle, setIsIdle] = useState(false)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef<number>(0)
  const mousePosRef = useRef({ x: -100, y: -100 })
  const fairyPosRef = useRef({ x: -100, y: -100 })

  /* ── Determine if fairy is in "game guide" mode (gold) ── */
  const isGuiding = !!hoveredObject

  /* ── Determine the hint text ── */
  useEffect(() => {
    if (hoveredObject) {
      setHint(ROOM_HINTS[hoveredObject] ?? "")
    }
  }, [hoveredObject])

  // Track mouse position (also handles section hints in classic mode)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsIdle(false)

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000)

      // Only do DOM-based hints in classic mode or when no room object is hovered
      if (classicMode && !hoveredObject) {
        const target = document.elementFromPoint(e.clientX, e.clientY)
        if (target) {
          const section = target.closest("section[id]")
          if (section) {
            const id = section.id
            if (SECTION_HINTS[id]) {
              setHint(SECTION_HINTS[id]!)
              return
            }
          }
          const btn = target.closest("a, button")
          if (btn) {
            setHint("Click me!")
            return
          }
        }
        setHint("")
      }
    }

    const onLeave = () => {
      mousePosRef.current = { x: -100, y: -100 }
      setIsIdle(true)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [classicMode, hoveredObject])

  // Smooth follow animation
  useEffect(() => {
    const animate = () => {
      const mx = mousePosRef.current.x
      const my = mousePosRef.current.y
      const fx = fairyPosRef.current.x
      const fy = fairyPosRef.current.y

      const targetX = mx + 30
      const targetY = my - 35
      const newX = fx + (targetX - fx) * 0.08
      const newY = fy + (targetY - fy) * 0.08

      fairyPosRef.current = { x: newX, y: newY }
      setFairyPos({ x: newX, y: newY })

      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  if (mousePos.x < 0 && mousePos.y < 0) return null

  /* Colors: gold when guiding, accent when idle */
  const fairyColor = isGuiding ? "#ffd700" : "var(--accent-color)"
  const displayHint = hoveredObject ? ROOM_HINTS[hoveredObject] ?? "" : hint

  return (
    <div
      style={{
        position: "fixed",
        left: fairyPos.x,
        top: fairyPos.y,
        zIndex: 9999,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* 8-bit Tooltip */}
      {displayHint && !isIdle && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "4px",
            background: "var(--bg-desk-surface)",
            border: `2px solid ${fairyColor}`,
            borderRadius: "4px",
            padding: "3px 8px",
            fontFamily: '"Press Start 2P", cursive',
            fontSize: "6px",
            color: fairyColor,
            whiteSpace: "nowrap",
            opacity: 0.95,
            boxShadow: `0 0 12px ${isGuiding ? "rgba(255,215,0,0.4)" : "var(--ambient-glow)"}`,
          }}
        >
          {displayHint}
        </div>
      )}

      {/* Fairy sprite — pixel-art winged orb */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          imageRendering: "pixelated",
          filter: `drop-shadow(0 0 ${isGuiding ? "10px" : "6px"} ${fairyColor})`,
          animation: isIdle ? "wisp-float 2s ease-in-out infinite" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {/* Left wing */}
        <rect x="2" y="10" width="4" height="2" fill={fairyColor} opacity="0.5" />
        <rect x="4" y="8" width="4" height="2" fill={fairyColor} opacity="0.4" />
        <rect x="4" y="12" width="4" height="2" fill={fairyColor} opacity="0.3" />

        {/* Right wing */}
        <rect x="22" y="10" width="4" height="2" fill={fairyColor} opacity="0.5" />
        <rect x="20" y="8" width="4" height="2" fill={fairyColor} opacity="0.4" />
        <rect x="20" y="12" width="4" height="2" fill={fairyColor} opacity="0.3" />

        {/* Wing flap animation */}
        <rect x="2" y="9" width="5" height="4" fill={fairyColor} opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="0.4s" repeatCount="indefinite" />
        </rect>
        <rect x="21" y="9" width="5" height="4" fill={fairyColor} opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="0.4s" repeatCount="indefinite" />
        </rect>

        {/* Core body — diamond */}
        <rect x="12" y="8" width="4" height="2" fill={fairyColor} />
        <rect x="10" y="10" width="8" height="2" fill={fairyColor} />
        <rect x="10" y="12" width="8" height="2" fill={fairyColor} />
        <rect x="10" y="14" width="8" height="2" fill={fairyColor} />
        <rect x="12" y="16" width="4" height="2" fill={fairyColor} />

        {/* Core highlight */}
        <rect x="12" y="11" width="4" height="3" fill="white" opacity="0.7" />
        <rect x="11" y="12" width="2" height="2" fill="white" opacity="0.3" />

        {/* Sparkle trail */}
        <rect x="8" y="6" width="2" height="2" fill={fairyColor} opacity="0.4">
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1s" repeatCount="indefinite" />
        </rect>
        <rect x="19" y="18" width="2" height="2" fill={fairyColor} opacity="0.3">
          <animate attributeName="opacity" values="0.3;0;0.3" dur="1.3s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
  )
}

/* ═══════ Combined Export ═══════ */
export default function PixelWisp() {
  return (
    <>
      <AmbientFireflies />
      <CursorFairy />
    </>
  )
}
