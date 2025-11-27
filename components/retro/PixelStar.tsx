import React, { useEffect, useState } from "react"
import "./PixelStar.css"

interface Star {
  id: number
  x: number
  y: number
  speed: number
}

export default function PixelStar() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const createStar = () => {
      const newStar: Star = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: -10,
        speed: 2 + Math.random() * 3,
      }
      setStars((prevStars) => [...prevStars, newStar])
    }

    const interval = setInterval(createStar, 2000) // Create a new star every 2 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const moveStars = () => {
      setStars((prevStars) =>
        prevStars
          .map((star) => ({
            ...star,
            y: star.y + star.speed,
          }))
          .filter((star) => star.y < window.innerHeight + 20)
      )
    }

    const animation = setInterval(moveStars, 16) // ~60fps

    return () => clearInterval(animation)
  }, [])

  return (
    <div className="pixel-stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="pixel-star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
          }}
        />
      ))}
    </div>
  )
}
