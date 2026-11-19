"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { about } from "@/lib/content";
import { ease } from "@/lib/motion";
import { ScrollWords, SectionIndex, SplitReveal } from "./ui";

export default function About() {
  const tlRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tlRef, offset: ["start 0.8", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-head">
          <SectionIndex n="01" />
          <h2 id="about-title" className="section-title">
            <SplitReveal text={about.title} wordClassName={(i, n) => (i === n - 1 ? "accent-word" : undefined)} />
          </h2>
        </div>

        <div className="about-body">
          <ScrollWords text={about.paragraphs[0]} className="lead" />
          <ScrollWords text={about.paragraphs[1]} />

          <div className="timeline" ref={tlRef}>
            <span className="timeline-rail" aria-hidden="true">
              <motion.span className="timeline-fill" style={{ scaleY: line }} />
            </span>
            <ul aria-label="Background">
            {about.timeline.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: 50, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 1.1, ease: ease.expo, delay: i * 0.12 }}
              >
                <motion.span
                  className="timeline-dot"
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.2 + i * 0.12 }}
                />
                <p className="timeline-date">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
