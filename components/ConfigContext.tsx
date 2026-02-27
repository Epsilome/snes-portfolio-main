"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

type ThemeMode = "day" | "night"

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
  isDayMode: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "day",
  toggleTheme: () => {},
  isDayMode: true,
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("day")

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "day" ? "night" : "day"))
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode)
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, isDayMode: mode === "day" }}>{children}</ThemeContext.Provider>
  )
}
