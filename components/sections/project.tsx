/* eslint-disable react/react-in-jsx-scope */
"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { projects } from "../../data/projects.data."

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardSlide = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

export default function ProjectsInventory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true, margin: "-40px" }}
      className="workshop-panel"
    >
      <h2 className="section-title">🗂 Inventory Grid</h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {projects.map((p) => (
          <motion.div key={p.slug} variants={cardSlide} className="inventory-card">
            {/* Project title with item icon */}
            <div
              style={{
                fontSize: "10px",
                color: "var(--accent-color)",
                fontFamily: '"Press Start 2P", cursive',
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {/* Item icon SVG */}
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="12" height="12" fill="none" stroke="var(--accent-color)" strokeWidth="2" />
                <rect x="5" y="5" width="6" height="6" fill="var(--accent-color)" opacity="0.4" />
              </svg>
              {p.title}
            </div>

            {/* Blurb */}
            {p.blurb && (
              <div style={{ fontSize: "8px", opacity: 0.8, marginBottom: "8px", lineHeight: "1.8" }}>{p.blurb}</div>
            )}

            {/* Stack chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
              {p.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: "7px",
                    padding: "2px 6px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "2px",
                    color: "var(--accent-color)",
                    background: "rgba(255,215,0,0.05)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {p.highlights.map((h, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: "7px",
                    lineHeight: "2",
                    paddingLeft: "10px",
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: "var(--accent-color)" }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div style={{ marginTop: "10px" }}>
              <Link
                href={`/projects/${p.slug}`}
                className="nes-btn is-warning"
                style={{ fontSize: "7px", padding: "4px 8px" }}
              >
                View Quest
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <Link
          href="/projects"
          className="nes-btn"
          style={{ fontSize: "8px", backgroundColor: "#ffc107", color: "#000" }}
        >
          Browse All Quests
        </Link>
      </div>
    </motion.div>
  )
}
