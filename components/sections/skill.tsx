/* eslint-disable react/react-in-jsx-scope */
import React from "react"
import RetroCarousel from "../retro/RetroCarousel"

type Group = { category: string; items: string[]; note?: string }

export default function Skills() {
  const groups: Group[] = [
    {
      category: "Confident",
      items: ["TypeScript", "Next.js", "Angular", "HTML", "CSS", "REST APIs"],
      note: "Use daily; can design and ship features end-to-end",
    },
    {
      category: "Comfortable",
      items: ["Java", "Spring Boot", "Node.js", "Express.js", "MySQL", "Prisma"],
      note: "Backend CRUD, authentication, clean data models",
    },
    {
      category: "Learning / Exploring",
      items: ["Microservices", "Modular monorepos", "PocketBase", "Jest", "Docker", "Playwright"],
    },
    {
      category: "Languages",
      items: ["English (C1)", "French (C2)", "Arabic (Native)"],
    },
  ]

  return (
    <div className="snes-box">
      <h2 className="snes-text">Skills & Languages</h2>
      <RetroCarousel>
        {groups.map((g, i) => (
          <div key={i} className="snes-box w-full">
            <h3 className="snes-subtitle">{g.category}</h3>
            {g.note && <p className="text-xs opacity-80 mb-2">{g.note}</p>}

            {/* SNES-style chips */}
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="px-2 py-1 rounded-md border border-zinc-700 bg-zinc-900/40 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </RetroCarousel>
    </div>
  )
}
