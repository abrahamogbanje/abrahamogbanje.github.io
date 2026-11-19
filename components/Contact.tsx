"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contact, site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Arrow, FadeUp, Magnetic, SectionIndex, SplitReveal } from "./ui";

export default function Contact() {
  const [status, setStatus] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const announce = (msg: string) => {
    setStatus(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus(""), 2500);
  };

  const copy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(site.email).then(
        () => announce(contact.copied),
        () => announce(contact.copyFailed)
      );
    } else {
      announce(contact.copyUnsupported);
    }
  };

  const copied = status === contact.copied;

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact">
        <SectionIndex n="05" />
        <h2 id="contact-title" className="contact-title">
          <SplitReveal
            text={contact.title}
            stagger={0.04}
            wordClassName={(i, n) => (i === n - 1 ? "accent-word" : undefined)}
          />
        </h2>
        <FadeUp as="p" className="contact-text" delay={0.2}>
          {contact.text}
        </FadeUp>

        <FadeUp className="contact-email" delay={0.3}>
          <a href={`mailto:${site.email}`} className="email-link">
            <span>{site.email}</span>
            <span className="email-underline" aria-hidden="true" />
          </a>
          <div className="copy-wrap">
            <Magnetic strength={0.25}>
              <button className={`btn btn-ghost btn-small ${copied ? "is-done" : ""}`} type="button" onClick={copy}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "copy"}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.25, ease: ease.expo }}
                    className="copy-label"
                  >
                    {copied ? (
                      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                        <path d="m5 12 5 5 9-10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                    {contact.copy}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>
            <span className="copy-status" role="status" aria-live="polite">
              {status}
            </span>
          </div>
        </FadeUp>

        <ul className="social-links" aria-label="Social links">
          {contact.socials.map((s, i) => (
            <motion.li
              key={s.href}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: ease.expo, delay: 0.35 + i * 0.08 }}
            >
              <a href={s.href} rel="noopener noreferrer" aria-label={s.ariaLabel} className="social">
                <span className="social-label">{s.label}</span>
                <span className="social-arrow">
                  <Arrow dir="up-right" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
