import { motion } from "motion/react";
import { profile } from "../data.js";

// How long the app-launch splash screen stays (milliseconds)
export const SPLASH_MS = 2000;

export default function Splash() {
  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      // background matches the logo's own dark color so the image blends in
      className="fixed inset-0 z-[100] grid place-items-center bg-[#010207]"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.img
          src="logo-full.png"
          alt={`${profile.name} logo`}
          initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-64 mix-blend-lighten sm:w-80"
        />
        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/15">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: SPLASH_MS / 1000 - 0.5, delay: 0.3, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-accent to-accent-2"
          />
        </div>
      </div>
    </motion.div>
  );
}
