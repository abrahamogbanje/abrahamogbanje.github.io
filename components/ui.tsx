"use client";

import { Fragment, useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ease } from "@/lib/motion";

/* --------------------------------------------------------------------------
   SplitReveal: each character rises out of a mask, one after another.
   Screen readers get the plain text; the animated letters are hidden from them.
   -------------------------------------------------------------------------- */
export function SplitReveal({
  text,
  play,
  delay = 0,
  stagger = 0.028,
  by = "char",
  className,
  wordClassName,
}: {
  text: string;
  play?: boolean;
  delay?: number;
  stagger?: number;
  by?: "char" | "word";
  className?: string;
  /** optional class per word index, e.g. to italicise the last word */
  wordClassName?: (index: number, total: number) => string | undefined;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = play ?? inView;
  const words = text.split(" ");
  let i = 0;

  return (
    <span ref={ref} className={`split ${className ?? ""}`}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => {
          const parts = by === "char" ? Array.from(word) : [word];
          return (
            <Fragment key={w}>
            <span className={`split-word ${wordClassName?.(w, words.length) ?? ""}`}>
              {parts.map((p, c) => {
                const d = delay + i++ * stagger;
                return (
                  <span key={c} className="mask">
                    <motion.span
                      className="split-unit"
                      initial={{ y: "115%", rotate: 6 }}
                      animate={show ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 6 }}
                      transition={{ duration: 1.1, ease: ease.expo, delay: d }}
                    >
                      {p}
                    </motion.span>
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && " "}
            </Fragment>
          );
        })}
      </span>
    </span>
  );
}

/* --------------------------------------------------------------------------
   FadeUp: a block that glides up and un-blurs when it enters the viewport.
   -------------------------------------------------------------------------- */
export function FadeUp({
  children,
  delay = 0,
  className,
  as = "div",
  y = 40,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "li" | "span";
  y?: number;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, ease: ease.expo, delay }}
    >
      {children}
    </Comp>
  );
}

/* --------------------------------------------------------------------------
   Magnetic: the child leans toward the cursor and springs back on leave.
   -------------------------------------------------------------------------- */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      className="magnetic"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* --------------------------------------------------------------------------
   RollText: on hover the label rolls up and a copy rolls in from below.
   -------------------------------------------------------------------------- */
export function RollText({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="roll-a">{children}</span>
      <span className="roll-b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

/* --------------------------------------------------------------------------
   ScrollWords: a paragraph whose words light up as you scroll through it.
   -------------------------------------------------------------------------- */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`scroll-words ${className ?? ""}`}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <>
      <motion.span style={{ opacity, y, display: "inline-block" }}>{children}</motion.span>{" "}
    </>
  );
}

/* --------------------------------------------------------------------------
   Arrow icon used on links
   -------------------------------------------------------------------------- */
export function Arrow({ dir = "right" }: { dir?: "right" | "up" | "up-right" }) {
  const rot = dir === "up" ? -90 : dir === "up-right" ? -45 : 0;
  return (
    <svg
      className="arrow"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Section label like "(01) About" sitting above each heading */
export function SectionIndex({ n }: { n: string }) {
  return (
    <FadeUp as="span" className="section-index" y={16}>
      <span aria-hidden="true">({n})</span>
    </FadeUp>
  );
}
