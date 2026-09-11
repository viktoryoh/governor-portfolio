"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import FloatingBubbles from "@/components/atmosphere/FloatingBubbles";
import MagneticButton from "@/components/ui/MagneticButton";
import CinematicShader from "@/components/webgl/CinematicShader";
import LightSweep from "@/components/atmosphere/LightSweep";
gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  "/images/governor-1.png",
  "/images/governor-2.jpg",
  "/images/governor-3.jpg",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

const textLayerRef = useRef<HTMLDivElement>(null);
const buttonLayerRef = useRef<HTMLDivElement>(null);
const atmosphereLayerRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef<HTMLHeadingElement>(null);
  const continuesRef = useRef<HTMLHeadingElement>(null);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  
const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const ctx = gsap.context(() => {

    const tl = gsap.timeline({
   scrollTrigger: {
  trigger: sectionRef.current,
  start: "top top",
  end: "+=5000",
  scrub: 1,
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
  invalidateOnRefresh: true,
},
    });



    // INITIAL STATES
    gsap.set(continuesRef.current, {
      opacity: 0,
      y: 80,
    });

    gsap.set(resultsRef.current, {
      opacity: 0,
      y: 80,
    });

    // SCENE 1 — PROGRESS
    tl.fromTo(
      progressRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 1.2,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2.5,
        ease: "power3.out"
      }
    );

    // FADE OUT PROGRESS
    tl.to(
  progressRef.current,
  {
    opacity: 0,
    x: -300,
    filter: "blur(10px)",
    duration: 2,
    ease: "power3.inOut",
  },
  ">1.2"
);

    // SCENE 2 — CONTINUES
    tl.to(
      continuesRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: "power3.out"
      },
      ">0.3"
    );

    // FADE OUT CONTINUES
    tl.to(
  continuesRef.current,
  {
    opacity: 0,
    x: 300,
    filter: "blur(10px)",
    duration: 2,
    ease: "power3.inOut",
  },
  ">1.2"
);

    // SCENE 3 — RESULTS
    tl.to(
      resultsRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: "power3.out"
      },
      ">0.3"
    );

    // FADE OUT RESULTS
    tl.to(
      resultsRef.current,
      {
        opacity: 0,
        y: -120,
        duration: 2.5,
        ease: "power3.out"
      },
      ">1.2"
    );

  }, sectionRef);


  // DISTORTION RIPPLE EFFECT

const handleMouseMove = (e: MouseEvent) => {

  const x =
    (e.clientX / window.innerWidth - 0.5) * 40;

  const y =
    (e.clientY / window.innerHeight - 0.5) * 40;

  // IMAGE LAYER
  if (imageWrapperRef.current) {
    gsap.to(imageWrapperRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      rotationY: x * 0.08,
      rotationX: -y * 0.08,
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

  // TEXT
  if (textLayerRef.current) {
    gsap.to(textLayerRef.current, {
      x: x * 0.12,
      y: y * 0.12,
      duration: 1.6,
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
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  ctx.revert();
};
}, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        overflow-hidden
        bg-[#e67817]
      "
    >
        <CinematicShader />
        <div
  ref={atmosphereLayerRef}
  className="absolute inset-0 z-[15]"
>
  <LightSweep />
</div>
      {/* GOVERNOR IMAGE */}
     <div
  ref={imageWrapperRef}
  className="
    absolute
    inset-0
    overflow-hidden
  "
>
  {heroImages.map((image, index) => (
    <Image
      key={index}
      src={image}
      alt="Governor"
      fill
      sizes="100vw"
      loading={index === 0 ? "eager" : "lazy"}
      className={`
        object-cover
        object-center
        scale-100
        brightness-110
        contrast-110
        transition-opacity
        duration-[2500ms]
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
      bg-[#038347]/20
      blur-[140px]
    "
  />
</div>


      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/15" />

      {/* GREEN ATMOSPHERIC GRADIENT */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(11,107,58,0.10)_0%,rgba(0,0,0,0.35)_100%)]
        "
      />

      <div
  ref={textLayerRef}
  className="absolute inset-0 z-[60]"
></div>

      {/* PROGRESS */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          z-[60]
          pointer-events-none
        "
      >
        <h1
          ref={progressRef}
          className="
            text-white
            text-[10vw]
            font-black
            uppercase
            tracking-[-0.08em]
            leading-none
            text-center
          "
        >
          Progress
        </h1>
      </div>

      {/* CONTINUES */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          z-[60]
          pointer-events-none
        "
      >
        <h1
          ref={continuesRef}
          className="
            text-[#e67817]
            text-[10vw]
            font-black
            uppercase
            tracking-[-0.08em]
            leading-none
            text-center
            translate-y-[140px]
          "
        >
          Continues
        </h1>
      </div>

      {/* RESULTS */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          z-[60]
          pointer-events-none
          px-6
        "
      >
        <h1
          ref={resultsRef}
          className="
            text-white
            text-center
            text-[9vw]
            md:text-[6vw]
            font-black
            uppercase
            tracking-[-0.08em]
            leading-[0.9]
          "
        >
          Results
          <br />
          That Speak Clearly
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


