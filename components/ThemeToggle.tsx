"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* Light / dark switch. The site starts dark; a visitor's choice is remembered.
   (The saved choice is applied before paint by the inline script in layout.tsx.) */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const q = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const explicit = root.getAttribute("data-theme");
      setIsDark(explicit ? explicit === "dark" : q.matches);
    };
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    setIsDark(!isDark);
    window.setTimeout(() => root.classList.remove("theme-switching"), 700);
  };

  return (
    <button
      className="icon-btn theme-toggle"
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark ?? false}
      onClick={toggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={isDark ? "sun" : "moon"}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
          focusable="false"
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {isDark ? (
            <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5h1v3h-2V2h1zm0 17h1v3h-2v-3h1zM2 11h3v2H2v-2zm17 0h3v2h-3v-2zM4.9 3.5l2.1 2.1-1.4 1.4L3.5 4.9l1.4-1.4zm14.2 14.2 1.4 1.4-1.4 1.4-2.1-2.1 1.4-1.4zM3.5 19.1l2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4zM17 5.6l2.1-2.1 1.4 1.4-2.1 2.1L17 5.6z" />
          ) : (
            <path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}
