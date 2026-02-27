"use client"

import React from "react"
import { motion } from "framer-motion"

const slideIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const education = [
  {
    degree: "Software Engineering Degree",
    school: "ENSET",
    period: "2021 – 2024",
    location: "Mohammedia, Morocco",
  },
  {
    degree: "Preparatory Classes MPSI",
    school: "CPGE Mohammed V",
    period: "2019 – 2021",
    location: "Casablanca, Morocco",
  },
]

export default function Education() {
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="workshop-panel"
    >
      <h2 className="section-title">📖 Quest Journal</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: index * 0.15 } }}
            viewport={{ once: true }}
            className="inventory-card"
          >
            {/* Degree bookmark */}
            <div
              style={{
                fontSize: "10px",
                color: "var(--accent-color)",
                fontFamily: '"Press Start 2P", cursive',
                marginBottom: "6px",
              }}
            >
              {edu.degree}
            </div>
            <div style={{ fontSize: "8px", color: "var(--text-secondary)" }}>{edu.school}</div>
            <div style={{ fontSize: "7px", color: "var(--text-secondary)", opacity: 0.7, marginTop: "4px" }}>
              {edu.period} • {edu.location}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
