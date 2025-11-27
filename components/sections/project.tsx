/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import Link from "next/link";
import { projects } from "../../data/projects.data.";
import "./project.css";

export default function ProjectsSection() {
  return (
    <div className="snes-box">
      <h2 className="snes-text">Projects</h2>

      {/* simple vertical list of cards */}
      <div className="mt-3 flex flex-col gap-6">
        {projects.map((p) => (
          <div key={p.slug} className="snes-box RetroCard">
            <h3 className="snes-subtitle">{p.title}</h3>
            <p className="opacity-90">{p.blurb}</p>

            <ul className="snes-list mt-3">
              {p.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>

            <div className="mt-3">
              <Link href={`/projects/${p.slug}`} className="snes-button">
                View Case Study
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* optional CTA to the grid page */}
      <div className="mt-4">
        <Link href="/projects" className="snes-button">
          Browse All Projects
        </Link>
      </div>
    </div>
  );
}
