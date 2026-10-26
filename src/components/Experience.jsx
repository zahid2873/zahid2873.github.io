import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { SectionHeading } from "./Reveal.jsx";
import { experience } from "../data.js";

export default function Experience() {
  const listRef = useRef(null);
  // The timeline line "draws" itself as you scroll through the section
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 60%"] });

  return (
    <section id="experience" className="bg-slate-50 py-24 dark:bg-[#11121c]">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Experience & Education" title="My journey so far" />

        <div ref={listRef} className="relative max-w-3xl pl-10">
          <div className="absolute top-0 bottom-0 left-[7px] w-0.5 bg-slate-200 dark:bg-slate-800" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 bottom-0 left-[7px] w-0.5 origin-top bg-accent"
          />

          <ol className="grid gap-10">
            {experience.map((job, i) => (
              <motion.li
                key={job.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 + i * 0.1 }}
                  className="absolute top-1.5 -left-10 h-4 w-4 rounded-full border-4 border-slate-50 bg-accent dark:border-[#11121c]"
                />
                <span className="font-mono text-sm text-accent">{job.date}</span>
                <h3 className="mt-1 text-lg font-bold">{job.title}</h3>
                <p className="mb-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">{job.place}</p>
                <p className="text-slate-500 dark:text-slate-400">{job.description}</p>
                {job.bullets && (
                  <ul className="mt-3 grid gap-1.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-slate-500 dark:text-slate-400">
                        <span className="text-accent">▹</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
