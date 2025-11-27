import React from "react"
import "snes.css/dist/snes.min.css"
import "../styles/globals.css"
import ".././styles/layout.css" // Import the custom CSS file

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="snes-text">
        <main className="container">
          <div className="content">{children}</div>
          <footer className="snes-footer">© 2024 EL MARZOUQY Anas</footer>
        </main>
      </body>
    </html>
  )
}
