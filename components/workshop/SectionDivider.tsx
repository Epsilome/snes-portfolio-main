"use client"

import React from "react"

type DividerVariant = "sword" | "potion" | "diamond"

const icons: Record<DividerVariant, React.ReactNode> = {
  sword: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Blade */}
      <rect x="11" y="2" width="2" height="12" fill="var(--accent-color)" />
      <rect x="10" y="2" width="1" height="10" fill="var(--accent-color)" opacity="0.5" />
      <rect x="13" y="2" width="1" height="10" fill="var(--accent-color)" opacity="0.3" />
      {/* Guard */}
      <rect x="7" y="14" width="10" height="2" fill="var(--accent-color)" />
      <rect x="8" y="13" width="8" height="1" fill="var(--accent-color)" opacity="0.4" />
      {/* Grip */}
      <rect x="11" y="16" width="2" height="4" fill="#8B6914" />
      <rect x="11" y="16" width="1" height="4" fill="#A07818" />
      {/* Pommel */}
      <rect x="10" y="20" width="4" height="2" fill="var(--accent-color)" />
    </svg>
  ),
  potion: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Cork */}
      <rect x="10" y="2" width="4" height="2" fill="#A07818" />
      {/* Neck */}
      <rect x="11" y="4" width="2" height="3" fill="rgba(200,220,255,0.3)" />
      {/* Body */}
      <rect x="8" y="7" width="8" height="2" fill="rgba(200,220,255,0.25)" />
      <rect x="7" y="9" width="10" height="10" fill="rgba(200,220,255,0.2)" />
      {/* Liquid */}
      <rect x="8" y="12" width="8" height="7" fill="var(--accent-color)" opacity="0.5" />
      <rect x="8" y="12" width="8" height="2" fill="var(--accent-color)" opacity="0.3" />
      {/* Bubble */}
      <rect x="10" y="15" width="2" height="2" fill="var(--accent-color)" opacity="0.7" />
      {/* Bottom */}
      <rect x="7" y="19" width="10" height="2" fill="rgba(200,220,255,0.3)" />
    </svg>
  ),
  diamond: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Top facets */}
      <rect x="10" y="4" width="4" height="2" fill="var(--accent-color)" />
      <rect x="8" y="6" width="8" height="2" fill="var(--accent-color)" opacity="0.9" />
      <rect x="6" y="8" width="12" height="2" fill="var(--accent-color)" opacity="0.8" />
      {/* Middle */}
      <rect x="7" y="10" width="10" height="2" fill="var(--accent-color)" opacity="0.7" />
      {/* Bottom facets */}
      <rect x="8" y="12" width="8" height="2" fill="var(--accent-color)" opacity="0.6" />
      <rect x="9" y="14" width="6" height="2" fill="var(--accent-color)" opacity="0.5" />
      <rect x="10" y="16" width="4" height="2" fill="var(--accent-color)" opacity="0.4" />
      <rect x="11" y="18" width="2" height="2" fill="var(--accent-color)" opacity="0.3" />
      {/* Highlight */}
      <rect x="9" y="6" width="2" height="4" fill="white" opacity="0.25" />
    </svg>
  ),
}

export default function SectionDivider({ variant = "diamond" }: { variant?: DividerVariant }) {
  return (
    <div className="section-divider">
      <div className="divider-icon">{icons[variant]}</div>
    </div>
  )
}
