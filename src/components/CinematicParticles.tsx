"use client";

import { motion } from "framer-motion";
import { rangedRandom } from "@/lib/seededRandom";

type Particle = {
  left: number;
  top: number;
  size: number;
  drift: number;
  duration: number;
  delay: number;
  opacity: number;
};

const particles: Particle[] = Array.from({ length: 36 }, (_, index) => ({
  left: rangedRandom(index + 11, 0, 100),
  top: rangedRandom(index + 23, 0, 100),
  size: rangedRandom(index + 37, 1, 4),
  drift: rangedRandom(index + 41, -40, 40),
  duration: rangedRandom(index + 53, 10, 18),
  delay: rangedRandom(index + 67, 0, 8),
  opacity: rangedRandom(index + 79, 0.15, 0.5),
}));

export default function CinematicParticles() {
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
