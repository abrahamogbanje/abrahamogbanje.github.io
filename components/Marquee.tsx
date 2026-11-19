"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "motion/react";

/* A decorative band of words that drifts sideways and speeds up / reverses
   with your scroll. Hidden from screen readers (it only repeats skill names). */
export default function Marquee({ items, baseVelocity = -2.2 }: { items: string[]; baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const dir = useRef(1);
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    x.set(x.get() + move);
  });

  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee-track" style={{ x: pos }}>
        {[0, 1].map((k) => (
          <span className="marquee-group" key={k}>
            {row.map((t, i) => (
              <span className="marquee-item" key={i}>
                {t}
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function wrap(min: number, max: number, v: number) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}
