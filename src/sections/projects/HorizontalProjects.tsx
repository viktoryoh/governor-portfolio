"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
const projects = [
  { title: "Infrastructure that connects.", category: "Infrastructure", image: "/images/projects/road1.jpg", href: "/projects/infrastructure", description: "Roads, bridges and public facilities connecting communities to the places and services that matter." },
  { title: "Moving Akwa Ibom forward.", category: "Transportation", image: "/images/projects/public-transit-fleet.jpg", href: "/projects/transportation", description: "Public transport, aviation and mobility projects supporting everyday journeys and a growing economy." },
  { title: "Growing a stronger future.", category: "Food Security", image: "/images/projects/agriculture.jpg", href: "/projects/agriculture-food-security", description: "Support for farmers, local food production and agricultural enterprise across Akwa Ibom." },
  { title: "Opportunity in every community.", category: "Empowerment", image: "/images/projects/youth1.jpg", href: "/projects/empowerment", description: "Skills, entrepreneurship and community programmes helping people build their next chapter." },
];

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - section.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section, start: "top 80px", pin: true, scrub: 0.45,
          end: () => "+=" + (track.scrollWidth - section.clientWidth),
          invalidateOnRefresh: true,
          onUpdate: (trigger) => setActive(Math.round(trigger.progress * (projects.length - 1))),
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;
      return () => { triggerRef.current = null; };
    }, section);
    return () => media.revert();
  }, []);

  const select = (index: number) => {
    const trigger = triggerRef.current;
    if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * index / (projects.length - 1), behavior: "smooth" });
    else sectionRef.current?.querySelectorAll("article")[index]?.scrollIntoView({ behavior: "auto", block: "center" });
  };

  return (
    <section ref={sectionRef} aria-labelledby="projects-heading" className="project-section relative">
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-5 pb-4 pt-10 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-8">
        <h2 id="projects-heading" className="text-sm font-bold uppercase text-[#0B6B3A]">Projects in Focus</h2>
        <nav aria-label="Project categories" className="hidden flex-wrap items-center gap-4 lg:flex">
          {projects.map((project, index) => <button key={project.category} type="button" onClick={() => select(index)} aria-current={active === index ? "true" : undefined} className={`min-h-11 border-b-2 text-sm transition-colors ${active === index ? "border-[#e67817] font-bold text-[#0B6B3A]" : "border-transparent text-slate-600 hover:text-[#0B6B3A]"}`}>{project.category}</button>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <span className="min-w-12 text-sm tabular-nums text-slate-600">{String(active + 1).padStart(2, "0")} / 04</span>
          <button type="button" aria-label="Previous project" title="Previous project" disabled={active === 0} onClick={() => select(active - 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0B6B3A]/25 text-[#0B6B3A] hover:bg-white disabled:opacity-30"><ArrowLeft size={18} /></button>
          <button type="button" aria-label="Next project" title="Next project" disabled={active === 3} onClick={() => select(active + 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0B6B3A]/25 text-[#0B6B3A] hover:bg-white disabled:opacity-30"><ArrowRight size={18} /></button>
        </div>
      </div>
      <div ref={trackRef} className="project-track">
        {projects.map((project, index) => <article key={project.href} aria-labelledby={`project-title-${index}`} className="project-panel">
          <div className="project-layout">
            <Link href={project.href} onFocus={() => { if (triggerRef.current) select(index); }} aria-label={`View ${project.category} projects`} className="project-picture group block">
              <Image src={project.image} alt={project.category === "Infrastructure" ? "Road infrastructure in Akwa Ibom" : `${project.category} project in Akwa Ibom`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
            </Link>
            <div className="min-w-0">
              <p className="mb-4 text-xs font-bold uppercase text-[#b55609]">{String(index + 1).padStart(2, "0")} / {project.category}</p>
              <h3 id={`project-title-${index}`} className="project-title mb-6 text-[#0f172a]">{project.title}</h3>
              <p className="mb-8 max-w-[480px] text-base leading-7 text-slate-600">{project.description}</p>
              <Link href={project.href} onFocus={() => { if (triggerRef.current) select(index); }} className="inline-flex min-h-12 items-center gap-3 border-b border-[#0B6B3A] text-sm font-bold text-[#0B6B3A] transition-colors hover:text-[#b55609]">View {project.category}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </article>)}
      </div>
    </section>
  );
}
