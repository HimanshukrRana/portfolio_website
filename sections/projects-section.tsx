"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work with measurable outcomes"
            description="A snapshot of products I helped shape from concept to launch, balancing elegant interfaces with robust engineering."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
