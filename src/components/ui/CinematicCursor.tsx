"use client";

import { useEffect, useRef } from "react";

export default function CinematicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;
    let animationFrameId = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      cursor.style.transform = `
        translate3d(${currentX}px, ${currentY}px, 0)
      `;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handlePointerOver = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("button, a")) {
        cursor.classList.add("cursor-grow");
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("button, a")) {
        cursor.classList.remove("cursor-grow");
      }
    };

    document.addEventListener("mouseover", handlePointerOver);
    document.addEventListener("mouseout", handlePointerOut);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
      document.removeEventListener("mouseover", handlePointerOver);
      document.removeEventListener("mouseout", handlePointerOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        cinematic-cursor-wrap
        fixed
        top-0
        left-0
        z-[9999]
        pointer-events-none
      "
    >
      {/* OUTER GLOW */}
      <div
        className="
          absolute
          h-14
          w-14
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#038347]/20
          blur-2xl
        "
      />

      {/* MAIN CURSOR */}
      <div
        className="
          cinematic-cursor
          h-5
          w-5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/40
          bg-[#038347]
          transition-all
          duration-300
        "
      />
    </div>
  );
}
