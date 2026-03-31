"use client";

import { motion } from "framer-motion";
import {
  SiDocker,
  SiFirebase,
  SiFramer,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import type { Skill } from "@/lib/data";

const iconMap = {
  react: SiReact,
  next: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  vue: SiVuedotjs,
  redux: SiRedux,
  firebase: SiFirebase,
  node: SiNodedotjs,
  database: FaDatabase,
  motion: SiFramer,
  docker: SiDocker,
  postgresql: SiPostgresql,
};

export function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  const Icon = iconMap[skill.icon as keyof typeof iconMap] ?? FaDatabase;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group rounded-2xl border border-border bg-card/70 p-4 backdrop-blur"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-3">
          <span className="rounded-xl border border-border bg-background/80 p-2 text-[#8f00ff] transition-colors group-hover:border-[#b84dff]/40 group-hover:text-[#b84dff]">
            <Icon size={18} />
          </span>
          <p className="font-medium">{skill.name}</p>
        </div>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-border/70">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.2 + index * 0.05, duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#8f00ff] via-[#a83dff] to-[#c266ff]"
        />
      </div>
    </motion.article>
  );
}
