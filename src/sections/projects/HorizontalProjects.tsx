"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Road Infrastructure",
    image: "/images/projects/road1.jpg",
  },
  {
    title: "Digital Economy",
    image: "/images/projects/hospital.jpg",
  },
  {
    title: "Transportation Systems",
    image: "/images/projects/infra.jpg",
  },
  {
    title: "Youth Empowerment",
    image: "/images/projects/youth1.jpg",
  },
];

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    const texts = gsap.utils.toArray<HTMLElement>(".parallax-text");
    const images = gsap.utils.toArray<HTMLElement>(".project-image");
    const wrappers = gsap.utils.toArray<HTMLElement>(".project-wrapper");

    if (!sectionRef.current || !containerRef.current || panels.length === 0) {
      return;
    }

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: panels.length > 1 ? 1 / (panels.length - 1) : undefined,
        end: () => "+=" + containerRef.current!.offsetWidth,
      },
    });

    texts.forEach((text) => {
      gsap.to(text, {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: text,
          scrub: 1.5,
        },
      });
    });

    images.forEach((image, index) => {
      const wrapper = wrappers[index];

      if (!wrapper) return;

      gsap.fromTo(
        image,
        {
          scale: 1.4,
          opacity: 0.4,
        },
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
  }, sectionRef);

  return () => ctx.revert();
}, []);

  

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#bcc8bc]"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#dbe4db_0%,#bcc8bc_100%)]" />

      <div
        ref={containerRef}
        className="flex w-[400vw] h-screen"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              panel
              relative
              w-screen
              h-screen
              flex
              items-center
              justify-center
              px-12
            "
          >
            {/* MASSIVE BACKGROUND TYPOGRAPHY */}
<div
  className="
    absolute
    inset-0
    flex
    items-center
    justify-center
    pointer-events-none
    overflow-hidden
  "
>
  <h1
    className="
      parallax-text
      text-[22vw]
      font-black
      uppercase
      tracking-[-0.08em]
      leading-none
      text-black/[0.04]
      whitespace-nowrap
      select-none
    "
  >
    {project.title}
  </h1>
</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center max-w-[1400px] w-full">
              
              {/* IMAGE */}
              <div className="relative group">
                
                <div className="absolute inset-0 rounded-[40px] bg-green-300/20 blur-[80px] opacity-60" />

                <div
                  className="
                  project-wrapper
                    relative
                    h-[520px]
                    overflow-hidden
                    rounded-[40px]
                    border
                    border-white/20
                  "
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="
                      project-image
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </div>
              </div>

              {/* TEXT */}
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#0B6B3A]">
                  Signature Project
                </p>

                <h2
                  className="
                    text-[56px]
                    md:text-[90px]
                    font-black
                    leading-[0.9]
                    tracking-[-0.07em]
                    text-slate-900
                    mb-8
                  "
                >
                  {project.title}
                </h2>

                <p className="max-w-[520px] text-[18px] leading-[1.9] text-slate-700 mb-10">
                  Strategic investments delivering
                  sustainable infrastructure,
                  innovation, transportation,
                  and long-term economic growth
                  across the state.
                </p>

                {/* CTA BUTTON */}
                      <MagneticButton href="/projects">
                        Explore Projects
                      </MagneticButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
