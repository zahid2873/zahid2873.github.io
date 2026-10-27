// Animated fake app screens shown inside the phone mockups.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { notifications, profile, projects, yearsOfExperience } from "../data.js";
import { SPLASH_MS } from "./Splash.jsx";

function useCycle(length, ms, startDelay = 0) {
  const [index, setIndex] = useState(startDelay ? -1 : 0);
  useEffect(() => {
    let interval;
    const start = setTimeout(() => {
      setIndex(0);
      interval = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [length, ms, startDelay]);
  return index;
}

function AppBar({ title, right }) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <span className="text-sm font-bold">{title}</span>
      {right}
    </div>
  );
}

/* ---------------- Hero: profile "app" ---------------- */
export function ProfileScreen() {
  const n = useCycle(notifications.length, 3500, SPLASH_MS + 1500);
  const note = notifications[n];
  const stats = [
    [`${yearsOfExperience}+`, "Years"],
    ["5+", "Live apps"],
    ["99%", "Crash-free"],
  ];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-sky-50 to-white">
      {/* push notification */}
      <div className="absolute inset-x-2 top-1 z-20">
        <AnimatePresence mode="wait">
          {note && (
            <motion.div
              key={n}
              initial={{ y: -70, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -70, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="flex items-center gap-2.5 rounded-2xl bg-white/90 p-2.5 shadow-xl ring-1 ring-slate-200 backdrop-blur"
            >
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                style={{ background: `hsl(${note.hue} 75% 50%)` }}
              >
                {note.app[0]}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[10px] font-semibold text-slate-500">{note.app} · now</span>
                <span className="block truncate text-[11px] font-semibold">{note.text}</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AppBar title="Portfolio" right={<span className="text-lg leading-none text-slate-400">⋯</span>} />

      <div className="relative mx-auto mt-2 h-24 w-24">
        <motion.span
          animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-accent"
        />
        <img
          src={profile.photo}
          alt={profile.name}
          className="relative h-full w-full rounded-full border-4 border-white bg-white object-cover object-top shadow-lg"
        />
        <span className="absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
      </div>
      <p className="mt-2 text-center text-base font-bold">{profile.name}</p>
      <p className="text-center text-[11px] font-semibold text-accent">{profile.title}</p>
      <p className="text-center text-[10px] text-slate-500">{profile.subtitle}</p>

      <div className="mt-3 grid grid-cols-3 gap-2 px-4">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-xl bg-white p-2 text-center shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-extrabold text-accent">{value}</p>
            <p className="text-[9px] text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 px-4 text-[11px] font-semibold text-slate-500">Published apps</p>
      <div className="mt-1.5 grid gap-1.5 px-4">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: SPLASH_MS / 1000 + 0.6 + i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
            className="flex min-w-0 items-center gap-2 rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-100"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-[11px] font-bold text-white">
              {p.title[0]}
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[11px] font-bold">{p.title}</span>
              <span className="block truncate text-[9px] text-slate-500">{p.tagline}</span>
            </span>
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[8px] font-bold text-emerald-700">LIVE</span>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const active = useCycle(4, 1800, SPLASH_MS);
  return (
    <div className="mt-auto flex justify-around border-t border-slate-100 bg-white py-2.5">
      {["⌂", "▦", "♡", "◉"].map((icon, i) => (
        <span key={icon} className="relative grid h-7 w-10 place-items-center text-sm">
          {active === i && (
            <motion.span layoutId="bottom-nav-pill" className="absolute inset-0 rounded-full bg-accent/15" />
          )}
          <span className={`relative ${active === i ? "text-accent" : "text-slate-400"}`}>{icon}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------------- EarningsCall: audio player ---------------- */
const now = new Date();
const currentQuarter = `Q${Math.floor(now.getMonth() / 3) + 1} ${now.getFullYear()}`;
const bars = Array.from({ length: 30 }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.5)));
const transcript = [
  ["Operator", "Good afternoon and welcome to the Q3 earnings call."],
  ["CEO", "Revenue grew year over year, driven by strong demand."],
  ["CFO", "Gross margin landed at the high end of guidance."],
  ["Analyst", "Could you comment on next quarter's outlook?"],
];

export function AudioScreen() {
  const line = useCycle(transcript.length, 2200);
  return (
    <div className="flex h-full flex-col bg-slate-950 text-white">
      <AppBar title="EarningsCall" right={<span className="text-[10px] text-sky-300">{currentQuarter}</span>} />

      <div className="mx-4 mt-1 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-extrabold">
          ACME
        </span>
        <span className="leading-tight">
          <span className="block text-xs font-bold">Acme Corp.</span>
          <span className="block text-[10px] text-slate-400">Quarterly earnings call</span>
        </span>
      </div>

      <div className="mx-4 mt-4 flex h-16 items-center justify-between">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            animate={{ scaleY: [h, h * 0.35, h] }}
            transition={{ duration: 0.7 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-[3px] rounded-full bg-gradient-to-t from-sky-500 to-cyan-300"
          />
        ))}
      </div>

      <div className="mx-4 mt-3">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="h-full rounded-full bg-sky-400"
          />
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-slate-400">
          <span>12:04</span>
          <span>48:30</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-6 text-lg">
        <span className="text-slate-400">⏮</span>
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="grid h-11 w-11 place-items-center rounded-full bg-sky-400 text-sm text-slate-950"
        >
          ❚❚
        </motion.span>
        <span className="text-slate-400">⏭</span>
      </div>

      <p className="mx-4 mt-3 text-[10px] font-semibold text-slate-400">Transcript</p>
      <div className="mx-3 mt-1 grid gap-1">
        {transcript.map(([who, text], i) => (
          <motion.p
            key={who}
            animate={{
              backgroundColor: i === line ? "rgba(56,189,248,0.15)" : "rgba(56,189,248,0)",
              opacity: i === line ? 1 : 0.45,
            }}
            className="rounded-lg px-2 py-1 text-[10px] leading-snug"
          >
            <span className="font-bold text-sky-300">{who}: </span>
            {text}
          </motion.p>
        ))}
      </div>

      <div className="mx-3 mt-auto mb-3 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[10px] text-slate-400">
        <span className="flex-1">Ask AI about this call…</span>
        <span className="grid h-5 w-5 place-items-center rounded-full bg-sky-400 text-[9px] text-slate-950">➤</span>
      </div>
    </div>
  );
}

/* ---------------- LawEntra: MCQ exam ---------------- */
const options = ["Article 27", "Article 32", "Article 39", "Article 41"];
const CORRECT = 2;

export function ExamScreen() {
  // 0 = thinking, 1 = tapped, 2 = correct, 3 = hold
  const step = useCycle(4, 1300);
  const [seconds, setSeconds] = useState(582);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 600)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex h-full flex-col bg-indigo-50">
      <AppBar
        title="LawEntra"
        right={
          <span className="rounded-full bg-rose-100 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-600">
            ⏱ {mm}:{ss}
          </span>
        }
      />
      <div className="px-4">
        <div className="flex justify-between text-[10px] font-semibold text-slate-500">
          <span>Bar Council MCQ</span>
          <span>Q 4/20</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-indigo-100">
          <div className="h-full w-1/5 rounded-full bg-indigo-500" />
        </div>
      </div>

      <div className="mx-4 mt-4 rounded-2xl bg-white p-3 shadow-sm">
        <p className="text-[12px] leading-snug font-semibold">
          Which article of the Constitution of Bangladesh guarantees freedom of thought, conscience and speech?
        </p>
      </div>

      <div className="mx-4 mt-3 grid gap-2">
        {options.map((opt, i) => {
          const picked = i === CORRECT && step >= 1;
          const correct = i === CORRECT && step >= 2;
          return (
            <motion.div
              key={opt}
              animate={{ scale: picked && step === 1 ? [1, 0.94, 1] : 1 }}
              className={`flex items-center gap-2 rounded-xl border-2 bg-white px-3 py-2 text-[11px] font-semibold transition-colors ${
                correct
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : picked
                    ? "border-indigo-500 text-indigo-700"
                    : "border-transparent"
              }`}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-full text-[9px] ${
                  correct ? "bg-emerald-500 text-white" : picked ? "bg-indigo-500 text-white" : "bg-slate-100"
                }`}
              >
                {correct ? "✓" : String.fromCharCode(65 + i)}
              </span>
              {opt}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {step >= 2 && (
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-center text-[11px] font-bold text-emerald-600"
          >
            Correct! +1 mark 🎉
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mx-4 mt-auto mb-4 rounded-xl bg-indigo-500 py-2.5 text-center text-xs font-bold text-white">
        Next question →
      </div>
    </div>
  );
}

/* ---------------- MCQEntra: Bengali result analytics ---------------- */
const subjects = [
  ["বাংলা", 85],
  ["ইংরেজি", 72],
  ["গণিত", 64],
  ["সাধারণ জ্ঞান", 90],
];
const leaders = [
  ["রাকিব হাসান", "৯৬"],
  ["তুমি", "৯২"],
  ["নুসরাত জাহান", "৮৯"],
];
const replay = { once: false, amount: 0.4 };

export function AnalyticsScreen() {
  return (
    <div className="flex h-full flex-col bg-emerald-50">
      <AppBar title="MCQEntra" right={<span className="text-[10px] font-semibold text-emerald-700">বিসিএস</span>} />
      <p className="px-4 text-[11px] font-semibold text-slate-500">মডেল টেস্ট — ফলাফল বিশ্লেষণ</p>

      <div className="mx-4 mt-3 flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm">
        <div className="relative h-20 w-20">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#d1fae5" strokeWidth="8" />
            <motion.circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 0.82 }}
              viewport={replay}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-base font-extrabold text-emerald-600">৮২%</span>
        </div>
        <div className="text-[11px] leading-relaxed">
          <p className="font-bold">চমৎকার! 🎯</p>
          <p className="text-slate-500">সঠিক: ১৬৪ / ২০০</p>
          <p className="text-slate-500">র‍্যাঙ্ক: #২</p>
        </div>
      </div>

      <div className="mx-4 mt-3 grid gap-2 rounded-2xl bg-white p-3 shadow-sm">
        {subjects.map(([name, value], i) => (
          <div key={name}>
            <div className="flex justify-between text-[10px] font-semibold">
              <span>{name}</span>
              <span className="text-slate-500">{value}%</span>
            </div>
            <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-emerald-100">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={replay}
                transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mx-4 mt-3 text-[11px] font-bold">লিডারবোর্ড 🏆</p>
      <div className="mx-4 mt-1 grid gap-1.5">
        {leaders.map(([name, score], i) => (
          <motion.div
            key={name}
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={replay}
            transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
            className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[11px] ${
              i === 1 ? "bg-emerald-500 font-bold text-white" : "bg-white"
            }`}
          >
            <span
              className={`grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold ${
                i === 1 ? "bg-white text-emerald-600" : "bg-amber-100 text-amber-700"
              }`}
            >
              {i + 1}
            </span>
            <span className="flex-1">{name}</span>
            <span className="font-bold">{score}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- GoEventy Scanner: QR check-in ---------------- */
const QR_SIZE = 21;
const isFinder = (x, y) => {
  const inBox = (bx, by) => x >= bx && x < bx + 7 && y >= by && y < by + 7;
  return inBox(0, 0) || inBox(QR_SIZE - 7, 0) || inBox(0, QR_SIZE - 7);
};
const finderOn = (x, y) => {
  const lx = x % (QR_SIZE - 7) === x ? x : x - (QR_SIZE - 7);
  const ly = y % (QR_SIZE - 7) === y ? y : y - (QR_SIZE - 7);
  const edge = lx === 0 || lx === 6 || ly === 0 || ly === 6;
  const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
  return edge || core;
};
// Fixed pseudo-random pattern so the QR looks the same every render
const qrCells = [];
for (let y = 0; y < QR_SIZE; y++)
  for (let x = 0; x < QR_SIZE; x++) {
    const on = isFinder(x, y) ? finderOn(x, y) : (x * 7 + y * 13 + x * y) % 5 < 2;
    if (on) qrCells.push([x, y]);
  }

export function ScannerScreen() {
  // 0–1 = scanning, 2–3 = valid ticket shown
  const step = useCycle(4, 1100);
  const [checkedIn, setCheckedIn] = useState(247);
  const valid = step >= 2;
  useEffect(() => {
    if (step === 2) setCheckedIn((n) => (n >= 500 ? 247 : n + 1));
  }, [step]);

  return (
    <div className="flex h-full flex-col bg-slate-900 text-white">
      <AppBar title="GoEventy Scanner" right={<span className="text-[10px] text-violet-300">Gate A</span>} />
      <div className="mx-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-[10px]">
        <span className="text-slate-300">Checked in</span>
        <span className="font-mono text-xs font-bold">
          <motion.span key={checkedIn} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block">
            {checkedIn}
          </motion.span>
          <span className="text-slate-400"> / 500</span>
        </span>
      </div>

      {/* Camera viewfinder */}
      <div className="relative mx-auto mt-5 h-44 w-44">
        {["top-0 left-0 border-t-4 border-l-4", "top-0 right-0 border-t-4 border-r-4", "bottom-0 left-0 border-b-4 border-l-4", "right-0 bottom-0 border-r-4 border-b-4"].map(
          (c) => (
            <motion.span
              key={c}
              animate={{ borderColor: valid ? "#34d399" : "#a78bfa" }}
              className={`absolute h-8 w-8 rounded-sm ${c}`}
            />
          )
        )}
        <div className="absolute inset-5 rounded-md bg-white p-1.5">
          <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className="h-full w-full" shapeRendering="crispEdges">
            {qrCells.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0f172a" />
            ))}
          </svg>
        </div>
        {!valid && (
          <motion.span
            animate={{ top: ["12%", "85%", "12%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-3 h-0.5 rounded-full bg-violet-400 shadow-[0_0_12px_4px_rgba(167,139,250,0.7)]"
          />
        )}
      </div>
      <p className="mt-3 text-center text-[10px] text-slate-400">{valid ? "Ticket verified" : "Align the QR code within the frame"}</p>

      <AnimatePresence>
        {valid && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="mx-3 mt-auto mb-3 rounded-2xl bg-white p-3 text-slate-900"
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15 }}
                className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-white"
              >
                ✓
              </motion.span>
              <span className="leading-tight">
                <span className="block text-xs font-bold text-emerald-600">Valid ticket</span>
                <span className="block text-[10px] text-slate-500">VIP · Admit one · #GE-{checkedIn + 1043}</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const screens = { audio: AudioScreen, exam: ExamScreen, analytics: AnalyticsScreen, scanner: ScannerScreen };
