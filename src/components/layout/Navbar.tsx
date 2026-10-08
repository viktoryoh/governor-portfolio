"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/governor-biography", label: "Biography" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  const active = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-[100] border-b border-black/10 bg-white">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Governor Umo Eno portfolio home" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
          <Image src="/images/state-logo.png" alt="Akwa Ibom State crest" width={48} height={48} className="shrink-0 object-contain" loading="eager" />
          <span className="hidden xl:block text-sm font-bold text-[#0B6B3A]">GOVERNOR UMO ENO<span className="mt-1 block text-[10px] font-normal text-slate-500">AKWA IBOM STATE</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex">
          {links.map(({ href, label }) => <Link key={href} href={href} aria-current={active(href) ? "page" : undefined} className={`border-b-2 py-2 transition-colors hover:text-[#0B6B3A] ${active(href) ? "border-[#e67817] text-[#0B6B3A]" : "border-transparent"}`}>{label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <div className="relative h-12 w-16 overflow-hidden mix-blend-multiply">
            <Image src="/images/arise-logo.png" alt="ARISE Agenda" fill sizes="128px" className="object-contain scale-[1.85]" loading="eager" />
          </div>
          <Link href="/re-elect" className="hidden min-h-11 items-center gap-2 rounded-lg bg-[#0B6B3A] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#09552e] lg:inline-flex">Join Movement <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button ref={toggleRef} type="button" aria-label={open ? "Close navigation" : "Open navigation"} title={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-[#0B6B3A] hover:bg-slate-100 lg:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="grid border-t border-slate-200 bg-white px-5 py-3 lg:hidden">
        {[...links, { href: "/re-elect", label: "Join Movement" }].map(({href,label}) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active(href) ? "page" : undefined} className={`flex min-h-12 items-center justify-between border-b border-slate-100 text-base font-semibold ${active(href) ? "text-[#0B6B3A]" : "text-slate-700"}`}>{label}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}
      </nav>}
    </header>
  );
}
