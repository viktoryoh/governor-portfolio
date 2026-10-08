"use client";

import { useEffect, useRef } from "react";

export default function CinematicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const move = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.style.opacity = "1";
      cursor.classList.toggle("cursor-grow", event.target instanceof Element && !!event.target.closest("a, button"));
    };
    const hide = () => { cursor.style.opacity = "0"; };
    const sync = () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.toggle("has-custom-cursor", media.matches);
      hide();
      if (media.matches) window.addEventListener("pointermove", move);
    };
    sync();
    media.addEventListener("change", sync);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      media.removeEventListener("change", sync);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);
  return <div ref={cursorRef} aria-hidden="true" className="cinematic-cursor-wrap pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"><div className="cinematic-cursor h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#038347] transition-transform duration-150" /></div>;
}
