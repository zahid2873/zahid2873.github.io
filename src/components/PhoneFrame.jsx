import { useMotionValue, useSpring, useTransform } from "motion/react";

// A phone mockup. Put any screen inside it as children.
export default function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative aspect-[9/19] rounded-[2.6rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl shadow-accent/30 dark:border-slate-700 ${className}`}
    >
      {/* side buttons */}
      <span className="absolute top-24 -right-[13px] h-14 w-[3px] rounded-r bg-slate-700" />
      <span className="absolute top-20 -left-[13px] h-8 w-[3px] rounded-l bg-slate-700" />
      <span className="absolute top-32 -left-[13px] h-12 w-[3px] rounded-l bg-slate-700" />

      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-white text-slate-900">
        {/* dynamic island */}
        <span className="absolute top-2 left-1/2 z-30 h-5 w-20 -translate-x-1/2 rounded-full bg-slate-900" />
        <StatusBar />
        <div className="relative flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-8 shrink-0 items-center justify-between px-6 pt-1 text-[11px] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm bg-slate-900" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 flex h-[10px] w-5 items-center rounded-[3px] border border-slate-900 p-[1px]">
          <span className="h-full w-3/4 rounded-[1px] bg-slate-900" />
        </span>
      </span>
    </div>
  );
}

// Makes an element tilt in 3D toward the mouse.
// Usage: const tilt = useTilt(); <motion.div {...tilt}>
export function useTilt(max = 10) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 15 });

  return {
    style: { rotateX, rotateY, transformPerspective: 1000 },
    onMouseMove(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    onMouseLeave() {
      x.set(0);
      y.set(0);
    },
  };
}
