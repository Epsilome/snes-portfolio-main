"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "../../data/projects.data.";

export default function ProjectCard({ p }: { p: Project }) {
    return (
      <Link
        href={`/projects/${p.slug}`}
        className="rounded-2xl border-2 border-zinc-700 bg-zinc-900/50 p-4 shadow-[0_0_0_4px_#111] hover:bg-zinc-900/70 block"
      >
        {p.images?.[0] && (
          <div className="rounded-md border border-zinc-700 overflow-hidden mb-3">
            <Image
              src={p.images[0].src}
              alt={p.images[0].alt}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        <h3 className="font-mono text-xl">{p.title}</h3>
        <p className="mt-1 text-sm opacity-80">{p.blurb}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.stack.slice(0, 4).map((s) => (
            <li key={s} className="rounded-md border border-zinc-700 px-2 py-0.5 text-xs">{s}</li>
          ))}
          {p.stack.length > 4 && <li className="text-xs opacity-60">+{p.stack.length - 4}</li>}
        </ul>
      </Link>
    );
  }
