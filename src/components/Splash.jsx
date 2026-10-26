import { motion } from "motion/react";
import { profile } from "../data.js";

// How long the app-launch splash screen stays (milliseconds)
export const SPLASH_MS = 1800;

export default function Splash() {
  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] grid place-items-center bg-gradient-to-br from-accent to-accent-2"
    >
      <div className="flex flex-col items-center gap-5">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="grid h-24 w-24 place-items-center rounded-[1.75rem] bg-white text-3xl font-extrabold text-accent shadow-2xl"
        >
          {profile.initials}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-semibold tracking-wide text-white"
        >
          {profile.name}
        </motion.p>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-white/30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: SPLASH_MS / 1000 - 0.5, delay: 0.3, ease: "easeInOut" }}
            className="h-full bg-white"
          />
        </div>
      </div>
    </motion.div>
  );
}
