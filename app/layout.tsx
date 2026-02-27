import React from "react"
import "nes.css/css/nes.min.css"
import "../styles/globals.css"
import "../styles/layout.css"

export const metadata = {
  title: "Anas EL MARZOUQY — Enchanted Dev Workshop",
  description: "Software engineer portfolio — an enchanted 8-bit workshop experience",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>
        <main className="container">
          <div className="content">{children}</div>
          <footer
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              fontFamily: '"Press Start 2P", cursive',
              fontSize: "8px",
              color: "var(--text-secondary)",
              borderTop: "2px solid rgba(255,255,255,0.05)",
            }}
          >
            <span style={{ color: "var(--accent-color)" }}>★</span> © 2025 Anas EL MARZOUQY{" "}
            <span style={{ color: "var(--accent-color)" }}>★</span>
            <br />
            <span style={{ opacity: 0.5, fontSize: "7px" }}>Crafted in the Enchanted Workshop</span>
          </footer>
        </main>
      </body>
    </html>
  )
}
