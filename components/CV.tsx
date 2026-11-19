"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "motion/react";
import { cv, site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Arrow, Magnetic, RollText, SectionIndex, SplitReveal } from "./ui";

/* The CV lives in /public as Ogbanje_Abraham_CV.pdf.
   To update it, replace that file with a new one of the SAME NAME. The links never change. */
export default function CV() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 28]);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, var(--cv-glow), transparent 60%)`;

  return (
    <section className="section section-compact" id="cv" aria-labelledby="cv-title">
      <div className="container">
        <motion.div
          ref={ref}
          className="cv-card"
          style={{ scale, borderRadius: radius }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 100);
            my.set(((e.clientY - r.top) / r.height) * 100);
          }}
        >
          <motion.span className="cv-glow" style={{ background: glow }} aria-hidden="true" />
          <span className="cv-orbit" aria-hidden="true" />
          <div className="cv-text">
            <SectionIndex n="04" />
            <h2 id="cv-title" className="section-title">
              <SplitReveal text={cv.title} wordClassName={(i, n) => (i === n - 1 ? "accent-word" : undefined)} />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: ease.expo, delay: 0.3 }}
            >
              {cv.text}
            </motion.p>
          </div>
          <motion.div
            className="cv-actions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: ease.expo, delay: 0.45 }}
          >
            <Magnetic>
              <a className="btn btn-primary btn-invert" href={site.cvFile} target="_blank" rel="noopener" aria-label={cv.view.ariaLabel}>
                <RollText>{cv.view.label}</RollText>
                <Arrow dir="up-right" />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost btn-ghost-invert" href={site.cvFile} download={site.cvDownloadName} aria-label={cv.download.ariaLabel}>
                <RollText>{cv.download.label}</RollText>
                <svg className="arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                  <path d="M12 4v13m-6-6 6 6 6-6M5 20h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
