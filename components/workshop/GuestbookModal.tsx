"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGame } from "../ConfigContext"

interface GuestbookEntry {
  id: number
  name: string
  message: string
  createdAt: string
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const month = d.toLocaleString("en", { month: "short" })
  const day = d.getDate()
  const year = d.getFullYear()
  return `${month} ${day}, ${year}`
}

export default function GuestbookModal() {
  const { activeView, setActiveView } = useGame()
  const isOpen = activeView === "GUESTBOOK_OPEN"

  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  /* ── Fetch entries when modal opens ── */
  const fetchEntries = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/guestbook")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = (await res.json()) as GuestbookEntry[]
      setEntries(data)
    } catch {
      setError("Could not load the Message Tome.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      fetchEntries()
      setError("")
      setSuccess(false)
    }
  }, [isOpen, fetchEntries])

  /* ── Submit new entry ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setSubmitting(true)

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })

      const data = (await res.json()) as GuestbookEntry & { error?: string }

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        return
      }

      setEntries((prev) => [data, ...prev])
      setName("")
      setMessage("")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      setError("Failed to sign the tome. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="guestbook-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "100%",
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(135deg, #2a1810 0%, #1a0f0a 50%, #2a1810 100%)",
              border: "3px solid #8b6914",
              borderRadius: "6px",
              boxShadow: "0 0 60px rgba(139,105,20,0.3), inset 0 0 40px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            {/* ═══════ Header ═══════ */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "2px solid rgba(139,105,20,0.3)",
                background: "rgba(139,105,20,0.08)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "10px",
                  color: "#d4a844",
                  textShadow: "0 0 8px rgba(212,168,68,0.4)",
                }}
              >
                📜 Message Tome
              </span>
              <button
                onClick={() => setActiveView("ROOM")}
                className="interactable-object"
                aria-label="Close guestbook"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "9px",
                  color: "#ff4444",
                  background: "none",
                  border: "2px solid #ff4444",
                  borderRadius: "2px",
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
              >
                [X] CLOSE
              </button>
            </div>

            {/* ═══════ Sign Form ═══════ */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "16px",
                borderBottom: "2px solid rgba(139,105,20,0.2)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <label
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "7px",
                  color: "#d4a844",
                  opacity: 0.8,
                }}
              >
                ✒ Leave your mark, traveler...
              </label>

              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={30}
                  required
                  style={{
                    flex: "0 0 130px",
                    padding: "8px 10px",
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "8px",
                    color: "#e8d5a8",
                    background: "rgba(0,0,0,0.4)",
                    border: "2px solid rgba(139,105,20,0.3)",
                    borderRadius: "3px",
                    outline: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={200}
                  required
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "8px",
                    color: "#e8d5a8",
                    background: "rgba(0,0,0,0.4)",
                    border: "2px solid rgba(139,105,20,0.3)",
                    borderRadius: "3px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  type="submit"
                  disabled={submitting || name.length < 2 || message.length < 2}
                  className="interactable-object"
                  style={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "8px",
                    padding: "8px 16px",
                    color: "#1a0f0a",
                    background: submitting
                      ? "rgba(139,105,20,0.3)"
                      : "linear-gradient(180deg, #d4a844 0%, #8b6914 100%)",
                    border: "2px solid #8b6914",
                    borderRadius: "3px",
                    cursor: submitting ? "wait" : "pointer",
                    opacity: submitting || name.length < 2 || message.length < 2 ? 0.5 : 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  {submitting ? "Signing..." : "✒ Sign the Tome"}
                </button>

                {/* Success sparkle */}
                {success && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: "7px",
                      color: "#44ff44",
                    }}
                  >
                    ✨ Signed!
                  </motion.span>
                )}

                {/* Error */}
                {error && (
                  <span
                    style={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: "7px",
                      color: "#ff4444",
                    }}
                  >
                    ⚠ {error}
                  </span>
                )}
              </div>
            </form>

            {/* ═══════ Entries List ═══════ */}
            <div
              style={{
                flex: 1,
                overflow: "auto",
                padding: "12px 16px",
              }}
            >
              {loading ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "8px",
                    color: "#d4a844",
                    opacity: 0.6,
                  }}
                >
                  Loading inscriptions...
                </div>
              ) : entries.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "8px",
                    color: "#d4a844",
                    opacity: 0.5,
                  }}
                >
                  No inscriptions yet.
                  <br />
                  Be the first to sign!
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div
                    style={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: "7px",
                      color: "#d4a844",
                      opacity: 0.5,
                      marginBottom: "4px",
                    }}
                  >
                    {entries.length} inscription{entries.length === 1 ? "" : "s"} found
                  </div>

                  {entries.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      style={{
                        display: "flex",
                        gap: "10px",
                        padding: "10px 12px",
                        background: "rgba(139,105,20,0.06)",
                        border: "1px solid rgba(139,105,20,0.15)",
                        borderRadius: "3px",
                      }}
                    >
                      {/* Pixel avatar */}
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "3px",
                          background: `hsl(${(entry.name.charCodeAt(0) * 37) % 360}, 50%, 35%)`,
                          border: "2px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                      >
                        {entry.name.charAt(0).toUpperCase()}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "8px",
                            marginBottom: "3px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: '"Press Start 2P", cursive',
                              fontSize: "8px",
                              color: "#d4a844",
                            }}
                          >
                            {entry.name}
                          </span>
                          <span
                            style={{
                              fontFamily: '"Press Start 2P", cursive',
                              fontSize: "6px",
                              color: "rgba(212,168,68,0.4)",
                            }}
                          >
                            {formatDate(entry.createdAt)}
                          </span>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "8px",
                            color: "#c8b080",
                            lineHeight: "1.6",
                            wordBreak: "break-word",
                          }}
                        >
                          {entry.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
