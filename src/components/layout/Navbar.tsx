"use client";

import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-black/5 bg-white/70 backdrop-blur-2xl">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 h-20 flex items-center justify-between">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          
          {/* State Logo */}
          <div className="relative w-[52px] h-[52px]">
            <Image
              src="/images/state-logo.png"
              alt="State Logo"
              fill
              sizes="52px"
              priority
              className="object-contain"
            />
          </div>

          {/* Text */}
          <div className="hidden sm:block">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
              AKWA IBOM STATE
            </p>

            <h2 className="text-sm md:text-base font-bold text-[#0B6B3A] tracking-[0.08em]">
              GOVERNOR PORTFOLIO
            </h2>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-[0.18em] text-slate-600">
          <a href="#" className="hover:text-[#0B6B3A] transition">
            Home
          </a>

          <a href="projects" className="hover:text-[#0B6B3A] transition">
            Explore Projects
          </a>

          <a href="#" className="hover:text-[#0B6B3A] transition">
            Contact
          </a>
        </nav>

      <Link
  href="/re-elect"
  className="
    rounded-full
    bg-[#0B6B3A]
    px-5
    py-2.5
    text-sm
    font-semibold
    text-white
    transition-all
    duration-300
    hover:scale-105
    hover:bg-[#09552e]
  "
>
  Join Movement
</Link>
      </div>
    </header>
  );
}
