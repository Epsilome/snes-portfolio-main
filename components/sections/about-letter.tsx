/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const slideIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

/**
 * ABOUT — "Pinned Letter" on the desk with typewriter effect.
 */
export default function AboutLetter() {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const charIndex = useRef(0)

  const fullText =
    "I build fast, clean full-stack web apps with Next.js, Angular, and Spring Boot. " +
    "I like turning vague requirements into shipped features, and I care a lot about " +
    "UI polish and stable APIs."

  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex.current < fullText.length) {
        charIndex.current++
        setDisplayText(fullText.slice(0, charIndex.current))
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="workshop-panel"
    >
      <h2 className="section-title">✉ About Me</h2>

      <div className="parchment" dir="ltr">
        <p style={{ minHeight: "80px", lineHeight: "2" }}>
          {displayText}
          {isTyping && <span className="typewriter-cursor" />}
        </p>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem", lineHeight: "2.2" }}>
          <li>
            <span style={{ color: "var(--accent-color)" }}>★</span> <b>Good at:</b> REST APIs, frontend architecture,
            smooth DX
          </li>
          <li>
            <span style={{ color: "var(--accent-color)" }}>★</span> <b>Recent win:</b> cut manual coordination ~30% via
            planning systems
          </li>
          <li>
            <span style={{ color: "var(--accent-color)" }}>★</span> <b>Current focus:</b> performance, accessibility,
            solid testing
          </li>
        </ul>
      </div>

      {/* Contact Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "1.5rem",
          justifyContent: "center",
        }}
      >
        <a className="nes-btn is-warning" href="mailto:anaselmarzouqy@gmail.com" style={{ fontSize: "8px" }}>
          Email
        </a>
        <a
          className="nes-btn is-primary"
          href="https://www.linkedin.com/in/epsilome/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "8px" }}
        >
          LinkedIn
        </a>
        <a
          className="nes-btn"
          href="https://github.com/Epsilome"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "8px" }}
        >
          GitHub
        </a>
        <a
          className="nes-btn is-success"
          href="/Anas-EL-MARZOUQY-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "8px" }}
        >
          CV
        </a>
      </div>
    </motion.div>
  )
}
