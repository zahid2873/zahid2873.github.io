import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal, { SectionHeading } from "./Reveal.jsx";
import { profile } from "../data.js";

const linkedin = profile.socials.find((s) => s.label === "LinkedIn");
const github = profile.socials.find((s) => s.label === "GitHub");

function ContactCard({ href, icon, iconClass, label, value, cta, external, delay, children }) {
  return (
    <Reveal delay={delay} className="h-full">
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        className="group flex h-full min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition-colors hover:border-accent sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
      >
        <span className={`grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg ${iconClass}`}>{icon}</span>
        <span className="mt-6 text-xs font-semibold tracking-widest text-slate-400 uppercase">{label}</span>
        <span className="mt-1 text-lg font-bold break-all sm:text-xl">{value}</span>
        <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">
          {cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
        {children}
      </motion.a>
    </Reveal>
  );
}

const MailIcon = (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4">
        <div className="text-center [&>div]:mx-auto">
          <SectionHeading eyebrow="Contact" title="Let's build your next app together" />
        </div>
        <Reveal>
          <p className="mx-auto -mt-4 max-w-xl text-center text-lg text-slate-500 dark:text-slate-400">
            Need a Flutter app built, or want to talk about a role? Reach out by email or connect with me on LinkedIn.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <ContactCard
            href={`mailto:${profile.email}`}
            icon={MailIcon}
            iconClass="bg-gradient-to-br from-accent to-accent-2 shadow-accent/30"
            label="Email"
            value={profile.email}
            cta="Send me an email"
            delay={0.1}
          />
          <ContactCard
            href={linkedin.url}
            external
            icon={LinkedInIcon}
            iconClass="bg-[#0a66c2] shadow-[#0a66c2]/30"
            label="LinkedIn"
            value="in/zahid-hasan"
            cta="Connect on LinkedIn"
            delay={0.2}
          />
        </div>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              onClick={copyEmail}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  className={`inline-block ${copied ? "text-emerald-500" : ""}`}
                >
                  {copied ? "✓ Email copied" : "📋 Copy email"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.a
              href={github.url}
              target="_blank"
              rel="noopener"
              whileHover={{ y: -2 }}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900"
            >
              GitHub ↗
            </motion.a>
            <motion.a
              href={profile.resume}
              download
              whileHover={{ y: -2 }}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/30"
            >
              Download CV
            </motion.a>
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">📍 {profile.location}</p>
        </Reveal>
      </div>
    </section>
  );
}
