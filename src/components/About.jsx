import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import Reveal, { SectionHeading } from "./Reveal.jsx";
import { about } from "../data.js";

// Number that counts up from 0 when it scrolls into view
function Counter({ to, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => (ref.current.textContent = v.toFixed(decimals) + suffix),
    });
    return () => controls.stop();
  }, [inView, to, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

// Terminal where each command "types" itself, then prints its output
function Terminal() {
  const LINE = 1.1; // seconds per command
  return (
    <Reveal delay={0.2}>
      <div className="mt-8 overflow-hidden rounded-2xl bg-slate-950 font-mono text-[13px] shadow-2xl ring-1 ring-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-rose-500" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="ml-2 text-xs text-slate-500">zahid@codixel: ~/apps</span>
        </div>
        <div className="grid gap-1 p-4">
          {about.terminal.map((line, i) => (
            <div key={line.cmd}>
              <motion.p
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 + i * LINE, ease: "linear" }}
                className="whitespace-nowrap text-slate-200"
              >
                <span className="text-emerald-400">$</span> {line.cmd}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 + i * LINE }}
                className="text-sky-400"
              >
                {line.out}
              </motion.p>
            </div>
          ))}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="h-4 w-2 bg-slate-300"
          />
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionHeading eyebrow="About me" title="I turn designs into apps people love to use" />
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <p className="mb-4 text-lg text-slate-500 dark:text-slate-400">{p}</p>
            </Reveal>
          ))}
          <Terminal />
        </div>

        {/* Stats as home-screen widgets */}
        <div className="grid grid-cols-2 gap-4">
          {about.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-lg">
                {stat.icon}
              </span>
              <p className="mt-4 text-3xl font-extrabold text-accent">
                <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
