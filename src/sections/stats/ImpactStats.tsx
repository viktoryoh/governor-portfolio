"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
const stats = [
  { value: 1500, suffix: "+", unit: "KM", label: "Road programme", note: "Completed, inherited and ongoing works", href: "/projects/infrastructure" },
  { value: 258000, suffix: "", unit: "", label: "Health insurance enrolments", note: "Residents enrolled in the state scheme", href: "/projects/infrastructure" },
  { value: 1700, suffix: "", unit: "", label: "Farmers supported", note: "Agricultural grant recipients", href: "/projects/agriculture-food-security" },
  { value: 4000, suffix: "+", unit: "", label: "Youths trained", note: "Skills and entrepreneurship at IBOM-LED and DASAC", href: "/projects/empowerment" },
];
const format = (value: number) => value.toLocaleString("en-NG");

export default function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const numbers = section.querySelectorAll<HTMLElement>("[data-count]");
      ScrollTrigger.create({
        trigger: section, start: "top 80%", once: true,
        onEnter: () => {
          numbers.forEach((element, index) => {
            const counter = { value: 0 };
            gsap.to(counter, { value: stats[index].value, duration: 1.25, delay: index * 0.08, ease: "power2.out", onUpdate: () => { element.textContent = format(Math.round(counter.value)) + stats[index].suffix; } });
          });
          gsap.fromTo(section.querySelectorAll("[data-reveal]"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 });
        },
      });
      return () => numbers.forEach((element, index) => { element.textContent = format(stats[index].value) + stats[index].suffix; });
    }, section);
    return () => media.revert();
  }, []);

  return (
    <section id="impact" ref={sectionRef} aria-labelledby="impact-heading" className="bg-[#f8faf8] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase text-[#b55609]">Governance Impact</p>
            <h2 id="impact-heading" className="text-4xl font-black leading-[1.05] text-[#038347] sm:text-5xl">Results That<br />Speak Clearly.</h2>
          </div>
          <p className="max-w-[460px] text-base leading-7 text-slate-600 lg:justify-self-end">Investing in the connections, services and opportunities that move Akwa Ibom forward.</p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => <Link key={stat.label} href={stat.href} data-reveal className="group block min-w-0 border-t border-[#038347]/25 pt-6">
            <p aria-label={`${format(stat.value)}${stat.suffix} ${stat.unit}`} className="mb-5 flex min-h-14 flex-wrap items-baseline gap-2 text-[42px] font-black leading-none tabular-nums text-[#038347]">
              <span data-count aria-hidden="true">{format(stat.value)}{stat.suffix}</span>{stat.unit && <span aria-hidden="true" className="text-lg">{stat.unit}</span>}
            </p>
            <div className="flex items-start justify-between gap-3"><h3 className="text-base font-bold text-slate-900">{stat.label}</h3><ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-[#b55609] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{stat.note}</p>
          </Link>)}
        </div>
        <p className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">Government-reported figures, September 2026. <a href="https://akwaibomstate.gov.ng/elementor-8116/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#0B6B3A]">Read the anniversary report</a>.</p>
      </div>
    </section>
  );
}
