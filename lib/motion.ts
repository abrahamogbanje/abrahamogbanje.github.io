import type { Variants } from "motion/react";

/* Shared easing curves. "expo" is the long, silky ease-out used almost everywhere. */
export const ease = {
  expo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  soft: [0.22, 1, 0.36, 1] as const,
};

/* Each card gets its own entrance. Keys are used by Projects and Skills. */
export const entrances: Record<string, Variants> = {
  // Tips up out of the floor in 3D
  rise3d: {
    hidden: { opacity: 0, y: 140, rotateX: -38, scale: 0.94, transformPerspective: 1400 },
    show: { opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1400,
      transition: { duration: 1.3, ease: ease.expo } },
  },
  // Irises open from its centre
  iris: {
    hidden: { clipPath: "inset(48% 48% 48% 48% round 32px)", scale: 0.86, opacity: 0.4 },
    show: { clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1, opacity: 1,
      transition: { duration: 1.4, ease: ease.inOut } },
  },
  // Sweeps in sideways with a skew and motion blur
  sweep: {
    hidden: { opacity: 0, x: 180, skewX: -14, filter: "blur(14px)" },
    show: { opacity: 1, x: 0, skewX: 0, filter: "blur(0px)",
      transition: { duration: 1.25, ease: ease.expo } },
  },
  // Comes into focus from a soft, oversized blur
  focus: {
    hidden: { opacity: 0, scale: 1.12, filter: "blur(18px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: ease.expo } },
  },
  // Swings in like a door on its left hinge
  hinge: {
    hidden: { opacity: 0, rotateY: 55, x: -60, transformPerspective: 1200, transformOrigin: "0% 50%" },
    show: { opacity: 1, rotateY: 0, x: 0, transformPerspective: 1200, transformOrigin: "0% 50%",
      transition: { duration: 1.3, ease: ease.expo } },
  },
  // Wipes up from the bottom edge
  wipe: {
    hidden: { clipPath: "inset(100% 0% 0% 0% round 28px)", y: 60 },
    show: { clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, transition: { duration: 1.2, ease: ease.inOut } },
  },
  // Drops and settles with a gentle spring
  drop: {
    hidden: { opacity: 0, y: -90, rotate: -4 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 90, damping: 14, mass: 1 } },
  },
};

/* Children inside a card that fade up one after another once the card has landed. */
export const innerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

export const innerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.expo } },
};

export const tagPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 22 } },
};
