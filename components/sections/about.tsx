/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

/**
 * HERO — Terminal readout on a pixelated monitor SVG
 */
export default function HeroTerminal() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "> ANAS EL MARZOUQY"
  const lineRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (lineRef.current < fullText.length) {
        lineRef.current++
        setDisplayText(fullText.slice(0, lineRef.current))
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      className="terminal-glow"
      style={{ marginBottom: "2rem" }}
    >
      {/* Monitor SVG Frame */}
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 400 220"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "500px", margin: "0 auto", display: "block" }}
      >
        {/* Monitor body */}
        <rect x="20" y="10" width="360" height="170" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="4" />
        {/* Screen bezel */}
        <rect x="32" y="22" width="336" height="146" rx="2" fill="#111" stroke="#333" strokeWidth="2" />
        {/* Screen inner */}
        <rect x="36" y="26" width="328" height="138" fill="#0a0a0a" />
        {/* Scanlines on screen */}
        <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill="transparent" />
          <rect y="2" width="4" height="2" fill="rgba(0,255,65,0.03)" />
        </pattern>
        <rect x="36" y="26" width="328" height="138" fill="url(#scanlines)" />

        {/* Stand */}
        <rect x="160" y="180" width="80" height="12" fill="#333" />
        <rect x="140" y="192" width="120" height="8" rx="2" fill="#444" />

        {/* Power LED */}
        <circle cx="200" cy="176" r="3" fill="#00ff41">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Terminal content overlaid on the screen */}
      <div
        className="terminal-screen"
        style={{
          maxWidth: "440px",
          margin: "-190px auto 0",
          position: "relative",
          zIndex: 2,
          padding: "1.5rem 1.2rem",
          background: "transparent",
          border: "none",
          boxShadow: "none",
          textAlign: "left",
        }}
      >
        <div style={{ fontSize: "8px", opacity: 0.5, marginBottom: "8px", color: "#00ff41" }}>workshop@dev:~$</div>
        <div style={{ fontSize: "12px", color: "#00ff41", minHeight: "20px" }}>
          {displayText}
          <span className="typewriter-cursor" />
        </div>
        <div style={{ fontSize: "9px", marginTop: "12px", color: "#00cc33", opacity: 0.8 }}>Software Engineer</div>
        <div style={{ fontSize: "7px", marginTop: "4px", color: "#009922", opacity: 0.6 }}>
          Full-Stack • Next.js • Angular • Spring Boot
        </div>
      </div>
    </motion.div>
  )
}
