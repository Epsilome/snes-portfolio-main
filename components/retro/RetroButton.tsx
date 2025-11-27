import React from "react"

const RetroButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button className="snes-button" onClick={onClick}>
    {label}
  </button>
)

export default RetroButton
