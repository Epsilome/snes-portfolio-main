// /app/projects/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../../data/projects.data.";
import "./projects.css";


export const metadata = { title: "Projects – Anas EL MARZOUQY" };

export default function ProjectsPage() {
  return (
    <main className="page-wrap page-stack">
      {/* Top buttons */}
      <div className="button-row">
        <Link href="/" className="snes-button">← Back to Home</Link>
      </div>

      <h1 className="page-title font-mono text-3xl">Projects</h1>

      {/* Projects grid */}
      <div className="projects-grid">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="snes-box project-card">
            {/* Thumb */}
            {p.images?.[0] && (
              <Image
                src={p.images[0].src}
                alt={p.images[0].alt}
                width={960}
                height={600}
                className="project-thumb"
                priority={false}
              />
            )}

            {/* Body */}
            <div className="card-body">
              <h3 className="snes-subtitle">{p.title}</h3>
              <p className="lead opacity-90">{p.blurb}</p>

              <ul className="snes-list" style={{ marginTop: "12px" }}>
                {p.stack.slice(0, 4).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
