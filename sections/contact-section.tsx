"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { profile, socials } from "@/lib/data";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.error ?? "Unable to send message right now.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Message sent successfully. I will get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-24 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let us build something ambitious"
            description="Need a high-quality product experience for your startup or business? I am open to freelance and contract collaborations."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:border-[#b84dff]/50 hover:text-[#b84dff]"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p>
              Email: <a className="hover:text-foreground" href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <p>
              Phone: <a className="hover:text-foreground" href={`tel:${profile.phone}`}>{profile.phone}</a>
            </p>
            <p>Location: {profile.location}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4 rounded-[2rem] border border-border bg-card/70 p-6 backdrop-blur md:p-8"
          >
            <label className="block space-y-2">
              <span className="text-sm text-muted-foreground">Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Your name"
                required
                className="h-12 w-full rounded-xl border border-border bg-background/80 px-4 text-sm outline-none transition focus:border-[#b84dff]/50 focus:ring-2 focus:ring-[#8f00ff]/20"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-muted-foreground">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-xl border border-border bg-background/80 px-4 text-sm outline-none transition focus:border-[#b84dff]/50 focus:ring-2 focus:ring-[#8f00ff]/20"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-muted-foreground">Message</span>
              <textarea
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                placeholder="Tell me about your project"
                rows={5}
                required
                className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm outline-none transition focus:border-[#b84dff]/50 focus:ring-2 focus:ring-[#8f00ff]/20"
              />
            </label>
            {status ? (
              <p
                className={`text-sm ${
                  status.type === "success" ? "text-[#b84dff]" : "text-rose-300"
                }`}
              >
                {status.message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#b84dff]/40 bg-gradient-to-r from-[#8f00ff]/20 to-[#c266ff]/20 px-6 text-sm font-medium transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(143,0,255,0.35)]"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </Reveal>
      </div>
    </section>
  );
}
