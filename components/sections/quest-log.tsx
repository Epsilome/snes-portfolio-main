"use client"

import React, { useState } from "react"
import { useTheme } from "../ConfigContext"

type Tab = "quests" | "inventory" | "config"

export default function QuestLog() {
  const [activeTab, setActiveTab] = useState<Tab>("quests")
  const [hoveredItem, setHoveredItem] = useState<string>("")
  const { mode, toggleTheme, isDayMode } = useTheme()

  const [displayedText, setDisplayedText] = useState<string>("")
  const textSpeed = 50

  const fullText = hoveredItem
    ? hoveredItem.split(":")[1] || hoveredItem
    : activeTab === "quests"
    ? "Current Objectives"
    : "Items & Skills"

  // Typing effect
  React.useEffect(() => {
    setDisplayedText("")
    let index = 0
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        if (index < fullText.length) {
          index++
          return fullText.slice(0, index)
        }
        clearInterval(intervalId)
        return prev
      })
    }, textSpeed)
    return () => clearInterval(intervalId)
  }, [fullText, textSpeed])

  return (
    <div className="workshop-panel">
      <h2 className="section-title">Quest Log</h2>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "1.5rem",
          borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "1rem",
        }}
      >
        {["quests", "inventory", "config"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as Tab)}
            className={`nes-btn ${activeTab === tab ? "is-warning" : ""}`}
            style={{ fontSize: "7px", padding: "4px 8px" }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Description Box */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.3)",
          border: "2px solid rgba(255,255,255,0.1)",
          borderRadius: "4px",
          padding: "0.8rem",
          marginBottom: "1rem",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "8px", minHeight: "1.2rem" }}>
          {displayedText}
          <span className="typewriter-cursor" />
        </p>
      </div>

      {/* Content */}
      <div style={{ minHeight: "200px" }}>
        {activeTab === "quests" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "9px", color: "var(--accent-color)", marginBottom: "8px" }}>Main Quest</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <ListItem
                  label="Exploring Python"
                  desc="Objective: Master the Python ecosystem."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "9px", color: "var(--accent-color)", marginBottom: "8px" }}>Side Quests</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <ListItem
                  label="Retro Portfolio"
                  desc="Side Project: Build a cool workshop site."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
                <ListItem
                  label="AI Assistant"
                  desc="Side Project: Create a smart helper."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
              </ul>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "9px", color: "var(--accent-color)", marginBottom: "8px" }}>Tools</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <ListItem
                  label="Antigravity"
                  count={1}
                  desc="Tool: Defy physics."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
                <ListItem
                  label="Playwright"
                  count={99}
                  desc="Tool: E2E Testing."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
                <ListItem
                  label="Ollama"
                  count={5}
                  desc="Tool: Local LLMs."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "9px", color: "var(--accent-color)", marginBottom: "8px" }}>Skills</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <ListItem
                  label="Debugging"
                  count="∞"
                  desc="Skill: Fixing bugs."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
                <ListItem
                  label="TypeScript"
                  count={100}
                  desc="Skill: Type safety."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
                <ListItem
                  label="Next.js"
                  count={14}
                  desc="Skill: React Framework."
                  hoveredItem={hoveredItem}
                  setHover={setHoveredItem}
                />
              </ul>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "9px" }}>Theme Mode</span>
              <button
                className={`nes-btn ${isDayMode ? "is-warning" : "is-primary"}`}
                style={{ fontSize: "7px" }}
                onClick={toggleTheme}
              >
                {isDayMode ? "☀ DAY" : "🌙 NIGHT"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ListItem({
  label,
  count,
  desc,
  hoveredItem,
  setHover,
}: {
  label: string
  count?: number | string
  desc: string
  hoveredItem: string
  setHover: (s: string) => void
}) {
  const isHovered = hoveredItem === desc

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4px 8px 4px 16px",
        marginBottom: "4px",
        border: isHovered ? "1px solid var(--accent-color)" : "1px solid transparent",
        background: isHovered ? "rgba(255, 215, 0, 0.05)" : "transparent",
        borderRadius: "2px",
        cursor: "pointer",
        position: "relative",
        fontSize: "8px",
        transition: "all 0.2s",
      }}
      onMouseEnter={() => setHover(desc)}
      onMouseLeave={() => setHover("")}
    >
      {isHovered && (
        <span
          style={{ position: "absolute", left: "2px", top: "50%", transform: "translateY(-50%)", fontSize: "10px" }}
        >
          ▸
        </span>
      )}
      <span style={{ color: isHovered ? "var(--accent-color)" : "var(--text-primary)" }}>{label}</span>
      {count !== undefined && <span style={{ opacity: 0.5, marginLeft: "auto", paddingLeft: "12px" }}>x{count}</span>}
    </li>
  )
}
