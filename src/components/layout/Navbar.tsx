"use client";

import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-black/5 bg-white/70 backdrop-blur-2xl">
      <div className="max-w-[1280px] mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 xl:px-16">
        
        {/* LEFT SIDE */}
        <div className="flex min-w-0 shrink-0 items-center gap-3 lg:gap-4">
          
          {/* State Logo */}
          <div className="relative w-[52px] h-[52px] shrink-0">
            <Image
              src="/images/state-logo.png"
              alt="State Logo"
              fill
              sizes="52px"
              loading="eager"
              className="object-contain"
            />
          </div>

          {/* Text */}
          <div className="hidden lg:block min-w-0">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-normal sm:tracking-[0.25em] text-slate-500">
              AKWA IBOM STATE
            </p>

            <h2 className="text-xs sm:text-sm lg:text-base font-bold text-[#0B6B3A] tracking-normal sm:tracking-[0.08em]">
              GOVERNOR UMO ENO PORTFOLIO
            </h2>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex shrink-0 items-center gap-4 xl:gap-8 text-[13px] uppercase tracking-[0.18em] text-slate-600 whitespace-nowrap">
          <Link href="/" className="hover:text-[#0B6B3A] transition">
            Home
          </Link>

          <Link href="/projects" className="hover:text-[#0B6B3A] transition">
            Explore Projects
          </Link>

          <Link href="/governor-biography" className="hover:text-[#0B6B3A] transition">
            Biography
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          <div className="relative h-12 w-14 lg:h-14 lg:w-16 shrink-0 overflow-hidden mix-blend-multiply">
            <Image
              src="/images/arise-logo.png"
              alt="ARISE Agenda logo"
              fill
              sizes="128px"
              loading="eager"
              className="object-contain scale-[2]"
            />
          </div>

      <Link
  href="/re-elect"
  className="
    hidden
    lg:inline-flex
    rounded-full
    bg-[#0B6B3A]
    px-3
    sm:px-5
    py-2.5
    text-xs
    sm:text-sm
    font-semibold
    whitespace-nowrap
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
      </div>
    </header>
  );
}
