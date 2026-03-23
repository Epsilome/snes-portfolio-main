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
      <body>{children}</body>
    </html>
  )
}
