import React from "react"
import RetroCarousel from "../retro/RetroCarousel"

export default function Education() {
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

  return (
    <div className="snes-box">
      <h2 className="snes-text">Education</h2>
      <RetroCarousel>
        {education.map((edu, index) => (
          <div key={index} className="snes-box">
            <h3 className="snes-subtitle">{edu.degree}</h3>
            <p className="text-sm">{edu.school}</p>
            <p className="text-sm">
              {edu.period} | {edu.location}
            </p>
          </div>
        ))}
      </RetroCarousel>
    </div>
  )
}
