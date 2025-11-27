import React from "react"
import RetroCarousel from "../retro/RetroCarousel"

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
        {
          title: "Reading",
          description: "Passionate about reading",
        },
        {
          title: "Role-playing Games",
          description: "Dungeons & Dragons player",
        },
      ],
    },
    {
      category: "Extracurricular Activities",
      items: [
        {
          title: "ENSPEC CLUB",
          description: "Event Organizer",
          details: [
            "Organization and logistical management of various events such as game nights and social gatherings",
            "Strong commitment to creating positive and welcoming atmospheres",
          ],
        },
      ],
    },
  ]

  return (
    <div className="snes-box">
      <h2 className="snes-text">Interests & Activities</h2>
      <RetroCarousel>
        {interests.map((category, index) => (
          <div key={index} className="snes-box">
            <h3 className="snes-subtitle">{category.category}</h3>
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-4">
                <h4 className="font-bold">{item.title}</h4>
                <p className="mb-2 text-sm">{item.description}</p>
                {item.details && (
                  <ul className="snes-list">
                    {item.details.map((detail: string, detailIndex: number) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </RetroCarousel>
    </div>
  )
}
