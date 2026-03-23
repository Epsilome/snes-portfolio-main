"use client"

import React, { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useGame } from "../ConfigContext"
import { useSound } from "../SoundContext"
import Hearth from "./Hearth"
import TreasureChest from "./TreasureChest"

/* ═══════ Dialogue Bubble (for Hearth click) ═══════ */
function HearthDialogue({ visible, text }: { visible: boolean; text: string }) {
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      style={{
        position: "absolute",
        bottom: "calc(100% + 12px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--bg-desk-surface)",
        border: "2px solid var(--accent-color)",
        borderRadius: "4px",
        padding: "10px 16px",
        fontFamily: '"Press Start 2P", cursive',
        fontSize: "8px",
        color: "var(--accent-color)",
        textAlign: "center",
        whiteSpace: "nowrap",
        boxShadow: "0 0 20px var(--ambient-glow)",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div style={{ fontSize: "6px", opacity: 0.6, marginBottom: "4px" }}>★ JARVIS SAYS ★</div>
      {text}
      {/* Speech bubble tail */}
      <div
        style={{
          position: "absolute",
          bottom: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "8px solid var(--accent-color)",
        }}
      />
    </motion.div>
  )
}

/* ═══════ Room Object Wrapper ═══════ */
function RoomObject({
  id,
  label,
  onClick,
  children,
  style,
  gridArea,
}: {
  id: string
  label: string
  onClick: () => void
  children: React.ReactNode
  style?: React.CSSProperties
  gridArea: string
}) {
  const { setHoveredObject } = useGame()

  return (
    <button
      className="interactable-object"
      aria-label={label}
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={() => setHoveredObject(id)}
      onMouseLeave={() => setHoveredObject(null)}
      onFocus={() => setHoveredObject(id)}
      onBlur={() => setHoveredObject(null)}
      style={{
        gridArea,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        padding: 0,
        position: "relative",
        transition: "transform 0.3s ease",
        ...style,
      }}
    >
      {children}
    </button>
  )
}

/* ═══════ The Room ═══════ */
export default function InteractiveRoom() {
  const { setActiveView } = useGame()
  const { playSound } = useSound()
  const [showHearthDialogue, setShowHearthDialogue] = useState(false)

  const handleHearthClick = useCallback(() => {
    playSound("open")
    setShowHearthDialogue(true)
    setTimeout(() => setShowHearthDialogue(false), 4000)
  }, [playSound])

  const handleMonitorClick = useCallback(() => {
    playSound("open")
    setActiveView("MONITOR_ZOOM")
  }, [playSound, setActiveView])

  const handleLetterClick = useCallback(() => {
    playSound("open")
    setActiveView("LETTER_OPEN")
  }, [playSound, setActiveView])

  const handleShelfClick = useCallback(() => {
    playSound("open")
    setActiveView("GUESTBOOK_OPEN")
  }, [playSound, setActiveView])

  return (
    <div
      className="room-viewport"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Room background — desk surface */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 60%, var(--bg-desk) 0%, var(--bg-room) 70%)
          `,
          zIndex: 0,
        }}
      />

      {/* Desk workbench */}
      <div
        className="desk-container"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1100px",
          height: "calc(100vh - 80px)",
          maxHeight: "700px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto 1fr auto",
          gridTemplateAreas: `
            "monitor  monitor  hearth"
            "letter   letter   letter"
            "shelf    shelf    treasure"
          `,
          gap: "12px",
          padding: "24px",
          marginTop: 0,
          alignItems: "center",
        }}
      >
        {/* ═══════ MONITOR ═══════ */}
        <RoomObject id="monitor" label="Open the Quest Terminal" onClick={handleMonitorClick} gridArea="monitor">
          <motion.div
            whileHover={{ scale: 1.04, filter: "brightness(1.15)" }}
            whileTap={{ scale: 0.97 }}
            style={{ position: "relative" }}
          >
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 400 220"
              xmlns="http://www.w3.org/2000/svg"
              style={{ maxWidth: "400px", display: "block" }}
            >
              {/* Monitor body */}
              <rect x="20" y="10" width="360" height="170" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="4" />
              {/* Screen bezel */}
              <rect x="32" y="22" width="336" height="146" rx="2" fill="#111" stroke="#333" strokeWidth="2" />
              {/* Screen inner */}
              <rect x="36" y="26" width="328" height="138" fill="#0a0a0a" />
              {/* Scanlines */}
              <pattern id="scanlines-room" width="4" height="4" patternUnits="userSpaceOnUse">
                <rect width="4" height="2" fill="transparent" />
                <rect y="2" width="4" height="2" fill="rgba(0,255,65,0.03)" />
              </pattern>
              <rect x="36" y="26" width="328" height="138" fill="url(#scanlines-room)" />
              {/* Screen text */}
              <text x="55" y="70" fill="#00ff41" fontFamily="'Press Start 2P', cursive" fontSize="9">
                {">"} QUEST TERMINAL
              </text>
              <text x="55" y="95" fill="#00cc33" fontFamily="'Press Start 2P', cursive" fontSize="7" opacity="0.7">
                Click to access projects
              </text>
              <text x="55" y="115" fill="#00cc33" fontFamily="'Press Start 2P', cursive" fontSize="7" opacity="0.7">
                and quest logs...
              </text>
              {/* Blinking cursor */}
              <rect x="55" y="130" width="8" height="12" fill="#00ff41">
                <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
              </rect>
              {/* Stand */}
              <rect x="160" y="180" width="80" height="12" fill="#333" />
              <rect x="140" y="192" width="120" height="8" rx="2" fill="#444" />
              {/* Power LED */}
              <circle cx="200" cy="176" r="3" fill="#00ff41">
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            {/* Monitor label */}
            <div
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: "8px",
                color: "var(--accent-color)",
                textAlign: "center",
                marginTop: "4px",
                textShadow: "var(--ambient-text-glow)",
              }}
            >
              🖥️ QUEST TERMINAL
            </div>
          </motion.div>
        </RoomObject>

        {/* ═══════ HEARTH ═══════ */}
        <RoomObject id="hearth" label="Check current focus" onClick={handleHearthClick} gridArea="hearth">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} style={{ position: "relative" }}>
            <HearthDialogue visible={showHearthDialogue} text="Performance & Clean Architecture" />
            <Hearth focusText="" />
            <div
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: "8px",
                color: "var(--accent-color)",
                textAlign: "center",
                textShadow: "var(--ambient-text-glow)",
              }}
            >
              🔥 HEARTH
            </div>
          </motion.div>
        </RoomObject>

        {/* ═══════ LETTER (CENTER) ═══════ */}
        <RoomObject id="letter" label="Read the Artificer's Letter" onClick={handleLetterClick} gridArea="letter">
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="parchment"
            style={{
              maxWidth: "600px",
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
              cursor: "pointer",
              padding: "2rem",
            }}
          >
            <div
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: "12px",
                color: "var(--accent-color)",
                marginBottom: "12px",
                textShadow: "var(--ambient-text-glow)",
              }}
            >
              ✉ About Me
            </div>
            <p
              style={{
                fontSize: "9px",
                color: "var(--text-secondary)",
                lineHeight: "2",
              }}
            >
              Click to read the Artificer&apos;s letter...
              <br />
              <span style={{ fontSize: "7px", opacity: 0.5 }}>Experience • Skills • Education • Interests</span>
            </p>
            {/* Wax seal decoration */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                right: "16px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #cc2200 0%, #881100 100%)",
                border: "2px solid #ff4400",
                boxShadow: "0 2px 8px rgba(200,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              ★
            </div>
          </motion.div>
        </RoomObject>

        {/* ═══════ SHELF / MESSAGE TOME ═══════ */}
        <RoomObject id="shelf" label="Sign the Message Tome" onClick={handleShelfClick} gridArea="shelf">
          <motion.div
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Decorative pixel-art books + glowing tome */}
            <svg width="140" height="56" viewBox="0 0 140 56" style={{ imageRendering: "pixelated" }}>
              <rect x="4" y="8" width="12" height="40" fill="#5c30a0" rx="1" />
              <rect x="18" y="4" width="10" height="44" fill="#2060a0" rx="1" />
              <rect x="30" y="10" width="14" height="38" fill="#a04020" rx="1" />
              <rect x="46" y="6" width="10" height="42" fill="#206040" rx="1" />
              <rect x="58" y="12" width="12" height="36" fill="#806020" rx="1" />
              {/* Potion bottle */}
              <rect x="80" y="28" width="10" height="20" fill="#107050" rx="2" />
              <rect x="82" y="24" width="6" height="6" fill="#107050" />
              <rect x="83" y="22" width="4" height="4" fill="#206040" />
              <rect x="82" y="32" width="6" height="8" fill="#20c080" opacity="0.6" />
              {/* Glowing Message Tome */}
              <rect x="100" y="10" width="32" height="38" rx="2" fill="#2a1810" stroke="#8b6914" strokeWidth="2" />
              <rect x="104" y="14" width="24" height="30" fill="#1a0f0a" rx="1" />
              {/* Tome clasp */}
              <rect x="113" y="8" width="6" height="4" fill="#d4a844" rx="1" />
              {/* Tome glow */}
              <rect x="108" y="20" width="16" height="2" fill="#d4a844" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
              </rect>
              <rect x="108" y="26" width="12" height="2" fill="#d4a844" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2.3s" repeatCount="indefinite" />
              </rect>
              <rect x="108" y="32" width="14" height="2" fill="#d4a844" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.8s" repeatCount="indefinite" />
              </rect>
            </svg>
            <span
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: "7px",
                color: "#d4a844",
                textShadow: "0 0 8px rgba(212,168,68,0.3)",
              }}
            >
              📜 Message Tome
            </span>
          </motion.div>
        </RoomObject>

        {/* ═══════ TREASURE CHEST ═══════ */}
        <RoomObject id="treasure" label="Open the treasure chest" onClick={() => {}} gridArea="treasure">
          <motion.div whileHover={{ scale: 1.08, y: -4 }} whileTap={{ scale: 0.95 }}>
            <TreasureChest />
          </motion.div>
        </RoomObject>
      </div>
    </div>
  )
}
