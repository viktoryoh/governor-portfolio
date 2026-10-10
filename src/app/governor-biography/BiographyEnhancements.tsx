"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import styles from "./Biography.module.css";

export function BiographyMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelector("[data-biography-opening]"), {
        y: 16, opacity: 0, duration: 0.8, ease: "power2.out", clearProps: "all",
      });
      gsap.from(root.querySelector("[data-biography-portrait]"), {
        scale: 1.035, duration: 1.4, ease: "power2.out", clearProps: "transform",
      });
      const characters = root.querySelectorAll("[data-biography-character]");
      const dots = root.querySelectorAll("[data-biography-dot]");
      gsap.set([characters, dots], { opacity: 0 });
      const typing = gsap.timeline({ delay: 0.35 });
      let position = 0;
      root.querySelectorAll<HTMLElement>("[data-biography-type]").forEach((line) => {
        const pace = Number(line.dataset.typingPace);
        line.querySelectorAll("[data-biography-character]").forEach((character) => {
          typing.set(character, { opacity: 1 }, position);
          position += pace + (character.textContent === "." ? 0.18 : character.textContent === "," ? 0.08 : 0);
        });
        position += 0.28;
      });

      // The copy types once; only the final punctuation repeats.
      const punctuation = gsap.timeline({ repeat: -1 })
        .set(dots, { opacity: 0 }, 0)
        .set(dots[0], { opacity: 1 }, 0)
        .set(dots[1], { opacity: 1 }, 0.55)
        .set(dots[2], { opacity: 1 }, 1.1)
        .set(dots, { opacity: 0 }, 1.65)
        .to({}, { duration: 0.35 });
      typing.add(punctuation, position);

      let inView = true;
      const updatePlayback = () => typing.paused(document.hidden || !inView);
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        updatePlayback();
      });
      observer.observe(root);
      document.addEventListener("visibilitychange", updatePlayback);
      updatePlayback();
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", updatePlayback);
      };
    }, root);
    return () => media.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.page}>
      <noscript><style>{`.${styles.page} [data-biography-character], .${styles.page} [data-biography-dot]:first-child { opacity: 1; }`}</style></noscript>
      {children}
    </div>
  );
}
