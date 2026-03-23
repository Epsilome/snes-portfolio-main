"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGame } from "../ConfigContext"
import QuestLog from "../sections/quest-log"
import ProjectsInventory from "../sections/project"

export default function MonitorView() {
  const { activeView, setActiveView } = useGame()
  const isOpen = activeView === "MONITOR_ZOOM"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="monitor-overlay"
          initial={{ opacity: 0, scale: 0.3, borderRadius: "12px" }}
          animate={{ opacity: 1, scale: 1, borderRadius: "4px" }}
          exit={{ opacity: 0, scale: 0.3, borderRadius: "12px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 500,
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-room)",
          }}
        >
          {/* CRT Monitor Frame */}
          <div
            style={{
              flex: 1,
              margin: "12px 12px 60px",
              border: "4px solid #555",
              borderRadius: "6px",
              background: "#2a2a2a",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "inset 0 0 40px rgba(0, 255, 65, 0.05), 0 0 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Screen bezel */}
            <div
              style={{
                flex: 1,
                margin: "8px",
                border: "2px solid #333",
                borderRadius: "4px",
                background: "#0a0a0a",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Scanlines overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.02) 2px, rgba(0,255,65,0.02) 4px)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />

              {/* Header bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  borderBottom: "2px solid #222",
                  background: "rgba(0,255,65,0.03)",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "10px",
                    color: "#00ff41",
                  }}
                >
                  {">"} QUEST TERMINAL v2.0
                </span>
                <button
                  onClick={() => setActiveView("ROOM")}
                  className="interactable-object"
                  aria-label="Close monitor view"
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

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  overflow: "auto",
                  padding: "16px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <QuestLog />

                <div style={{ marginTop: "2rem" }}>
                  <ProjectsInventory />
                </div>
              </div>
            </div>

            {/* Monitor bottom with LED */}
            <div
              style={{
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#2a2a2a",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#00ff41",
                  boxShadow: "0 0 8px #00ff41",
                  animation: "flicker 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
