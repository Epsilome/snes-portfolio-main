"use client"

import React from "react"

export default function Hearth({ focusText = "Performance & Clean Architecture" }: { focusText?: string }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1.5rem",
      }}
    >
      {/* Ambient glow behind the fire */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "80px",
          background: "radial-gradient(ellipse, var(--hearth-color) 0%, transparent 70%)",
          opacity: 0.15,
          filter: "blur(20px)",
          animation: "flicker 3s ease-in-out infinite",
          willChange: "opacity",
          pointerEvents: "none",
        }}
      />

      {/* Fire SVG - pixel art style with opacity-based flicker for perf */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: "opacity" }}
      >
        {/* Base flame */}
        <g style={{ animation: "flicker 3s ease-in-out infinite" }}>
          {/* Bottom - hot core */}
          <rect x="24" y="48" width="16" height="8" fill="#ffcc00" />
          <rect x="20" y="40" width="24" height="8" fill="#ff8800" />
          <rect x="24" y="32" width="16" height="8" fill="#ff6600" />
          <rect x="28" y="24" width="8" height="8" fill="#ff4400" />
          <rect x="28" y="16" width="8" height="8" fill="#ff2200" opacity="0.8" />
          {/* Tip */}
          <rect x="30" y="10" width="4" height="6" fill="#ff4400" opacity="0.6" />
        </g>

        {/* Left tongue */}
        <g style={{ animation: "flicker 2.5s ease-in-out infinite", animationDelay: "0.3s" }}>
          <rect x="18" y="44" width="6" height="4" fill="#ff6600" opacity="0.7" />
          <rect x="16" y="38" width="6" height="6" fill="#ff4400" opacity="0.5" />
          <rect x="18" y="32" width="4" height="6" fill="#ff2200" opacity="0.3" />
        </g>

        {/* Right tongue */}
        <g style={{ animation: "flicker 2.8s ease-in-out infinite", animationDelay: "0.6s" }}>
          <rect x="40" y="44" width="6" height="4" fill="#ff6600" opacity="0.7" />
          <rect x="42" y="38" width="6" height="6" fill="#ff4400" opacity="0.5" />
          <rect x="42" y="32" width="4" height="6" fill="#ff2200" opacity="0.3" />
        </g>

        {/* Embers */}
        <rect x="22" y="56" width="4" height="4" fill="#cc4400" opacity="0.6" />
        <rect x="38" y="56" width="4" height="4" fill="#cc4400" opacity="0.6" />
        <rect x="30" y="58" width="4" height="4" fill="#993300" opacity="0.4" />

        {/* Bright center highlight */}
        <rect x="28" y="44" width="8" height="4" fill="#ffee88" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.5s" repeatCount="indefinite" />
        </rect>
      </svg>

      {/* Hearth label */}
      <div
        style={{
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "8px",
          color: "var(--accent-color)",
          textShadow: "var(--ambient-text-glow)",
          textAlign: "center",
          lineHeight: "1.6",
        }}
      >
        <div style={{ fontSize: "7px", opacity: 0.6, marginBottom: "4px" }}>🔥 CURRENT FOCUS</div>
        <div>{focusText}</div>
      </div>
    </div>
  )
}
