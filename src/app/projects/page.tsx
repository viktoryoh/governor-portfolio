"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const projects = [
  {
  title: "Infrastructure",
  image: "/images/projects/hospital.jpg",
  link: "/projects/infrastructure",
    description:
      "Strategic road expansion, urban modernization, and large-scale infrastructure development transforming connectivity across the state.",
  },
  {
    title: "Transportation",
    image: "/images/projects/infra3.jpg",
    link: "/projects/transportation",
    description:
      "Modern transportation systems improving mobility, efficiency, accessibility, and economic growth opportunities.",
  },
  {
    title: "Agriculture & Food Security",
    image: "/images/projects/agr1.jpg",
    link: "/projects/agriculture-food-security",
    description:
      "Food Security & Agricultural Innovation: Revolutionizing food production, sustainability, and rural livelihoods through modern farming techniques, technology-driven solutions, and comprehensive agricultural development programs.",
  },
  {
    title: "Empowerment",
    image: "/images/projects/youth.jpg",
    link: "/projects/empowerment",
    description:
      "Creating sustainable opportunities through education, innovation hubs, entrepreneurship, and employment programs.",
  },
];

const titleLines = ["Building", "Lasting Impact."];

export default function ProjectsPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#f5efe7]
      "
    >

      {/* GOVERNOR BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/governor-1.png"
          alt="Governor"
          fill
          loading="eager"
          className="
            object-cover
            object-center
            opacity-30
            scale-105
          "
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ATMOSPHERIC GRADIENT */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(3,131,71,0.18)_0%,rgba(0,0,0,0.75)_100%)]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* TOP BRAND BAR */}
<div
  className="
    flex
    items-center
    justify-between
    px-6
    md:px-12
    lg:px-20
    pt-10
    relative
    z-30
  "
>

  {/* LOGO */}
  <Link href="/">
    <div className="flex items-center gap-4 cursor-pointer">

      <Image
        src="/images/state-logo.png"
        alt="State Logo"
        width={70}
        height={70}
        className="object-contain"
      />

     

    </div>
  </Link>

      {/* BACK BUTTON */}
      <Link href="/">

        <motion.div
          whileHover={{
            scale: 1.04,
            x: -4,
          }}
          className="
            fixed
            top-8
            right-8
            z-[100]
            flex
            items-center
            gap-3
            rounded-full
            border
            border-white/10
            bg-white/10
            backdrop-blur-xl
            px-5
            py-3
            text-white
            cursor-pointer
          "
        >

          <ArrowLeft size={18} />

          <span
            className="
              uppercase
              tracking-[0.25em]
              text-xs
            "
          >
            Back
          </span>

        </motion.div>

      </Link>

</div>

        {/* HERO HEADER */}
        <section className="pt-24 pb-24 px-6 md:px-12 lg:px-20">

          <p
            className="
              mb-6
              uppercase
              tracking-[0.35em]
              text-[#e67817]
              text-sm
            "
          >
            Signature Governance Projects
          </p>

<motion.h1
  aria-label="Building Lasting Impact."
  className="
    max-w-[1100px]
    text-white
    text-5xl
    sm:text-6xl
    md:text-7xl
    lg:text-[112px]
    font-black
    tracking-normal
    leading-[0.95]
  "
>

  {titleLines.map((line, lineIndex) => (
    <span
      key={line}
      aria-hidden="true"
      className="block overflow-hidden pb-4"
    >
      {line.split(" ").map((word, wordIndex) => (
        <span
          key={`${line}-${word}`}
          className="inline-block whitespace-nowrap mr-[0.18em]"
        >
          {word.split("").map((char, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{
                opacity: 0,
                y: 120,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.8,
                delay: lineIndex * 0.5 + (wordIndex * 8 + index) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                inline-block
                drop-shadow-[0_0_18px_rgba(255,255,255,0.15)]
              "
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  ))}

</motion.h1>

          <p
            className="
              mt-10
              max-w-[760px]
              text-lg
              leading-[2]
              text-white/75
            "
          >
            Transformational initiatives driving infrastructure,
            transportation, innovation, economic growth,
            and sustainable development across the state.
          </p>
        </section>

        {/* PROJECT CARDS */}
        <section
          className="
            relative
            z-20
            px-6
            md:px-12
            lg:px-20
            pb-32
          "
        >

         <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-14
    xl:gap-16
    items-stretch
  "
>

  

            {projects.map((project, index) => (
<Link
  key={index}
  href={project.link}
  className="block group"
>
  <div
    className="
      relative
      h-[420px]
      w-full
      perspective-[2000px]
    "
  >

    <div
      className="
        relative
        h-full
        w-full
        transition-transform
        duration-700
        [transform-style:preserve-3d]
        group-hover:[transform:rotateY(180deg)]
      "
    >

    {/* FRONT SIDE */}
    <div
      className="
        absolute
        inset-0
        w-full
        h-full
        rounded-[40px]
        border
        border-white/10
        bg-white/10
        backdrop-blur-2xl
        p-10
        md:p-14
        overflow-hidden
        [backface-visibility:hidden]
      "
    >

      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#038347]/10
          via-transparent
          to-[#e67817]/10
        "
      />

      {/* Number */}
      <div
        className="
          absolute
          top-8
          right-8
          text-[120px]
          font-black
          leading-none
          tracking-[-0.08em]
          text-[#038347]/10
        "
      >
        0{index + 1}
      </div>

      <div className="relative z-10">

        <p
          className="
            mb-6
            uppercase
            tracking-[0.3em]
            text-[#e67817]
            text-xs
          "
        >
          Strategic Initiative
        </p>

        <h2
          className="
            text-white
            text-[42px]
            md:text-[56px]
            font-black
            tracking-[-0.06em]
            leading-[0.95]
            mb-8
          "
        >
          {project.title}
        </h2>

        <p
          className="
            max-w-[520px]
            text-[16px]
            leading-[2]
            text-white/80
          "
        >
          {project.description}
        </p>

      </div>
    </div>

    {/* BACK SIDE */}
    <div
      className="
        absolute
        inset-0
        w-full
        h-full
        overflow-hidden
        rounded-[40px]
        [transform:rotateY(180deg)]
        [backface-visibility:hidden]
      "
    >

      <Image
        src={project.image}
        alt={project.title}
        fill
        className="
          object-cover
          object-center
        "
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/35" />

      {/* TITLE */}
      <div
        className="
          absolute
          bottom-10
          left-10
          z-10
        "
      >
        <h2
          className="
            text-white
            text-[42px]
            font-black
            tracking-[-0.06em]
          "
        >
          {project.title}
        </h2>
      </div>

    </div>
</div>
  </div>
</Link>



            ))}
            </div>

            {/* BIOGRAPHY BUTTON */}
<div className="flex justify-center mt-16">

  <Link href="/governor-biography">

    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: {
          duration: 1,
        },
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}

      whileHover={{
        scale: 1.04,
        rotateX: 6,
        rotateY: -6,
      }}

      whileTap={{
        scale: 0.97,
      }}

      className="
        group
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-white/10
        bg-black/30
        backdrop-blur-3xl
        px-12
        py-8
        cursor-pointer
        transition-all
        duration-700
        hover:border-[#038347]/40
        perspective-[2000px]
        shadow-[0_0_60px_rgba(3,131,71,0.12)]
      "
    >

      {/* AMBIENT GLOW */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-700
          bg-gradient-to-r
          from-[#038347]/20
          via-transparent
          to-[#e67817]/20
        "
      />

      {/* MOVING LIGHT SWEEP */}
      <motion.div
        animate={{
          x: ["-120%", "120%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          top-0
          left-0
          h-full
          w-[30%]
          rotate-12
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          blur-[20px]
        "
      />

      {/* PULSE GLOW */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          absolute
          inset-0
          rounded-[34px]
          bg-[#038347]/10
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 text-center">

        <p
          className="
            uppercase
            tracking-[0.4em]
            text-white/50
            text-[10px]
            mb-3
          "
        >
          Leadership Legacy
        </p>

        <h2
          className="
            text-white
            text-3xl
            md:text-5xl
            font-black
            tracking-[-0.05em]
            leading-none
          "
        >
          Governor Biography 2027
        </h2>

        <p
          className="
            mt-4
            text-white/65
            text-sm
            md:text-base
            tracking-wide
          "
        >
          Vision. Leadership. Continuity.
        </p>

      </div>

    </motion.div>

  </Link>

</div>

          
        </section>

      </div>
    </main>
  );
}
