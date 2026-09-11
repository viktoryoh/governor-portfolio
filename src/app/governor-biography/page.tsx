"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import CinematicParticles from "@/components/CinematicParticles";
import { useRef, useState, type MouseEvent } from "react";
import { rangedRandom } from "@/lib/seededRandom";

type Particle = {
  left: number;
  top: number;
  duration: number;
  delay: number;
  xMovement: number;
};

const particles: Particle[] = Array.from({ length: 25 }, (_, index) => ({
  left: rangedRandom(index + 251, 0, 100),
  top: rangedRandom(index + 263, 0, 100),
  duration: rangedRandom(index + 271, 8, 18),
  delay: rangedRandom(index + 277, 0, 5),
  xMovement: rangedRandom(index + 281, -60, 60),
}));

export default function GovernorBiographyPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

const toggleAudio = async () => {
  const audio = audioRef.current;
  if (!audio) return;

  if (playing) {
    audio.pause();
    setPlaying(false);
    return;
  }

  try {
    await audio.play();
    setPlaying(true);
  } catch (err) {
    console.log("Audio playback failed:", err);
    setPlaying(false);
  }
};

const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();

  mouseX.set(e.clientX - rect.left - rect.width / 2);
  mouseY.set(e.clientY - rect.top - rect.height / 2);
};

const handleMouseLeave = () => {
  mouseX.set(0);
  mouseY.set(0);
};

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">

        <Image
          src="/images/projects/infra1.jpg"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />

        <div
  className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_top,rgba(3,131,71,0.25)_0%,rgba(0,0,0,0.92)_70%)]
  "
/>
<motion.div
  animate={{
    backgroundPosition: [
      "0% 50%",
      "100% 50%",
      "0% 50%",
    ],
  }}

  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  }}

  className="
    absolute
    inset-0
    opacity-20
    blur-[120px]
    bg-[linear-gradient(120deg,#038347,#e67817,#038347)]
    bg-[length:300%_300%]
  "
/>

      </div>

      {/* CINEMATIC LIGHT RAYS */}
<motion.div
  animate={{
    opacity: [0.15, 0.3, 0.15],
    rotate: [0, 2, 0],
  }}

  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}

  className="
    absolute
    -top-[20%]
    left-[-10%]
    w-[1400px]
    h-[1400px]
    z-[1]
    pointer-events-none
  "
>

  <div
    className="
      absolute
      inset-0
      bg-gradient-to-br
      from-[#038347]/20
      via-transparent
      to-[#e67817]/10
      blur-[140px]
      rotate-12
    "
  />

</motion.div>

      {/* FILM GRAIN */}
<div
  className="
    absolute
    inset-0
    opacity-[0.04]
    mix-blend-overlay
    pointer-events-none
  "
  style={{
    backgroundImage:
      "url('/images/noise.svg')",
  }}
/>
<CinematicParticles />
{/* GOLD DUST */}
<div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">

  {particles.map((particle, i) => (

    <motion.div
      key={i}

      animate={{
        y: ["120vh", "-20vh"],
        x: [0, particle.xMovement],
        opacity: [0, 1, 0],
      }}

      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
        ease: "linear",
      }}

      className="
        absolute
        w-[4px]
        h-[4px]
        rounded-full
        bg-[#e6b800]
        blur-[1px]
      "

      style={{
        left: `${particle.left}%`,
        top: `${particle.top}%`,
      }}
    />

  ))}

</div>


<audio
  ref={audioRef}
  loop
  preload="auto"
>
  <source
    src="/audio/cinematic.mp3"
    type="audio/mpeg"
  />
</audio>

<Link href="/">
  <div
    className="
      fixed
      top-8
      left-8
      z-[100]
      w-[90px]
      h-[90px]
      rounded-full
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      p-2
      shadow-[0_0_40px_rgba(3,131,71,0.25)]
    "
  >
    <Image
      src="/images/state-logo.png"
      alt="State Logo"
      fill
      sizes="90px"
      className="object-contain p-2"
    />
  </div>
</Link>

      {/* BACK BUTTON */}
      <Link href="/projects">

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

<motion.button
  type="button"
  aria-label={playing ? "Pause background sound" : "Play background sound"}
  onClick={toggleAudio}

  animate={{
    scale: playing ? [1, 1.08, 1] : 1,
  }}

  transition={{
    duration: 2,
    repeat: Infinity,
  }}

  className="
    fixed
    bottom-8
    right-8
    z-[200]
    w-[70px]
    h-[70px]
    rounded-full
    bg-white/10
    backdrop-blur-2xl
    border
    border-white/10
    text-white
    text-sm
    uppercase
    tracking-[0.2em]
    shadow-[0_0_50px_rgba(3,131,71,0.3)]
  "
>
  {playing ? "Pause" : "Sound"}
</motion.button>

      {/* MAIN CONTENT */}
      <motion.div
      initial={{
  scale: 1.08,
  opacity: 0,
}}

animate={{
  scale: 1,
  opacity: 1,
}}

transition={{
  duration: 2,
  ease: [0.22, 1, 0.36, 1],
}}
        className="
          relative
          z-20
          min-h-screen
          flex
          flex-col
          lg:flex-row
          items-center
          justify-center
          gap-20
          px-8
          md:px-16
          py-20
        "
      >

        {/* GOVERNOR IMAGE */}
<motion.div
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  initial={{
    opacity: 0,
    x: -100,
  }}
  animate={{
    opacity: 1,
    x: 0,
    y: [0, -12, 0],
  }}
  transition={{
    duration: 1.4,
    y: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  style={{
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
  }}
  className="relative"
>

          {/* GLOW */}
          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-[#038347]/30
              blur-[100px]
            "
          />

      <div
  className="
    relative
    w-[420px]
    md:w-[520px]
    h-[680px]
    md:h-[760px]
    -mt-20
  "
>

          <Image
  src="/images/projects/umo4.jpg"
  alt="Governor"
  fill
  sizes="(max-width: 767px) 420px, 520px"
  loading="eager"
  className="
    object-cover
    object-top
    scale-[1.02]
    brightness-[1.05]
    contrast-[1.05]
    saturate-[1.05]
    drop-shadow-[0_0_60px_rgba(3,131,71,0.35)]
  "
/>

{/* ATMOSPHERIC GLOW */}
<div
  className="
    absolute
    inset-0
    bg-[#038347]/20
    blur-[120px]
    scale-110
    opacity-70
    -z-10
  "
/>

{/* DEPTH LIGHT */}
<motion.div
  animate={{
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.1, 1],
  }}

  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}

  className="
    absolute
    inset-0
    bg-gradient-to-br
    from-[#038347]/30
    via-transparent
    to-[#e67817]/20
    blur-[140px]
  "
/>

{/* LIGHT SWEEP */}
<motion.div
  animate={{
    x: ["-120%", "120%"],
  }}
  transition={{
    duration: 5,
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
    via-white/10
    to-transparent
    blur-[25px]
  "
/>

          </div>

        </motion.div>

        {/* TEXT CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.4,
            delay: 0.3,
          }}
          className="max-w-[750px]"
        >

        <motion.p
  className="
    uppercase
    tracking-[0.4em]
    text-[#e67817]
    text-xs
    mb-6
  "
>

  {"Leadership • Vision • Transformation"
    .split("")
    .map((char, index) => (

      <motion.span
        key={index}

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          duration: 0,
          delay: index * 0.07,
        }}
      >
        {char}
      </motion.span>

  ))}

</motion.p>

<motion.h1
  className="
    text-white
    text-[14vw]
    md:text-[5vw]
    font-black
    leading-[0.9]
    tracking-[-0.06em]
    mb-8
  "
>

  {"A Vision For A Greater Future In 2027"
    .split("")
    .map((char, index) => (

      <motion.span
        key={index}

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          duration: 0,

          // starts AFTER small title
          delay: 1.2 + index * 0.040,
        }}

        className="
          inline-block
          drop-shadow-[0_0_18px_rgba(255,255,255,0.15)]
        "
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>

  ))}

<motion.span
  animate={{
    opacity: [1, 0, 1],
  }}
  transition={{
    duration: 0.8,
    repeat: Infinity,
  }}
  className="text-[#e67817]"
>
  |
</motion.span>

</motion.h1>

         <motion.p
  className="
    text-white/75
    text-lg
    md:text-xl
    leading-[1.9]
    font-light
    whitespace-pre-line
  "
>

  {`Through transformational leadership, strategic
infrastructure expansion, youth empowerment,
transportation modernization, and digital innovation,
the administration has continued to redefine the future
of the state.

From roads and healthcare systems to smart city
initiatives and economic growth opportunities, this
government has focused on building lasting prosperity
for generations to come.

The journey toward a stronger, more connected,
technologically advanced, and economically empowered
future continues in 2027.`

    .split("")
    .map((char, index) => (

      <motion.span
        key={index}

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          duration: 0,

          // TYPEWRITER SPEED
          delay: 2 + index * 0.06,
        }}
      >
        {char}
      </motion.span>

  ))}

</motion.p>

         <Link href="/re-elect">

  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className="
      inline-block
      mt-10
      rounded-full
      bg-[#038347]
      px-8
      py-5
      text-white
      font-semibold
      tracking-[0.15em]
      uppercase
      shadow-[0_0_40px_rgba(3,131,71,0.45)]
      hover:bg-[#049a53]
      transition-all
      duration-500
      cursor-pointer
    "
  >
    Re-Elect 2027
  </motion.div>

</Link> 

        </motion.div>

      </motion.div>

    </main>
  );
}
