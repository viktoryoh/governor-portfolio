import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Handshake,
  Leaf,
  Plane,
  ShieldCheck,
} from "lucide-react";

const projectLinks = [
  {
    label: "Infrastructure",
    href: "/projects/infrastructure",
    icon: Building2,
  },
  {
    label: "Transportation",
    href: "/projects/transportation",
    icon: Plane,
  },
  {
    label: "Agriculture & Food Security",
    href: "/projects/agriculture-food-security",
    icon: Leaf,
  },
  {
    label: "Empowerment",
    href: "/projects/empowerment",
    icon: Handshake,
  },
];

const footerLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Biography",
    href: "/governor-biography",
  },
  {
    label: "Join Movement",
    href: "/re-elect",
  },
];

export default function Footer() {
  return (
    <footer className="relative z-[1000] overflow-hidden bg-[#06140d] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,131,71,0.28),transparent_42%,rgba(230,120,23,0.18))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative mx-auto max-w-[1350px] px-6 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="relative h-[68px] w-[68px] rounded-lg border border-white/10 bg-white/10 p-2 backdrop-blur-xl">
                <Image
                  src="/images/state-logo.png"
                  alt="Akwa Ibom State Logo"
                  fill
                  sizes="68px"
                  className="object-contain p-2"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e67817]">
                  Akwa Ibom State
                </p>
                <h2 className="mt-2 text-xl font-black uppercase tracking-normal text-white md:text-2xl">
                  Governor Umo Eno Portfolio
                </h2>
              </div>
            </div>

            <h3 className="max-w-[780px] text-4xl font-black leading-[0.98] tracking-normal md:text-6xl">
              Progress Continues With Results That Speak.
            </h3>

            <p className="mt-6 max-w-[680px] text-base leading-8 text-white/70 md:text-lg">
              A premium civic portfolio for documenting infrastructure,
              opportunity, food security, mobility, and the leadership agenda
              shaping the next chapter of development.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/re-elect"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#038347] px-7 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#049a53]"
              >
                Join Movement
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/projects"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] px-7 text-sm font-bold uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-all duration-300 hover:border-[#e67817]/70 hover:bg-white/[0.12]"
              >
                Explore Projects
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e67817]">
                Navigation
              </p>

              <nav className="grid gap-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center justify-between gap-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={15}
                      className="opacity-40 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e67817]">
                Mandate Pillars
              </p>

              <div className="grid gap-3">
                {projectLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center gap-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-[#e67817] transition-colors group-hover:border-[#e67817]/60">
                      <Icon size={16} />
                    </span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-y border-white/10 py-6 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-black tracking-normal text-white">
              500KM+
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/50">
              Road Infrastructure
            </p>
          </div>

          <div>
            <p className="text-3xl font-black tracking-normal text-white">
              120K+
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/50">
              Jobs Created
            </p>
          </div>

          <div>
            <p className="text-3xl font-black tracking-normal text-white">
              1.2M
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/50">
              Citizens Empowered
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright 2027 Governor Umo Eno Portfolio. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-white/60">
            <ShieldCheck size={15} className="text-[#e67817]" />
            <span className="uppercase tracking-[0.18em]">
              Continuity. Service. Development.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
