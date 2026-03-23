/* eslint-disable react/no-unescaped-entities */
"use client"

import React from "react"
import { ThemeProvider, useGame } from "../components/ConfigContext"
import { SoundProvider } from "../components/SoundContext"
import PixelWisp from "../components/workshop/PixelWisp"
import InteractiveRoom from "../components/workshop/InteractiveRoom"
import MonitorView from "../components/workshop/MonitorView"
import LetterModal from "../components/workshop/LetterModal"
import GuestbookModal from "../components/workshop/GuestbookModal"
import InventoryBar from "../components/workshop/InventoryBar"

/* ═══════ Classic Scroll imports ═══════ */
import DayNightToggle from "../components/workshop/DayNightToggle"
import DungeonMap from "../components/workshop/DungeonMap"
import NPCGuide from "../components/workshop/NPCGuide"
import Hearth from "../components/workshop/Hearth"
import TreasureChest from "../components/workshop/TreasureChest"
import SectionDivider from "../components/workshop/SectionDivider"
import HeroTerminal from "../components/sections/about"
import AboutLetter from "../components/sections/about-letter"
import ExperienceScroll from "../components/sections/experience"
import Skills from "../components/sections/skill"
import Education from "../components/sections/education"
import ProjectsInventory from "../components/sections/project"
import Interests from "../components/sections/interests"

/* ═══════ Classic Scrolling Layout ═══════ */
function ClassicLayout() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "1rem",
        paddingBottom: "70px",
        position: "relative",
      }}
    >
      <DayNightToggle />
      <DungeonMap />
      <NPCGuide />

      <div className="desk-container" style={{ marginTop: "5rem" }}>
        <section id="section-hero">
          <div className="hero-layout">
            <div className="hero-terminal">
              <HeroTerminal />
            </div>
            <div className="hero-hearth">
              <Hearth focusText="Performance & Clean Architecture" />
            </div>
          </div>
        </section>

        <SectionDivider variant="diamond" />

        <section id="section-about">
          <AboutLetter />
        </section>

        <SectionDivider variant="sword" />

        <section id="section-experience">
          <ExperienceScroll />
        </section>

        <SectionDivider variant="potion" />

        <section id="section-skills">
          <Skills />
        </section>

        <SectionDivider variant="diamond" />

        <section id="section-education">
          <Education />
        </section>

        <SectionDivider variant="sword" />

        <section id="section-projects">
          <ProjectsInventory />
        </section>

        <SectionDivider variant="potion" />

        <section id="section-interests">
          <Interests />
        </section>

        <section id="section-treasure" style={{ marginTop: "2rem" }}>
          <TreasureChest />
        </section>
      </div>
    </main>
  )
}

/* ═══════ Adventure Room Layout ═══════ */
function AdventureLayout() {
  return (
    <>
      <InteractiveRoom />
      <MonitorView />
      <LetterModal />
      <GuestbookModal />
    </>
  )
}

/* ═══════ Workshop Content (switches between modes) ═══════ */
function WorkshopContent() {
  const { classicMode } = useGame()

  return (
    <>
      <PixelWisp />
      {classicMode ? <ClassicLayout /> : <AdventureLayout />}
      <InventoryBar />
    </>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <WorkshopContent />
      </SoundProvider>
    </ThemeProvider>
  )
}
