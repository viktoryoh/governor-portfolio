"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const word = "AGRICULTURE & FOOD SECURITY";

const digitalImages = [
  "/images/projects/food.jpg",
  "/images/projects/agr1.jpg",
  "/images/projects/food3.jpg",
  "/images/projects/agri.jpg",
  "/images/projects/food1.jpg",
  "/images/projects/food4.jpg",
  "/images/projects/umo3.jpg",
  "/images/projects/tractorr.jpg",
  "/images/projects/agri2.jpg",
  "/images/projects/food8.jpg",
  "/images/projects/traccc.jpg",
  "/images/projects/traaa.jpg",
];

const imageTitles = [
  "Food Production Revolution",
  "Modern Farming Techniques",
  "Food Sustainability",
  "Fish Farming",
  "Food Availability",
  "Next Generation Economic Platforms",
  "Modern tractor and machinery",
  "Modern tractor and machinery",
  "Lifestock Health Monitoring",
  "Food Sufficiency and Security",
  "Tractorization and Mechanization",
  "Modern Farming Equipment",
];

export default function DigitalEconomyPage() {

  const [showGallery, setShowGallery] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {

      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });

    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

  }, []);

  useEffect(() => {

    if (!showGallery) return;

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        prev === digitalImages.length - 1
          ? 0
          : prev + 1
      );

    }, 5000);

    return () => clearInterval(interval);

  }, [showGallery]);

  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: false,
        },
      });

    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };

  }, []);

  return (

    <main
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
    >

      {/* TOP BAR */}
      <div
        className="
          fixed
          top-0
          left-0
          z-[500]
          w-full
          flex
          items-center
          justify-between
          px-6
          md:px-12
          pt-8
        "
      >

        {/* LOGO */}
        <Link href="/">

          <div
            className="
              relative
              w-[78px]
              h-[78px]
              rounded-full
              bg-white/10
              backdrop-blur-xl
              border
              border-white/10
              p-2
              transition-transform
              duration-500
              hover:scale-105
            "
          >

            <Image
              src="/images/state-logo.png"
              alt="Logo"
              fill
              sizes="78px"
              className="object-contain"
            />

          </div>

        </Link>

      </div>

      {/* FLOATING IMAGE */}
<motion.div
  initial={{
    opacity: 0,
    y: 40,
  }}
  animate={{
    opacity: 1,
    y: [0, -10, 0],
  }}
  transition={{
    opacity: {
      duration: 1.5,
    },
    y: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="
    fixed
    right-0
    -bottom-6
    z-[500]
    pointer-events-none
  "
>
  <div
    className="
      absolute
      bottom-10
      right-10
      w-[260px]
      h-[260px]
      rounded-full
      bg-yellow-500/20
      blur-[90px]
    "
  />

  <div
    className="
      relative
      w-[280px]
      sm:w-[360px]
      md:w-[500px]
      lg:w-[560px]

      h-[360px]
      sm:h-[460px]
      md:h-[620px]
      lg:h-[680px]

      opacity-90
      translate-x-[18%]
      sm:translate-x-[22%]
      md:translate-x-[28%]
      lg:translate-x-[32%]
    "
  >
    <Image
      src="/images/umologo.png"
      alt="Governor"
      fill
      sizes="(max-width: 639px) 280px, (max-width: 767px) 360px, (max-width: 1023px) 500px, 560px"
      loading="eager"
      className="
        object-contain
        object-right-bottom
        drop-shadow-[0_0_35px_rgba(234,179,8,0.45)]
      "
    />
  </div>
</motion.div>

      {/* HERO IMAGE */}
      <motion.div
        initial={{
          scale: 1.35,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        className="absolute inset-0"
      >

        <Image
          src="/images/projects/agr1.jpg"
          alt="Agriculture & Food Security"
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover object-center"
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/10
            via-black/20
            to-black/35
          "
        />

      </motion.div>

      {/* TITLE */}
      <div
        className="
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center
          overflow-hidden
          px-6
        "
      >

        <h1
          className="
            flex
            flex-wrap
            justify-center
            text-white
            text-[11vw]
            md:text-[7vw]
            font-black
            tracking-[-0.08em]
            leading-none
          "
        >

          {word.split("").map((char, index) => (

            <motion.span
              key={index}
              initial={{
                opacity: 0,
                y: 120,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [120, 0, -120],
                filter: [
                  "blur(12px)",
                  "blur(0px)",
                  "blur(12px)",
                ],
              }}
              transition={{
                duration: 2.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>

          ))}

        </h1>

      </div>

      {/* BACK BUTTON */}
      {!showGallery && (

        <Link href="/projects">

          <motion.div
            whileHover={{
              scale: 1.05,
              x: -4,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              absolute
              top-8
              right-8
              z-[999]
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-black/30
              backdrop-blur-xl
              px-5
              py-3
              cursor-pointer
              overflow-hidden
              transition-all
              duration-500
              hover:bg-white/10
            "
          >

            <ArrowLeft
              size={18}
              className="text-white"
            />

            <span
              className="
                uppercase
                tracking-[0.25em]
                text-white
                text-xs
                font-medium
              "
            >
              Back
            </span>

          </motion.div>

        </Link>

      )}

{/* DIGITAL ECONOMY STATS */}
<div
  className="
    absolute
    bottom-16
    left-0
    z-30
    grid
    overflow-visible
    grid-cols-2
    md:grid-cols-4
    gap-8
    w-full
    px-8
    md:px-16
  "
>

  {[
    [
      "4.8M",
      "Acres of Land Under Cultivation",
      "/images/projects/food5.jpg",
    ],

    [
      "120+",
      "Modern Tractors & Machinery",
      "/images/projects/tractorrrrr.jpg",
    ],

    [
      "92%",
      "Food Production Increase",
      "/images/projects/food1.jpg",
    ],

    [
      "AI",
      "Precision Agriculture",
      "/images/projects/Farm.jpg",
    ],

  ].map(([value, label, image], index) => (

    <div
      key={index}
      className="
        group
        relative
        h-[240px]
        perspective-[2000px]
      "
    >

      {/* FLIP CONTAINER */}
      <div
        className="
          relative
          h-full
          w-full
          transition-all
          duration-700
          [transform-style:preserve-3d]
          group-hover:[transform:rotateY(180deg)_scale(1.08)]
          z-30
        "
      >

        {/* FRONT */}
        <div
          className="
            absolute
            inset-0
            rounded-[28px]
            backdrop-blur-xl
            bg-white/20
            border
            border-white/10
            p-6
            [backface-visibility:hidden]
            overflow-hidden
          "
        >

          {/* GLOW */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-cyan-400/10
              via-transparent
              to-blue-500/10
            "
          />

          <div className="relative z-10">

            <h2
              className="
                text-white
                text-[42px]
                md:text-[58px]
                font-black
                tracking-[-0.06em]
              "
            >
              {value}
            </h2>

            <p
              className="
                mt-3
                uppercase
                tracking-[0.2em]
                text-cyan-300
                text-xs
              "
            >
              {label}
            </p>

          </div>

        </div>

        {/* BACK */}
        <div
          className="
            absolute
            inset-0
            rounded-[28px]
            overflow-hidden
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >

          <Image
            src={image}
            alt={label}
            fill
            sizes="(max-width: 767px) 50vw, 25vw"
            className="
              object-cover
              object-center
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* TOP LIGHT */}
          <div
            className="
              absolute
              top-0
              left-0
              w-full
              h-[40%]
              bg-gradient-to-b
              from-white/10
              to-transparent
              z-[3]
              pointer-events-none
            "
          />

          {/* LABEL */}
          <div
            className="
              absolute
              bottom-6
              left-6
              z-10
            "
          >

            <p
              className="
                text-white
                text-2xl
                font-black
                tracking-[-0.04em]
              "
            >
              {label}
            </p>

          </div>

        </div>

      </div>

    </div>

  ))}

  {/* EXPLORE BUTTON */}
  <div
    className="
      col-span-2
      md:col-span-4
      flex
      justify-center
      mt-2
      relative
      z-[120]
    "
  >

    <motion.button
      whileHover={{
        scale: 1.06,
        x: 6,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={() => setShowGallery(true)}
      className="
        flex
        items-center
        gap-5
        cursor-pointer
        group
        pointer-events-auto
      "
    >

      {/* CIRCLE */}
      <div
        className="
          relative
          flex
          items-center
          justify-center
          w-[78px]
          h-[78px]
          rounded-full
          border
          border-white/15
          bg-white/10
          backdrop-blur-2xl
          overflow-hidden
          transition-all
          duration-700
          group-hover:scale-110
          group-hover:bg-[#e67817]
        "
      >

        <div
          className="
            absolute
            inset-0
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-700
            bg-gradient-to-br
            from-white/30
            to-transparent
          "
        />

        <span
          className="
            relative
            z-10
            text-white
            text-[30px]
            font-light
          "
        >
          →
        </span>

      </div>

      {/* TEXT */}
      <div>

        <p
          className="
            uppercase
            tracking-[0.35em]
            text-white/60
            text-[10px]
            mb-1
          "
        >
          Continue Journey
        </p>

        <h3
          className="
            text-white
            text-lg
            md:text-xl
            font-semibold
            tracking-[-0.03em]
            transition-all
            duration-500
            group-hover:translate-x-1
          "
        >
          Explore Agriculture & Food Security
        </h3>

      </div>

    </motion.button>

  </div>

</div>

{/* FULLSCREEN GALLERY */}
{showGallery && (

  <motion.div
    initial={{
      opacity: 0,
      scale: 1.1,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    exit={{
      opacity: 0,
    }}
    transition={{
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      fixed
      inset-0
      z-[9000]
      bg-black
    "
  >

    {/* IMAGE */}
    <motion.div
      key={currentImage}
      initial={{
        scale: 1.2,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute inset-0 z-[160]"
    >

      <Image
        src={digitalImages[currentImage]}
        alt="Agriculture & Food Security"
        fill
        sizes="100vw"
        className="
          object-cover
          object-center
          brightness-[1.15]
          contrast-[1.08]
          saturate-[1.1]
          pointer-events-none
        "
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* TITLE */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        className="
          absolute
          bottom-20
          left-10
          md:left-20
          z-20
          max-w-[700px]
        "
      >

        <p
          className="
            mb-4
            uppercase
            tracking-[0.35em]
            text-[#e67817]
            text-xs
          "
        >
          Agriculture & Food Security
        </p>

        <h2
          className="
            text-white
            text-[12vw]
            md:text-[5vw]
            font-black
            tracking-[-0.06em]
            leading-[0.9]
          "
        >
          {imageTitles[currentImage]}
        </h2>

      </motion.div>

    </motion.div>

    {/* CONTROLS */}
    <div
      className="
        fixed
        bottom-10
        right-10
        z-[500]
        flex
        gap-4
        pointer-events-auto
      "
    >

      {/* PREV */}
      <button
        onClick={() =>
          setCurrentImage((prev) =>
            prev === 0
              ? digitalImages.length - 1
              : prev - 1
          )
        }
        className="
          w-[60px]
          h-[60px]
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          text-white
          text-2xl
          hover:bg-white/20
          transition-all
          duration-500
          cursor-pointer
        "
      >
        ←
      </button>

      {/* NEXT */}
      <button
        onClick={() =>
          setCurrentImage((prev) =>
            prev === digitalImages.length - 1
              ? 0
              : prev + 1
          )
        }
        className="
          w-[60px]
          h-[60px]
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          text-white
          text-2xl
          hover:bg-white/20
          transition-all
          duration-500
          cursor-pointer
        "
      >
        →
      </button>

    </div>

{/* GALLERY BACK BUTTON */}
<Link
  href="/projects"
  className="
    fixed
    top-8
    right-8
    z-[9999]
    pointer-events-auto
    flex
    items-center
    gap-3
    rounded-full
    border
    border-white/10
    bg-black/40
    backdrop-blur-xl
    px-5
    py-3
    text-white
    cursor-pointer
    transition-all
    duration-500
    hover:bg-white/10
  "
>
  <ArrowLeft size={18} />

  <span
    className="
      uppercase
      tracking-[0.25em]
      text-xs
      font-medium
    "
  >
    Back
  </span>
</Link>

  </motion.div>

)}
    </main>

  );

}
