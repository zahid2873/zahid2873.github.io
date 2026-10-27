import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { SectionHeading } from "./Reveal.jsx";
import { experience } from "../data.js";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(ym) {
  if (!ym) {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() };
  }
  const [y, m] = ym.split("-").map(Number);
  return { y, m: m - 1 };
}

const label = (ym) => {
  const { y, m } = parse(ym);
  return `${MONTHS[m]} ${y}`;
};

// LinkedIn-style duration, counting both the start and end month ("1 yr 8 mos")
function duration(start, end) {
  const a = parse(start);
  const b = parse(end);
  const total = (b.y - a.y) * 12 + (b.m - a.m) + 1;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  return [yrs && `${yrs} yr${yrs > 1 ? "s" : ""}`, mos && `${mos} mo${mos > 1 ? "s" : ""}`].filter(Boolean).join(" ");
}

function Dot({ delay }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", delay }}
      className="absolute top-1.5 -left-10 h-4 w-4 rounded-full border-4 border-slate-50 bg-accent dark:border-[#11121c]"
    />
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-3 grid gap-1.5">
      {items.map((b) => (
        <li key={b} className="flex gap-2 text-slate-500 dark:text-slate-400">
          <span className="text-accent">▹</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

function CompanyEntry({ job, delay }) {
  const first = job.roles[job.roles.length - 1].start;
  const current = !job.roles[0].end;

  return (
    <>
      <Dot delay={delay + 0.2} />
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 sm:p-6 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-xl font-extrabold text-white shadow-md">
            {job.logo}
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-bold">{job.company}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {duration(first, job.roles[0].end)} · {job.place}
            </p>
          </div>
        </div>

        {/* Roles, newest first, connected by a small line */}
        <ol className="mt-5 grid gap-5">
          {job.roles.map((role, i) => (
            <motion.li
              key={role.start}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2 + i * 0.12 }}
              className="relative pl-6"
            >
              <span
                className={`absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full ${
                  !role.end ? "bg-accent ring-4 ring-accent/20" : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
              {i < job.roles.length - 1 && (
                <span className="absolute top-5 -bottom-4 left-[4px] w-0.5 bg-slate-200 dark:bg-slate-700" />
              )}
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-bold">{role.title}</h4>
                {!role.end && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">Present</span>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{role.type}</p>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {label(role.start)} — {role.end ? label(role.end) : "Present"} · {duration(role.start, role.end)}
              </p>
            </motion.li>
          ))}
        </ol>

        <p className="mt-5 border-t border-slate-100 pt-4 text-slate-500 dark:border-slate-800 dark:text-slate-400">
          {job.description}
        </p>
        {job.bullets && <Bullets items={job.bullets} />}
        {current && <span className="sr-only">Currently working here</span>}
      </div>
    </>
  );
}

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
                key={job.company || job.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {job.roles ? (
                  <CompanyEntry job={job} delay={i * 0.1} />
                ) : (
                  <>
                    <Dot delay={0.2 + i * 0.1} />
                    <span className="font-mono text-sm text-accent">{job.date}</span>
                    <h3 className="mt-1 text-lg font-bold">{job.title}</h3>
                    <p className="mb-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">{job.place}</p>
                    <p className="text-slate-500 dark:text-slate-400">{job.description}</p>
                    {job.bullets && <Bullets items={job.bullets} />}
                  </>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
