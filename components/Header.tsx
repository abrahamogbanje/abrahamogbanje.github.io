"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { nav, site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { useApp } from "./Providers";
import ThemeToggle from "./ThemeToggle";

/* A frosted glass pill that floats above the page, detached from the edges.
   It stays fixed at the top on every screen size while you scroll. */
export default function Header() {
  const { ready } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  // Slightly slimmer pill once the page has scrolled
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Highlight the link for the section in the middle of the screen
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Escape closes the menu and returns focus; clicking outside closes it
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const bubble = hovered ?? active;

  return (
    <motion.header
      className="site-header"
      id="top"
      initial={{ y: -120, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -120, opacity: 0 }}
      transition={{ duration: 1, ease: ease.expo }}
    >
      <nav ref={navRef} aria-label="Main" className="nav-wrap">
      <motion.div
        className={`pill ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
        initial={{ clipPath: "inset(0% 22% 0% 22% round 999px)" }}
        animate={{ clipPath: ready ? "inset(0% 0% 0% 0% round 999px)" : "inset(0% 22% 0% 22% round 999px)" }}
        transition={{ duration: 1.3, ease: ease.expo, delay: 0.1 }}
        // Drop the clip once open so the pill's soft shadow isn't cut off
        onAnimationComplete={() => {
          if (ready && pillRef.current) pillRef.current.style.clipPath = "none";
        }}
        ref={pillRef}
      >
        <a className="brand" href="#top" aria-label={site.name}>
          <span className="brand-mark" aria-hidden="true">OA</span>
          <span className="brand-name">{site.name}</span>
        </a>

        <ul className="nav-list" onMouseLeave={() => setHovered(null)}>
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={isActive ? "is-active" : undefined}
                  aria-current={isActive ? "true" : undefined}
                  onMouseEnter={() => setHovered(item.href)}
                  onFocus={() => setHovered(item.href)}
                  onBlur={() => setHovered(null)}
                >
                  {bubble === item.href && (
                    <motion.span
                      layoutId="nav-bubble"
                      className="nav-bubble"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="pill-actions">
          <ThemeToggle />
          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">Menu</span>
            <span className="burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <motion.span className="pill-progress" style={{ scaleX: progress }} aria-hidden="true" />
      </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="nav-panel"
              className="nav-panel"
              initial={{ opacity: 0, y: -16, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: ease.expo }}
            >
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: ease.expo, delay: 0.05 + i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      aria-current={active === item.href ? "true" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      <span className="nav-panel-index" aria-hidden="true">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
