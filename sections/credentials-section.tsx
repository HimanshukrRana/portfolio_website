"use client";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { certifications, education } from "@/lib/data";

export default function CredentialsSection() {
  return (
    <section id="credentials" className="px-6 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Credentials"
            title="Education and certifications"
            description="A quick snapshot of academic foundation and continuous learning credentials."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur md:p-8">
              <h3 className="text-2xl font-semibold">Education</h3>
              <div className="mt-6 space-y-5">
                {education.map((item) => (
                  <div key={`${item.institution}-${item.period}`} className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.period}
                    </p>
                    <p className="text-lg font-semibold">{item.institution}</p>
                    <p className="text-muted-foreground">{item.degree}</p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur md:p-8">
              <h3 className="text-2xl font-semibold">Certifications</h3>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                {certifications.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b84dff]/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
