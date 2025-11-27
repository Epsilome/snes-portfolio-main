export type Project = {
  slug: string;
  title: string;
  blurb: string;
  role?: string;
  period?: string;
  stack: string[];
  links?: { demo?: string; repo?: string };
  highlights: string[];
  images: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "project-management-system",
    title: "Project Management System",
    blurb:
      "Angular + Spring + MySQL app for planning, resource allocation, and decision support.",
    role: "Full-stack Engineer",
    period: "2024",
    stack: ["Angular", "Spring Boot", "MySQL", "REST"],
    links: { demo: "#", repo: "#" },
    highlights: [
      "Skill-based task assignment & team dashboards",
      "API for high-volume data flows",
      "Cut manual coordination ~30% (internal metric)",
    ],
    images: [
      { src: "/projects/pms-1.png", alt: "PMS — Dashboard" },
      { src: "/projects/pms-2.png", alt: "PMS — Feature summary panels" },
      { src: "/projects/pms-3.png", alt: "PMS — Team workload view (Kanban)" },
    ],
  },
  {
    slug: "time-job-platform",
    title: "Time & Job Management Platform",
    blurb:
      "Scheduling, assignment, and time-spent analytics for teams with a clean retro UI.",
    role: "Full-stack Engineer",
    period: "2023",
    stack: ["Angular", "Spring Boot", "MySQL"],
    links: { demo: "#", repo: "#" },
    highlights: [
      "Assignment rules based on skills & availability",
      "Time-spent analytics and weekly summaries",
      "Bulk updates and CSV import for backfills",
    ],
    images: [{ src: "/projects/tjm-1.png", alt: "Time & Job — dashboard" }],
  },
  {
    slug: "ecommerce-website",
    title: "E-Commerce Website",
    blurb:
      "Responsive e-commerce with inventory, orders, and product catalog.",
    role: "Full-stack Engineer",
    period: "2023",
    stack: ["Angular", "Spring Boot", "MySQL"],
    links: { demo: "#", repo: "#" },
    highlights: [
      "Inventory & order management",
      "Responsive layouts and fast product filters",
      "Secure auth and payment integration",
    ],
    images: [
      { src: "/projects/ecom-1.png", alt: "E-Commerce — admin overview" },
      { src: "/projects/ecom-2.png", alt: "E-Commerce — products & orders" },
    ],
  },
  {
    slug: "jarvis-ai-agent",
    title: "Jarvis — AI Shopping Agent",
    blurb:
      "CLI + Streamlit tool that scrapes FR retailers, scores laptops for gaming/work, and exports explainable results.",
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
      { src: "/projects/jarvis-1.png", alt: "Jarvis — CLI scoring output" },
      { src: "/projects/jarvis-2.png", alt: "Jarvis — results & debug view" },
    ],
  },
];

// console.log("[projects.ts] loaded with", projects.length, "items");
