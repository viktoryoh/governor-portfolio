import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const footerGroups = [
  {
    title: "Portfolio",
    links: [
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
    ],
  },
  {
    title: "Mandate",
    links: [
      {
        label: "Infrastructure",
        href: "/projects/infrastructure",
      },
      {
        label: "Transportation",
        href: "/projects/transportation",
      },
      {
        label: "Food Security",
        href: "/projects/agriculture-food-security",
      },
      {
        label: "Empowerment",
        href: "/projects/empowerment",
      },
    ],
  },
  {
    title: "Impact",
    links: [
      {
        label: "500KM+ Roads",
        href: "/projects/infrastructure",
      },
      {
        label: "120K+ Jobs",
        href: "/projects/empowerment",
      },
      {
        label: "1.2M Citizens",
        href: "/projects",
      },
      {
        label: "2027 Continuity",
        href: "/re-elect",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-[1000] min-h-[720px] overflow-hidden bg-[#06140d] text-white md:min-h-[780px]">
      <Image
        src="/images/projects/road99.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,248,0.90)_0%,rgba(248,250,248,0.54)_28%,rgba(6,20,13,0.62)_66%,rgba(6,20,13,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(230,120,23,0.12)_0%,transparent_38%,rgba(3,131,71,0.16)_82%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#038347]/40 to-transparent" />

      <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col px-6 pb-0 pt-10 md:min-h-[780px] md:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="max-w-[520px] text-[#07150f]">
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-lg border border-[#038347]/20 bg-white/50 p-1.5 backdrop-blur-md">
                <Image
                  src="/images/state-logo.png"
                  alt="Akwa Ibom State Logo"
                  fill
                  sizes="48px"
                  className="object-contain p-1.5"
                />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e67817]">
                  Akwa Ibom State
                </p>
                <p className="mt-1 text-sm font-black uppercase tracking-normal">
                  Governor Umo Eno Portfolio
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-[#07150f]/75 md:text-[15px]">
              Gov. Umo Eno&apos;s portfolio brings infrastructure, food security,
              transport, empowerment, and civic impact into one refined campaign
              experience built around continuity and measurable progress.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/re-elect"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#07150f] px-5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_45px_rgba(7,21,15,0.22)] transition-all duration-300 hover:bg-[#038347]"
              >
                Join Movement
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#07150f]/15 bg-white/35 px-5 text-xs font-black uppercase tracking-[0.14em] text-[#07150f] backdrop-blur-md transition-all duration-300 hover:border-[#038347]/40 hover:bg-white/55"
              >
                View Mandate
              </Link>
            </div>

            <p className="mt-6 text-xs font-medium text-[#07150f]/50">
              Copyright 2027 Governor Umo Eno Portfolio. All rights reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[#07150f] sm:grid-cols-3 lg:justify-self-end">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.26em] text-[#038347]">
                  {group.title}
                </p>

                <nav className="grid gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-[#07150f]/75 transition-colors hover:text-[#038347]"
                    >
                      <ChevronRight
                        size={14}
                        className="text-[#e67817] opacity-0 transition-opacity group-hover:opacity-100"
                      />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="mb-8 grid gap-4 border-y border-white/25 bg-[#06140d]/20 px-4 py-5 text-white backdrop-blur-[2px] sm:grid-cols-3 md:max-w-[680px]">
            <div>
              <p className="text-3xl font-black tracking-normal [text-shadow:0_3px_20px_rgba(0,0,0,0.65)]">500KM+</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
                Roads
              </p>
            </div>

            <div>
              <p className="text-3xl font-black tracking-normal [text-shadow:0_3px_20px_rgba(0,0,0,0.65)]">120K+</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
                Jobs
              </p>
            </div>

            <div>
              <p className="text-3xl font-black tracking-normal [text-shadow:0_3px_20px_rgba(0,0,0,0.65)]">1.2M</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
                Citizens
              </p>
            </div>
          </div>

          <h2
            aria-label="GOV. UMO ENO"
            className="pointer-events-none select-none whitespace-nowrap text-[36px] font-black uppercase leading-none tracking-normal text-white/90 drop-shadow-[0_28px_90px_rgba(6,20,13,0.35)] sm:text-[64px] md:text-[92px] lg:text-[124px] xl:text-[156px] 2xl:text-[184px]"
          >
            GOV. UMO ENO
          </h2>
        </div>
      </div>
    </footer>
  );
}
