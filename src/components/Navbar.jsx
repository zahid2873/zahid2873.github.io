import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data.js";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Navbar() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      let current = "";
      for (const id of links.map((l) => l.toLowerCase())) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors ${
        scrolled ? "border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-[#0b0c14]/80" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-4">
        <a href="#home" className="font-mono text-lg font-bold text-accent">
          &lt;{profile.initials} /&gt;
        </a>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => {
            const id = link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${id}`}
                className={`relative font-medium transition-colors hover:text-accent ${
                  active === id ? "text-accent" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {link}
                {active === id && (
                  // layoutId makes the underline glide between links
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.85, rotate: 90 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 dark:border-slate-700"
          >
            {theme === "dark" ? "☀" : "☾"}
          </motion.button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 md:hidden dark:border-slate-700"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-[#0b0c14]"
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block py-4 text-center font-medium hover:text-accent"
              >
                {link}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
