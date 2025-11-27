import React from "react"

const RetroCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="snes-card">
    <h2>{title}</h2>
    <div>{children}</div>
  </div>
)

export default RetroCard
