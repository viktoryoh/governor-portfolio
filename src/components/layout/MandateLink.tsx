"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MandateLink() {
  const pathname = usePathname();

  return (
    <Link
      href="/projects#mandate"
      onNavigate={(event) => {
        if (pathname !== "/projects") return;
        const target = document.getElementById("mandate");
        if (!target) return;

        event.preventDefault();
        if (window.location.hash !== "#mandate") {
          window.history.pushState(null, "", "#mandate");
        }
        target.scrollIntoView({ block: "start", behavior: "auto" });
      }}
      className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 px-5 text-xs font-black uppercase tracking-normal text-white transition-colors duration-200 hover:bg-white/10"
    >
      View Mandate
    </Link>
  );
}
