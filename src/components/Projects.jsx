import { motion } from "motion/react";
import Reveal, { SectionHeading } from "./Reveal.jsx";
import PhoneFrame, { useTilt } from "./PhoneFrame.jsx";
import { screens } from "./AppScreens.jsx";
import { projects } from "../data.js";

const storeCaption = {
  "Google Play": "GET IT ON",
  "App Store": "Download on the",
  "Microsoft Store": "Get it from",
};

function StoreBadge({ store, url }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener"
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex flex-col rounded-xl bg-slate-900 px-4 py-1.5 leading-tight text-white shadow-lg ring-1 ring-slate-700 dark:bg-white dark:text-slate-900"
    >
      <span className="text-[10px] uppercase opacity-70">{storeCaption[store]}</span>
      <span className="text-sm font-bold">{store}</span>
    </motion.a>
  );
}

const list = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const listItem = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } };

function ProjectRow({ project, index }) {
  const reverse = index % 2 === 1;
  const tilt = useTilt(10);
  const Screen = screens[project.screen];

  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 100, rotate: reverse ? 10 : -10 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 60, damping: 14 }}
        className={`relative flex justify-center ${reverse ? "md:order-2" : ""}`}
      >
        <div className="pointer-events-none absolute inset-10 rounded-full bg-accent/20 blur-3xl" />
        <motion.div {...tilt} className="relative w-[250px] sm:w-[270px]">
          <PhoneFrame>
            <Screen />
          </PhoneFrame>
        </motion.div>
      </motion.div>

      <div>
        <Reveal>
          <p className="font-mono text-sm text-accent">0{index + 1} · {project.tagline}</p>
          <h3 className="mt-1 text-3xl font-extrabold sm:text-4xl">{project.title}</h3>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">{project.description}</p>
        </Reveal>

        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-5 grid gap-2"
        >
          {project.highlights.map((h) => (
            <motion.li key={h} variants={listItem} className="flex gap-3">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-xs text-accent">
                ✓
              </span>
              <span>{h}</span>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal delay={0.2}>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <StoreBadge key={link.store} {...link} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Projects" title="Apps I've shipped to the stores" />
        <div className="grid gap-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
