"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { hero, site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { useApp } from "./Providers";
import { Arrow, Magnetic, RollText, SplitReveal } from "./ui";

export default function Hero() {
  const { ready } = useApp();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax as the hero scrolls away
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

  // Gentle 3D tilt of the photo toward the mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);

  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,.28), transparent 60%)`
  );

  const words = hero.tagline.split(" ");

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <motion.div className="hero-text" style={{ y: textY, opacity: textOpacity }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: ease.expo, delay: 0.1 }}
          >
            <span className="eyebrow-line" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="hero-title">
            <SplitReveal text={site.firstName} play={ready} delay={0.15} stagger={0.045} className="hero-line" />
            <SplitReveal
              text={site.lastName}
              play={ready}
              delay={0.4}
              stagger={0.045}
              className="hero-line hero-line-accent"
            />
          </h1>

          <p className="tagline">
            {words.map((w, i) => (
              <Fragment key={i}>
              <span className="mask">
                <motion.span
                  className="tagline-word"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={ready ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.9, ease: ease.expo, delay: 0.75 + i * 0.022 }}
                >
                  {w}
                </motion.span>
              </span>
              {i < words.length - 1 && " "}
              </Fragment>
            ))}
          </p>

          <motion.p
            className="hero-meta"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: ease.expo, delay: 1.05 }}
          >
            <span>{hero.meta[0]}</span>
            <span className="dot-sep" aria-hidden="true">·</span>
            <span className="status">
              <span className="status-dot" aria-hidden="true" />
              {hero.meta[1]}
            </span>
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: ease.expo, delay: 1.15 }}
          >
            <Magnetic>
              <a className="btn btn-primary" href={hero.primary.href}>
                <RollText>{hero.primary.label}</RollText>
                <Arrow />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={hero.secondary.href}>
                <RollText>{hero.secondary.label}</RollText>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.figure className="hero-photo" style={{ y: photoY }}>
          <motion.div
            className="photo-frame"
            initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)" }}
            animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 28px)" } : {}}
            transition={{ duration: 1.5, ease: ease.inOut, delay: 0.25 }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse") return;
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onPointerLeave={() => {
              mx.set(0);
              my.set(0);
            }}
          >
            <motion.div
              className="photo-img"
              initial={{ scale: 1.5 }}
              animate={ready ? { scale: 1 } : {}}
              transition={{ duration: 2, ease: ease.expo, delay: 0.25 }}
            >
              <motion.div style={{ scale: imgScale, height: "100%" }}>
                <Image src={site.photo} alt={site.photoAlt} width={720} height={720} priority />
              </motion.div>
            </motion.div>
            <motion.span
              className="photo-glare"
              aria-hidden="true"
              style={{ background: glare }}
            />
          </motion.div>
        </motion.figure>
      </div>

      <motion.div
        className="scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="scroll-cue-track">
          <span className="scroll-cue-thumb" />
        </span>
      </motion.div>
    </section>
  );
}
