"use client"

import React from "react"
import { useGame } from "../ConfigContext"
import { useSound } from "../SoundContext"

export default function InventoryBar() {
  const { toggleTheme, isDayMode, classicMode, toggleClassicMode } = useGame()
  const { playSound, isMuted, toggleMute } = useSound()

  const slots = [
    { icon: "✉", label: "Email", href: "mailto:anaselmarzouqy@gmail.com" },
    { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/epsilome/", external: true },
    { icon: "🐙", label: "GitHub", href: "https://github.com/Epsilome", external: true },
    { icon: "📄", label: "CV", href: "/Anas-EL-MARZOUQY-CV.pdf", external: true },
  ]

  return (
    <nav
      className="inventory-bar"
      aria-label="Quick links and controls"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "8px 16px",
        background: "linear-gradient(0deg, var(--bg-desk) 0%, var(--bg-desk-surface) 100%)",
        borderTop: "3px solid var(--accent-color)",
        fontFamily: '"Press Start 2P", cursive',
        fontSize: "7px",
        transition: "background 0.8s ease, border-color 0.4s ease",
      }}
    >
      {/* Inventory Slots */}
      {slots.map((slot) => (
        <a
          key={slot.label}
          href={slot.href}
          target={slot.external ? "_blank" : undefined}
          rel={slot.external ? "noopener noreferrer" : undefined}
          className="inventory-slot interactable-object"
          aria-label={slot.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            padding: "6px 12px",
            border: "2px solid rgba(255,255,255,0.1)",
            borderRadius: "4px",
            background: "var(--bg-desk-surface)",
            color: "var(--text-primary)",
            textDecoration: "none",
            transition: "all 0.3s ease",
            minWidth: "56px",
          }}
        >
          <span style={{ fontSize: "16px" }}>{slot.icon}</span>
          <span style={{ opacity: 0.7 }}>{slot.label}</span>
        </a>
      ))}

      {/* Divider */}
      <div
        style={{
          width: "2px",
          height: "32px",
          background: "var(--accent-color)",
          opacity: 0.3,
          margin: "0 4px",
        }}
      />

      {/* Day/Night Toggle */}
      <button
        className="inventory-slot interactable-object"
        onClick={() => {
          playSound("toggle")
          toggleTheme()
        }}
        aria-label={`Switch to ${isDayMode ? "night" : "day"} mode`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 12px",
          border: "2px solid rgba(255,255,255,0.1)",
          borderRadius: "4px",
          background: "var(--bg-desk-surface)",
          color: "var(--accent-color)",
          cursor: "pointer",
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "7px",
          transition: "all 0.3s ease",
          minWidth: "56px",
        }}
      >
        <span style={{ fontSize: "16px" }}>{isDayMode ? "🏮" : "🌙"}</span>
        <span>{isDayMode ? "DAY" : "NIGHT"}</span>
      </button>

      {/* Sound Toggle */}
      <button
        className="inventory-slot interactable-object"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 12px",
          border: "2px solid rgba(255,255,255,0.1)",
          borderRadius: "4px",
          background: "var(--bg-desk-surface)",
          color: "var(--text-primary)",
          cursor: "pointer",
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "7px",
          opacity: isMuted ? 0.4 : 1,
          transition: "all 0.3s ease",
          minWidth: "56px",
        }}
      >
        <span style={{ fontSize: "16px" }}>{isMuted ? "🔇" : "🔊"}</span>
        <span>{isMuted ? "MUTED" : "SFX"}</span>
      </button>

      {/* Divider */}
      <div
        style={{
          width: "2px",
          height: "32px",
          background: "var(--accent-color)",
          opacity: 0.3,
          margin: "0 4px",
        }}
      />

      {/* Classic/Adventure Toggle */}
      <button
        className="inventory-slot interactable-object"
        onClick={toggleClassicMode}
        aria-label={classicMode ? "Switch to Adventure Mode" : "Switch to Classic Scroll Mode"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 12px",
          border: "2px solid var(--accent-color)",
          borderRadius: "4px",
          background: classicMode ? "rgba(232, 184, 64, 0.1)" : "var(--bg-desk-surface)",
          color: "var(--accent-color)",
          cursor: "pointer",
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "7px",
          transition: "all 0.3s ease",
          minWidth: "72px",
        }}
      >
        <span style={{ fontSize: "16px" }}>{classicMode ? "📜" : "🎮"}</span>
        <span>{classicMode ? "CLASSIC" : "EXPLORE"}</span>
      </button>
    </nav>
  )
}
