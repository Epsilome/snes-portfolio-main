import React, { useEffect, useState } from "react";
import "./PixelSnow.css";

interface Flake {
    id: number;
    x: number;
    y: number;
    speed: number;
    size: number;
    wobble: number;
}

export default function PixelSnow() {
    const [flakes, setFlakes] = useState<Flake[]>([]);

    useEffect(() => {
        // Initial population
        const initialFlakes: Flake[] = [];
        for (let i = 0; i < 50; i++) {
            initialFlakes.push({
                id: Math.random(),
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speed: 1 + Math.random() * 2,
                size: Math.random() > 0.5 ? 4 : 2, // 4px or 2px
                wobble: Math.random() * Math.PI * 2,
            });
        }
        setFlakes(initialFlakes);

        const createFlake = () => {
            const newFlake: Flake = {
                id: Date.now() + Math.random(),
                x: Math.random() * window.innerWidth,
                y: -10,
                speed: 1 + Math.random() * 2,
                size: Math.random() > 0.5 ? 4 : 2,
                wobble: Math.random() * Math.PI * 2,
            };
            setFlakes((prev) => [...prev, newFlake]);
        };

        const interval = setInterval(createFlake, 200); // New flake every 200ms

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const moveFlakes = () => {
            setFlakes((prev) =>
                prev
                    .map((flake) => ({
                        ...flake,
                        y: flake.y + flake.speed,
                        x: flake.x + Math.sin(flake.y / 50 + flake.wobble) * 0.5, // Slight wobble
                    }))
                    .filter((flake) => flake.y < window.innerHeight + 20)
            );
        };

        const animation = setInterval(moveFlakes, 30);

        return () => clearInterval(animation);
    }, []);

    return (
        <div className="pixel-snow-container">
            {flakes.map((flake) => (
                <div
                    key={flake.id}
                    className="pixel-flake"
                    style={{
                        left: `${flake.x}px`,
                        top: `${flake.y}px`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                    }}
                />
            ))}
        </div>
    );
}
