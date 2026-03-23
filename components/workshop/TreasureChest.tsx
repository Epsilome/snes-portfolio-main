"use client"

import React, { useState, useCallback } from "react"
import { useSound } from "../SoundContext"

interface Particle {
  id: number
  x: number
  color: string
  drift: number
  delay: number
}

export default function TreasureChest() {
  const [isOpen, setIsOpen] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [showLevelUp, setShowLevelUp] = useState(false)
  const { playSound } = useSound()

  const triggerLevelUp = useCallback(() => {
    if (isOpen) return
    setIsOpen(true)
    setShowLevelUp(true)
    playSound("open")

    const colors = ["#ffd700", "#ff6b35", "#ff4500", "#00d4ff", "#ff69b4", "#7cfc00"]
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 - 40,
      color: colors[Math.floor(Math.random() * colors.length)] ?? "#ffd700",
      drift: Math.random() * 60 - 30,
      delay: Math.random() * 0.3,
    }))
    setParticles(newParticles)

    setTimeout(() => {
      setParticles([])
      setShowLevelUp(false)
    }, 2000)

    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }, [isOpen])

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        padding: "2rem 0",
      }}
      onClick={triggerLevelUp}
    >
      {/* Particles — pointer-events: none to not block clicks */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `calc(50% + ${p.x}px)`,
            bottom: "60px",
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            // @ts-expect-error CSS custom property
            "--drift": `${p.drift}px`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Level Up text */}
      {showLevelUp && (
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: '"Press Start 2P", cursive',
            fontSize: "16px",
            color: "#ffd700",
            textShadow: "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)",
            animation: "level-up-text 1.5s ease-out forwards",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          ★ LEVEL UP! ★
        </div>
      )}

      {/* Treasure Chest SVG */}
      <svg width="80" height="72" viewBox="0 0 80 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chest Body */}
        <rect x="8" y="36" width="64" height="32" fill="#8B5E3C" />
        <rect x="8" y="36" width="64" height="4" fill="#A0784C" />
        <rect x="12" y="40" width="56" height="24" fill="#6B4226" />
        {/* Metal bands */}
        <rect x="8" y="36" width="64" height="2" fill="#C4A035" />
        <rect x="8" y="52" width="64" height="2" fill="#C4A035" />
        <rect x="8" y="66" width="64" height="2" fill="#C4A035" />
        {/* Left/right bands */}
        <rect x="8" y="36" width="3" height="32" fill="#C4A035" />
        <rect x="69" y="36" width="3" height="32" fill="#C4A035" />
        {/* Lock */}
        <rect x="34" y="46" width="12" height="10" fill="#C4A035" rx="1" />
        <rect x="38" y="50" width="4" height="4" fill="#8B5E3C" />

        {/* Lid */}
        <g
          style={{
            transformOrigin: "40px 36px",
            transform: isOpen ? "rotateX(-50deg)" : "rotateX(0deg)",
            transition: "transform 0.6s ease-out",
          }}
        >
          <rect x="6" y="20" width="68" height="18" rx="2" fill="#A0784C" />
          <rect x="6" y="20" width="68" height="4" fill="#B8925C" />
          {/* Lid bands */}
          <rect x="6" y="20" width="68" height="2" fill="#C4A035" />
          <rect x="6" y="36" width="68" height="2" fill="#C4A035" />
          <rect x="6" y="20" width="3" height="18" fill="#C4A035" />
          <rect x="71" y="20" width="3" height="18" fill="#C4A035" />
          {/* Lid top curve hint */}
          <rect x="10" y="18" width="60" height="4" rx="2" fill="#B8925C" />
        </g>

        {/* Glow from open chest */}
        {isOpen && (
          <rect x="14" y="30" width="52" height="8" fill="#ffd700" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="0.5s" repeatCount="indefinite" />
          </rect>
        )}
      </svg>

      {/* Label */}
      <span
        style={{
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "8px",
          color: "var(--accent-color)",
          marginTop: "8px",
          opacity: 0.7,
        }}
      >
        {isOpen ? "Opened!" : "🎁 Secret Gift"}
      </span>
    </div>
  )
}
