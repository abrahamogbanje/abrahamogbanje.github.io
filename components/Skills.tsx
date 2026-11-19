"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/content";
import { entrances, innerItem, innerStagger, tagPop } from "@/lib/motion";
import { FadeUp, SectionIndex, SplitReveal } from "./ui";

// Each skill group arrives differently from the project cards and from each other
const GROUP_ENTRANCES = ["focus", "hinge", "wipe", "drop"];

export default function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-head">
          <SectionIndex n="03" />
          <h2 id="skills-title" className="section-title">
            <SplitReveal text={skills.title} />
          </h2>
          <FadeUp as="p" className="section-intro" delay={0.15}>
            {skills.intro}
          </FadeUp>
        </div>

        <div className="skills-grid">
          {skills.groups.map((g, i) => (
            <motion.div
              key={g.title}
              className="skill-group"
              variants={entrances[GROUP_ENTRANCES[i % GROUP_ENTRANCES.length]]}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            >
              <motion.div variants={innerStagger}>
                <motion.div className="skill-head" variants={innerItem}>
                  <span className="skill-count" aria-hidden="true">
                    {String(g.tags.length).padStart(2, "0")}
                  </span>
                  <h3>{g.title}</h3>
                </motion.div>
                <motion.ul className="tags" variants={innerStagger}>
                  {g.tags.map((t) => (
                    <motion.li key={t} variants={tagPop}>
                      {t}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
