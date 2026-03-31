"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/lib/data";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur"
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          width={1200}
          height={800}
          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">{project.title}</h3>
          <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
          {project.commits ? (
            <p className="text-xs uppercase tracking-[0.14em] text-[#b84dff]">
              {project.commits}+ commits
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-[#b84dff]/50 hover:text-[#b84dff]"
          >
            Live Demo <ArrowUpRight size={14} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-[#b84dff]/50 hover:text-[#b84dff]"
          >
            GitHub <SiGithub size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
