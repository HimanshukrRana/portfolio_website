"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(143,0,255,0.24),_transparent_42%),radial-gradient(circle_at_80%_80%,_rgba(184,77,255,0.2),_transparent_40%)]" />
      <motion.div
        className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#8f00ff]/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#b84dff]/20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 left-1/3 h-64 w-64 rounded-full bg-[#c266ff]/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
