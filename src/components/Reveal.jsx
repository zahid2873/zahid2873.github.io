import { motion } from "motion/react";

// Wrap anything in <Reveal> to make it fade + slide in when scrolled into view.
// Optional: delay (seconds), y (start offset in px), className.
export default function Reveal({ children, delay = 0, y = 40, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="mb-10">
      <p className="mb-2 font-mono text-sm text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
    </Reveal>
  );
}
