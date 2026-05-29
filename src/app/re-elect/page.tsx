"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function ReElectPage() {

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

const localGovernments = [
  "Abak",
  "Eastern Obolo",
  "Eket",
  "Esit Eket",
  "Essien Udim",
  "Etim Ekpo",
  "Etinan",
  "Ibeno",
  "Ibesikpo Asutan",
  "Ibiono Ibom",
  "Ika",
  "Ikono",
  "Ikot Abasi",
  "Ikot Ekpene",
  "Ini",
  "Itu",
  "Mbo",
  "Mkpat Enin",
  "Nsit Atai",
  "Nsit Ibom",
  "Nsit Ubium",
  "Obot Akara",
  "Okobo",
  "Onna",
  "Oron",
  "Oruk Anam",
  "Udung Uko",
  "Ukanafun",
  "Uruan",
  "Urue Offong Oruko",
  "Uyo",
];

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-20">
<Link href="/">

  <div
    className="
      fixed
      top-8
      left-8
      z-50
      w-[90px]
      h-[90px]
      rounded-full
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      p-2
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
      <Link href="/governor-biography">

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

          <ArrowLeft size={18}
          className="text-white" />

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

{/* GOVERNOR BACKGROUND */}
<div className="absolute inset-0">

  <Image
    src="/images/projects/umoeno6.jpg"
    alt="Governor"
    fill
    sizes="100vw"
    priority
    className="
      object-cover
      object-center
      opacity-20
      scale-105
    "
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/80" />

  {/* GREEN GLOW */}
  <div
    className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_top,rgba(3,131,71,0.25)_0%,rgba(0,0,0,0.9)_70%)]
    "
  />

</div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full
          relative
max-w-[1100px]
rounded-[50px]
border
border-white/10
bg-black/30
backdrop-blur-3xl
shadow-[0_0_100px_rgba(3,131,71,0.15)]
overflow-hidden
          p-12 md:p-16
        "
      >
<h1
  className="
    text-white
    text-6xl
    font-black
    mb-4
    tracking-[-0.04em]
  "
>
  Re-Elect 2027
</h1>

<div
  className="
    w-24
    h-[3px]
    bg-[#e67817]
    rounded-full
    mb-6
  "
/>

<p
  className="
    text-white/70
    mb-10
  "
>
  Register your support for continued progress and development.
</p>

<form
  onSubmit={handleSubmit}
  className="grid md:grid-cols-2 gap-6"
>
  <input
    type="text"
    placeholder="Surname"
    required
    className="
      h-16
      px-6
      rounded-2xl
      bg-white/5
      border
      border-white/10
      text-white
      backdrop-blur-xl
      focus:outline-none
      focus:border-[#038347]
      transition-all
    "
  />

  <input
    type="text"
    placeholder="First Name"
    required
    className="
      h-16
      px-6
      rounded-2xl
      bg-white/5
      border
      border-white/10
      text-white
      backdrop-blur-xl
      focus:outline-none
      focus:border-[#038347]
    "
  />

  <input
    type="email"
    placeholder="Email (Optional)"
    className="
      h-16
      px-6
      rounded-2xl
      bg-white/5
      border
      border-white/10
      text-white
      backdrop-blur-xl
      focus:outline-none
      focus:border-[#038347]
    "
  />

  <input
    type="tel"
    placeholder="Phone Number"
    required
    className="
      h-16
      px-6
      rounded-2xl
      bg-white/5
      border
      border-white/10
      text-white
      backdrop-blur-xl
      focus:outline-none
      focus:border-[#038347]
    "
  />

  <textarea
    placeholder="House Address"
    required
    rows={4}
    className="
      md:col-span-2
      p-6
      rounded-2xl
      bg-white/5
      border
      border-white/10
      text-white
      backdrop-blur-xl
      focus:outline-none
      focus:border-[#038347]
    "
  />

  <div className="md:col-span-2 relative">

    <select
      required
      className="
        w-full
        h-16
        px-6
        rounded-2xl
        bg-white/5
        border
        border-white/10
        text-white
        backdrop-blur-xl
        appearance-none
        focus:outline-none
        focus:border-[#038347]
      "
    >
      <option value="">
        Select Local Government
      </option>

      {localGovernments.map((lga) => (
        <option
          key={lga}
          value={lga}
        >
          {lga}
        </option>
      ))}
    </select>

    <div
      className="
        absolute
        right-6
        top-1/2
        -translate-y-1/2
        text-white/50
        pointer-events-none
      "
    >
      ▼
    </div>

  </div>

  <motion.button
    whileHover={{
      scale: 1.02,
    }}
    whileTap={{
      scale: 0.98,
    }}
    type="submit"
    className="
      md:col-span-2
      h-16
      rounded-full
      bg-gradient-to-r
      from-[#038347]
      to-[#049a53]
      text-white
      font-bold
      uppercase
      tracking-[0.25em]
      shadow-[0_0_60px_rgba(3,131,71,0.45)]
    "
  >
    Re-Elect 2027
  </motion.button>
</form>
{submitted && (

  <div
    className="
      fixed
      inset-0
      flex
      items-center
      justify-center
      bg-black/80
      z-50
    "
  >

    <div
      className="
        bg-[#038347]
        text-white
        px-10
        py-8
        rounded-3xl
        text-center
      "
    >

<div
  className="
    relative
    w-full
    max-w-[420px]
    overflow-hidden
    rounded-[32px]
    border
    border-white/15
    bg-white/10
    p-[1px]
    shadow-[0_30px_90px_rgba(0,0,0,0.45)]
    backdrop-blur-2xl
  "
>
  <div
    className="
      relative
      overflow-hidden
      rounded-[31px]
      bg-[#06140d]/95
      px-8
      py-10
      text-center
      text-white
    "
  >
    <div
      className="
        absolute
        -top-24
        left-1/2
        h-[220px]
        w-[220px]
        -translate-x-1/2
        rounded-full
        bg-[#038347]/35
        blur-[70px]
      "
    />

    <div
      className="
        absolute
        inset-0
        bg-gradient-to-br
        from-white/10
        via-transparent
        to-[#e67817]/10
      "
    />

    <div className="relative z-10">
      <div
        className="
          mx-auto
          mb-6
          flex
          h-[82px]
          w-[82px]
          items-center
          justify-center
          rounded-full
          border
          border-white/15
          bg-white/10
          shadow-[0_0_45px_rgba(3,131,71,0.45)]
          backdrop-blur-xl
        "
      >
        <span className="text-4xl font-black text-[#e67817]">
          ✓
        </span>
      </div>

      <p
        className="
          mb-3
          text-xs
          font-semibold
          uppercase
          tracking-[0.35em]
          text-[#e67817]
        "
      >
        Submission Received
      </p>

      <h2
        className="
          mb-4
          text-4xl
          font-black
          tracking-[-0.05em]
          text-white
        "
      >
        Thank You!
      </h2>

      <p
        className="
          mx-auto
          max-w-[300px]
          text-sm
          leading-7
          text-white/70
        "
      >
        Thank you for your trust and support. Your message has been received successfully.
      </p>

      <button
        type="button"
        onClick={() => setSubmitted(false)}
        className="
          mt-8
          inline-flex
          h-[54px]
          items-center
          justify-center
          rounded-full
          bg-white
          px-8
          text-sm
          font-black
          uppercase
          tracking-[0.18em]
          text-[#038347]
          shadow-[0_18px_40px_rgba(255,255,255,0.18)]
          transition-all
          duration-300
          hover:scale-105
          hover:bg-[#e67817]
          hover:text-white
          active:scale-95
        "
      >
        Close
      </button>
    </div>
  </div>
</div>
    </div>

  </div>

)}
      </motion.div>
      </main>
  );
}
