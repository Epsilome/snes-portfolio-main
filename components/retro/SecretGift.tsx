import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

export default function SecretGift() {
    const [position, setPosition] = useState({ top: '80%', left: '50%' });
    const [showCongrats, setShowCongrats] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [unlocked, setUnlocked] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setUnlocked(true);
        }
    }, [countdown]);

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            // Trigger if Alt + Enter is pressed anywhere
            if (e.altKey && e.key === 'Enter') {
                triggerSuccess();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    const dodge = () => {
        // Move to a random position within the viewport (keeping some margin)
        const newTop = Math.random() * 80 + 10; // 10% to 90%
        const newLeft = Math.random() * 80 + 10;
        setPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    const triggerSuccess = () => {
        setShowCongrats(true);
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <>
            {/* Hint Button */}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 40 }}>
                <button
                    className={`snes-button ${!unlocked ? 'is-disabled' : ''}`}
                    style={{
                        backgroundColor: unlocked ? undefined : '#7f7f7f',
                        cursor: unlocked ? 'default' : 'not-allowed',
                        opacity: unlocked ? 1 : 0.7,
                        fontSize: '0.8rem',
                        padding: '8px 12px'
                    }}
                    disabled={!unlocked}
                >
                    {unlocked ? "Hint: Alt + Enter" : `Locked (${countdown}s)`}
                </button>
            </div>

            {!showCongrats && (
                <button
                    ref={buttonRef}
                    className="snes-button"
                    style={{
                        position: 'fixed',
                        top: position.top,
                        left: position.left,
                        transition: 'all 0.1s ease',
                        zIndex: 50,
                        transform: 'translate(-50%, -50%)' // Center the button on the coordinates
                    }}
                    onMouseEnter={dodge}
                    onClick={(e) => {
                        e.preventDefault();
                        dodge();
                    }}
                    tabIndex={-1} // Remove from tab order
                    title="Try to catch me!"
                >
                    Secret Gift
                </button>
            )}

            {showCongrats && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    animation: 'fadeIn 1s ease-in'
                }}>
                    <h1 className="snes-text" style={{ fontSize: '3rem', color: '#ffd700', marginBottom: '2rem', textAlign: 'center' }}>Congratulations!</h1>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ transform: 'rotate(-45deg)' }}>
                            <Image src="/pixel-party-popper.png" alt="Party Popper" width={150} height={150} />
                        </div>

                        {/* Rick Roll GIF */}
                        <div style={{ border: '4px solid #fff', borderRadius: '8px', overflow: 'hidden' }}>
                            <Image src="/rick-roll.gif" alt="Rick Roll" width={400} height={300} unoptimized />
                        </div>

                        <div style={{ transform: 'scaleX(-1) rotate(-45deg)' }}>
                            <Image src="/pixel-party-popper.png" alt="Party Popper" width={150} height={150} />
                        </div>
                    </div>

                    <button className="snes-button" style={{ marginTop: '3rem' }} onClick={() => setShowCongrats(false)}>Close</button>
                </div>
            )}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
        </>
    );
}
