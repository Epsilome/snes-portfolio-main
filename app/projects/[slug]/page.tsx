// /app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../../../data/projects.data.";
import "../projects.css"; // ← reuse same CSS


export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <main className="page-wrap page-stack">
      {/* Buttons */}
      <div className="button-row">
        <Link href="/" className="snes-button">← Back to Home</Link>
        <Link href="/projects" className="snes-button">← Back to Projects</Link>
      </div>

      {/* Header panel */}
      <div className="snes-box">
        <h1 className="font-mono text-3xl" style={{ textAlign: "center" }}>
          {p.title}
        </h1>
        <p className="lead opacity-90" style={{ textAlign: "center", marginTop: 8 }}>
          {p.blurb}
        </p>

        <div className="snes-container" style={{ justifyContent: "center", marginTop: 12 }}>
          {p.role && <span className="snes-button">Role: {p.role}</span>}
          {p.period && <span className="snes-button">{p.period}</span>}
          {p.stack.map((s) => (
            <span key={s} className="snes-button">{s}</span>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="projects-grid">
        {p.images.map((img) => (
          <div key={img.src} className="snes-box" style={{ padding: 0, overflow: "hidden" }}>
            <Image
              src={img.src}
              alt={img.alt}
              width={1280}
              height={800}
              className="project-img"
            />
          </div>
        ))}
      </div>

      {/* Highlights */}
      <section className="snes-box">
        <h2 className="font-mono text-2xl">Highlights</h2>
        <ul className="snes-list" style={{ marginTop: 12 }}>
          {p.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </section>

      {/* Links - Removed for now */}
    </main>
  );
}