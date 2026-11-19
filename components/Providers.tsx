"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { MotionConfig, useReducedMotion } from "motion/react";

/* --------------------------------------------------------------------------
   Intro context: `ready` flips to true when the preloader lifts, so the hero
   and header can start their entrance at exactly the right moment.
   Smooth scroll context: exposes `scrollTo` so links glide instead of jump.
   -------------------------------------------------------------------------- */

type Ctx = {
  ready: boolean;
  setReady: (v: boolean) => void;
  scrollTo: (target: string | number) => void;
  lock: (locked: boolean) => void;
};

const AppContext = createContext<Ctx>({
  ready: true,
  setReady: () => {},
  scrollTo: () => {},
  lock: () => {},
});

export const useApp = () => useContext(AppContext);

const HEADER_OFFSET = -96;

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, autoRaf: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  const scrollTo = useCallback(
    (target: string | number) => {
      const lenis = lenisRef.current;
      if (target === "#top" || target === 0) {
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        return;
      }
      if (typeof target === "number") {
        lenis ? lenis.scrollTo(target) : window.scrollTo({ top: target });
        return;
      }
      const el = document.querySelector<HTMLElement>(target);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.6 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      }
      // Move keyboard focus to the section so screen-reader and keyboard users land there too
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      history.replaceState(null, "", target);
    },
    [reduce]
  );

  const lock = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (lenis) locked ? lenis.stop() : lenis.start();
    document.documentElement.classList.toggle("is-locked", locked);
  }, []);

  // Every in-page link (#about, #contact...) glides with the smooth scroller
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#" || a.classList.contains("skip-link")) return;
      e.preventDefault();
      scrollTo(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  return (
    <AppContext.Provider value={{ ready, setReady, scrollTo, lock }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </AppContext.Provider>
  );
}
