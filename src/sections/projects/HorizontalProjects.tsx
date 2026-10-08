"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);
const projects = [
  { title: "Road Infrastructure", image: "/images/projects/road1.jpg" },
  { title: "Digital Economy", image: "/images/projects/hospital.jpg" },
  { title: "Transportation Systems", image: "/images/projects/infra.jpg" },
  { title: "Youth Empowerment", image: "/images/projects/youth1.jpg" },
];

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + track.offsetWidth,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-background-title").forEach((text) => {
        gsap.to(text, {
          xPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: text, scrub: 1.5 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-picture").forEach((wrapper) => {
        gsap.fromTo(wrapper.querySelector("img"),
          { scale: 1.4, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
              end: "bottom center",
              scrub: 1.5,
            },
          }
        );
      });
    }, section);
    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="Signature projects" className="project-section relative">
      <div ref={trackRef} className="project-track">
        {projects.map((project, index) => (
          <article key={project.title} aria-labelledby={`project-title-${index}`} className="project-panel relative">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <span className="project-background-title select-none whitespace-nowrap font-black uppercase leading-none text-black/[0.04]">
                {project.title}
              </span>
            </div>
            <div className="project-layout relative">
              <div className="project-picture group">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="min-w-0">
                <p className="mb-5 text-[11px] uppercase text-[#0B6B3A]">Signature Project</p>
                <h2 id={`project-title-${index}`} className="project-title mb-8 text-slate-900">{project.title}</h2>
                <p className="mb-10 max-w-[520px] text-[18px] leading-[1.9] text-slate-700">
                  Strategic investments delivering sustainable infrastructure,
                  innovation, transportation, and long-term economic growth
                  across the state.
                </p>
                <MagneticButton href="/projects">Explore Projects</MagneticButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
