import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal, { SectionHeading } from "./Reveal.jsx";
import { profile } from "../data.js";

const inputClass =
  "rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:border-transparent focus:ring-2 focus:ring-accent dark:border-slate-700 dark:bg-[#0b0c14]";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Opens the visitor's email app with the message filled in.
  // To receive messages directly instead, see "Contact form" in README.md.
  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent("Portfolio message from " + data.get("name"));
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    e.target.reset();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const details = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { label: "Location", value: profile.location },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's work together" />
          <Reveal>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Need a Flutter app built, or want to talk about a role? My inbox is always open.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-4">
            {details.map((d, i) => (
              <Reveal key={d.label} delay={0.1 * i}>
                <li className="flex flex-col">
                  <span className="text-xs tracking-widest text-slate-400 uppercase">{d.label}</span>
                  {d.href ? (
                    <a href={d.href} className="font-semibold text-accent hover:underline">
                      {d.value}
                    </a>
                  ) : (
                    <span className="font-semibold">{d.value}</span>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.2}>
          <form
            onSubmit={onSubmit}
            className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
          >
            <label className="grid gap-1.5 text-sm font-semibold">
              Name
              <input name="name" required className={inputClass} />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Email
              <input name="email" type="email" required className={inputClass} />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Message
              <textarea name="message" rows="5" required className={inputClass} />
            </label>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-accent px-7 py-3 font-semibold text-white shadow-lg shadow-accent/30"
            >
              Send message
            </motion.button>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm text-accent"
                >
                  Opening your email app… ✓
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
