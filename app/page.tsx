/* eslint-disable react/no-unescaped-entities */
"use client"

import React from "react"
import Link from "next/link"
import RetroButton from ".././components/retro/RetroButton"
import About from "../components/sections/about"
import Contact from "../components/sections/contact"
import Project from "../components/sections/project"
import Skills from "../components/sections/skill"
import Experience from "../components/sections/experience"
import Education from "../components/sections/education"
import Interests from "../components/sections/interests"
import PixelSnow from "../components/retro/PixelSnow"
import SecretGift from "../components/retro/SecretGift"

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-4">
      <PixelSnow />
      <SecretGift />
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="snes-box">
          <h1 className="snes-text">Anas EL MARZOUQY</h1>
          <p className="mb-4 text-xl" style={{ textAlign: 'center' }}>Software Engineer</p>
          <RetroButton label="Start Game" onClick={() => (window.location.href = "/game")} />
          <Link href="/projects" className="snes-button">View Projects</Link>
        </div>
        <About />
        <Experience />
        <Education />
        <Skills />
        <Project />
        <Interests />
        <Contact />
      </div>
    </main>
  )
}
