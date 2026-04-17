"use client"

import React, { useState, useCallback, useEffect } from "react"
import { useTheme } from "../ConfigContext"
import { useSound } from "../SoundContext"

/**
 * Pixel-art Lantern toggle that triggers an SNES screen flash on click.
 */
export default function DayNightToggle() {
  const { toggleTheme, isDayMode } = useTheme()
  const { playSound, isMuted, toggleMute } = useSound()
  const [flashing, setFlashing] = useState(false)

  const handleClick = useCallback(() => {
    playSound("toggle")
    setFlashing(true)
    // Small delay so the flash fires before the theme shifts
    setTimeout(() => {
      toggleTheme()
    }, 50)
  }, [toggleTheme, playSound])

  // Remove flash overlay after animation completes
  useEffect(() => {
    if (flashing) {
      const timer = setTimeout(() => setFlashing(false), 250)
      return () => clearTimeout(timer)
    }
  }, [flashing])

  return (
    <>
      {/* SNES Screen Flash overlay */}
      {flashing && <div className="screen-flash" />}

      <button
        onClick={handleClick}
        aria-label={`Switch to ${isDayMode ? "night" : "day"} mode`}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 100,
          background: "none",
          border: "3px solid var(--accent-color)",
          borderRadius: "4px",
          padding: "6px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {/* Pixel-art Lantern SVG */}
        <svg
          width="24"
          height="28"
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Handle */}
          <rect x="9" y="0" width="6" height="2" fill={isDayMode ? "#c8a84e" : "#556"} />
          <rect x="11" y="2" width="2" height="2" fill={isDayMode ? "#c8a84e" : "#556"} />

          {/* Lantern top cap */}
          <rect x="7" y="4" width="10" height="2" fill={isDayMode ? "#A07818" : "#445"} />

          {/* Lantern body (glass) */}
          <rect x="6" y="6" width="1" height="12" fill={isDayMode ? "#8B6914" : "#334"} />
          <rect x="17" y="6" width="1" height="12" fill={isDayMode ? "#8B6914" : "#334"} />
          <rect
            x="7"
            y="6"
            width="10"
            height="12"
            fill={isDayMode ? "rgba(255, 200, 50, 0.15)" : "rgba(80, 100, 180, 0.08)"}
          />

          {/* Cross bars */}
          <rect x="7" y="6" width="10" height="1" fill={isDayMode ? "#6B510F" : "#334"} opacity="0.4" />
          <rect x="7" y="11" width="10" height="1" fill={isDayMode ? "#6B510F" : "#334"} opacity="0.3" />
          <rect x="7" y="17" width="10" height="1" fill={isDayMode ? "#6B510F" : "#334"} opacity="0.4" />

          {isDayMode ? (
            /* Lit flame */
            <>
              <rect x="11" y="8" width="2" height="2" fill="#ffdd00" />
              <rect x="10" y="10" width="4" height="3" fill="#ffaa00" />
              <rect x="11" y="13" width="2" height="2" fill="#ff6600" />
              {/* Flame glow */}
              <rect x="9" y="9" width="6" height="6" fill="#ffdd00" opacity="0.15" />
              {/* Flicker animation via SVG animate */}
              <rect x="10" y="8" width="4" height="6" fill="#ff8800" opacity="0.2">
                <animate attributeName="opacity" values="0.2;0.05;0.2;0.15;0.2" dur="0.8s" repeatCount="indefinite" />
              </rect>
            </>
          ) : (
            /* Extinguished wick */
            <>
              <rect x="11" y="12" width="2" height="3" fill="#556" />
              <rect x="11" y="11" width="2" height="1" fill="#446688" opacity="0.5" />
              {/* Faint smoke wisp */}
              <rect x="11" y="9" width="2" height="2" fill="#8899aa" opacity="0.15">
                <animate attributeName="opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
              </rect>
            </>
          )}

          {/* Lantern bottom */}
          <rect x="7" y="18" width="10" height="2" fill={isDayMode ? "#A07818" : "#445"} />

          {/* Base */}
          <rect x="8" y="20" width="8" height="2" fill={isDayMode ? "#8B6914" : "#334"} />
        </svg>

        <span
          style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: "7px",
            color: "var(--accent-color)",
          }}
        >
          {isDayMode ? "DAY" : "NIGHT"}
        </span>
      </button>

      {/* Mute / Unmute button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        style={{
          position: "fixed",
          top: 60,
          left: 20,
          zIndex: 100,
          background: "none",
          border: "2px solid var(--accent-color)",
          borderRadius: "4px",
          padding: "4px 6px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          opacity: isMuted ? 0.4 : 0.8,
        }}
      >
        {isMuted && (
          <span
            style={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: "6px",
              color: "#ff4444",
            }}
          >
            MUTED
          </span>
        )}
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Speaker body */}
          <rect x="2" y="5" width="4" height="6" fill="var(--accent-color)" />
          <rect x="6" y="3" width="2" height="10" fill="var(--accent-color)" />
          {/* Sound waves */}
          {!isMuted && (
            <>
              <rect x="10" y="6" width="1" height="4" fill="var(--accent-color)" opacity="0.7" />
              <rect x="12" y="4" width="1" height="8" fill="var(--accent-color)" opacity="0.4" />
            </>
          )}
          {/* Mute X */}
          {isMuted && (
            <>
              <rect x="10" y="4" width="2" height="2" fill="#ff4444" />
              <rect x="12" y="6" width="2" height="2" fill="#ff4444" />
              <rect x="10" y="8" width="2" height="2" fill="#ff4444" />
              <rect x="12" y="10" width="2" height="2" fill="#ff4444" />
            </>
          )}
        </svg>
      </button>
    </>
  )
}
