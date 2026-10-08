"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const heroImages = ["/images/governor-1.png", "/images/governor-2.jpg", "/images/governor-3.jpg"];
const heroScenes = [
  { id: "progress", lines: ["Progress"] },
  { id: "continue", lines: ["Continue"] },
  { id: "result", lines: ["Result", "That Speaks Clearly"] },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const scenes = section.querySelectorAll<HTMLElement>(".hero-scene");
      const photos = section.querySelectorAll(".hero-photo");
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(section.querySelectorAll(".hero-letter"), { autoAlpha: 0 });
      // Photos, typing and pauses share one clock.
      scenes.forEach((scene, index) => {
        const letters = scene.querySelectorAll(".hero-letter");
        timeline
          .to(photos, { opacity: (i) => i === index ? 1 : 0, duration: 0.8 })
          .set(scene, { autoAlpha: 1 })
          .to(letters, { autoAlpha: 1, duration: 0.05, stagger: 0.09, ease: "none" })
          .to(scene, { autoAlpha: 0, duration: 0.45 }, ">2.8")
          .set(letters, { autoAlpha: 0 });
      });
      let visible = true;
      const sync = () => { timeline.paused(!visible || document.hidden); };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      }, { threshold: 0.1 });
      observer.observe(section);
      document.addEventListener("visibilitychange", sync);
      sync();
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
      };
    }, section);
    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section relative isolate overflow-hidden bg-[#e67817]">
      <div className="absolute inset-0" aria-hidden="true">
        {heroImages.map((src, index) => (
          <Image key={src} src={src} alt="" fill sizes="(max-aspect-ratio: 3/2) 150vh, 100vw" quality={95}
            loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"}
            className={`hero-photo object-cover ${index === 0 ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
      <div className="hero-readability-overlay absolute inset-0 pointer-events-none" />
      <div className="hero-content relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-5 pb-14 sm:px-8 lg:px-16">
        <h1 className="mb-4 text-xl font-bold text-white sm:text-2xl">Governor Umo Eno</h1>
        <div className="hero-headline">
          <span className="sr-only">Progress. Continue. Result That Speaks Clearly.</span>
          {heroScenes.map((scene) => (
            <span key={scene.id} className={`hero-scene hero-scene--${scene.id}`} aria-hidden="true">
              {scene.lines.map((line) => (
                <span key={line} className="hero-line">
                  {line.split(" ").map((word, wordIndex) => (
                    <span key={word}>
                      {wordIndex > 0 && <span className="hero-letter"> </span>}
                      <span className="hero-word">
                        {Array.from(word).map((letter, i) => <span key={i} className="hero-letter">{letter}</span>)}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <MagneticButton href="/projects">Explore Projects</MagneticButton>
        </div>
        <a href="#impact" aria-label="View governance impact" title="View governance impact" className="absolute bottom-10 right-8 hidden h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15 lg:flex">
          <ArrowDown size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}


