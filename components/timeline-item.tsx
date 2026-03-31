"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/lib/data";

export function TimelineItem({
  item,
  index,
}: {
  item: Experience;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-10"
    >
      <span className="absolute left-[8px] top-1 h-full w-px bg-gradient-to-b from-[#b84dff]/80 to-transparent" />
      <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border border-[#b84dff]/80 bg-background shadow-[0_0_20px_rgba(143,0,255,0.35)]" />
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.period}</p>
      <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
      <p className="text-sm text-[#b84dff]">{item.company}</p>
      {item.location ? (
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {item.location}
        </p>
      ) : null}
      <p className="mt-3 text-muted-foreground">{item.summary}</p>
      {item.highlights?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {item.highlights.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#b84dff]/80" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
}
