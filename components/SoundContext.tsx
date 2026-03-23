"use client"

import React, { createContext, useContext, useState, useCallback, useRef } from "react"

interface SoundContextType {
  playSound: (name: "click" | "toggle" | "open") => void
  isMuted: boolean
  toggleMute: () => void
}

const SoundContext = createContext<SoundContextType>({
  playSound: () => {},
  isMuted: false,
  toggleMute: () => {},
})

export function useSound() {
  return useContext(SoundContext)
}

/* ═══════ 8-bit sound synthesizer using Web Audio API ═══════ */

function beep(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  volume = 0.08,
  delay = 0
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime + delay)
  osc.stop(ctx.currentTime + delay + duration)
}

const SOUNDS = {
  click: (ctx: AudioContext) => {
    beep(ctx, 800, 0.06, "square", 0.07)
    beep(ctx, 1200, 0.04, "square", 0.05, 0.03)
  },
  toggle: (ctx: AudioContext) => {
    beep(ctx, 400, 0.08, "square", 0.06)
    beep(ctx, 600, 0.08, "square", 0.06, 0.06)
    beep(ctx, 900, 0.1, "square", 0.05, 0.12)
  },
  open: (ctx: AudioContext) => {
    beep(ctx, 300, 0.1, "square", 0.06)
    beep(ctx, 500, 0.1, "square", 0.06, 0.08)
    beep(ctx, 700, 0.1, "square", 0.06, 0.16)
    beep(ctx, 1000, 0.15, "square", 0.05, 0.24)
  },
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playSound = useCallback(
    (name: "click" | "toggle" | "open") => {
      if (isMuted) return
      try {
        const ctx = getCtx()
        SOUNDS[name](ctx)
      } catch {
        // Silently fail if audio is unavailable
      }
    },
    [isMuted, getCtx]
  )

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  return <SoundContext.Provider value={{ playSound, isMuted, toggleMute }}>{children}</SoundContext.Provider>
}
