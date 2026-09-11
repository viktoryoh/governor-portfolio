"use client";

import { useRef } from "react";
import Link from "next/link";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function MagneticButton({
  href,
  children,
}: MagneticButtonProps) {

  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const button = buttonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const x =
      e.clientX - rect.left - rect.width / 2;

    const y =
      e.clientY - rect.top - rect.height / 2;

    button.style.transform = `
      translate(${x * 0.18}px, ${y * 0.18}px)
    `;
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;

    if (!button) return;

    button.style.transform =
      "translate(0px, 0px)";
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group
        relative
        inline-flex
        overflow-hidden
        rounded-full
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        px-8
        py-4
        text-sm
        font-semibold
        uppercase
        tracking-[0.2em]
        text-white
        transition-all
        duration-500
        ease-out
        hover:scale-105
        hover:bg-[#038347]
        hover:shadow-[0_0_40px_rgba(3,131,71,0.45)]
      "
    >

      {/* Animated Shine */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-all
          duration-700
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            top-0
            left-[-120%]
            h-full
            w-[60%]
            rotate-12
            bg-white/20
            blur-xl
            transition-all
            duration-1000
            group-hover:left-[140%]
          "
        />
      </div>

      <span className="relative z-10">
        {children}
      </span>
    </Link>
  );
}
