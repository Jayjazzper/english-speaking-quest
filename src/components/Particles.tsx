"use client";

import { useEffect, useState } from "react";

export default function Particles() {
  const [particles, setParticles] = useState<{ id: number, left: string, size: string, delay: string, duration: string }[]>([]);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 10 + 5}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 15}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="floating-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}
    </div>
  );
}
