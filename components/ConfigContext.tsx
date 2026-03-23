"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

/* ═══════ Theme ═══════ */
type ThemeMode = "day" | "night"

/* ═══════ Game State ═══════ */
export type ActiveView = "ROOM" | "MONITOR_ZOOM" | "LETTER_OPEN" | "QUEST_LOG" | "GUESTBOOK_OPEN"

interface GameContextType {
  mode: ThemeMode
  toggleTheme: () => void
  isDayMode: boolean
  activeView: ActiveView
  setActiveView: (view: ActiveView) => void
  hoveredObject: string | null
  setHoveredObject: (obj: string | null) => void
  classicMode: boolean
  toggleClassicMode: () => void
}

const ThemeContext = createContext<GameContextType>({
  mode: "day",
  toggleTheme: () => {},
  isDayMode: true,
  activeView: "ROOM",
  setActiveView: () => {},
  hoveredObject: null,
  setHoveredObject: () => {},
  classicMode: false,
  toggleClassicMode: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

/** Alias for clarity in game-related code */
export function useGame() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("day")
  const [activeView, setActiveView] = useState<ActiveView>("ROOM")
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)
  const [classicMode, setClassicMode] = useState(false)

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "day" ? "night" : "day"))
  }, [])

  const toggleClassicMode = useCallback(() => {
    setClassicMode((prev) => !prev)
    setActiveView("ROOM")
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode)
  }, [mode])

  // ESC key returns to ROOM from any overlay
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeView !== "ROOM") {
        setActiveView("ROOM")
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [activeView])

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        isDayMode: mode === "day",
        activeView,
        setActiveView,
        hoveredObject,
        setHoveredObject,
        classicMode,
        toggleClassicMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
