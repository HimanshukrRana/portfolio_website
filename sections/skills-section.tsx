"use client";

import { SectionHeading } from "@/components/section-heading";
import { SkillBadge } from "@/components/skill-badge";
import { Reveal } from "@/components/reveal";
import { skills, technicalSkillGroups } from "@/lib/data";

export default function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Modern stack, production mindset"
            description="From frontend architecture to backend integration, I focus on tools that maximize speed, quality, and developer experience."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <SkillBadge key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {technicalSkillGroups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.05}>
              <article className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b84dff]">
                  {group.label}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={`${group.label}-${item}`}
                      className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
