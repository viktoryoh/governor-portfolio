"use client";

import { usePathname } from "next/navigation";

export default function FooterVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/movement" ? null : children;
}
