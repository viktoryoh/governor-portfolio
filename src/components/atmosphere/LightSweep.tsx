"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LightSweep() {

  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sweepRef.current) return;

    gsap.to(sweepRef.current, {
      x: "120vw",
      duration: 10,
      repeat: -1,
      ease: "none",
    });

  }, []);

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
        z-[25]
      "
    >
      <div
        ref={sweepRef}
        className="
          absolute
          top-[-20%]
          left-[-40%]
          h-[160vh]
          w-[25vw]
          rotate-[18deg]
          bg-[#e67817]/20
          blur-[120px]
          opacity-40
        "
      />
    </div>
  );
}