"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { TimelineItem } from "@/components/timeline-item";
import { experiences } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="A timeline of impact"
            description="I have built products for startup teams and enterprise workflows, always optimizing for speed, usability, and growth."
          />
        </Reveal>

        <div className="mt-10 space-y-10">
          {experiences.map((item, index) => (
            <TimelineItem key={`${item.company}-${item.period}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
