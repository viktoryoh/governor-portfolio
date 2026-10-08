"use client";

import { useRef, useSyncExternalStore } from "react";
import { useInView } from "framer-motion";

const query = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  document.addEventListener("visibilitychange", callback);
  return () => {
    media.removeEventListener("change", callback);
    document.removeEventListener("visibilitychange", callback);
  };
}
const snapshot = () => window.matchMedia(query).matches && !document.hidden;
const serverSnapshot = () => false;

export function useAmbientMotion<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const visible = useInView(ref);
  const allowed = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return { ref, enabled: visible && allowed };
}
