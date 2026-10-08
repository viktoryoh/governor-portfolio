"use client";

import { useRef } from "react";
import Link from "next/link";

export default function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const move = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.18}px, ${(event.clientY - rect.top - rect.height / 2) * 0.18}px)`;
  };
  return <Link ref={buttonRef} href={href} onMouseMove={move} onMouseLeave={() => { if (buttonRef.current) buttonRef.current.style.transform = ""; }} className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-500 ease-out hover:scale-105 hover:bg-[#038347] hover:shadow-[0_0_40px_rgba(3,131,71,0.45)] active:scale-[0.98]">
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
      <span className="absolute top-0 left-[-120%] h-full w-[60%] rotate-12 bg-white/20 blur-xl transition-all duration-1000 group-hover:left-[140%]" />
    </span>
    <span className="relative z-10">{children}</span>
  </Link>;
}
