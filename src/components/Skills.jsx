import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { SectionHeading } from "./Reveal.jsx";
import { skills, techStrip } from "../data.js";

/* ---------- Building blocks ---------- */

// Card with a soft glow that follows the mouse
function BentoCard({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x) var(--y), rgb(2 119 230 / 0.12), transparent 45%)" }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

function CardTitle({ icon, title, subtitle }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-lg text-white shadow-lg shadow-accent/30">
        {icon}
      </span>
      <div>
        <h3 className="text-lg font-bold leading-tight">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
}

function LogoTile({ name, logo, size = "md" }) {
  const box = size === "lg" ? "h-16 w-16 p-3" : "h-12 w-12 p-2.5";
  return (
    <motion.div whileHover={{ y: -4, scale: 1.08 }} className="flex flex-col items-center gap-1.5" title={name}>
      <span className={`grid place-items-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200 dark:ring-slate-700 ${box}`}>
        <img src={logo} alt={name} loading="lazy" className="h-full w-full object-contain" />
      </span>
      <span className="text-center text-[11px] font-medium text-slate-500 dark:text-slate-400">{name}</span>
    </motion.div>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{children}</span>
  );
}

/* ---------- Dart code with simple syntax colors ---------- */

const KEYWORDS = new Set([
  "class", "extends", "final", "void", "return", "const", "super", "this", "on", "async", "await", "required",
]);

function highlight(line) {
  return line.split(/('[^']*'|@\w+|\b[A-Za-z_]\w*\b)/).map((part, i) => {
    let color = "";
    if (part.startsWith("'")) color = "text-amber-300";
    else if (part.startsWith("@")) color = "text-violet-400";
    else if (KEYWORDS.has(part)) color = "text-pink-400";
    else if (/^[A-Z]/.test(part)) color = "text-sky-300";
    else if (/^[a-z_]\w*$/.test(part) && line[line.indexOf(part) + part.length] === "(") color = "text-emerald-300";
    return (
      <span key={i} className={color}>
        {part}
      </span>
    );
  });
}

function CodeWindow({ code, file, replayKey = 0, className = "" }) {
  const lines = code.split("\n");
  return (
    <div className={`overflow-hidden rounded-2xl bg-slate-950 font-mono text-[12px] leading-relaxed shadow-xl ring-1 ring-slate-800 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span className="ml-2 text-[11px] text-slate-500">{file}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-slate-300">
        {lines.map((line, i) => (
          <motion.div
            key={`${replayKey}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="flex"
          >
            <span className="mr-4 w-5 shrink-0 text-right text-slate-600 select-none">{i + 1}</span>
            <span className="whitespace-pre">{highlight(line) }</span>
          </motion.div>
        ))}
      </pre>
    </div>
  );
}

/* ---------- Cards ---------- */

function CoreCard() {
  const { core } = skills;
  const [reloads, setReloads] = useState(0);
  const [toast, setToast] = useState(false);

  function hotReload() {
    setReloads((r) => r + 1);
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  }

  return (
    <BentoCard className="md:col-span-2 lg:col-span-4">
      <div className="grid h-full gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col">
          <div className="flex gap-3">
            {core.logos.map((l, i) => (
              <motion.div
                key={l.name}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              >
                <LogoTile {...l} size="lg" />
              </motion.div>
            ))}
          </div>
          <h3 className="mt-5 text-2xl font-extrabold">{core.title}</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{core.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {core.chips.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
          <motion.button
            onClick={hotReload}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-400/30 lg:mt-auto"
          >
            ⚡ Hot reload
          </motion.button>
        </div>

        <div className="relative">
          <CodeWindow code={core.code} file="lib/main.dart" replayKey={reloads} />
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute inset-x-4 bottom-4 rounded-xl bg-emerald-500 px-4 py-2 font-mono text-xs font-semibold text-white shadow-lg"
              >
                Reloaded 1 of 1,204 libraries in 412ms.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  );
}

function PlatformsCard() {
  return (
    <BentoCard className="lg:col-span-2" delay={0.1}>
      <CardTitle icon="📱" title="Ships to" subtitle="One codebase, three platforms" />
      <div className="grid gap-3">
        {skills.platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12 }}
            whileHover={{ x: 6 }}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white p-2 shadow ring-1 ring-slate-200 dark:ring-slate-700">
              <img src={p.logo} alt={p.name} className="h-full w-full object-contain" />
            </span>
            <span className="flex-1 leading-tight">
              <span className="block font-bold">{p.name}</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{p.store}</span>
            </span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}

function StateCard() {
  const { options, note } = skills.stateManagement;
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  // Cycles through the options until the visitor picks one
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((a) => (a + 1) % options.length), 4000);
    return () => clearInterval(t);
  }, [auto, options.length]);

  return (
    <BentoCard className="md:col-span-2 lg:col-span-3">
      <CardTitle icon="🧠" title="State management" subtitle={note} />
      <div className="mb-4 inline-flex rounded-full bg-slate-100 p-1 dark:bg-slate-800">
        {options.map((o, i) => (
          <button
            key={o.name}
            onClick={() => {
              setActive(i);
              setAuto(false);
            }}
            className={`relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              active === i ? "text-white" : "text-slate-500 hover:text-accent dark:text-slate-400"
            }`}
          >
            {active === i && (
              <motion.span
                layoutId="state-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{o.name}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <CodeWindow
            code={options[active].code}
            file={`cart_${options[active].name.toLowerCase()}.dart`}
            className="min-h-[230px]"
          />
        </motion.div>
      </AnimatePresence>
    </BentoCard>
  );
}

// A dot that travels along a line, forever
function Packet({ reverse = false, delay = 0, color = "bg-accent" }) {
  return (
    <motion.span
      animate={{ left: reverse ? ["100%", "0%"] : ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, delay, ease: "easeInOut" }}
      className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_2px] shadow-accent/60 ${color}`}
    />
  );
}

function Lane({ label, children }) {
  return (
    <div className="relative">
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] font-semibold text-slate-400">
        {label}
      </span>
      <div className="relative h-0.5 rounded-full bg-slate-200 dark:bg-slate-700">{children}</div>
    </div>
  );
}

function DataCard() {
  const { data, core } = skills;
  return (
    <BentoCard className="md:col-span-2 lg:col-span-3" delay={0.1}>
      <CardTitle icon="☁️" title="Backend & data" subtitle="REST APIs and WebSockets for real-time features" />

      {/* Live data-flow diagram */}
      <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
        <div className="flex flex-col items-center gap-1">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white p-3 shadow ring-1 ring-slate-200 dark:ring-slate-700">
            <img src={core.logos[0].logo} alt="Flutter app" className="h-full w-full object-contain" />
          </span>
          <span className="text-[11px] font-semibold text-slate-500">App</span>
        </div>
        <div className="grid flex-1 gap-8 pt-3">
          <Lane label="REST">
            <Packet />
            <Packet reverse delay={0.9} color="bg-accent-2" />
          </Lane>
          <Lane label="WebSocket">
            <Packet delay={0.3} />
            <Packet reverse delay={0.6} color="bg-accent-2" />
            <Packet delay={1.2} />
          </Lane>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="flex gap-1 rounded-2xl bg-white p-2.5 shadow ring-1 ring-slate-200 dark:ring-slate-700">
            {data.cloud.map((c) => (
              <img key={c.name} src={c.logo} alt={c.name} title={c.name} className="h-8 w-8 object-contain" />
            ))}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">Cloud</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-4">
        {[...data.cloud, ...data.logos].map((l) => (
          <LogoTile key={l.name} {...l} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {data.chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </BentoCard>
  );
}

function FeaturesCard() {
  return (
    <BentoCard className="lg:col-span-2">
      <CardTitle icon="✨" title="Features & payments" subtitle="Things I've built into real apps" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-2 gap-2"
      >
        {skills.features.map((f) => (
          <motion.div
            key={f.name}
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
            }}
            whileHover={{ scale: 1.06, rotate: -1 }}
            className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-semibold dark:bg-slate-800/60"
          >
            <span className="text-base">{f.icon}</span>
            {f.name}
          </motion.div>
        ))}
      </motion.div>
    </BentoCard>
  );
}

function TestingCard() {
  const items = skills.testing;
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [done, setDone] = useState(0);

  // Ticks the checks one by one, holds, then runs again — while the card is visible
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setDone((d) => (d > items.length ? 0 : d + 1)), done === items.length ? 2500 : 700);
    return () => clearTimeout(t);
  }, [inView, done, items.length]);

  const passed = Math.min(done, items.length);
  return (
    <BentoCard className="lg:col-span-2" delay={0.1}>
      <div ref={ref}>
        <CardTitle icon="🧪" title="Testing & CI/CD" subtitle="Shipping with confidence" />
        <div className="grid gap-2 font-mono text-sm">
          {items.map((item, i) => {
            const ok = i < passed;
            const running = i === passed && done < items.length;
            return (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/60">
                <span className="grid h-5 w-5 place-items-center">
                  {ok ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[10px] text-white"
                    >
                      ✓
                    </motion.span>
                  ) : running ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent"
                    />
                  ) : (
                    <span className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  )}
                </span>
                <span className={ok ? "" : "text-slate-400"}>{item}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            animate={{ width: `${(passed / items.length) * 100}%` }}
            className="h-full rounded-full bg-emerald-500"
          />
        </div>
        <p className={`mt-2 font-mono text-xs ${passed === items.length ? "text-emerald-500" : "text-slate-400"}`}>
          {passed === items.length ? "✓ All checks passed — ready to ship" : `Running ${passed}/${items.length}…`}
        </p>
      </div>
    </BentoCard>
  );
}

function ToolsCard() {
  const { tools } = skills;
  return (
    <BentoCard className="md:col-span-2 lg:col-span-2" delay={0.2}>
      <CardTitle icon="🛠" title="Tools I use daily" subtitle="Design, code, collaborate" />
      <div className="grid grid-cols-4 gap-x-2 gap-y-4">
        {tools.logos.map((l) => (
          <LogoTile key={l.name} {...l} />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {tools.chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </BentoCard>
  );
}

/* ---------- Section ---------- */

function TechStrip() {
  const items = [...techStrip, ...techStrip]; // doubled so the loop is seamless
  return (
    <div className="mb-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white p-0.5">
              <img src={t.logo} alt="" className="h-full w-full object-contain" />
            </span>
            <span className="text-sm font-semibold whitespace-nowrap">{t.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="bg-slate-50 py-24 dark:bg-[#11121c]">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Skills" title="The tech behind my apps" />
      </div>
      <TechStrip />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 md:grid-cols-2 lg:grid-cols-6">
        <CoreCard />
        <PlatformsCard />
        <StateCard />
        <DataCard />
        <FeaturesCard />
        <TestingCard />
        <ToolsCard />
      </div>
    </section>
  );
}
