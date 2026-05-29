"use client";

import { motion } from "framer-motion";

export default function CinematicShader() {
  return (
    <div className="absolute inset-0 z-[2] overflow-hidden opacity-40 pointer-events-none">
      <motion.div
        animate={{
          x: ["-4%", "4%", "-4%"],
          y: ["3%", "-3%", "3%"],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -inset-[12%]
          blur-2xl
          bg-[radial-gradient(circle_at_30%_30%,rgba(3,131,71,0.45),transparent_38%),radial-gradient(circle_at_70%_65%,rgba(230,120,23,0.35),transparent_42%),linear-gradient(135deg,rgba(3,131,71,0.22),rgba(230,120,23,0.18))]
        "
      />
    </div>
  );
}
