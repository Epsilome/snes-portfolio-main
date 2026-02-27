"use client"

import React from "react"
import { motion } from "framer-motion"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemPop = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

interface InterestItem {
  title: string
  description: string
  details?: string[]
}

interface InterestCategory {
  category: string
  items: InterestItem[]
}

export default function Interests() {
  const interests: InterestCategory[] = [
    {
      category: "Personal Interests",
      items: [
        { title: "📚 Reading", description: "Passionate about reading" },
        { title: "🎲 Role-playing Games", description: "Dungeons & Dragons player" },
      ],
    },
    {
      category: "Extracurricular Activities",
      items: [
        {
          title: "🏰 ENSPEC CLUB",
          description: "Event Organizer",
          details: [
            "Organization & logistics for game nights and social gatherings",
            "Creating positive and welcoming atmospheres",
          ],
        },
      ],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true, margin: "-40px" }}
      className="workshop-panel"
    >
      <h2 className="section-title">📕 Enchanted Bookshelf</h2>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        {interests.map((category, index) => (
          <motion.div key={index} variants={itemPop}>
            <div
              style={{
                fontSize: "10px",
                color: "var(--accent-color)",
                fontFamily: '"Press Start 2P", cursive',
                marginBottom: "8px",
              }}
            >
              {category.category}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="inventory-card" style={{ flex: "1 1 200px" }}>
                  <div style={{ fontSize: "9px", marginBottom: "4px", fontWeight: "bold" }}>{item.title}</div>
                  <div style={{ fontSize: "7px", opacity: 0.7 }}>{item.description}</div>
                  {item.details && (
                    <ul style={{ listStyle: "none", padding: 0, marginTop: "6px" }}>
                      {item.details.map((d, di) => (
                        <li
                          key={di}
                          style={{
                            fontSize: "7px",
                            lineHeight: "2",
                            paddingLeft: "10px",
                            position: "relative",
                          }}
                        >
                          <span style={{ position: "absolute", left: 0, color: "var(--accent-color)" }}>▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
