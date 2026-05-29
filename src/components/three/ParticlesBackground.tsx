"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

export default function ParticlesBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 7 + 8,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            y: ["8vh", "-12vh", "8vh"],
            opacity: [0, 0.14, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-[#0B6B3A]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: "0 0 18px rgba(11,107,58,0.35)",
          }}
        />
      ))}
    </div>
  );
}
