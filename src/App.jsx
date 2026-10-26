import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "motion/react";
import Splash, { SPLASH_MS } from "./components/Splash.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), SPLASH_MS);
    return () => clearTimeout(timer);
  }, []);

  // Thin progress bar at the top that fills as you scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    // reducedMotion="user" tones animations down for people who turned on "reduce motion" in their OS
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Splash key="splash" />}</AnimatePresence>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-accent to-accent-2"
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
