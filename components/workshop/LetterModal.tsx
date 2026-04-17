"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGame } from "../ConfigContext"
import AboutLetter from "../sections/about-letter"
import ExperienceScroll from "../sections/experience"
import Skills from "../sections/skill"
import Education from "../sections/education"
import Interests from "../sections/interests"

type LetterTab = "about" | "experience" | "skills" | "education" | "interests"

const TABS: { id: LetterTab; label: string; icon: string }[] = [
  { id: "about", label: "ABOUT", icon: "✉" },
  { id: "experience", label: "EXP", icon: "⚔" },
  { id: "skills", label: "SKILLS", icon: "⚗" },
  { id: "education", label: "EDU", icon: "📓" },
  { id: "interests", label: "HOBBIES", icon: "📚" },
]

export default function LetterModal() {
  const { activeView, setActiveView } = useGame()
  const isOpen = activeView === "LETTER_OPEN"
  const [activeTab, setActiveTab] = useState<LetterTab>("about")

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="letter-overlay"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            padding: "20px 20px 72px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveView("ROOM")
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              width: "calc(100% - 32px)",
              maxWidth: "900px",
              maxHeight: "calc(100% - 32px)",
              display: "flex",
              flexDirection: "column",
              background: "var(--bg-desk)",
              border: "3px solid var(--accent-color)",
              borderRadius: "6px",
              boxShadow: "0 0 60px var(--ambient-glow), inset 0 0 30px rgba(0,0,0,0.4)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "2px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "10px",
                  color: "var(--accent-color)",
                  textShadow: "var(--ambient-text-glow)",
                }}
              >
                ✉ Artificer&apos;s Scrolls
              </span>
              <button
                onClick={() => setActiveView("ROOM")}
                className="interactable-object"
                aria-label="Close letter"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "9px",
                  color: "#ff4444",
                  background: "none",
                  border: "2px solid #ff4444",
                  borderRadius: "2px",
                  padding: "4px 10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                [X] CLOSE
              </button>
            </div>

            {/* Tab Bar */}
            <div
              style={{
                display: "flex",
                gap: "2px",
                padding: "8px 12px 0",
                borderBottom: "2px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
                overflowX: "auto",
              }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "7px",
                    padding: "6px 10px 8px",
                    border: "2px solid",
                    borderBottom: "none",
                    borderColor: activeTab === tab.id ? "var(--accent-color)" : "rgba(255,255,255,0.08)",
                    borderRadius: "4px 4px 0 0",
                    background: activeTab === tab.id ? "var(--bg-desk-surface)" : "transparent",
                    color: activeTab === tab.id ? "var(--accent-color)" : "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div
              style={{
                flex: 1,
                overflow: "auto",
                padding: "16px",
              }}
            >
              {activeTab === "about" && <AboutLetter />}
              {activeTab === "experience" && <ExperienceScroll />}
              {activeTab === "skills" && <Skills />}
              {activeTab === "education" && <Education />}
              {activeTab === "interests" && <Interests />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
