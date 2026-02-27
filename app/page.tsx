/* eslint-disable react/no-unescaped-entities */
"use client"

import React from "react"
import { ThemeProvider } from "../components/ConfigContext"
import PixelWisp from "../components/workshop/PixelWisp"
import DayNightToggle from "../components/workshop/DayNightToggle"
import Hearth from "../components/workshop/Hearth"
import TreasureChest from "../components/workshop/TreasureChest"
import HeroTerminal from "../components/sections/about"
import AboutLetter from "../components/sections/about-letter"
import ExperienceScroll from "../components/sections/experience"
import Skills from "../components/sections/skill"
import Education from "../components/sections/education"
import ProjectsInventory from "../components/sections/project"
import Interests from "../components/sections/interests"

function WorkshopContent() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "1rem",
        position: "relative",
      }}
    >
      {/* Decorative elements */}
      <PixelWisp />
      <DayNightToggle />

      {/* The Desk — Central workspace */}
      <div className="desk-container" style={{ marginTop: "5rem" }}>
        {/* HERO — CRT Monitor + Hearth flame pinned to top-right */}
        <section id="section-hero" style={{ position: "relative" }}>
          <HeroTerminal />
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "0px",
            }}
          >
            <Hearth focusText="Performance & Clean Architecture" />
          </div>
        </section>

        {/* ABOUT — Pinned Letter */}
        <section id="section-about">
          <AboutLetter />
        </section>

        {/* EXPERIENCE — Magic Scroll */}
        <section id="section-experience">
          <ExperienceScroll />
        </section>

        {/* SKILLS — Alchemy Ingredients */}
        <section id="section-skills">
          <Skills />
        </section>

        {/* EDUCATION — Quest Journal */}
        <section id="section-education">
          <Education />
        </section>

        {/* PROJECTS — Inventory Grid */}
        <section id="section-projects">
          <ProjectsInventory />
        </section>

        {/* INTERESTS */}
        <section id="section-interests">
          <Interests />
        </section>

        {/* SECRET GIFT — Treasure Chest */}
        <section id="section-treasure" style={{ marginTop: "2rem" }}>
          <TreasureChest />
        </section>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <WorkshopContent />
    </ThemeProvider>
  )
}
