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
        label: "1,500KM+ Road Programme",
        href: "/projects/infrastructure",
      },
      {
        label: "4,000+ Youths Trained",
        href: "/projects/empowerment",
      },
      {
        label: "1,700 Farmers Supported",
        href: "/projects/agriculture-food-security",
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
    <footer className="relative min-h-[720px] overflow-hidden bg-[#06140d] text-white md:min-h-[780px]">
      <Image
        src="/images/projects/road99.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,13,0.82)_0%,rgba(6,20,13,0.85)_66%,rgba(6,20,13,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(230,120,23,0.12)_0%,transparent_38%,rgba(3,131,71,0.16)_82%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#038347]/40 to-transparent" />

      <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col px-6 pb-0 pt-10 md:min-h-[780px] md:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="max-w-[520px] text-white">
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

            <p className="text-sm leading-7 text-white/80 md:text-[15px]">
              Infrastructure, food security, transport and empowerment.
              Discover the projects shaping Akwa Ibom&apos;s future.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/re-elect"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#038347] px-5 text-xs font-black uppercase tracking-normal text-white transition-colors duration-200 hover:bg-[#0B6B3A]"
              >
                Join Movement
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 px-5 text-xs font-black uppercase tracking-normal text-white transition-colors duration-200 hover:bg-white/10"
              >
                View Mandate
              </Link>
            </div>

            <p className="mt-6 text-xs font-medium text-white/65">
              Copyright 2026 Governor Umo Eno Portfolio. All rights reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-white sm:grid-cols-3 lg:justify-self-end">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-4 text-xs font-bold uppercase tracking-normal text-[#ff9b42]">
                  {group.title}
                </p>

                <nav className="grid gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
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

        <div className="mt-auto pt-12">
          <div className="mb-8 grid gap-4 border-y border-white/25 bg-[#06140d]/20 px-4 py-5 text-white backdrop-blur-[2px] sm:grid-cols-3 md:max-w-[680px]">
            <div>
              <p className="text-3xl font-black tracking-normal [text-shadow:0_3px_20px_rgba(0,0,0,0.65)]">1,500KM+</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
                Road Programme
              </p>
            </div>

            <div>
              <p className="text-3xl font-black tracking-normal [text-shadow:0_3px_20px_rgba(0,0,0,0.65)]">4,000+</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
                Youths Trained
              </p>
            </div>

            <div>
              <p className="text-3xl font-black tracking-normal [text-shadow:0_3px_20px_rgba(0,0,0,0.65)]">1,700</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
                Farmers Supported
              </p>
            </div>
          </div>

          <p className="mb-8 text-xs leading-5 text-white/65">Government-reported figures, September 2026. <a href="https://akwaibomstate.gov.ng/elementor-8116/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">Source report</a>.</p>
          <h2
            aria-label="GOV. UMO ENO"
            className="pointer-events-none select-none whitespace-nowrap text-[32px] font-black uppercase leading-none tracking-normal text-white/90 drop-shadow-[0_28px_90px_rgba(6,20,13,0.35)] sm:text-[64px] md:text-[80px] lg:text-[104px] xl:text-[140px]"
          >
            GOV. UMO ENO
          </h2>
        </div>
      </div>
    </footer>
  );
}
