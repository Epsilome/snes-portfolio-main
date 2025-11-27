// app/projects/page.tsx
import React from "react";
import ProjectCard from "../components/Card/ProjectCard";
import { projects } from "../data/projects.data.";

export const metadata = { title: "Projects – Anas EL MARZOUQY" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-center font-mono text-3xl">Projects</h1>
      <p className="mx-auto mb-10 max-w-2xl text-center text-zinc-300">
        A selection of projects with short blurbs. Click into any card for a full SNES-style case study.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </main>
  );
}
