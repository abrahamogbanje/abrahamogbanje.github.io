"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { projects } from "@/lib/content";
import { entrances, innerItem, innerStagger, tagPop } from "@/lib/motion";
import { Arrow, FadeUp, SectionIndex, SplitReveal } from "./ui";

// One entrance per card, in order. Add more keys from lib/motion.ts if you add projects.
const CARD_ENTRANCES = ["rise3d", "iris", "sweep", "focus", "hinge", "wipe"];

export default function Projects() {
  return (
    <section className="section section-alt" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-head">
          <SectionIndex n="02" />
          <h2 id="projects-title" className="section-title">
            <SplitReveal text={projects.title} />
          </h2>
          <FadeUp as="p" className="section-intro" delay={0.15}>
            {projects.intro}
          </FadeUp>
        </div>

        <ul className="project-grid">
          {projects.items.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects.items)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  const px = useTransform(mx, (v) => `${v * 100}%`);
  const py = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${px} ${py}, var(--spot), transparent 55%)`;
  const variant = entrances[CARD_ENTRANCES[index % CARD_ENTRANCES.length]];
  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.li
      className={`card-shell card-${index + 1}`}
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      <motion.div
        ref={ref}
        className="card"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        <motion.span className="card-spotlight" style={{ background: spotlight }} aria-hidden="true" />
        <motion.div className="card-content" variants={innerStagger}>
          <motion.div className="card-top" variants={innerItem}>
            <span className="card-index" aria-hidden="true">{n}</span>
            <span className="card-corner" aria-hidden="true">
              <Arrow dir="up-right" />
            </span>
          </motion.div>

          <div className="card-main">
            <motion.h3 className="card-title" variants={innerItem}>
              {project.title}
            </motion.h3>
            <motion.p className="card-text" variants={innerItem}>
              {project.text}
            </motion.p>
          </div>

          <div className="card-bottom">
            <motion.ul className="tags" aria-label="Technologies used" variants={innerStagger}>
              {project.tags.map((t) => (
                <motion.li key={t} variants={tagPop}>
                  {t}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div className="card-links" variants={innerItem}>
              {project.links.map((l) => (
                <a key={l.href} href={l.href} rel="noopener noreferrer" aria-label={l.ariaLabel} className="link-arrow">
                  <span>{l.label}</span>
                  <Arrow />
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}
