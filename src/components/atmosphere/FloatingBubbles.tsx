"use client";

import { useEffect, useState } from "react";

type Bubble = {
  size: number;
  left: number;
  duration: number;
  delay: number;
};

export default function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generatedBubbles = Array.from({ length: 14 }).map(() => ({
      size: Math.random() * 80 + 36,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));

    setBubbles(generatedBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute rounded-full bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: `-200px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            background:
              "radial-gradient(circle at center, rgba(3,131,71,0.18), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      ))}
    </div>
  );
}
