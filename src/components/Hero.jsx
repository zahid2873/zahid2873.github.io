import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data.js";
import PhoneFrame, { useTilt } from "./PhoneFrame.jsx";
import { ProfileScreen } from "./AppScreens.jsx";
import { SPLASH_MS } from "./Splash.jsx";

const START = SPLASH_MS / 1000; // wait for the splash screen to leave

// Children appear one after another (stagger)
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: START } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Tech chips floating around the phone. x/y are positions relative to the phone.
const chips = [
  { label: "Flutter", className: "-left-16 top-10", hue: 205 },
  { label: "Dart", className: "-right-12 top-24", hue: 190 },
  { label: "Firebase", className: "-left-20 top-1/2", hue: 35 },
  { label: "GetX · Riverpod · BLoC", className: "-right-24 top-[62%]", hue: 270 },
  { label: "REST · WebSockets", className: "-left-10 bottom-12", hue: 150 },
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block text-accent">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.4 }}
          className="inline-block"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const tilt = useTilt(12);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      {/* Floating blurred blobs in the background */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-2/20 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-4 md:grid-cols-[1.2fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center md:text-left">
          <motion.span
            variants={item}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.title} · Open to opportunities
          </motion.span>
          <motion.p variants={item} className="mb-1 font-mono text-accent">
            Hi, I'm
          </motion.p>
          <motion.h1 variants={item} className="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </motion.h1>
          <motion.h2 variants={item} className="mt-3 text-2xl font-semibold text-slate-500 sm:text-3xl dark:text-slate-400">
            I build <RotatingRole />
          </motion.h2>
          <motion.p variants={item} className="mx-auto mt-5 max-w-lg text-lg text-slate-500 md:mx-0 dark:text-slate-400">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-accent px-7 py-3 font-semibold text-white shadow-lg shadow-accent/30"
            >
              See my apps
            </motion.a>
            <motion.a
              href={profile.resume}
              download
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-accent px-7 py-3 font-semibold text-accent"
            >
              Download CV
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex justify-center gap-6 md:justify-start">
            {profile.socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener"
                whileHover={{ y: -3 }}
                className="font-medium text-slate-500 hover:text-accent dark:text-slate-400"
              >
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 120, rotate: 12 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 14, delay: START }}
          className="order-first flex justify-center md:order-none"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div {...tilt} className="w-[260px] sm:w-[280px]">
              <PhoneFrame>
                <ProfileScreen />
              </PhoneFrame>
            </motion.div>

            {chips.map((chip, i) => (
              <motion.span
                key={chip.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{
                  opacity: { delay: START + 0.6 + i * 0.12 },
                  scale: { delay: START + 0.6 + i * 0.12, type: "spring" },
                  y: { duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut" },
                }}
                className={`absolute hidden rounded-full bg-white px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-lg ring-1 ring-slate-200 sm:block dark:bg-slate-900 dark:ring-slate-700 ${chip.className}`}
                style={{ color: `hsl(${chip.hue} 80% 45%)` }}
              >
                {chip.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-2xl text-slate-400 md:block"
      >
        ↓
      </motion.a>
    </section>
  );
}
