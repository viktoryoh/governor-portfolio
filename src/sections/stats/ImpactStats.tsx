"use client";

import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { GraduationCap, HeartPulse, Route, Sprout } from "lucide-react";
import styles from "./ImpactStats.module.css";

gsap.registerPlugin(ScrollTrigger);
const stats = [
  { value: 1500, suffix: "+", unit: "KM", label: "Road programme", note: "Completed, inherited and ongoing works", href: "/projects/infrastructure", icon: Route, accent: "#038347", tint: "#d9eee2" },
  { value: 258000, suffix: "", unit: "", label: "Health insurance enrolments", note: "Residents enrolled in the state scheme", href: "/projects/infrastructure", icon: HeartPulse, accent: "#197b87", tint: "#ddeff1" },
  { value: 1700, suffix: "", unit: "", label: "Farmers supported", note: "Agricultural grant recipients", href: "/projects/agriculture-food-security", icon: Sprout, accent: "#b66620", tint: "#f3e6d9" },
  { value: 4000, suffix: "+", unit: "", label: "Youths trained", note: "Skills and entrepreneurship at IBOM-LED and DASAC", href: "/projects/empowerment", icon: GraduationCap, accent: "#365f99", tint: "#e1e9f5" },
];
const format = (value: number) => value.toLocaleString("en-NG");

export default function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltMediaRef = useRef<MediaQueryList | null>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    tiltMediaRef.current = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
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
    return () => {
      tiltMediaRef.current = null;
      media.revert();
    };
  }, []);

  const tiltCard = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || !tiltMediaRef.current?.matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
    card.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
  };

  const resetTilt = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  };

  return (
    <section id="impact" ref={sectionRef} aria-labelledby="impact-heading" className="bg-[#edf3ef] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase text-[#b55609]">Governance Impact</p>
            <h2 id="impact-heading" className="text-4xl font-black leading-[1.05] text-[#038347] sm:text-5xl">Results That<br />Speak Clearly.</h2>
          </div>
          <p className="max-w-[460px] text-base leading-7 text-slate-600 lg:justify-self-end">Investing in the connections, services and opportunities that move Akwa Ibom forward.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} data-reveal className={styles.frame}>
                <Link
                  href={stat.href}
                  className={styles.card}
                  style={{ "--card-accent": stat.accent, "--card-tint": stat.tint } as CSSProperties}
                  onPointerMove={tiltCard}
                  onPointerLeave={resetTilt}
                  onPointerCancel={resetTilt}
                >
                  <div className={styles.topline} aria-hidden="true">
                    <span className={styles.icon}><Icon size={21} strokeWidth={1.7} /></span>
                    <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p aria-label={`${format(stat.value)}${stat.suffix} ${stat.unit}`} className={styles.number}>
                    <span data-count aria-hidden="true">{format(stat.value)}{stat.suffix}</span>{stat.unit && <span aria-hidden="true" className={styles.unit}>{stat.unit}</span>}
                  </p>
                  <h3 className={styles.title}>{stat.label}</h3>
                  <p className={styles.note}>{stat.note}</p>
                </Link>
              </div>
            );
          })}
        </div>
        <p className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">Government-reported figures, September 2026. <a href="https://akwaibomstate.gov.ng/elementor-8116/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#0B6B3A]">Read the anniversary report</a>.</p>
      </div>
    </section>
  );
}
