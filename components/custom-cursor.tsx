"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { damping: 30, stiffness: 280, mass: 0.2 });
  const smoothY = useSpring(y, { damping: 30, stiffness: 280, mass: 0.2 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ translateX: smoothX, translateY: smoothY }}
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-6 w-6 rounded-full border border-[#b84dff]/60 bg-[#8f00ff]/10 md:block"
    >
      <div className="absolute inset-0 rounded-full bg-[#b84dff]/20 blur-sm" />
    </motion.div>
  );
}
