"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useApp } from "./Providers";
import { ease } from "@/lib/motion";
import { site } from "@/lib/content";

/* A short counter + curtain intro. It plays once per browser session;
   repeat visits and reduced-motion users get a quick fade instead. */
export default function Preloader() {
  const { setReady, lock } = useApp();
  const [visible, setVisible] = useState(true);
  const [fast, setFast] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const bar = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      /* storage blocked: just play it */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      // Switch to the quick fade first, then remove on the next frame so the fade is used
      setFast(true);
      const id = requestAnimationFrame(() => {
        setVisible(false);
        setReady(true);
      });
      return () => cancelAnimationFrame(id);
    }

    lock(true);
    const controls = animate(count, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {
          /* ignore */
        }
        setVisible(false);
        lock(false);
        // Hero starts while the curtain is still lifting, so they overlap fluidly
        setTimeout(() => setReady(true), 250);
      },
    });
    return () => {
      controls.stop();
      lock(false);
    };
  }, [count, lock, setReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={
            fast
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 1.1, ease: ease.inOut } }
          }
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <motion.div
            className="preloader-inner"
            exit={{ y: -80, opacity: 0, transition: { duration: 0.8, ease: ease.inOut } }}
          >
            <div className="preloader-name">
              {[site.firstName, site.lastName].map((w, i) => (
                <span className="mask" key={w}>
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: ease.expo, delay: 0.1 + i * 0.08 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </div>
            <motion.span className="preloader-count">{rounded}</motion.span>
          </motion.div>
          <motion.span className="preloader-bar" style={{ scaleX: bar }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
