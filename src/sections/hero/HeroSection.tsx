"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import FloatingBubbles from "@/components/atmosphere/FloatingBubbles";
import MagneticButton from "@/components/ui/MagneticButton";
import CinematicShader from "@/components/webgl/CinematicShader";
import LightSweep from "@/components/atmosphere/LightSweep";

const heroImages = [
  "/images/governor-1.png",
  "/images/governor-2.jpg",
  "/images/governor-3.jpg",
];

const heroScenes = [
  { id: "progress", lines: ["Progress"] },
  { id: "continue", lines: ["Continue"] },
  { id: "result", lines: ["Result", "That Speaks Clearly"] },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

const textLayerRef = useRef<HTMLDivElement>(null);
const buttonLayerRef = useRef<HTMLDivElement>(null);
const atmosphereLayerRef = useRef<HTMLDivElement>(null);

  
const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = gsap.context(() => {
    const scenes = gsap.utils.toArray<HTMLElement>(".hero-scene");

    if (reducedMotion) {
      const finalScene = scenes[scenes.length - 1];
      gsap.set(finalScene, { autoAlpha: 1 });
      gsap.set(finalScene.querySelectorAll(".hero-letter"), { autoAlpha: 1 });
      return;
    }

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.4, delay: 0.25 });

    // Hidden letters reserve the final phrase's width throughout typing.
    scenes.forEach((scene) => {
      const letters = scene.querySelectorAll(".hero-letter");

      timeline
        .fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 })
        .fromTo(
          letters,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.06, stagger: 0.14, ease: "none" }
        )
        .to(scene, { autoAlpha: 0, duration: 0.75, ease: "power2.inOut" }, ">2")
        .set(letters, { autoAlpha: 0 })
        .to({}, { duration: 0.25 });
    });
  }, sectionRef);


  // DISTORTION RIPPLE EFFECT

const handleMouseMove = (e: MouseEvent) => {
  if (reducedMotion) return;

  const x =
    (e.clientX / window.innerWidth - 0.5) * 40;

  const y =
    (e.clientY / window.innerHeight - 0.5) * 40;

  // IMAGE LAYER
  if (imageWrapperRef.current) {
    gsap.to(imageWrapperRef.current, {
      x: Math.round(x * 0.15),
      y: Math.round(y * 0.15),
      duration: 1.8,
      ease: "power3.out",
    });
  }

  // ATMOSPHERE
  if (atmosphereLayerRef.current) {
    gsap.to(atmosphereLayerRef.current, {
      x: x * 0.55,
      y: y * 0.55,
      duration: 2.4,
      ease: "power3.out",
    });
  }

  // GLOW
  if (glowRef.current) {
    gsap.to(glowRef.current, {
      x: x * 0.75,
      y: y * 0.75,
      duration: 2.6,
      ease: "power3.out",
    });
  }

  // BUTTON
  if (buttonLayerRef.current) {
    gsap.to(buttonLayerRef.current, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 1.2,
      ease: "power3.out",
    });
  }
};

window.addEventListener(
  "mousemove",
  handleMouseMove
);

  return () => {
    window.removeEventListener(
  "mousemove",
  handleMouseMove
);
  ctx.revert();
};
}, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        h-screen
        overflow-hidden
        bg-[#e67817]
      "
    >
        <div className="absolute inset-0 z-[2] pointer-events-none opacity-25">
          <CinematicShader />
        </div>
        <div
  ref={atmosphereLayerRef}
  className="absolute inset-0 z-[15] opacity-30"
>
  <LightSweep />
</div>
      {/* GOVERNOR IMAGE */}
     <div
  ref={imageWrapperRef}
  className="
    absolute
    -inset-2
    overflow-hidden
  "
>
  {heroImages.map((image, index) => (
    <Image
      key={index}
      src={image}
      alt="Governor"
      fill
      sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
      quality={95}
      loading={index === 0 ? "eager" : "lazy"}
      fetchPriority={index === 0 ? "high" : "auto"}
      className={`
        hero-photo
        object-cover
        object-center
        transition-opacity
        duration-[800ms]
        ease-in-out
        absolute
        inset-0
        ${
          index === currentImage
            ? "opacity-100"
            : "opacity-0"
        }
      `}
    />
  ))}
</div>
      <FloatingBubbles />

    {/* DISTORTION GLOW */}
<div
  ref={glowRef}
  className="
    absolute
    inset-0
    pointer-events-none
    z-[5]
  "
>
  <div
    className="
      absolute
      top-1/2
      left-1/2
      h-[700px]
      w-[700px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-[#038347]/5
      blur-[140px]
    "
  />
</div>


      <div className="hero-readability-overlay absolute inset-0 pointer-events-none" />

      <div
  ref={textLayerRef}
  className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none"
>
        <h1 className="hero-headline">
          <span className="sr-only">Progress. Continue. Result That Speaks Clearly.</span>
          {heroScenes.map((scene) => (
            <span key={scene.id} className={`hero-scene hero-scene--${scene.id}`} aria-hidden="true">
              {scene.lines.map((line) => (
                <span key={line} className="hero-line">
                  {line.split(" ").map((word, wordIndex) => (
                    <span key={`${word}-${wordIndex}`}>
                      {wordIndex > 0 && <span className="hero-letter"> </span>}
                      <span className="hero-word">
                        {Array.from(word).map((letter, letterIndex) => (
                          <span key={letterIndex} className="hero-letter">{letter}</span>
                        ))}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>
        

    

{/* MAGNETIC BUTTON */}
<div
  ref={buttonLayerRef}
  className="
    absolute
    bottom-14
    left-1/2
    -translate-x-1/2
    z-[70]
  "
>
  <MagneticButton href="/projects">
    Explore Projects
  </MagneticButton>
</div>
    </section>
    
  );
}


