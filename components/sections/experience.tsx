"use client"

import React from "react"
import { motion } from "framer-motion"

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

const experiences = [
  {
    title: "Full-stack Engineer — PFE Internship",
    company: "AIAC",
    period: "02/2024 – 07/2024",
    location: "Casablanca, Morocco",
    responsibilities: [
      "Built project management systems with planning & resource optimization",
      "Full-stack development for optimal system performance",
      "Created APIs handling high-volume data flows efficiently",
    ],
  },
  {
    title: "Full-stack Engineer — PFA Internship",
    company: "Majorel",
    period: "06/2023 – 08/2023",
    location: "Casablanca, Morocco",
    responsibilities: [
      "Full-stack e-commerce with Angular, Spring Boot & MySQL",
      "Cross-department communication for project success",
    ],
  },
  {
    title: "Data Analyst Intern",
    company: "ONDA",
    period: "06/2022 – 07/2022",
    location: "Casablanca",
    responsibilities: [
      "Data research, compilation & report production",
      "Comparative analysis of asset management software",
      "Selection of optimal data management solutions",
    ],
  },
]

export default function ExperienceScroll() {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="workshop-panel"
    >
      <h2 className="section-title">📜 Experience Scroll</h2>

      <div className="magic-scroll">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={slideUp} className="inventory-card">
              <div
                style={{
                  fontSize: "10px",
                  color: "var(--accent-color)",
                  marginBottom: "6px",
                  fontFamily: '"Press Start 2P", cursive',
                }}
              >
                {exp.title}
              </div>
              <div
                style={{
                  fontSize: "8px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                {exp.company} | {exp.period} | {exp.location}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {exp.responsibilities.map((r, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "8px",
                      lineHeight: "2",
                      paddingLeft: "12px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--accent-color)",
                      }}
                    >
                      ▸
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
