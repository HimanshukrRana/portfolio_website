"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
        <Reveal>
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-border bg-card/70 p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-border bg-[radial-gradient(circle_at_20%_10%,_rgba(143,0,255,0.35),_transparent_44%),linear-gradient(160deg,_rgba(15,23,42,1),_rgba(2,6,23,1))]">
              <Image
                src="/profile.svg"
                alt="Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 360px"
              />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 bottom-12 rounded-2xl border border-[#b84dff]/40 bg-[#8f00ff]/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#d6a6ff]"
            >
              Product Mindset
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            eyebrow="About"
            title="Building scalable web and mobile product experiences"
            description={profile.summary}
          />
          <div className="mt-8 space-y-5 text-muted-foreground">
            <p>
              I specialize in creating high-performance frontend systems with modern
              JavaScript ecosystems, focusing on architecture, performance, and UX.
            </p>
            <p>
              My work includes shipping production apps to Google Play and Apple App
              Store, migrating legacy platforms, and delivering AI-powered product
              experiences from concept to production.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Location", value: profile.location },
              { label: "Experience", value: "3+ Years" },
              { label: "Focus", value: "Frontend Systems" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-card/70 p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
