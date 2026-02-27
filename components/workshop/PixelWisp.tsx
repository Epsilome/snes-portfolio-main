"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

/**
 * JARVIS Orb — multi-layered SVG that tracks the active section title on scroll.
 * Falls back to gentle floating when no section is in the viewport.
 */
export default function PixelWisp() {
  const [targetY, setTargetY] = useState(28)
  const [currentY, setCurrentY] = useState(28)
  const [rightPos, setRightPos] = useState(20)
  const frameRef = useRef<number>(0)
  const targetYRef = useRef(28)

  /* Track which section title is closest to viewport center */
  const updateTarget = useCallback(() => {
    const titles = document.querySelectorAll(".section-title")
    if (!titles.length) return

    const viewportCenter = window.innerHeight / 2
    let closest: Element | null = null
    let closestDist = Infinity

    titles.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter)
      if (dist < closestDist) {
        closestDist = dist
        closest = el
      }
    })

    if (closest) {
      const rect = (closest as HTMLElement).getBoundingClientRect()
      // Position the orb next to the title (vertically centered)
      const newY = rect.top + rect.height / 2 - 24 // center the 48px orb
      targetYRef.current = Math.max(20, Math.min(window.innerHeight - 70, newY))
      setTargetY(targetYRef.current)
    }

    // Calculate right position relative to desk container
    const desk = document.querySelector(".desk-container")
    if (desk) {
      const deskRect = desk.getBoundingClientRect()
      const deskRight = deskRect.right
      // Position orb just inside the desk's right edge
      setRightPos(window.innerWidth - deskRight + 16)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => updateTarget()
    const onResize = () => updateTarget()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    updateTarget()

    // Smooth animation loop
    const animate = () => {
      setCurrentY((prev) => {
        const diff = targetYRef.current - prev
        if (Math.abs(diff) < 0.5) return targetYRef.current
        return prev + diff * 0.06
      })
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [updateTarget])

  return (
    <div
      style={{
        position: "fixed",
        top: currentY,
        right: rightPos,
        zIndex: 100,
        transition: "top 0.15s linear",
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: "wisp-float 3s ease-in-out infinite" }}
      >
        {/* Outer shimmer ring */}
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="1.5"
          strokeDasharray="6 4 2 4"
          opacity="0.4"
          style={{ animation: "shimmer-rotate 8s linear infinite", transformOrigin: "24px 24px" }}
        />

        {/* Outer glow */}
        <circle cx="24" cy="24" r="18" fill="url(#wisp-glow-v2)" opacity="0.3" />
        {/* Mid pulsing layer */}
        <circle cx="24" cy="24" r="12" fill="url(#wisp-mid-v2)" opacity="0.5">
          <animate attributeName="r" values="12;14;12" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.3;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Core orb — pixel art diamond shape */}
        <rect x="22" y="16" width="4" height="2" fill="var(--accent-color)" />
        <rect x="20" y="18" width="8" height="2" fill="var(--accent-color)" />
        <rect x="18" y="20" width="12" height="2" fill="var(--accent-color)" />
        <rect x="18" y="22" width="12" height="2" fill="var(--accent-color)" />
        <rect x="18" y="24" width="12" height="2" fill="var(--accent-color)" />
        <rect x="20" y="26" width="8" height="2" fill="var(--accent-color)" />
        <rect x="22" y="28" width="4" height="2" fill="var(--accent-color)" />

        {/* Core highlight */}
        <rect x="22" y="20" width="4" height="4" fill="#fff" opacity="0.7" />
        <rect x="20" y="22" width="2" height="2" fill="#fff" opacity="0.3" />

        {/* Orbiting sparkle dots */}
        <rect x="10" y="12" width="2" height="2" fill="var(--accent-color)" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="36" y="16" width="2" height="2" fill="var(--accent-color)" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="8" y="30" width="2" height="2" fill="var(--accent-color)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite" />
        </rect>
        <rect x="38" y="34" width="2" height="2" fill="var(--accent-color)" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0;0.3" dur="1.8s" repeatCount="indefinite" />
        </rect>
        <rect x="14" y="38" width="2" height="2" fill="var(--accent-color)" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.6s" repeatCount="indefinite" />
        </rect>

        <defs>
          <radialGradient id="wisp-glow-v2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wisp-mid-v2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
