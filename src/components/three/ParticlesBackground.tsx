"use client";

import { motion } from "framer-motion";
import { rangedRandom } from "@/lib/seededRandom";

type Particle = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

const particles: Particle[] = Array.from({ length: 28 }, (_, index) => ({
  left: rangedRandom(index + 151, 0, 100),
  top: rangedRandom(index + 163, 0, 100),
  size: rangedRandom(index + 181, 1, 4),
  duration: rangedRandom(index + 191, 8, 15),
  delay: rangedRandom(index + 211, 0, 6),
}));

export default function ParticlesBackground() {
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
