import React from "react"
import RetroCarousel from "../retro/RetroCarousel"

export default function Experience() {
  const experiences = [
    {
      title: "Full-stack Engineer - PFE Internship",
      company: "AIAC",
      period: "02/2024 – 07/2024",
      location: "Casablanca, Morocco",
      responsibilities: [
        "Development of project management systems, including planning and resource optimization for better decision-making",
        "Front-End and Back-End development management for optimal system performance",
        "Proactive resolution of technical challenges, notably through the creation of APIs efficiently handling data flows",
      ],
    },
    {
      title: "Full-stack Engineer - PFA Internship",
      company: "Majorel",
      period: "06/2023 – 08/2023",
      location: "Casablanca, Morocco",
      responsibilities: [
        "Full-stack development of e-commerce sites with Angular, Spring Boot and MySQL, ensuring responsiveness and efficiency",
        "Effective communication with other departments for successful project completion",
      ],
    },
    {
      title: "Data Analyst Intern",
      company: "ONDA",
      period: "06/2022 – 07/2022",
      location: "Casablanca",
      responsibilities: [
        "Research, compilation of data and production of punctual reports",
        "Comparative analysis of software functionalities for asset management",
        "Selection of optimal data management solutions based on defined criteria",
      ],
    },
  ]

  return (
    <div className="snes-box">
      <h2 className="snes-text">Experience</h2>
      <RetroCarousel>
        {experiences.map((exp, index) => (
          <div key={index} className="snes-box">
            <h3 className="snes-subtitle">{exp.title}</h3>
            <p className="mb-2 text-sm">
              {exp.company} | {exp.period} | {exp.location}
            </p>
            <ul className="snes-list">
              {exp.responsibilities.map((resp, respIndex) => (
                <li key={respIndex}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </RetroCarousel>
    </div>
  )
}
