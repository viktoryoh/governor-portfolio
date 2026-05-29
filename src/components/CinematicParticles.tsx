"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  left: number;
  top: number;
  size: number;
  drift: number;
  duration: number;
  delay: number;
  opacity: number;
};

export default function CinematicParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 36 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        drift: Math.random() * 80 - 40,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.35 + 0.15,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            x: [0, particle.drift, 0],
            y: ["12vh", "-18vh", "12vh"],
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: "0 0 18px rgba(255,255,255,0.45)",
          }}
        />
      ))}
    </div>
  );
}
