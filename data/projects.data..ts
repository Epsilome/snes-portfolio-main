export type Project = {
  slug: string
  title: string
  blurb: string
  role?: string
  period?: string
  stack: string[]
  links?: { demo?: string; repo?: string }
  highlights: string[]
  images: { src: string; alt: string }[]
}

export const projects: Project[] = [
  {
    slug: "project-management-system",
    title: "Project Management System",
    blurb: "",
    role: "Full-stack Engineer",
    period: "2024",
    stack: ["Angular", "Spring Boot", "MySQL", "REST"],
    links: { demo: "#", repo: "#" },
    highlights: [
      "Skill-based task assignment & team dashboards",
      "API for high-volume data flows",
      "Cut manual coordination ~30% (internal metric)",
    ],
    images: [{ src: "/projects/pms-1.png", alt: "PMS — Dashboard" }],
  },

  {
    slug: "jarvis-ai-agent",
    title: "Jarvis — AI Shopping Agent",
    blurb: "",
    role: "Founder / Engineer",
    period: "2025 (WIP)",
    stack: ["Python", "Playwright", "BeautifulSoup", "Regex", "Streamlit"],
    links: { demo: "#", repo: "#" },
    highlights: [
      "Playwright scraper with lazy-load, consent handling & URL canonicalization",
      "Robust EU price parsing; CPU/GPU/TGP detection; de-dupe across queries",
      "CLI (prices-gaming/work/debug) + JSON/CSV export; Streamlit viewer",
    ],
    images: [
      { src: "/projects/jarvis-1.png", alt: "Jarvis — Hardware Compare" },
      { src: "/projects/jarvis-2.png", alt: "Jarvis — Laptop Finder" },
    ],
  },
]

// console.log("[projects.ts] loaded with", projects.length, "items");
