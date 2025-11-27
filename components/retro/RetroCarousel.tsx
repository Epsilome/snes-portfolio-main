import React, { useState } from "react"
import "./RetroCarousel.css"

interface RetroCarouselProps {
  children: React.ReactNode[]
}

export default function RetroCarousel({ children }: RetroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length)
  }

  return (
    <div className="snes-carousel">
      <div className="snes-carousel-container">
        <div className="snes-carousel-content">{children[currentIndex]}</div>
      </div>
      <button onClick={prevSlide} className="snes-carousel-button prev">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="8" y="4" width="4" height="12" fill="white" />
          <rect x="4" y="8" width="4" height="4" fill="white" />
        </svg>
      </button>
      <button onClick={nextSlide} className="snes-carousel-button next">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="8" y="4" width="4" height="12" fill="white" />
          <rect x="12" y="8" width="4" height="4" fill="white" />
        </svg>
      </button>
      <div className="snes-carousel-dots">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`snes-carousel-dot ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  )
}
