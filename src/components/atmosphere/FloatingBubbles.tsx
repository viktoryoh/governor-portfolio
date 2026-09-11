"use client";

import { rangedRandom } from "@/lib/seededRandom";

type Bubble = {
  size: number;
  left: number;
  duration: number;
  delay: number;
};

const bubbles: Bubble[] = Array.from({ length: 14 }, (_, index) => ({
  size: rangedRandom(index + 101, 36, 116),
  left: rangedRandom(index + 113, 0, 100),
  duration: rangedRandom(index + 127, 15, 35),
  delay: rangedRandom(index + 131, 0, 10),
}));

export default function FloatingBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute bottom-[-200px] rounded-full bubble floating-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
